import axios from 'axios';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const response = await axios.post(
        process.env.VIETTEL_URL_LOGIN,
        req.body
      );
      const token = response.data.data.data.token;

      res.status(200).json({
        success: true,
        data: {
          token: token,
          user: response.data.data.data,
        },
      });
    }
  } catch (error) {
    console.log(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      return res
        .status(200)
        .json({ success: false, data: error.response.data });
    }
    res.status(200).json({ success: false, message: error.message });
  }
}
