// FILE: app/login/page.tsx
// PURPOSE: Login page — placeholder until full UI is built
// DESIGN REF: Wireframe page 5 of 13 (Log-in page)

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-[var(--color-blue-panel)]">
        <h1 className="max-w-xs text-center text-3xl font-bold text-[var(--color-text-white)]">
          Delhi Air Pollution Mitigation Dashboard
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-center bg-[var(--color-surface)]">
        <div className="w-full max-w-sm space-y-6 rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Sign In
          </h2>
          <form action="/home" method="get" className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="hello@example.com"
                className="w-full rounded border border-[var(--color-border)] px-3 py-2 text-base outline-none focus:ring-2 focus:ring-[var(--color-blue-link)]"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded border border-[var(--color-border)] px-3 py-2 text-base outline-none focus:ring-2 focus:ring-[var(--color-blue-link)]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-[var(--color-success)] py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
