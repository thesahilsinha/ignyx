export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-muted)] px-6">
      <div className="text-center max-w-sm">
        <div className="text-2xl font-bold ig-gradient-text mb-2">IGNYX</div>
        <h1 className="text-lg font-semibold mb-2">Quick maintenance</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Your dashboard is briefly unavailable. Your automation, replies, and scheduled posts keep running as normal.
          Check back shortly.
        </p>
      </div>
    </div>
  );
}