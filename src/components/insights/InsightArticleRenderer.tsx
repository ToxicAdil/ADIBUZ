import React, { isValidElement, useMemo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCopy,
  Info,
  Lightbulb,
  Quote,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getCalloutVariant,
  getVideoEmbedUrl,
  isExternalHref,
  isVideoUrl,
  slugifyBlogHeading,
  stripCalloutPrefix,
} from '@/lib/blog';

type Props = {
  content: string;
};

type CalloutVariant = 'note' | 'warning' | 'tip' | 'info';

function childrenToText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(childrenToText).join('');
  if (isValidElement(node)) return childrenToText((node.props as { children?: React.ReactNode }).children);
  return '';
}

function getFirstHref(children: React.ReactNode): string | null {
  let href: string | null = null;
  React.Children.forEach(children, (child) => {
    if (href || !isValidElement(child)) return;
    const props = child.props as { href?: unknown };
    if (typeof props?.href === 'string') {
      href = props.href;
    }
  });
  return href;
}

function getCalloutMeta(variant: CalloutVariant) {
  switch (variant) {
    case 'warning':
      return { title: 'Warning', icon: AlertTriangle, className: 'border-amber-200 bg-amber-50 text-amber-900', iconClass: 'text-amber-600' };
    case 'tip':
      return { title: 'Tip', icon: Lightbulb, className: 'border-emerald-200 bg-emerald-50 text-emerald-900', iconClass: 'text-emerald-600' };
    case 'info':
      return { title: 'Info', icon: Info, className: 'border-sky-200 bg-sky-50 text-sky-900', iconClass: 'text-sky-600' };
    case 'note':
    default:
      return { title: 'Note', icon: CheckCircle2, className: 'border-[#cbb8f5] bg-[#f8f3ff] text-[#3A0F63]', iconClass: 'text-primary' };
  }
}

