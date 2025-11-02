export default function Pricing() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Pricing</h1>
        <p className="mt-2 text-sm text-gray-600">Simple tiers. Start free, scale as you grow.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Start</div>
            <div className="mt-2 text-2xl font-semibold">€0</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
              <li>Plan generator</li><li>Sample dashboard</li><li>Email support</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Grow</div>
            <div className="mt-2 text-2xl font-semibold">€49</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
              <li>Automation</li><li>Daily reports</li><li>Basic integrations</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Scale</div>
            <div className="mt-2 text-2xl font-semibold">Custom</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
              <li>White-label</li><li>SLA</li><li>Advanced integrations</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
