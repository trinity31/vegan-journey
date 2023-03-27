import Container from "../container";
import FeatureItem from "./featured-item";

export default function FeaturedPosts(props) {
  const { posts } = props;

  return (
    <Container>
      {posts.map((post, index) => (
        <FeatureItem key={post.slug} post={post} index={index} />
      ))}
    </Container>
  );
}
