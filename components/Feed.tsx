'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }: any) => {
    return (
        <div className="mt-16 prompt_layout">
            {data?.map((post: any) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                    handleEdit={() => { }}
                    handleDelete={() => { }}
                />
            ))}
        </div>
    );
};
const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e: any) => {

    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt');
            const data = await res.json();

            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative">
                <input
                    type="text"
                    placeholder="Search for tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"

                />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={() => { }}
            />
        </section>
    );
};

export default Feed;