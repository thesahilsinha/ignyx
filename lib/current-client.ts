import { cookies } from "next/headers";
import { verifySessionToken } from "./session";
import { getCentralClient } from "./supabase-central";
import type { Client } from "@/types";

export async function getCurrentClient(): Promise<Client | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("ignyx_client_session")?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session || session.role !== "client" || !session.clientId) return null;

  const db = getCentralClient();
  const { data } = await db.from("clients").select("*").eq("id", session.clientId).single();

  return (data as Client) || null;
}