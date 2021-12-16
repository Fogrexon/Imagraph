import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import { setCookie } from 'nookies';
import { firebaseAdmin } from '../../src/lib/firebaseAdmin';
import { setUser } from '../../src/lib/firestoreAdmin';

const loginAPI = async (req: Req, res: Res) => {
  if (req.method !== 'POST') return res.status(404).send('Not Found');

  // 5days
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  const user = JSON.parse(req.body);

  setUser(user.id, user);

  const authing = firebaseAdmin.auth();
  const sessionCookie = await authing.createSessionCookie(user.token, { expiresIn });

  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: '/',
  };

  setCookie({ res }, 'session', sessionCookie, options);

  res.send(JSON.stringify({ status: 'success' }));
};

export default loginAPI;
