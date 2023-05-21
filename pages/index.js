import Banner from "@/components/banner";
import Container from "@/components/container";
import Footer from "@/components/footer";
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
      {/* <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg bg-white dark:bg-black">
        <div className="flex sm:justify-end ">
          <Banner
            src="/images/aroma_journey_banner.jpg"
            alt="Aroma Journey"
            href="https://aroma.joyfuljourney.today"
          />
        </div>
      </div> */}
      <FeaturedPosts posts={props.posts} />
      <Footer />
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
