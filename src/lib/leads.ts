import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { LeadPayload, LeadStatus } from "./types";

export type StoredLead = LeadPayload & {
  id: string;
  status: LeadStatus;
  source: "website";
  createdAt: string;
};

const leadsFilePath = path.join(process.cwd(), "src", "data", "leads.json");

async function readLeadsFile() {
  try {
    const raw = await fs.readFile(leadsFilePath, "utf8");
    return JSON.parse(raw) as StoredLead[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await writeLeadsFile([]);
      return [];
    }

    throw error;
  }
}

async function writeLeadsFile(leads: StoredLead[]) {
  await fs.writeFile(leadsFilePath, `${JSON.stringify(leads, null, 2)}\n`);
}

export async function saveLead(payload: LeadPayload): Promise<StoredLead> {
  const leads = await readLeadsFile();
  const lead: StoredLead = {
    ...payload,
    id: crypto.randomUUID(),
    status: "new",
    source: "website",
    createdAt: new Date().toISOString(),
  };

  leads.push(lead);
  await writeLeadsFile(leads);

  return lead;
}

export async function listLeads() {
  const leads = await readLeadsFile();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const leads = await readLeadsFile();
  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) {
    throw new Error("Lead not found.");
  }

  leads[index] = { ...leads[index], status };
  await writeLeadsFile(leads);

  return leads[index];
}
