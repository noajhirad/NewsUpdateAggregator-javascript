const port = 5000;
const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3501"; // Dapr Sidecar Port of this Example Server
const notificationAppId = "notification-engine";
const usersAccessorAppId = "users-accessor";
const newsEngineAppId = "news-engine";
const bindingName = "messagequeue";
const bindingOperation = "create";

const categories = new Set([
  "Technology",
  "Business",
  "Science",
  "Entertainment",
  "Sports",
  "Health",
  "Environment",
  "Travel",
  "Food",
  "Education",
  "Fashion",
  "Arts",
  "Gaming",
  "Motoring",
  "Politics",
  "Space",
  "Crime",
]);

module.exports = {
  port,
  daprHost,
  daprPort,
  notificationAppId,
  usersAccessorAppId,
  newsEngineAppId,
  categories,
  bindingName,
  bindingOperation,
};
