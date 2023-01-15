export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: false,
      message: 'Invalid Token!',
    });
  }

  return res.json({
    success: true,
    message: 'Ok',
  });
}
