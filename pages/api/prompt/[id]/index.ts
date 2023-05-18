import { NextApiRequest, NextApiResponse } from 'next';
import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { prompt, tag } = req.body;
    // GET
    if (req.method === 'GET') {
        try {
            await connectToDB();

            const singlePrompt = await Prompt.findById(id).populate('creator');
            if (!singlePrompt) return res.status(404).json({ message: 'Prompt not found' });

            return res.status(200).json(singlePrompt);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to fetch prompt' });
        }
    } else if (req.method === 'PATCH') { // PATCH
        const { prompt, tag } = req.body;
        try {
            await connectToDB();

            const existingPrompt = await Prompt.findById(id);

            if (!existingPrompt) return res.status(404).json({ message: 'Prompt not found' });

            existingPrompt.prompt = prompt;
            existingPrompt.tag = tag;

            await existingPrompt.save();

            return res.status(200).json(existingPrompt);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch prompt' });
        }
    } else if (req.method === 'DELETE') { // DELETE
        try {
            await connectToDB();
            await Prompt.findByIdAndRemove(id);

            return res.status(200).json({ message: 'Prompt deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to deleted prompt' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}