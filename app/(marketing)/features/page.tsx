import MarketingHeader from "@/components/MarketingHeader";

const features = [
  { title: "Comment automation", desc: "Reply publicly, DM, or both when a comment matches your keywords — exact, starts-with, or contains." },
  { title: "DM & story automation", desc: "Automatic replies to direct messages and story replies, with the same flexible matching." },
  { title: "Greeting & fallback messages", desc: "A tailored first-message greeting, and a fallback for anything your rules don't catch." },
  { title: "AI+ assisted replies", desc: "Give your own context, and let AI handle unmatched messages with real relevance." },
  { title: "Post scheduling", desc: "Queue captions, images, locations, and collaborators — they publish automatically." },
  { title: "Ads & account analytics", desc: "See what's working, from top-line numbers to detailed breakdowns on Growth." },
];

export default function FeaturesPage() {
  return (
    <div>
      <MarketingHeader />
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold text-center mb-12">Everything you need to run Instagram on autopilot</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="gradient-border p-6">
              <div className="font-medium mb-1">{f.title}</div>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}