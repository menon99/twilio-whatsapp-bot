const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

const sendNotification = (to, body) => {
  client.messages
    .create({
      body,
      from: "whatsapp:+14155238886",
      to,
    })
    .then((message) => console.log(message.sid));
};

module.exports = sendNotification;
