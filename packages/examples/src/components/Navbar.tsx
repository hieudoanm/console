import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const navItems = [
  { label: 'Broadcast Channel', href: '/boardcast-channel' },
  { label: 'Console', href: '/console' },
  { label: 'Clipboard', href: '/clipboard' },
  { label: 'IndexedDB', href: '/indexeddb' },
  { label: 'Share', href: '/share' },
  { label: 'Storage', href: '/storage' },
];

export const Navbar: FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-white/90 transition hover:text-white">
          @browser/sdk
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive
                    ? 'font-semibold text-white'
                    : 'text-white/60 hover:text-white'
                }`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="btn btn-ghost btn-sm text-white md:hidden">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-black/80 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col space-y-4 px-6 py-6 text-sm">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`transition ${
                    isActive
                      ? 'font-semibold text-white'
                      : 'text-white/60 hover:text-white'
                  }`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};
