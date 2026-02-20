import { Code } from '@browser/components/Code';
import { Navbar } from '@browser/components/Navbar';
import { createBroadcastChannel } from '@browser/sdk';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

type DemoMessage = {
  user: string;
  message: string;
  timestamp: number;
};

const channel = createBroadcastChannel<DemoMessage>('demo-channel');

const BroadcastPage: NextPage = () => {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [input, setInput] = useState('');
  const unsubscribeRef = useRef<() => void>(null);

  useEffect(() => {
    if (!channel.isSupported()) return;

    unsubscribeRef.current = channel.subscribe((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      unsubscribeRef.current?.();
      channel.close();
    };
  }, []);

  const sendMessage = () => {
    const payload: DemoMessage = {
      user: 'Tab',
      message: input,
      timestamp: Date.now(),
    };

    channel.publish(payload);
    setInput('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      <Navbar />

      <div className="relative z-10 container mx-auto space-y-20 px-6 py-16">
        {/* Hero */}
        <section className="space-y-6 text-center">
          <div className="badge badge-primary badge-lg shadow-lg">
            Multi-Tab Demo
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">
            Broadcast Channel SDK
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Cross-tab communication made safe with SSR guards and feature
            detection. Open this page in multiple tabs to test it.
          </p>

          {!channel.isSupported() && (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
              BroadcastChannel is not supported in this browser.
            </div>
          )}
        </section>

        {/* Live Demo */}
        <section className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl">
            <h2 className="text-xl font-semibold">Send Message</h2>

            <div className="flex gap-4">
              <input
                className="input input-bordered w-full bg-black/60"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />

              <button
                className="btn btn-primary"
                onClick={sendMessage}
                disabled={!input}>
                Publish
              </button>
            </div>

            <div className="mt-6 space-y-2 text-sm text-white/70">
              {messages.length === 0 && (
                <div className="text-white/40">
                  No messages yet. Open another tab and send one.
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.message}
                  className="rounded-lg border border-white/5 bg-black/60 p-3">
                  <div className="text-xs text-white/40">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                  <div>{msg.message}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Example */}
        <section className="mx-auto max-w-3xl">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="text-2xl font-semibold">Usage</h2>

            <Code
              code={`const channel = createBroadcastChannel<Message>('my-channel');

if (channel.isSupported()) {
  const unsubscribe = channel.subscribe((msg) => {
    console.log('Received:', msg);
  });

  channel.publish({ hello: 'world' });

  unsubscribe();
  channel.close();
}`}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BroadcastPage;
