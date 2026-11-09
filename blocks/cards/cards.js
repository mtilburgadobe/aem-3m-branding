/**
 * One story per image/content row; first story receives the lead treatment.
 * @see stardust/eds-schema/home.json - news
 */
function decorateNews(block) {
  if (block.dataset.newsReady) return;
  // Expand only wrappers introduced around media-led cells by aem.js.
  block.querySelectorAll('p:not([data-prose-index])').forEach((paragraph) => {
    if (paragraph.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > p, :scope > ul, :scope > ol')) paragraph.replaceWith(...paragraph.childNodes);
  });
  const rows = [...block.children];
  if (!rows.length) return;
  block.dataset.newsReady = 'true';
  const list = document.createElement('div');
  list.className = 'story-list';
  const stories = rows.map((row, index) => {
    const heading = row.querySelector('h1,h2,h3,h4');
    const link = heading?.querySelector('a[href]') || row.querySelector('a[href]');
    const story = document.createElement(link ? 'a' : 'article');
    if (link) {
      story.href = link.getAttribute('href');
      row.querySelectorAll('a').forEach((anchor) => anchor.replaceWith(...anchor.childNodes));
    }
    story.className = index === 0 ? 'lead-story' : 'story-row';
    const media = document.createElement('div');
    media.className = 'news-image';
    const body = document.createElement('div');
    body.className = 'news-body';
    [...row.children].forEach((cell) => {
      const picture = cell.querySelector('picture, img');
      if (picture) {
        const paragraph = picture.closest('p');
        media.append(paragraph && !paragraph.textContent.trim() ? paragraph : picture);
      }
      const paragraphs = [...cell.querySelectorAll('p')];
      paragraphs.forEach((paragraph) => {
        const wrap = document.createElement('div');
        wrap.className = heading && paragraph.compareDocumentPosition(heading) === Node.DOCUMENT_POSITION_FOLLOWING ? 'story-date' : 'story-link';
        paragraph.before(wrap);
        wrap.append(paragraph);
      });
      body.append(cell);
    });
    story.append(media, body);
    return story;
  });
  list.append(...stories.slice(1));
  block.replaceChildren(stories[0], list);
}

export default async function decorate(block) {
  if (block.classList.contains('news')) {
    decorateNews(block);
    return;
  }
  const { createOptimizedPicture } = await import('../../scripts/aem.js');
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
