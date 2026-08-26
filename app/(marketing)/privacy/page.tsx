export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-sm leading-relaxed text-slate-700">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">1. Who we are</h2>
        <p>IGNYX (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an Instagram automation platform operated by Nyx Labs, providing comment automation, direct message automation, post scheduling, and analytics tools to Instagram business accounts on behalf of our clients.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">2. Data we access</h2>
        <p className="mb-2">When a business connects their Instagram account to IGNYX, we request access to the following data via Meta&apos;s Instagram API, strictly to provide the automation features they&apos;ve configured:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Basic profile information (Instagram Business Account ID, username)</li>
          <li>Comments on the connected account&apos;s posts and reels, to detect and respond to configured keyword rules</li>
          <li>Direct messages sent to the connected account, to detect and respond to configured keyword rules</li>
          <li>Post and account performance insights, to display analytics to the business</li>
          <li>Content the business chooses to publish or schedule through IGNYX</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">3. How we use this data</h2>
        <p>Data is used exclusively to operate the automation rules and features a connected business has configured — for example, matching an incoming comment against their configured trigger words and sending the reply they&apos;ve set up. We do not use client or end-user data for advertising, do not sell data to third parties, and do not use it to train AI models beyond what a business explicitly configures for their own AI-assisted reply feature.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">4. Data storage</h2>
        <p>Each connected business&apos;s automation configuration (rules, reply templates, scheduled content) is stored in a dedicated, isolated database for that business. We do not permanently store the content of Instagram conversations; conversation data is retrieved live from Instagram&apos;s API when needed and is not retained by IGNYX afterward. Access tokens are stored securely and are used only to make API calls on the connected business&apos;s behalf.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">5. Data sharing</h2>
        <p>We do not share Instagram data with third parties, except where a business has enabled an optional AI-assisted reply add-on, in which case relevant message content is passed to that business&apos;s own configured AI service provider solely to generate a reply, and is not retained by IGNYX.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">6. Data deletion</h2>
        <p>A business may request deletion of their IGNYX account and all associated configuration data at any time by contacting us at the email below. Disconnecting Instagram from IGNYX immediately revokes our access to that account&apos;s data going forward.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-slate-900 mb-2">7. Contact</h2>
        <p>For privacy questions or data deletion requests, contact us at nyxlabs360@gmail.com.</p>
      </section>
    </div>
  );
}