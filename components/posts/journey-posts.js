import Container from "../container";
import { useTranslation } from "next-i18next";
import JourneyItem from "./journey-item";

export default function JourneyPosts(props) {
  const { posts } = props;
  const { t } = useTranslation("common");

  return (
    <Container>
      <div className="px-3">
        <h1 className="text-3xl font-bold mb-6 text-green-700">
          {t("journey_posts_title")}
        </h1>
        <h3 className="text-xl font-medium mb-4 text-gray-500">
          {t("journey_posts_desc")}
        </h3>
      </div>

      <div className="grid grid-cols-1 py-5 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts &&
          posts.map((post, index) => (
            <JourneyItem key={post.slug} post={post} index={index} />
          ))}
      </div>
    </Container>
  );
}
