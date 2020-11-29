const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const getReply = require("./getReply");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const userMessageData = [];

app.post("/incoming", async (req, res) => {
  // console.log(`body is`, req.body);
  // console.log(req.body.Body);

  const msg = req.body.Body;
  const user = req.body.From.trim();

  //console.log(`user is ${user}`);

  const reply = await getReply({ msg, user, userMessageData });
  console.log(`reply is ${reply}`);
  console.log(userMessageData);

  const twiml = new MessagingResponse();
  twiml.message(reply);

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twiml.toString());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
