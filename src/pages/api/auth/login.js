import axios from 'axios';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const response = await axios.post(
        process.env.VIETTEL_URL_LOGIN,
        req.body
      );

      const token = response.data.data.data.token;

      const serialised = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      res.setHeader('Set-Cookie', serialised);

      res.status(200).json({
        success: true,
        data: response.data,
      });
    }
  } catch (error) {
    // console.log(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      return res
        .status(200)
        .json({ success: false, data: error.response.data });
    }
    res.status(200).json({ success: false, message: error.message });
  }
}