function VideoEmbed({ src, title }: { src: string; title?: string }) {
  const embed = getVideoEmbedUrl(src);

  if (!embed) {
    return (
      <figure className="my-8 overflow-hidden rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white shadow-[0_16px_45px_rgba(22,8,43,0.06)]">
        <video src={src} controls playsInline preload="metadata" className="block w-full" />
        {title && <figcaption className="border-t border-[rgba(58,15,99,0.08)] px-4 py-3 text-sm font-medium text-[#6f667d]">{title}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="my-8 overflow-hidden rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white shadow-[0_16px_45px_rgba(22,8,43,0.06)]">
      <div className="aspect-video w-full">
        <iframe
          src={embed}
          title={title || 'Embedded video'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      {title && <figcaption className="border-t border-[rgba(58,15,99,0.08)] px-4 py-3 text-sm font-medium text-[#6f667d]">{title}</figcaption>}
    </figure>
  );
}

export function InsightArticleRenderer({ content }: Props) {
  const slugState = useMemo(() => ({ current: {} as Record<string, number> }), [content]);

  const components: Components = useMemo(() => ({
    h1: ({ children, ...props }) => {
      const text = childrenToText(children);
      const id = slugifyBlogHeading(text, slugState.current);
      return (
        <h1
          {...props}
          id={id}
          className="mt-0 scroll-mt-28 text-3xl font-black tracking-tight text-[#12091f] md:text-4xl"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }) => {
      const text = childrenToText(children);
      const id = slugifyBlogHeading(text, slugState.current);
      return (
        <h2
          {...props}
          id={id}
          className="mt-12 scroll-mt-28 text-2xl font-black tracking-tight text-[#12091f] md:text-3xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const text = childrenToText(children);
      const id = slugifyBlogHeading(text, slugState.current);
      return (
        <h3
          {...props}
          id={id}
          className="mt-10 scroll-mt-28 text-xl font-black tracking-tight text-[#12091f] md:text-2xl"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children, ...props }) => {
      const text = childrenToText(children);
      const id = slugifyBlogHeading(text, slugState.current);
      return (
        <h4
          {...props}
          id={id}
          className="mt-8 scroll-mt-28 text-lg font-bold tracking-tight text-[#12091f] md:text-xl"
        >
          {children}
        </h4>
      );
    },
    p: ({ children, ...props }) => {
      const plainText = childrenToText(children).trim();
      const href = getFirstHref(children);

      if (href && isVideoUrl(href) && !plainText.replace(href, '').trim()) {
        return <VideoEmbed src={href} title={plainText && plainText !== href ? plainText : undefined} />;
      }

      const variant = getCalloutVariant(plainText);
      if (variant) {
        const meta = getCalloutMeta(variant);
        const Icon = meta.icon;
        return (
          <div className={`my-7 rounded-[22px] border px-5 py-4 shadow-sm ${meta.className}`}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 ${meta.iconClass}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">{meta.title}</p>
                <p className="m-0 text-[15px] leading-[1.85] text-inherit">{stripCalloutPrefix(plainText)}</p>
              </div>
            </div>
          </div>
        );
      }

      const faqMatch = plainText.match(/^(faq|question|q)\s*:\s*(.+?)(?:\s+answer\s*:\s*(.+))?$/i);
      if (faqMatch) {
        return (
          <div className="my-7 rounded-[22px] border border-[rgba(58,15,99,0.10)] bg-white p-5 shadow-[0_14px_40px_rgba(22,8,43,0.05)]">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-primary">
              <Quote className="h-4 w-4" />
              FAQ
            </div>
            <p className="mt-3 text-[15px] font-black leading-relaxed text-[#12091f]">{faqMatch[2]}</p>
            {faqMatch[3] && <p className="mt-2 text-[15px] leading-[1.85] text-[#6f667d]">{faqMatch[3]}</p>}
          </div>
        );
      }

      return (
        <p {...props} className="my-5 text-[16px] leading-[1.9] text-[#5d667c] md:text-[17px]">
          {children}
        </p>
      );
    },
    a: ({ href = '', children, ...props }) => {
      const label = childrenToText(children);
      if (href.startsWith('/')) {
        return (
          <Link to={href} {...props} className="font-semibold text-primary hover:underline">
            {children}
          </Link>
        );
      }

      const external = isExternalHref(href);
      return (
        <a
          href={href}
          {...props}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="font-semibold text-primary hover:underline"
        >
          {children}
          {external && label ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
      );
    },
    blockquote: ({ children, ...props }) => {
      const text = childrenToText(children).trim();
      const variant = getCalloutVariant(text);

      if (variant) {
        const meta = getCalloutMeta(variant);
        const Icon = meta.icon;
        return (
          <div className={`my-8 rounded-[24px] border px-5 py-4 shadow-[0_14px_40px_rgba(22,8,43,0.05)] ${meta.className}`}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ${meta.iconClass}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">{meta.title}</p>
                <div className="space-y-3 text-[16px] leading-[1.85] text-inherit">
                  {children}
                </div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <blockquote
          {...props}
          className="my-8 border-l-4 border-[#3A0F63] bg-[#f8f3ff] px-6 py-5 text-[16px] italic leading-[1.85] text-[#4e4560] shadow-sm"
        >
          {children}
        </blockquote>
      );
    },
    ul: ({ children, ...props }) => (
      <ul {...props} className="my-5 space-y-3 pl-6 text-[16px] leading-[1.9] text-[#5d667c] marker:text-primary">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="my-5 space-y-3 pl-6 text-[16px] leading-[1.9] text-[#5d667c] marker:font-bold marker:text-primary">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => {
      const text = childrenToText(children).trim();
      const task = /^\[( |x|X)\]\s+/.exec(text);
      if (task) {
        const checked = task[1].toLowerCase() === 'x';
        const label = text.replace(/^\[( |x|X)\]\s+/, '');
        return (
          <li {...props} className="flex items-start gap-3 text-[16px] leading-[1.9] text-[#5d667c]">
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span>{label}</span>
          </li>
        );
      }

      return (
        <li {...props} className="pl-1">
          {children}
        </li>
      );
    },
    input: ({ type, checked, ...props }) => {
      if (type === 'checkbox') {
        return (
          <input
            {...props}
            type="checkbox"
            checked={checked}
            readOnly
            className="mr-3 mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
        );
      }

      return <input {...props} />;
    },
    strong: ({ children, ...props }) => (
      <strong {...props} className="font-extrabold text-[#12091f]">
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em {...props} className="italic text-inherit">
        {children}
      </em>
    ),
    del: ({ children, ...props }) => (
      <del {...props} className="text-[#9a8fa8]">
        {children}
      </del>
    ),
    inlineCode: ({ children, ...props }) => (
      <code {...props} className="rounded-md border border-[rgba(58,15,99,0.12)] bg-[#f7f1ff] px-1.5 py-0.5 font-mono text-[0.92em] text-primary">
        {children}
      </code>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code {...props} className="rounded-md border border-[rgba(58,15,99,0.12)] bg-[#f7f1ff] px-1.5 py-0.5 font-mono text-[0.92em] text-primary">
            {children}
          </code>
        );
      }

      return (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => {
      const codeElement = React.Children.toArray(children).find(isValidElement) as React.ReactElement<{ className?: string }> | undefined;
      const className = codeElement?.props?.className || '';
      const language = /language-([a-z0-9+-]+)/i.exec(className)?.[1];
      return (
        <div className="my-8 overflow-hidden rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-[#0f172a] shadow-[0_18px_50px_rgba(22,8,43,0.12)]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
            <span className="inline-flex items-center gap-2">
              <ClipboardCopy className="h-3.5 w-3.5" />
              Code
            </span>
            <span>{language || 'snippet'}</span>
          </div>
          <pre {...props} className="overflow-x-auto p-5 text-[14px] leading-[1.75] text-slate-100">
            {children}
          </pre>
        </div>
      );
    },
    hr: ({ ...props }) => <hr {...props} className="my-10 border-slate-200" />,
    img: ({ src = '', alt = '', title }) => {
      const caption = title || alt;
      return (
        <figure className="my-8 overflow-hidden rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white shadow-[0_14px_40px_rgba(22,8,43,0.05)]">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block w-full object-cover"
          />
          {caption && <figcaption className="border-t border-[rgba(58,15,99,0.08)] px-4 py-3 text-sm font-medium text-[#6f667d]">{caption}</figcaption>}
        </figure>
      );
    },
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-[24px] border border-[rgba(58,15,99,0.10)] bg-white shadow-[0_14px_40px_rgba(22,8,43,0.05)]">
        <table {...props} className="min-w-full border-collapse text-left text-[15px]">
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => <thead {...props} className="bg-[#f8f3ff] text-[#12091f]">{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => (
      <tr {...props} className="border-b border-[rgba(58,15,99,0.08)] last:border-0">
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th {...props} className="px-4 py-3 font-black uppercase tracking-[0.16em] text-[11px] text-[#6f667d]">
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td {...props} className="px-4 py-4 align-top text-[#5d667c]">
        {children}
      </td>
    ),
  }), [slugState]);

  return (
    <div className="adibuz-blog-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
