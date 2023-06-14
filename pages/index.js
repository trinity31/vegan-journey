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
