import PostItem from "./recipe-item";

export default function PostsGrid(props) {
  const { posts } = props;

  return (
    <div class="grid grid-cols-1 py-5 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {posts &&
        posts.map((post, index) => (
          <PostItem key={post.slug} post={post} index={index} />
        ))}
    </div>
  );
}
