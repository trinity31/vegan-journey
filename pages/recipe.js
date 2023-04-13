import RecipePosts from "@/components/posts/recipe-posts";
import { getRecipeNotionPages } from "@/utils/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";

export default function RecipePage(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("recipe_posts_title")}</title>
        <meta name="description" content={t("recipe_posts_desc")} />
        <meta property="og:title" content={t("recipe_posts_title")} />
        <meta property="og:description" content={t("recipe_posts_desc")} />
        <meta property="og:image" content={props.posts[0].image} />
        <meta property="og:type" content="blog"></meta>
      </Head>
      <RecipePosts posts={props.posts} />;
    </>
  );
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
