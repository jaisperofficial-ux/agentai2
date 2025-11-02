export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex h-screen max-w-4xl flex-col px-6">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span className="text-sm font-medium text-gray-600">AI Marketing Agent</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="/dashboard-demo">Demo</a>
            <a className="hover:text-gray-900" href="/pricing">Pricing</a>
            <a className="hover:text-gray-900" href="/legal">Legal</a>
            <a className="rounded-xl bg-gray-900 px-3 py-1.5 font-medium text-white hover:bg-black" href="/flow">Generate my plan</a>
          </nav>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Your AI partner for effortless growth.
          </h1>
          <p className="mt-3 max-w-xl text-base text-gray-600">
            Answer a few questions. Get a tailored strategy and ready-to-run campaigns — plus daily reports and alerts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700" href="/flow">Generate my plan</a>
            <a className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50" href="/dashboard-demo">View sample report</a>
          </div>
          <p className="mt-4 text-xs text-gray-500">No credit card required. You can edit/delete your data anytime.</p>
        </section>

        <footer className="py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} Your Company</footer>
      </div>
    </main>
  );
}
