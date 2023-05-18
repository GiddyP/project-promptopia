import { NextApiRequest, NextApiResponse } from 'next';
import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, prompt, tag } = req.body;

      await connectToDB();

      const newPrompt = new Prompt({
        creator: userId,
        prompt,
        tag
      });

      await newPrompt.save();

      return res.status(201).json(newPrompt);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create a new prompt' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}