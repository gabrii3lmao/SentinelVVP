import { MonitorService } from "./monitor.service.js";
import { AxiosMonitorStrategy } from "./AxiosStrategy.js";

const strategy = new AxiosMonitorStrategy();
const monitorService = new MonitorService(strategy);

monitorService
  .runChecks("18aa3239-fbc4-4106-873e-46695fbc53b6")
  .then(() => {
    console.log("Checks completed");
  })
  .catch((error) => {
    console.error("Error running checks:", error);
  });
