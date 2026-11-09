/**
 * Company variant: image/statement cell and authored company-link list.
 * @see stardust/eds-schema/home.json - company
 */
export default function decorate(block) {
  if (block.classList.contains('company')) {
    if (block.dataset.companyReady) return;
    // aem.js wraps a leading picture and statement; keep the authored p intact.
    block.querySelectorAll('p:not([data-prose-index])').forEach((paragraph) => {
      if (paragraph.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > p, :scope > ul, :scope > ol')) paragraph.replaceWith(...paragraph.childNodes);
    });
    block.dataset.companyReady = 'true';
    [...block.children].forEach((row) => {
      row.classList.add('company-grid');
      [...row.children].forEach((cell) => {
        cell.classList.add(cell.querySelector('ul,ol') ? 'company-links' : 'company-statement');
        const picture = cell.querySelector('picture, img');
        if (picture) {
          const media = document.createElement('div');
          media.className = 'company-image';
          const paragraph = picture.closest('p');
          media.append(paragraph && !paragraph.textContent.trim() ? paragraph : picture);
          cell.prepend(media);
        }
        if (!cell.classList.contains('company-links')) {
          const statement = document.createElement('div');
          statement.className = 'company-copy';
          [...cell.childNodes].filter((node) => !node.classList?.contains('company-image')).forEach((node) => statement.append(node));
          cell.append(statement);
        }
      });
    });
    return;
  }
  if (!block.firstElementChild) return;
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
