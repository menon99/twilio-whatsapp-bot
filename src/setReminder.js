const Agenda = require("agenda");
const sendNotification = require("./sendNotification");

const mongoConnectionString = "mongodb://127.0.0.1/agenda";
const EVENT = "send reminder";

const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: "jobsCollection",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
}).maxConcurrency(10);

agenda.define(EVENT, (job) => {
  console.log(job.attrs.data);
  console.log("hello");
  sendNotification(job.attrs.data.to, job.attrs.data.body);
  job.attrs.data.userMessageData.push({ user: to, msg: body });
});

const setReminder = async (to, body, date) => {
  console.log("date is");
  console.log(date.toUTCString());
  await agenda.start();
  await agenda
    .schedule(date, EVENT, { to, body })
    .catch((err) => console.error(err));
};

module.exports = setReminder;
