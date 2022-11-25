import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const response = await axios.post(
        process.env.VIETTEL_URL_GET_DATA,
        req.body
      );

      if (response.data.errorCode === -2) {
        return res.status(200).json({
          success: false,
          message: response.data.data.message,
        });
      }

      if (response.data.errorCode === 1) {
        return res.status(200).json({
          success: false,
          message: "Có lỗi xảy ra hoặc không có dữ liệu trả về.",
        });
      }

      if (response.data.errorCode === 3) {
        return res.status(200).json({
          success: true,
          message: "Thiếu tham số đầu vào",
        });
      }

      return res.status(200).json({
        success: true,
        data: response.data,
      });
    }
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_BAD_REQUEST") {
      return res
        .status(200)
        .json({ success: false, data: error.response.data });
    }
    return res.status(200).json({ success: false, message: error.message });
  }
}
