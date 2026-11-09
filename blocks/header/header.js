import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function slot(className, ...nodes) {
  const element = document.createElement('div');
  element.className = className;
  element.append(...nodes.filter(Boolean));
  return element;
}

function buildSearch(link) {
  if (!link) return null;
  const label = link.textContent.trim();
  const form = document.createElement('form');
  form.className = 'search-form';
  form.setAttribute('role', 'search');
  form.action = link.href;
  form.method = 'get';
  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'Ntt';
  input.required = true;
  input.placeholder = label;
  input.setAttribute('aria-label', label);
  const button = document.createElement('button');
  button.type = 'submit';
  button.setAttribute('aria-label', label);
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('fill', 'none');
  const circle = document.createElementNS(ns, 'circle');
  circle.setAttribute('cx', '10.5');
  circle.setAttribute('cy', '10.5');
  circle.setAttribute('r', '6.5');
  const line = document.createElementNS(ns, 'path');
  line.setAttribute('d', 'm15.5 15.5 5 5');
  [circle, line].forEach((part) => {
    part.setAttribute('stroke', 'currentColor');
    part.setAttribute('stroke-width', '1.75');
    svg.append(part);
  });
  button.append(svg);
  form.append(input, button);
  return form;
}

/**
 * Authored /nav: brand paragraph | primary link list | search link and utility list.
 * @ew-exempt <p> search destination/label in tools section — control metadata.
 * Menu is runtime UI; all navigation and utility content is moved, not copied.
 */
export default async function decorate(block) {
  const path = new URL(getMetadata('nav') || '/nav', window.location).pathname;
  const fragment = await loadFragment(path);
  if (!fragment) return;
  const sections = [...fragment.children];
  const brandContent = sections[0]?.querySelector('.default-content-wrapper');
  const primary = sections[1]?.querySelector('ul');
  const tools = sections[2]?.querySelector('ul');
  const searchLink = sections[2]?.querySelector('p a');
  const brand = slot('brand', ...(brandContent ? [...brandContent.childNodes] : []));
  const nav = document.createElement('nav');
  nav.className = 'desktop-nav';
  nav.setAttribute('aria-label', 'Main navigation');
  const utility = slot('header-utility');
  const menu = document.createElement('details');
  menu.className = 'mobile-menu';
  const summary = document.createElement('summary');
  summary.append('Menu');
  const lines = document.createElement('span');
  lines.className = 'menu-lines';
  lines.setAttribute('aria-hidden', 'true');
  summary.append(lines);
  const panel = document.createElement('nav');
  panel.setAttribute('aria-label', 'Mobile navigation');
  const mobilePrimary = slot('menu-primary');
  const mobileTools = slot('menu-tools');
  panel.append(mobilePrimary, mobileTools);
  menu.append(summary, panel);
  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#main';
  skip.textContent = 'Skip to content';
  document.querySelector('main')?.setAttribute('id', 'main');
  const inner = slot('header-inner', brand, nav, buildSearch(searchLink), utility, menu);
  const image = brand.querySelector('img');
  if (image) {
    const logoURL = new URL(image.getAttribute('src'), window.location.href);
    if (logoURL.pathname.endsWith('.png')) {
      // Lossy resized renditions soften the approved lockup and alter its aspect ratio.
      logoURL.searchParams.delete('width');
      logoURL.searchParams.delete('optimize');
      logoURL.searchParams.set('format', 'png');
      image.closest('picture')?.querySelectorAll('source').forEach((source) => source.remove());
      image.src = logoURL.href;
    }
    image.loading = 'eager';
    image.setAttribute('fetchpriority', 'high');
  }
  block.replaceChildren(skip, inner);
  const desktop = window.matchMedia('(min-width: 961px)');
  const relocate = () => {
    if (!block.isConnected) return;
    menu.open = false;
    if (primary) (desktop.matches ? nav : mobilePrimary).append(primary);
    if (tools) (desktop.matches ? utility : mobileTools).append(tools);
  };
  relocate();
  desktop.addEventListener('change', relocate);
  block.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      summary.focus();
    }
  });
  menu.addEventListener('focusout', (event) => {
    if (!menu.contains(event.relatedTarget)) menu.open = false;
  });
}
