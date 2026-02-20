import Link from 'next/link';
import { Navbar } from '@browser/components/Navbar';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const pages = [
    { label: 'Boardcast Channel', href: '/boardcast-channel' },
    { label: 'Console SDK', href: '/console' },
    { label: 'Clipboard SDK', href: '/clipboard' },
    { label: 'IndexedDB SDK', href: '/indexeddb' },
    { label: 'Share SDK', href: '/share' },
    { label: 'Storage SDK', href: '/storage' },
  ];

  const features = [
    {
      title: 'BroadcastChannel',
      description:
        'Cross-tab communication with SSR-safe instantiation and graceful fallback.',
    },
    {
      title: 'Clipboard API',
      description:
        'Safe wrapper around navigator.clipboard with SSR guards and feature detection.',
    },
    {
      title: 'Console SDK',
      description:
        'Scoped logging, grouping, timestamps, performance timers, and table rendering.',
    },
    {
      title: 'IndexedDB',
      description:
        'Typed IndexedDB wrapper with safe initialization, structured storage helpers, and promise-based access.',
    },
    {
      title: 'Web Share API',
      description:
        'Trigger native mobile share sheets safely with built-in support checks.',
    },
    {
      title: 'Local/Session Storage',
      description:
        'Typed wrapper around localStorage and sessionStorage with SSR guards and JSON serialization support.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      <Navbar />

      <div className="relative z-10 container mx-auto space-y-32 px-6 py-24">
        {/* Hero */}
        <section className="space-y-8 text-center">
          <div className="badge badge-primary badge-lg shadow-lg">
            Modern Browser SDK
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Browser APIs.
            <br />
            <span className="text-white/60">Clean. Typed. SSR-Safe.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            @browser/sdk provides minimal, composable wrappers around modern
            browser APIs like Clipboard, Share, Console, BroadcastChannel, and
            File System — built for real-world Next.js applications.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/console" className="btn btn-primary shadow-lg">
              Explore APIs
            </Link>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline shadow-lg">
              GitHub
            </a>
          </div>
        </section>

        {/* API Features */}
        <section className="space-y-12">
          <h2 className="text-center text-3xl font-bold">Included Modules</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Available API Pages */}
        <section className="space-y-12">
          <h2 className="text-center text-3xl font-bold">Interactive Demos</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-2xl border border-white/10 bg-black/40 p-8 text-center shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <h3 className="text-xl font-semibold group-hover:text-white">
                  {page.label}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  View live examples and usage patterns.
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/40 p-12 shadow-2xl backdrop-blur-2xl">
            <h2 className="text-3xl font-bold">Stop Writing window Guards</h2>

            <p className="mt-4 text-white/60">
              @browser/sdk centralizes browser feature detection and safety so
              you can focus on building features — not defensive checks.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/clipboard" className="btn btn-primary shadow-lg">
                Try Clipboard
              </Link>

              <Link href="/share" className="btn btn-outline shadow-lg">
                Try Share
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} @browser/sdk</span>

          <div className="flex items-center gap-6">
            <Link href="/console" className="transition hover:text-white">
              Console
            </Link>
            <Link href="/clipboard" className="transition hover:text-white">
              Clipboard
            </Link>
            <Link href="/share" className="transition hover:text-white">
              Share
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
