const { DaprClient, HttpMethod } = require("@dapr/dapr");
const express = require("express");
const {
  port,
  daprHost,
  daprPort,
  notificationAppId,
  usersAccessorAppId,
  newsEngineAppId,
  bindingName,
  bindingOperation,
} = require("./constants.js");
const { validateEmail, validatePreferences } = require("./validations.js");

const app = express();
app.use(express.json());

const client = new DaprClient({ daprHost, daprPort });

// sends email with new to user based on email (query param)
app.get("/", async (req, res) => {
  if (req.query.email && validateEmail(req.query.email)) {
    sendMailToUser(req.query.email);
    res.status(202).send("Accepted");
  } else {
    res.status(400).send("Bad request. Please send a valid email");
  }
});

async function sendMailToUser(email) {
  // send mail
  try {
    // bring preferences from accessor
    const preferences = await client.invoker.invoke(
      usersAccessorAppId,
      "",
      HttpMethod.POST,
      {
        email: email,
      }
    );

    // bring top articles from news-engine
    const articles = await client.invoker.invoke(
      newsEngineAppId,
      "",
      HttpMethod.POST,
      {
        preferences: preferences,
      }
    );

    const messageToQueue = {
      email: email,
      text: generateTextForMail(articles),
    };
    const result = await client.binding.send(
      bindingName,
      bindingOperation,
      messageToQueue
    );
  } catch (error) {
    jsonError = JSON.parse(error.message);
    console.log("error", jsonError.error_msg);
  }
}

function generateTextForMail(articles) {
  let text = `Here are the top articles for you:\n\n`;

  for (const article of articles) {
    text += `${article.title}\n${article.summary}\n${article.link}\n\n`;
  }

  return text;
}

app.post("/newuser", async (req, res) => {
  if (
    req.body.email &&
    req.body.preferences &&
    validateEmail(req.body.email) &&
    validatePreferences(req.body.preferences)
  ) {
    try {
      const response = await client.invoker.invoke(
        usersAccessorAppId,
        "newuser",
        HttpMethod.POST,
        {
          email: req.body.email,
          preferences: req.body.preferences,
        }
      );

      res.status(200).send("User added successfuly");
    } catch (error) {
      jsonError = JSON.parse(error.message);
      res.status(jsonError.status).send(jsonError.error_msg);
    }
  } else {
    res
      .status(400)
      .send("Bad request. Please send valid email and preferences");
  }
});

app.post("/updateuser", async (req, res) => {
  if (
    req.body.email &&
    req.body.preferences &&
    validateEmail(req.body.email) &&
    validatePreferences(req.body.preferences)
  ) {
    try {
      const response = await client.invoker.invoke(
        usersAccessorAppId,
        "updateuser",
        HttpMethod.POST,
        {
          email: req.body.email,
          preferences: req.body.preferences,
        }
      );

      res.status(200).send("User updated successfuly");
    } catch (error) {
      jsonError = JSON.parse(error.message);
      res.status(jsonError.status).send(jsonError.error_msg);
    }
  } else {
    res
      .status(400)
      .send("Bad request. Please send valid email and preferences");
  }
});

app.delete("/unsubscribe", async (req, res) => {
  if (req.body.email && validateEmail(req.body.email)) {
    try {
      const response = await client.invoker.invoke(
        usersAccessorAppId,
        "unsubscribe",
        HttpMethod.DELETE,
        {
          email: req.body.email,
        }
      );

      res.status(200).send("Usubscriped successfuly");
    } catch (error) {
      jsonError = JSON.parse(error.message);
      res.status(jsonError.status).send(jsonError.error_msg);
    }
  } else {
    res.status(400).send("Bad request. Please send a valid email");
  }
});

app.listen(port, () => {
  console.log(`manager listening on port ${port}`);
});
