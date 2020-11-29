const S = require("string");
const remove = require("lodash.remove");
const setReminder = require("./setReminder");
const {
  REMINDER_SET,
  REPLY_BACK,
  PAY,
  PAY_LATER,
  CUSTOM_TIME,
  WELCOME,
} = require("./constants");

const { getDetails, getPaymentURL } = require("./getData");

const getWelcomeMsg = (amount, date) => {
  return S(WELCOME).template({
    organization: "HyperVerge",
    amount,
    date,
  }).s;
};

const getReply = async ({ msg, user, userMessageData }) => {
  msg = msg.toLowerCase().trim();
  if (msg === "join") {
    let { amount, due_date } = await getDetails(user.slice(12));
    console.log(`amount is ${amount} and date is ${due_date}`);
    const textBody = getWelcomeMsg(amount, due_date);
    userMessageData.push({ user, msg: textBody });
    return textBody;
  }

  const prevMsgIndex = userMessageData.findIndex((ele) => ele.user === user);
  if (prevMsgIndex == -1) return "Sorry try again!";
  //console.log(`prev index is ${prevMsgIndex}`);

  const prevMsg = userMessageData[prevMsgIndex].msg.toLowerCase();
  let textBody;
  if (prevMsg.includes("welcome")) {
    if (msg === "1") {
      //fetch link
      let { link } = await getPaymentURL(user.slice(12));
      textBody = S(PAY).template({ link }).s;
      remove(userMessageData, (ele) => ele.user == user);
      return textBody;
    } else {
      textBody = PAY_LATER + "\n" + REPLY_BACK;
      userMessageData[prevMsgIndex].msg = textBody;
    }
  } else if (prevMsg.includes("evening")) {
    switch (msg) {
      case "1":
        //set reminder for evening using agendas
        const dateFormat = "{{day}}/{{month}} 18:00 PM";
        const today = new Date();
        let tomorrow = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          18
        );
        let { amount, due_date } = await getDetails(user.slice(12));
        setReminder(user, getWelcomeMsg(amount, due_date), tomorrow);
        let formattedDate = S(dateFormat).template({
          day: tomorrow.getDate(),
          month: tomorrow.getMonth() + 1,
        });
        remove(userMessageData, (ele) => ele.user == user);
        userMessageData.push({
          user,
          msg: getWelcomeMsg(amount, due_date),
        });
        textBody = S(REMINDER_SET).template({ reminder: formattedDate }).s;
        break;
      case "2":
        //fetch last date
        //set reminder for last date
        let { amount1, due_date1 } = await getDetails(user.slice(12));
        const [date, month] = due_date1.split("/");
        setReminder(
          user,
          getWelcomeMsg(amount1, due_date1),
          new Date(2020, +month - 1, +date, 18)
        );
        remove(userMessageData, (ele) => ele.user == user);
        userMessageData.push({
          user,
          msg: getWelcomeMsg(amount1, due_date1),
        });
        textBody = S(REMINDER_SET).template({ reminder: due_date1 }).s;
        break;
      case "3":
        textBody = CUSTOM_TIME;
        userMessageData[prevMsgIndex].msg = textBody;
        break;
    }
  } else if (prevMsg.includes("24hr")) {
    //set reminder for custom date
    msg = msg.trim();
    const parts = msg.split(" ");
    if (parts.length == 1) parts.push("18:00");
    let [date, month] = parts[0].split("/");
    let [hours, minutes] = parts[1].split(":");
    date = +date;
    month = +month;
    hours = +hours;
    minutes = +minutes;
    let { amount, due_date } = await getDetails(user.slice(12));
    setReminder(
      user,
      getWelcomeMsg(amount, due_date),
      new Date(2020, month - 1, date, hours, minutes)
    );
    textBody = S(REMINDER_SET).template({ reminder: parts.join(" ") }).s;
    remove(userMessageData, (ele) => ele.user == user);
    userMessageData.push({
      user,
      msg: getWelcomeMsg(amount, due_date),
    });
  }
  return textBody;
};

module.exports = getReply;
