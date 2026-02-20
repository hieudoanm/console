import { FC, useEffect, useState } from 'react';
import { bundledThemes, createHighlighter, type Highlighter } from 'shiki';

type Props = {
  code: string;
  lang?: string;
};

let highlighter: Highlighter | null = null;

const loadHighlighter = async () => {
  highlighter ??= await createHighlighter({
    themes: [bundledThemes['vitesse-black']],
    langs: ['ts', 'js', 'tsx'],
  });
  return highlighter;
};

export const Code: FC<Props> = ({ code, lang = 'ts' }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const highlight = async () => {
      const hl = await loadHighlighter();

      const result = hl.codeToHtml(code, {
        lang,
        theme: 'vitesse-black',
      });

      setHtml(result);
    };

    highlight();
  }, [code, lang]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-inner backdrop-blur-sm">
      <div
        className="overflow-x-auto text-xs sm:text-sm [&>pre]:!m-0 [&>pre]:min-w-max [&>pre]:!bg-transparent [&>pre]:!p-5 [&>pre]:whitespace-pre"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
