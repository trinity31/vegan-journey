import JourneyPosts from "@/components/posts/journey-posts";
import { getJourneyNotionPages } from "@/utils/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function JourneyPage(props) {
  return <JourneyPosts posts={props.posts} />;
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
