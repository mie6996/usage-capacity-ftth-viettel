import { serialize } from 'cookie';

export default async function handler(req, res) {
  const serialised = serialize('token', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', serialised);

  res.status(200).json({ success: true, message: 'Successfuly logged out!' });
}
