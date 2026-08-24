import { NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";

export async function GET() {
  const db = getCentralClient();

  const { data: clients, error: clientsError } = await db.from("clients").select("status, plan");
  if (clientsError) return NextResponse.json({ error: clientsError.message }, { status: 500 });

  const { data: payments, error: paymentsError } = await db.from("payments").select("amount, status");
  if (paymentsError) return NextResponse.json({ error: paymentsError.message }, { status: 500 });

  const totalClients = clients?.length || 0;
  const byStatus = (clients || []).reduce((acc: Record<string, number>, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const byPlan = (clients || []).reduce((acc: Record<string, number>, c) => {
    acc[c.plan] = (acc[c.plan] || 0) + 1;
    return acc;
  }, {});
  const totalRevenue = (payments || [])
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return NextResponse.json({ totalClients, byStatus, byPlan, totalRevenue });
}