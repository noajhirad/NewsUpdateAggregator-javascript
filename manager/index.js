import { DaprClient, HttpMethod } from "@dapr/dapr";

// const DAPR_HOST = "http://localhost"; //process.env.DAPR_HOST || "http://localhost";
// const DAPR_HTTP_PORT = "3500"; //process.env.DAPR_HTTP_PORT || "3500";

const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3501"; // Dapr Sidecar Port of this Example Server
const serviceAppId = "notification-engine";
const serviceMethod = "";

const client = new DaprClient({ daprHost, daprPort });

async function func() {
  //   const res = await fetch(
  //     `${DAPR_HOST}:${DAPR_HTTP_PORT}/v1.0/invoke/notification-engine/method/`,
  //     {
  //       headers: { "dapr-app-id": "notification-engine" },
  //     }
  //   );
  const res = await client.invoker.invoke(
    serviceAppId,
    serviceMethod,
    HttpMethod.GET
  );
  //   const text = await res.text();
  console.log(res);
}

func();
