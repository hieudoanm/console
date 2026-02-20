import { Code } from '@browser/components/Code';
import { Navbar } from '@browser/components/Navbar';
import { createClipboard } from '@browser/sdk';
import { logger } from '@browser/utils/logger';
import { NextPage } from 'next';
import { useState } from 'react';

const clipboard = createClipboard();

const ClipboardPage: NextPage = () => {
  const [copiedText, setCopiedText] = useState('Hello from Clipboard SDK');
  const [pastedText, setPastedText] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const runCopy = async () => {
    try {
      await clipboard.copy(copiedText);
      setStatus('Copied successfully ✅');
    } catch (error) {
      logger.error((error as Error).message);
      setStatus('Clipboard not supported ❌');
    }
  };

  const runPaste = async () => {
    try {
      const text = await clipboard.paste();
      setPastedText(text);
      setStatus('Pasted successfully ✅');
    } catch (error) {
      logger.error((error as Error).message);
      setStatus('Clipboard not supported ❌');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      <Navbar />

      <div className="relative z-10 container mx-auto space-y-20 px-6 py-16">
        {/* Hero */}
        <section className="space-y-6 text-center">
          <div className="badge badge-primary badge-lg shadow-lg">
            Browser Permission Required
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">
            Clipboard SDK
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Safe wrapper around the native Clipboard API with SSR support and
            feature detection.
          </p>

          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl">
            <strong>Note:</strong>
            <div className="mt-2 text-sm text-white/60">
              Clipboard access requires a secure context (HTTPS) and user
              interaction.
            </div>
          </div>
        </section>

        {/* Live Input Section */}
        <section className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="mb-4 text-2xl font-semibold">Try Custom Text</h2>

            <input
              value={copiedText}
              onChange={(e) => setCopiedText(e.target.value)}
              className="input input-bordered w-full bg-black/60"
              placeholder="Type something to copy..."
            />

            {pastedText && (
              <div className="mt-4 rounded-lg bg-neutral-900 p-4 text-sm text-white/70">
                <strong>Pasted:</strong> {pastedText}
              </div>
            )}

            {status && (
              <div className="mt-4 text-sm text-white/60">{status}</div>
            )}
          </div>
        </section>

        {/* Demo Grid */}
        <section className="grid gap-10 md:grid-cols-2">
          {[
            {
              title: 'Copy Text',
              code: `const clipboard = createClipboard();

await clipboard.copy('Hello world');`,
              action: runCopy,
              label: 'Copy Text',
            },
            {
              title: 'Paste Text',
              code: `const clipboard = createClipboard();

const text = await clipboard.paste();
console.log(text);`,
              action: runPaste,
              label: 'Paste Text',
            },
            {
              title: 'Check Support',
              code: `clipboard.isSupported();`,
              action: () =>
                setStatus(
                  clipboard.isSupported()
                    ? 'Clipboard is supported ✅'
                    : 'Clipboard not supported ❌',
                ),
              label: 'Check Support',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="space-y-4 p-8">
                <h2 className="text-xl font-semibold">{card.title}</h2>

                <Code code={card.code} />

                <button
                  className="btn btn-primary btn-block shadow-lg"
                  onClick={card.action}>
                  {card.label}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* API Definition */}
        <section className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="mb-4 text-2xl font-semibold">Clipboard API</h2>

            <Code
              code={`export interface ClipboardAPI {
  copy(text: string): Promise<void>;
  paste(): Promise<string>;
  isSupported(): boolean;
}`}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClipboardPage;
