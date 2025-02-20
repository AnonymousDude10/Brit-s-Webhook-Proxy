const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    message: "Too many requests, please try again later.",
    clientError: true,
    serverError: false,
  },
});

app.use(limiter);

app.post("/api/webhooks/:webhookId/:webhookToken", async (req, res) => {
  try {
    const webhookId = req.params.webhookId;
    const webhookToken = req.params.webhookToken;
    const discordWebhookUrl = `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;
    
    const request = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    
    const localeString = new Date().toLocaleString();
    
    if (request.ok) {
      console.log(`✅ | Webhook forwarded successfully ${localeString}`);
      return res.status(200).json({
        message: "Webhook forwarded successfully",
        clientError: false,
        serverError: false,
      });
    } else {
      const decoded = await request.json();
      console.log(`⚠️ | An error occured while forwarding webhook ${localeString}`);
      return res.status(400).json({
        message: decoded,
        clientError: true,
        serverError: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? null,
      clientError: false,
      serverError: true,
    });
  }
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`✅ | Express Server is running on port ${process.env.PORT ?? 3000}`);
});
