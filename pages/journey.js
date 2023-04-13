import JourneyPosts from "@/components/posts/journey-posts";
import { getJourneyNotionPages } from "@/utils/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";

export default function JourneyPage(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("journey_posts_title")}</title>
        <meta name="description" content={t("journey_posts_desc")} />
        <meta property="og:title" content={t("journey_posts_title")} />
        <meta property="og:description" content={t("journey_posts_desc")} />
        <meta property="og:image" content={props.posts[0].image} />
        <meta property="og:type" content="blog"></meta>
      </Head>
      <JourneyPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const notionPages = await getJourneyNotionPages(locale);
  return {
    props: {
      posts: notionPages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
