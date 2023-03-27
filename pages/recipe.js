import RecipePosts from "@/components/posts/recipe-posts";
import { getRecipeNotionPages } from "@/utils/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function RecipePage(props) {
  return <RecipePosts posts={props.posts} />;
}

export async function getStaticProps({ locale }) {
  const notionPages = await getRecipeNotionPages(locale);
  return {
    props: {
      posts: notionPages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
