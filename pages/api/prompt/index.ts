import { NextApiRequest, NextApiResponse } from 'next';
import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDB();

      const prompts = await Prompt.find({}).populate('creator');
      return res.status(200).json(prompts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch all prompts' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}