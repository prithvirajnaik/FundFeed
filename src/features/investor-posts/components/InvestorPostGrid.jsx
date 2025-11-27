import InvestorPostCard from "./InvestorPostCard";

export default function InvestorPostsGrid({ posts, savedList, onSave }) {
  return (
    <div className="
      grid gap-6
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3
    ">
      {posts.map(post => (
        <InvestorPostCard
          key={post.id}
          post={post}
          saved={savedList.includes(post.id)}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
