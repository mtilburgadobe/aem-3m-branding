function container(className) {
  const element = document.createElement('div');
  element.className = className;
  return element;
}

/**
 * Two rich cells: headline/CTA and poster/film URL/caption.
 * @see stardust/eds-schema/home.json - hero
 * @ew-exempt <p> standalone .mp4 source URL — film metadata, not displayed copy.
 */
export default function decorate(block) {
  if (block.dataset.heroReady || !block.children.length) return;
  // Expand runtime-generated rich-cell wrappers, never authored paragraphs.
  block.querySelectorAll('p:not([data-prose-index])').forEach((paragraph) => {
    if (paragraph.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > p, :scope > ul, :scope > ol')) paragraph.replaceWith(...paragraph.childNodes);
  });
  block.dataset.heroReady = 'true';
  const cells = [...block.children].flatMap((row) => [...row.children]);
  const copy = container('hero-copy');
  const media = container('hero-media');
  const frame = container('film-frame');
  const source = block.querySelector('a[href$=".mp4"], a[href*=".mp4?"]');
  const src = source?.getAttribute('href');
  const sourceParagraph = source?.closest('p');
  const poster = block.querySelector('picture, img');
  const image = poster?.matches('img') ? poster : poster?.querySelector('img');
  const posterURL = image?.getAttribute('src');
  if (image) {
    image.loading = 'eager';
    image.fetchPriority = 'high';
  }
  if (poster) {
    const paragraph = poster.closest('p');
    frame.append(paragraph && !paragraph.textContent.trim() ? paragraph : poster);
  }
  if (sourceParagraph) {
    const metadata = container('film-metadata');
    metadata.hidden = true;
    metadata.append(sourceParagraph);
    media.append(metadata);
  }
  cells.forEach((cell) => {
    if (cell.querySelector('h1,h2,h3')) copy.append(cell);
    else {
      [...cell.querySelectorAll('p')].filter((p) => !p.querySelector('h1,h2,h3,picture,img,a')).forEach((p) => {
        const note = container('film-note');
        note.append(p);
        media.append(note);
      });
      media.append(cell);
    }
  });
  const heading = copy.querySelector('h1,h2,h3');
  if (heading) {
    const bar = container('hero-bar');
    bar.setAttribute('aria-hidden', 'true');
    heading.after(bar);
  }
  media.prepend(frame);
  const grid = container('hero-grid');
  grid.append(copy, media);
  block.replaceChildren(grid);
  if (!src) return;
  const video = document.createElement('video');
  video.id = `science-film-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
  video.className = 'film';
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.preload = 'none';
  video.setAttribute('aria-label', '3M science film showing scientists and technologies in use');
  if (posterURL) video.poster = posterURL;
  const button = document.createElement('button');
  button.className = 'film-control';
  button.type = 'button';
  button.setAttribute('aria-controls', video.id);
  button.textContent = 'Play film';
  const status = container('film-status');
  status.setAttribute('role', 'status');
  status.textContent = 'Film unavailable. Try again to play.';
  status.hidden = true;
  frame.append(video, button);
  media.append(status);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const { connection } = navigator;
  let wanted = !motion.matches && !connection?.saveData;
  let failed = false;
  let attempt = 0;
  function update() {
    const playing = !video.paused && !failed;
    const action = playing ? 'Pause' : 'Play';
    video.classList.toggle('is-playing', playing);
    button.textContent = `${failed ? 'Retry' : action} film`;
    status.hidden = !failed;
  }
  async function play() {
    attempt += 1;
    const currentAttempt = attempt;
    failed = false;
    status.hidden = true;
    if (!video.getAttribute('src')) video.src = src;
    try {
      await video.play();
      if (!wanted || document.hidden) video.pause();
    } catch (error) {
      if (currentAttempt === attempt && wanted && !document.hidden && error.name !== 'AbortError' && error.name !== 'NotAllowedError') failed = true;
    }
    update();
  }
  function pause() {
    attempt += 1;
    video.pause();
    update();
  }
  button.addEventListener('click', () => {
    if (!video.paused && !failed) {
      wanted = false;
      pause();
    } else {
      wanted = true;
      if (failed) {
        video.removeAttribute('src');
        video.load();
      }
      play();
    }
  });
  video.addEventListener('playing', update);
  video.addEventListener('pause', update);
  video.addEventListener('error', () => {
    failed = true;
    update();
  });
  const controller = new AbortController();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else if (wanted) play();
  }, { signal: controller.signal });
  function preferencesChanged() {
    wanted = !motion.matches && !connection?.saveData;
    if (wanted && !document.hidden) play();
    else pause();
  }
  motion.addEventListener('change', preferencesChanged, { signal: controller.signal });
  connection?.addEventListener('change', preferencesChanged, { signal: controller.signal });
  const observer = new MutationObserver(() => {
    if (!block.isConnected) {
      wanted = false;
      pause();
      controller.abort();
      observer.disconnect();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (wanted && !document.hidden) play();
}
