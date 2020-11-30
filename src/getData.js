const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

const getPaymentURL = async (phone) => {
  const data = await instance.post("/tests/endpoint1", {
    phone_number: phone,
  });
  //console.log(data.data);
  return new Promise((resolve) => resolve(data.data));
};

const getDetails = async (phone) => {
  const data = await instance.post("/tests/endpoint2", {
    phone_number: phone,
  });
  //console.log(data.data);
  return new Promise((resolve) => resolve(data.data));
};

module.exports = {
  getDetails,
  getPaymentURL,
};
