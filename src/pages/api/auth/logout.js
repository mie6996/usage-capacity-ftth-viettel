export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  res.status(200).json({ success: true, message: 'Successfuly logged out!' });
}
