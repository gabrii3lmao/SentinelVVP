import cron from "node-cron";
import db from "../db/index.js";
import { domains } from "../db/schema.js";
import { monitorQueue } from "../queues/monitorQueue.js";

cron.schedule("* * * * *", async () => {
  const allDomains = await db.select().from(domains);

  for (const domain of allDomains) {
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
  }
});
