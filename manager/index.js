import { DaprClient, HttpMethod } from "@dapr/dapr";
import express from "express";

const app = express();
app.use(express.json());
const port = 5000;

const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3501"; // Dapr Sidecar Port of this Example Server
const notificationAppId = "notification-engine";
const usersAccessorAppId = "users-accessor";
const serviceMethod = "";

const client = new DaprClient({ daprHost, daprPort });

app.get("/", async (req, res) => {
  // const res = await client.invoker.invoke(
  //   notificationAppId,
  //   serviceMethod,
  //   HttpMethod.POST,
  //   {
  //     email: "noaj1997@gmail.com",
  //     text: "yay!",
  //   }
  // );

  const messageToQueue = {
    email: "noaj1997@gmail.com",
    text: "yay!",
  };

  const bindingName = "messagequeue";
  const bindingOperation = "create";

  const result = await client.binding.send(
    bindingName,
    bindingOperation,
    messageToQueue
  );

  // const response = await client.invoker.invoke(
  //   usersAccessorAppId,
  //   serviceMethod,
  //   HttpMethod.GET
  // );

  //res.send(result);
});

app.post("/newuser", (req, res) => {});

app.listen(port, () => {
  console.log(`manager listening on port ${port}`);
});
