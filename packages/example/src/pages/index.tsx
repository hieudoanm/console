import { NextPage } from 'next';
import { createLogger } from '@console/sdk';
import { Code } from '@console/components/Code';

const logger = createLogger({
  showTimestamp: true,
});

const HomePage: NextPage = () => {
  const runBasicLogs = () => {
    logger.info('Application started');
    logger.warn('Deprecated API usage');
    logger.error('Request failed', { status: 500 });
    logger.debug('Debug payload', { foo: 'bar' });
  };

  const runScopedLogs = () => {
    const auth = logger.withScope('Auth');

    auth.group('Login Flow', (log) => {
      log.info('Validating credentials');
      log.debug('Payload prepared');
      log.warn('Slow response detected');
      log.error('Invalid token');
    });
  };

  const runTable = () => {
    logger.table([
      { id: 1, name: 'Alice', role: 'Admin' },
      { id: 2, name: 'Bob', role: 'User' },
    ]);
  };

  const runTimer = () => {
    logger.group('Performance Test', (log) => {
      log.time('fetch');
      setTimeout(() => {
        log.timeEnd('fetch');
      }, 500);
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      {/* Navbar */}
      <div className="navbar sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="container mx-auto">
          <span className="text-lg font-semibold tracking-wide text-white/90">
            @console/sdk
          </span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto space-y-20 px-6 py-16">
        {/* Hero */}
        <section className="space-y-6 text-center">
          <div className="badge badge-primary badge-lg shadow-lg">
            DevTools Required
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">
            Functional Console SDK
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Native console wrapper with scoped logging, grouping, timestamps,
            level filtering, and styled output.
          </p>

          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl">
            <strong>Open DevTools first:</strong>
            <div className="mt-2 text-sm text-white/60">
              Mac: ⌘ + Option + J <br />
              Windows/Linux: Ctrl + Shift + J
            </div>
          </div>
        </section>

        {/* Demo Grid */}
        <section className="grid gap-10 md:grid-cols-2">
          {[
            {
              title: 'Basic Logging',
              code: `const logger = createLogger();

logger.info('App started');
logger.warn('Deprecated API');
logger.error('Failure');
logger.debug('Debug info');`,
              action: runBasicLogs,
              label: 'Run Logs',
            },
            {
              title: 'Scoped Logger + Group',
              code: `const auth = logger.withScope('Auth');

auth.group('Login Flow', (log) => {
  log.info('Validating credentials');
  log.error('Invalid token');
});`,
              action: runScopedLogs,
              label: 'Run Scoped Logs',
            },
            {
              title: 'Table Logging',
              code: `logger.table([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]);`,
              action: runTable,
              label: 'Run Table',
            },
            {
              title: 'Performance Timing',
              code: `logger.group('Performance', (log) => {
  log.time('fetch');
  log.timeEnd('fetch');
});`,
              action: runTimer,
              label: 'Run Timer',
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

        {/* Config Section */}
        <section className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="mb-4 text-2xl font-semibold">
              Configuration Options
            </h2>

            <Code
              code={`createLogger({
  enabled: true,
  showTimestamp: true,
  minLevel: 'debug',
  scope: 'App',
});`}></Code>

            <p className="mt-4 text-white/60">
              Change <code className="badge badge-neutral">minLevel: warn</code>{' '}
              to hide info/debug logs.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
