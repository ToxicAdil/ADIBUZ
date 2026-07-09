export type BlogHeading = {
  id: string;
  level: 2 | 3 | 4;
  text: string;
};

function baseSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'section';
}

export function slugifyBlogHeading(value: string, seen: Record<string, number> = {}) {
  const base = baseSlug(value);
  const count = (seen[base] ?? 0) + 1;
  seen[base] = count;
  return count === 1 ? base : `${base}-${count}`;
}

export function extractBlogHeadings(content: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const seen: Record<string, number> = {};
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const match = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3 | 4;
    const text = match[2].replace(/\s+#+\s*$/, '').trim();
    headings.push({
      id: slugifyBlogHeading(text, seen),
      level,
      text,
    });
  }

  return headings;
}

export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) && !href.startsWith('https://adibuz.com') && !href.startsWith('http://localhost');
}

export function isVideoUrl(url: string) {
  const lower = url.toLowerCase();
  return (
    lower.includes('youtube.com/watch') ||
    lower.includes('youtu.be/') ||
    lower.includes('youtube.com/embed/') ||
    lower.includes('vimeo.com/') ||
    lower.includes('loom.com/share/') ||
    /\.(mp4|webm|mov)(\?.*)?$/.test(lower)
  );
}

export function getVideoEmbedUrl(url: string) {
  const trimmed = url.trim();
  if (/^https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/.test(trimmed)) {
    const id = trimmed.match(/^https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/)?.[1];
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }

  if (/youtube\.com\/watch/.test(trimmed)) {
    const match = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    return match?.[1] ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
  }

  if (/youtube\.com\/embed\//.test(trimmed)) {
    return trimmed;
  }

  if (/vimeo\.com\/(\d+)/.test(trimmed)) {
    const id = trimmed.match(/vimeo\.com\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  if (/loom\.com\/share\//.test(trimmed)) {
    const id = trimmed.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)?.[1];
    return id ? `https://www.loom.com/embed/${id}` : null;
  }

  if (/\.(mp4|webm|mov)(\?.*)?$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function getCalloutVariant(text: string) {
  const normalized = text.trim().toLowerCase();
  if (normalized.startsWith('[!warning]') || normalized.startsWith('warning:') || normalized.startsWith('caution:')) {
    return 'warning' as const;
  }
  if (normalized.startsWith('[!tip]') || normalized.startsWith('tip:') || normalized.startsWith('pro tip:')) {
    return 'tip' as const;
  }
  if (normalized.startsWith('[!info]') || normalized.startsWith('info:')) {
    return 'info' as const;
  }
  if (normalized.startsWith('[!note]') || normalized.startsWith('note:') || normalized.startsWith('important:')) {
    return 'note' as const;
  }
  return null;
}

export function stripCalloutPrefix(text: string) {
  return text
    .replace(/^\s*\[!\w+\]\s*/i, '')
    .replace(/^(warning|caution|tip|pro tip|info|note|important)\s*:\s*/i, '')
    .trim();
}

