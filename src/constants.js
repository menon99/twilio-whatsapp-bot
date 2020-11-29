const REPLY_BACK = "\n\nKindly reply back with the option number.";

const WELCOME = `Welcome to HyperVerge-PayBot.\nYour payment to {{organization}} of amount {{amount}} Rupees is due on {{date}}.\nWould you like to \n1) Pay now?\n2) Pay Later?`;

const PAY_LATER = `1) Set a reminder for tomorrow evening?\n2) Last date of payment without late fee?\n3) Set a custom date and time?`;

// console.log(WELCOME + REPLY_BACK + "\n");
// console.log(PAY_LATER + REPLY_BACK + "\n");

const CUSTOM_TIME =
  "Please type in a custom date and time.\nDate format: DD\\MM.\nTime format: HH:MM.\nTime is set to 18:00 by default and follows 24Hr format.\nFor example 30/11 21:30";

const PAY = "Click on below link to complete payment.\n{{link}}";

const SUCCESS = "Your payment was completed successfully.";

const MONEY_SAVED = "You have managed to save {{money}} Rupees by paying now.";

const REMINDER_SET = "Reminder has been set for {{reminder}}.";

// console.log(CUSTOM_TIME + "\n");
// console.log(PAY + "\n");
// console.log(SUCCESS + "\n");
// console.log(MONEY_SAVED + "\n");
// console.log(REMINDER_SET + "\n");

module.exports = {
  REPLY_BACK,
  WELCOME,
  PAY_LATER,
  CUSTOM_TIME,
  PAY,
  SUCCESS,
  MONEY_SAVED,
  REMINDER_SET,
};
