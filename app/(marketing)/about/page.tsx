import MarketingHeader from "@/components/MarketingHeader";

export default function AboutPage() {
  return (
    <div>
      <MarketingHeader />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-4">About IGNYX</h1>
        <p className="text-slate-600 leading-relaxed mb-4">
          IGNYX is built by Nyx Labs for Indian small and medium businesses running their sales and support on Instagram. We started with WhatsApp automation, and built IGNYX the same way — practical, reliable, and priced for how SMBs actually operate.
        </p>
        <p className="text-slate-600 leading-relaxed">
          No bloated feature lists, no confusing setup. Just the automation your Instagram business actually needs.
        </p>
      </section>
    </div>
  );
}