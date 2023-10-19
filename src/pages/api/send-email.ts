import { NextApiRequest, NextApiResponse } from 'next';

import sendgrid from '../../utils/sendgrid';

// Sendgrid
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const result = await sendgrid(req.body)
      .then(async (data) => data)
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: error.message });
      });

    if (result?.statusText === 'Accepted') {
      return res.status(200).json({
        ok: true,
        message: 'Your message was sent, thanks for reaching out  🚀',
      });
    }

    return res.status(500).json({ message: 'Message failed to send.' });
  }

  return res.status(404).json({ message: '404 Not Found' });
};

export default handler;
