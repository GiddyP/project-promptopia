'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';

interface Post {
    prompt: string;
    tag: string;
}

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const router = useRouter();

    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${ promptId }`);
            const data = await res.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found')

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;