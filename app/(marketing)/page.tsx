import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";

export default function HomePage() {
  return (
    <div>
      <MarketingHeader />

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-[var(--color-ink)]">
          Instagram automation, built for how your business actually runs.
        </h1>
        <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
          Auto-reply to comments, DMs, and story replies. Schedule posts. Understand your ads and analytics — all from one dashboard.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-[var(--color-accent)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--color-accent-dark)] transition"
        >
          See pricing
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="gradient-border p-6">
          <div className="font-medium mb-2">Comment & DM automation</div>
          <p className="text-sm text-slate-500">Set keyword rules once. Every matching comment or DM gets handled automatically, day or night.</p>
        </div>
        <div className="gradient-border p-6">
          <div className="font-medium mb-2">Post scheduling</div>
          <p className="text-sm text-slate-500">Queue up captions, images, and locations. They go live on their own, right on time.</p>
        </div>
        <div className="gradient-border p-6">
          <div className="font-medium mb-2">AI-assisted replies</div>
          <p className="text-sm text-slate-500">Give your assistant context about your business, and let it handle the messages your rules don&apos;t cover.</p>
        </div>
      </section>
    </div>
  );
}