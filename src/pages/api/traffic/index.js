import axios from 'axios';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const response = await axios.post(
        process.env.VIETTEL_URL_GET_DATA,
        req.body
      );

      console.log(response.data);

      if (response.data.errorCode === 500) {
        return res.status(200).json({
          success: false,
          message: 'Server bị lỗi. Thử lại sau',
        });
      }

      if (response.data.errorCode === '0') {
        return res.status(200).json({
          success: true,
          message: 'Lấy data thành công!',
          data: response.data.data,
        });
      }

      if (response.data.errorCode === '-2') {
        return res.status(200).json({
          success: false,
          message: response.data.data.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: response.data.data.message,
      });
    }
  } catch (error) {
    console.log(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      return res
        .status(200)
        .json({ success: false, data: error.response.data });
    }
    return res.status(200).json({ success: false, message: error.message });
  }
}
