import { get, post } from 'axios';
require('dotenv').config();

const config = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  shortcode: process.env.MPESA_SHORTCODE,
  passkey: process.env.MPESA_PASSKEY,
  baseURL: process.env.MPESA_BASE_URL,
  callbackURL: process.env.CALLBACK_URL,
};

async function getAccessToken() {
  const auth = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64');
  const response = await get(`${config.baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data.access_token;
}

async function stkPush(phone, amount) {
  const token = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`${config.shortcode}${config.passkey}${timestamp}`).toString('base64');

  const payload = {
    BusinessShortCode: config.shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: config.shortcode,
    PhoneNumber: phone,
    CallBackURL: config.callbackURL,
    AccountReference: 'Test Payment',
    TransactionDesc: 'Testing STK push',
  };

  const response = await post(`${config.baseURL}/mpesa/stkpush/v1/processrequest`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export default { stkPush };
