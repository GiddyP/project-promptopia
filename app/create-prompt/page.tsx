'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';
import { useRouter } from 'next/navigation';

interface Post {
    prompt: string;
    tag: string;
}

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const { data: session }: any = useSession();
    const router = useRouter();

    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: ''
    });

    // console.log(session?.user?.id)

    const createPrompt = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id,
                    tag: post.tag
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;;