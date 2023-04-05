import FeaturedPosts from "@/components/posts/featured-posts";
import { getFeaturedNotionPages } from "@/utils/notion-util";
import Head from "next/head";
import Script from "next/script";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Vegan Journey</title>
        <meta
          name="description"
          content="Vegan travel courses and recipes from countries around the world."
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADS_CLIENT_ID}`}
        ></script>
      </Head>
      {/* <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADS_CLIENT_ID}`}
        crossorigin="anonymous"
      ></Script> */}
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const notionPages = await getFeaturedNotionPages(locale);
  return {
    props: {
      posts: notionPages,
    },
    revalidate: 600,
  };
}
