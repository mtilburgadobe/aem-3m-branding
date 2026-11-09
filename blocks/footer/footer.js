import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function slot(className, section) {
  const wrapper = document.createElement('div');
  wrapper.className = className;
  const content = section?.querySelector('.default-content-wrapper');
  if (content) wrapper.append(...content.childNodes);
  return wrapper;
}

/**
 * Authored /footer: four link groups, legal band, social group, trademark.
 * Preserve authored paragraphs/lists/images for inline editing.
 */
export default async function decorate(block) {
  const path = new URL(getMetadata('footer') || '/footer', window.location).pathname;
  const fragment = await loadFragment(path);
  if (!fragment) return;
  // Pipeline-generated heading IDs must not shadow main-page section anchors.
  fragment.querySelectorAll(':is(h1,h2,h3,h4,h5,h6)[id]').forEach((heading) => {
    heading.id = `footer-${heading.id}`;
  });
  const sections = [...fragment.children];
  const inner = slot('footer-inner');
  const grid = slot('footer-grid');
  sections.slice(0, 4).forEach((section) => grid.append(slot('footer-group', section)));
  const legal = slot('footer-information', sections[4]);
  const pictureParagraph = legal.querySelector('p:has(img)');
  if (pictureParagraph) {
    const mark = slot('footer-mark');
    mark.append(pictureParagraph);
    legal.prepend(mark);
  }
  const list = legal.querySelector('ul');
  if (list) {
    const links = slot('footer-legal');
    list.before(links);
    links.append(list);
  }
  const bottom = slot('footer-bottom');
  bottom.append(legal, slot('footer-social', sections[5]));
  inner.append(grid, bottom, slot('trademark-note', sections[6]));
  sections.slice(7).forEach((section) => inner.append(slot('footer-group', section)));
  block.replaceChildren(inner);
}
