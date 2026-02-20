import { Code } from '@browser/components/Code';
import { Navbar } from '@browser/components/Navbar';
import { createShare } from '@browser/sdk';
import { logger } from '@browser/utils/logger';
import { NextPage } from 'next';
import { useState } from 'react';

const shareApi = createShare();

const SharePage: NextPage = () => {
  const [status, setStatus] = useState<string | null>(null);

  const runBasicShare = async () => {
    try {
      await shareApi.share({
        title: 'Browser SDK',
        text: 'Check out this awesome SDK!',
        url: 'https://example.com',
      });

      setStatus('Share dialog opened ✅');
    } catch (error) {
      logger.error((error as Error).message);
      setStatus('Share failed or not supported ❌');
    }
  };

  const runTextOnlyShare = async () => {
    try {
      await shareApi.share({
        text: 'Simple text share example',
      });

      setStatus('Text shared ✅');
    } catch (error) {
      logger.error((error as Error).message);
      setStatus('Share failed or not supported ❌');
    }
  };

  const checkSupport = () => {
    setStatus(
      shareApi.isSupported()
        ? 'Web Share API supported ✅'
        : 'Web Share API not supported ❌',
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      {/* Navbar */}
      <Navbar />

      <div className="relative z-10 container mx-auto space-y-20 px-6 py-16">
        {/* Hero */}
        <section className="space-y-6 text-center">
          <div className="badge badge-primary badge-lg shadow-lg">
            Mobile Friendly API
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">
            Web Share SDK
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Safe wrapper around the native Web Share API with SSR safety and
            feature detection.
          </p>

          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl">
            <strong>Note:</strong>
            <div className="mt-2 text-sm text-white/60">
              The Web Share API is primarily supported on mobile browsers and
              secure contexts (HTTPS).
            </div>
          </div>
        </section>

        {/* Status Section */}
        {status && (
          <section className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-white/70 shadow-2xl backdrop-blur-2xl">
              {status}
            </div>
          </section>
        )}

        {/* Demo Grid */}
        <section className="grid gap-10 md:grid-cols-2">
          {[
            {
              title: 'Basic Share',
              code: `const share = createShare();

await share.share({
  title: 'Browser SDK',
  text: 'Check this out!',
  url: 'https://example.com'
});`,
              action: runBasicShare,
              label: 'Run Share',
            },
            {
              title: 'Text Only Share',
              code: `await share.share({
  text: 'Hello world'
});`,
              action: runTextOnlyShare,
              label: 'Share Text',
            },
            {
              title: 'Check Support',
              code: `share.isSupported();`,
              action: checkSupport,
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
            <h2 className="mb-4 text-2xl font-semibold">
              Share API Definition
            </h2>

            <Code
              code={`export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

export interface ShareAPI {
  share(data: ShareData): Promise<void>;
  isSupported(): boolean;
}`}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SharePage;
