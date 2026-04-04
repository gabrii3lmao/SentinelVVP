import cron from "node-cron";
import db from "../db/index.js";
import { domains } from "../db/schema.js";
import { monitorQueue } from "../queues/monitorQueue.js";
import { isNull, or, sql, eq } from "drizzle-orm";

cron.schedule("*/10 * * * * *", async () => {

  const domainsToCheck = await db
    .select()
    .from(domains)
    .where(
      or(
        isNull(domains.lastChecked),
        sql`${domains.lastChecked} + (${domains.checkInterval} || ' seconds')::interval <= NOW()`,
      ),
    );

  for (const domain of domainsToCheck) {
    await monitorQueue.add(
      "check-domain",
      {
        domainId: domain.id,
        url: domain.url,
        timeout: domain.timeout || 5000,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    await db
      .update(domains)
      .set({ lastChecked: sql`NOW()` })
      .where(eq(domains.id, domain.id));
  }
});
