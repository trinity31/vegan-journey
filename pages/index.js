import Banner from "@/components/banner";
import Container from "@/components/container";
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
      <Container>
        <div class="flex sm:justify-end ">
          <Banner
            src="/images/aroma_journey_banner.jpg"
            alt="Aroma Journey"
            href="https://aroma.joyfuljourney.today"
          />
        </div>
      </Container>
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
