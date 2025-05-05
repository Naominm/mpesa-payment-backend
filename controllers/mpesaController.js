import { stkPush } from '../helpers/mpesa.js';

const initiateSTKPush = async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: 'Phone number and amount are required' });
  }

  try {
    const result = await stkPush(phone, amount);
    res.status(200).json({ success: true, message: 'STK push sent', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'STK push failed' });
  }
};

export default { initiateSTKPush };
