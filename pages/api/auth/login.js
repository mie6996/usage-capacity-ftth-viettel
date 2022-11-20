import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const response = await axios.post(
        process.env.VIETTEL_URL_LOGIN,
        req.body
      );

      return res.status(200).json({
        success: true,
        data: response.data,
      });
    }
  } catch (error) {
    return error.code === "ERR_BAD_REQUEST"
      ? res.status(200).json({
          success: false,
          errors: error.response.data,
          message: error.response.data.message,
        })
      : res.status(400).json({
          success: false,
          data: null,
          message: "Phương thức không hợp lệ!",
        });
  }
}
