import { Code } from '@browser/components/Code';
import { Navbar } from '@browser/components/Navbar';
import { createStorage } from '@browser/sdk';
import { NextPage } from 'next';
import { useState } from 'react';

type AppStorage = {
  user: { name: string; role: string };
  theme: string;
};

const storage = createStorage<AppStorage>('local', {
  namespace: 'demo',
});

const StoragePage: NextPage = () => {
  const [result, setResult] = useState<string | null>(null);

  const runSet = () => {
    storage.set('user', { name: 'Alice', role: 'Admin' });
    setResult('User stored ✅');
  };

  const runGet = () => {
    const user = storage.get('user');
    setResult(user ? JSON.stringify(user, null, 2) : 'No user found ❌');
  };

  const runHas = () => {
    const exists = storage.has('user');
    setResult(exists ? 'User exists ✅' : 'User does not exist ❌');
  };

  const runRemove = () => {
    storage.remove('user');
    setResult('User removed 🗑️');
  };

  const runClear = () => {
    storage.clear();
    setResult('Namespace cleared 🧹');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      <Navbar />

      <div className="relative z-10 container mx-auto space-y-20 px-6 py-16">
        {/* Hero */}
        <section className="space-y-6 text-center">
          <div className="badge badge-primary badge-lg shadow-lg">
            localStorage / sessionStorage
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">
            Typed Storage SDK
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            SSR-safe wrapper around browser storage with namespacing,
            serialization control, and full TypeScript key safety.
          </p>

          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl">
            <strong>Namespace:</strong> demo
          </div>
        </section>

        {/* Result Section */}
        {result && (
          <section className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl">
              <h2 className="mb-4 text-lg font-semibold">Result</h2>
              <pre className="text-sm whitespace-pre-wrap text-white/70">
                {result}
              </pre>
            </div>
          </section>
        )}

        {/* Demo Grid */}
        <section className="grid gap-10 md:grid-cols-2">
          {[
            {
              title: 'Set Value',
              code: `storage.set('user', {
  name: 'Alice',
  role: 'Admin'
});`,
              action: runSet,
              label: 'Set User',
            },
            {
              title: 'Get Value',
              code: `const user = storage.get('user');`,
              action: runGet,
              label: 'Get User',
            },
            {
              title: 'Check Existence',
              code: `storage.has('user');`,
              action: runHas,
              label: 'Has User?',
            },
            {
              title: 'Remove Value',
              code: `storage.remove('user');`,
              action: runRemove,
              label: 'Remove User',
            },
            {
              title: 'Clear Namespace',
              code: `storage.clear();`,
              action: runClear,
              label: 'Clear Storage',
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
              Configuration Example
            </h2>

            <Code
              code={`createStorage<'local'>('local', {
  namespace: 'app',
  serialize: JSON.stringify,
  deserialize: JSON.parse
});`}
            />

            <p className="mt-4 text-white/60">
              Namespacing prevents collisions and allows scoped clearing.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StoragePage;
