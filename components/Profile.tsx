'use client';

import PromptCard from "./PromptCard";

interface ProfileProps {
  name: string;
  description: string;
  data: any[];
  handleEdit: any;
  handleDelete: any;
}

const ProfileComponent = ({ name, description, data, handleEdit, handleDelete }: ProfileProps) => {
  // console.log(data)
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>

      <div className="mt-10 prompt_layout">
        {data?.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProfileComponent;
