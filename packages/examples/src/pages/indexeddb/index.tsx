import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { Navbar } from '@browser/components/Navbar';
import { column, table, createDatabase, and } from '@browser/sdk';

const IndexedDBPage: NextPage = () => {
  /* ================= Schema ================= */

  const id = useMemo(() => column<number, 'id'>('id'), []);
  const name = useMemo(() => column<string, 'name'>('name'), []);
  const age = useMemo(() => column<number, 'age'>('age'), []);

  const users = useMemo(
    () => table('users', { id, name, age }, 'id'),
    [id, name, age],
  );

  const db = useMemo(
    () =>
      createDatabase('demo-db', 1, {
        users,
      }),
    [users],
  );

  /* ================= State ================= */

  const [rows, setRows] = useState<{ id: number; name: string; age: number }[]>(
    [],
  );

  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState<number | ''>('');
  const [filter, setFilter] = useState<'all' | 'young' | 'alice'>('all');

  /* ================= Init ================= */

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      await db.open();
      unsubscribe = db.select().from(users).live(setRows);
    };

    init();

    return () => {
      unsubscribe?.();
    };
  }, [db, users]);

  /* ================= Actions ================= */

  const insertUser = async () => {
    if (!formName || formAge === '') return;

    await db.insert(users).values({
      id: Date.now(),
      name: formName,
      age: Number(formAge),
    });

    setFormName('');
    setFormAge('');
  };

  const applyFilter = async () => {
    const base = db.select().from(users);

    const query =
      filter === 'young'
        ? base.where((u) => u.age < 30)
        : filter === 'alice'
          ? base.where(
              and(
                (u) => u.name === 'Alice',
                (u) => u.age > 18,
              ),
            )
          : base;

    const result = await query.execute();
    setRows(result);
  };

  const resetFilter = async () => {
    const result = await db.select().from(users).execute();
    setRows(result);
  };

  const updateUser = async (id: number) => {
    await db
      .update(users)
      .set({ name: 'Updated' })
      .where((u) => u.id === id);
  };

  const deleteUser = async (id: number) => {
    await db.delete(users).where((u) => u.id === id);
  };

  /* ================= UI ================= */

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      <Navbar />

      <div className="relative z-10 container mx-auto space-y-20 px-6 py-16">
        {/* Hero */}
        <section className="space-y-6 text-center">
          <div className="badge badge-primary badge-lg shadow-lg">
            Persistent Storage
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">
            IndexedDB SDK
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Typed IndexedDB wrapper with live queries, composable filters, and
            SSR-safe initialization.
          </p>
        </section>

        {/* Create User */}
        <section className="mx-auto max-w-3xl">
          <div className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="text-2xl font-semibold">Create User</h2>

            <div className="flex flex-col gap-4 md:flex-row">
              <input
                className="input input-bordered w-full bg-black/60"
                placeholder="Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />

              <input
                type="number"
                className="input input-bordered w-full bg-black/60 md:w-40"
                placeholder="Age"
                value={formAge}
                onChange={(e) =>
                  setFormAge(
                    e.target.value === '' ? '' : Number(e.target.value),
                  )
                }
              />

              <button
                className="btn btn-primary shadow-lg"
                onClick={insertUser}>
                Insert
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mx-auto max-w-3xl">
          <div className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="text-2xl font-semibold">Filters</h2>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <select
                className="select select-bordered bg-black/60"
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as 'all' | 'young' | 'alice')
                }>
                <option value="all">All</option>
                <option value="young">Age &lt; 30</option>
                <option value="alice">Alice & Age &gt; 18</option>
              </select>

              <div className="flex gap-4">
                <button
                  className="btn btn-secondary shadow-lg"
                  onClick={applyFilter}>
                  Apply
                </button>

                <button
                  className="btn btn-outline shadow-lg"
                  onClick={resetFilter}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Users Table */}
        <section className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="mb-6 text-2xl font-semibold">
              Users ({rows.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="table text-white">
                <thead>
                  <tr className="text-white/60">
                    <th>Name</th>
                    <th>Age</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5">
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td className="space-x-2 text-right">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => updateUser(user.id)}>
                          Update
                        </button>

                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => deleteUser(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-6 text-center text-white/40">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IndexedDBPage;
