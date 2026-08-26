export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-sm leading-relaxed text-slate-700">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Terms & Conditions</h1>
      <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">1. Service</h2>
        <p>IGNYX provides Instagram automation tools — comment and DM automation, post scheduling, analytics, and related add-ons — to businesses that connect their Instagram account to our platform.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">2. Account & billing</h2>
        <p>Plans are billed annually as described on our Pricing page. Access may be paused or suspended for non-payment, in accordance with the status shown on your account.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">3. Acceptable use</h2>
        <p>You agree to use IGNYX in compliance with Instagram and Meta&apos;s own platform policies. We reserve the right to suspend accounts that violate Meta&apos;s terms, since this can affect the standing of our entire platform.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">4. Data</h2>
        <p>See our Privacy Policy for details on what data we access and how it&apos;s used.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">5. Contact</h2>
        <p>Questions about these terms can be sent to nyxlabs360@gmail.com.</p>
      </section>
    </div>
  );
}