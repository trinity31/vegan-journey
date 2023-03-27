import Container from "../container";
import { useTranslation } from "next-i18next";
import PostItem from "./post-item";

export default function JourneyPosts(props) {
  const { posts } = props;
  const { t } = useTranslation("common");

  return (
    <Container>
      <h1 class="text-3xl font-bold mb-6 text-green-900">
        {t("journey_posts_title")}
      </h1>
      <h3 class="text-xl font-medium mb-4 text-gray-700">
        {t("journey_posts_desc")}
      </h3>
      {posts.map((post, index) => (
        <PostItem key={post.slug} post={post} index={index} />
      ))}
    </Container>
  );
}
