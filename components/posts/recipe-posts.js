import Container from "../container";
import { useTranslation } from "next-i18next";
import PostItem from "./recipe-item";
import PostsGrid from "./post-grid";

export default function RecipePosts(props) {
  const { posts } = props;
  const { t } = useTranslation("common");

  return (
    <Container>
      <h1 class="text-3xl font-bold mb-6 text-green-900">
        {t("recipe_posts_title")}
      </h1>
      <h3 class="text-xl font-medium mb-4 text-gray-700">
        {t("recipe_posts_desc")}
      </h3>
      <PostsGrid posts={props.posts}></PostsGrid>
    </Container>
  );
}
