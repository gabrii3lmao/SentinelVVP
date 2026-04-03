import axios from "axios";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { logs, domains } from "../db/schema.js";

export async function checkDomains() {
  const allDomains = await db.select().from(domains);

  for (const domain of allDomains) {
    const start = Date.now();
    try {
      const response = await axios.get(domain.url, { timeout: domain.timeout });
      const latency = Date.now() - start;

      await db.insert(logs).values({
        domainId: domain.id,
        statusCode: response.status,
        responseTime: latency,
        isSuccess: true,
      });

      await db
        .update(domains)
        .set({ status: "up", lastChecked: new Date() })
        .where(eq(domains.id, domain.id));
    } catch (error: any) {
      const latency = Date.now() - start;
      await db.insert(logs).values({
        domainId: domain.id,
        statusCode: error.response ? error.response.status : 0,
        responseTime: latency,
        errorMessage: error.message,
        isSuccess: false,
      });

      await db
        .update(domains)
        .set({ status: "down", lastChecked: new Date(), isActive: false })
        .where(eq(domains.id, domain.id));
    }
  }
}

await checkDomains();