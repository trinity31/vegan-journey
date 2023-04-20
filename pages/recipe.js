import RecipePosts from "@/components/posts/recipe-posts";
import { getCountryValues, getRecipeNotionPages } from "@/utils/notion-util";
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
      <RecipePosts posts={props.posts} countries={props.countries} />;
    </>
  );
}

export async function getStaticProps({ locale }) {
  const notionPages = await getRecipeNotionPages(locale);
  const countries = await getCountryValues(locale);
  // [{
  //   id: '69e0bfd2-1f4c-42e1-ba90-127639907a7f',
  //   name: '프랑스',
  //   color: 'purple'
  // }]
  return {
    props: {
      posts: notionPages,
      countries: countries,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
