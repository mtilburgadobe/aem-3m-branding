function container(className) {
  const element = document.createElement('div');
  element.className = className;
  return element;
}

/**
 * One row per industry: authored label paragraph and rich panel content.
 * @see stardust/eds-schema/home.json - industries
 */
export default function decorate(block) {
  if (block.dataset.tabsReady) return;
  // aem.js can fold a media-led rich cell into an unindexed paragraph.
  block.querySelectorAll('p:not([data-prose-index])').forEach((paragraph) => {
    if (paragraph.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > p, :scope > ul, :scope > ol')) paragraph.replaceWith(...paragraph.childNodes);
  });
  const rows = [...block.children];
  if (!rows.length) return;
  block.dataset.tabsReady = 'true';
  const id = `industries-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
  const rail = container('industry-tabs');
  rail.setAttribute('role', 'tablist');
  rail.setAttribute('aria-label', 'Industries');
  rail.setAttribute('aria-orientation', 'vertical');
  const mobile = container('industry-mobile');
  const label = document.createElement('label');
  label.htmlFor = `${id}-select`;
  label.textContent = 'Choose your industry';
  const select = document.createElement('select');
  select.id = label.htmlFor;
  mobile.append(label, select);
  const panels = container('industry-panels');
  const items = [];
  rows.forEach((row, index) => {
    const cells = [...row.children];
    const labelCell = cells.find((cell) => cell.querySelector('p') && !cell.querySelector('h1,h2,h3,picture,img,ul,ol'));
    const authoredLabel = labelCell?.querySelector('p');
    if (!authoredLabel) {
      panels.append(row);
      return;
    }
    const entry = container('industry-choice');
    const title = container('industry-label');
    title.id = `${id}-label-${index}`;
    title.append(...labelCell.childNodes);
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `${id}-tab-${index}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-labelledby', title.id);
    button.setAttribute('aria-controls', `${id}-panel-${index}`);
    const chevron = document.createElement('span');
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '→';
    button.append(chevron);
    entry.append(title, button);
    rail.append(entry);
    const option = document.createElement('option');
    option.value = String(items.length);
    option.textContent = authoredLabel.textContent;
    select.append(option);
    const panel = container('industry-panel');
    panel.id = `${id}-panel-${index}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', button.id);
    panel.tabIndex = 0;
    const text = container('industry-text');
    cells.filter((cell) => cell !== labelCell).forEach((cell) => {
      const picture = cell.querySelector('picture, img');
      if (picture) {
        const media = container('industry-media');
        const paragraph = picture.closest('p');
        media.append(paragraph && !paragraph.textContent.trim() && !paragraph.querySelector('h1,h2,h3,ul,ol') ? paragraph : picture);
        panel.append(media);
      }
      text.append(cell);
    });
    panel.append(text);
    panels.append(panel);
    items.push({ entry, button, panel });
  });
  function activate(index, focus = false) {
    items.forEach((item, i) => {
      const active = i === index;
      item.entry.classList.toggle('is-active', active);
      item.button.setAttribute('aria-selected', String(active));
      item.button.tabIndex = active ? 0 : -1;
      item.panel.hidden = !active;
    });
    select.value = String(index);
    if (focus) items[index]?.button.focus();
  }
  items.forEach((item, index) => {
    item.entry.addEventListener('click', () => activate(index));
  });
  rail.addEventListener('keydown', (event) => {
    const index = items.findIndex((item) => item.button === event.target);
    if (index < 0) return;
    const destinations = {
      ArrowDown: (index + 1) % items.length,
      ArrowUp: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    };
    if (Object.hasOwn(destinations, event.key)) {
      event.preventDefault();
      activate(destinations[event.key], true);
    }
  });
  select.addEventListener('change', () => activate(Number(select.value)));
  block.replaceChildren(rail, mobile, panels);
  if (items.length) activate(0);
}
