export default async function handler(req, res) {
  const { cookies } = req;

  const token = cookies.token;

  if (!token) {
    return res.json({
      success: false,
      message: 'Invalid Token!',
    });
  }

  res.json({
    success: true,
    message: 'Ok',
  });
}
