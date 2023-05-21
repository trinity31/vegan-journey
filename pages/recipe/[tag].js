import Container from "@/components/container";
import Footer from "@/components/footer";
import PostsGrid from "@/components/posts/post-grid";
import { getNotionPagesByTag } from "@/utils/notion-util";
import { useRouter } from "next/router";

export default function RecipeByTagResultPage({ posts }) {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <Container>
      <h3 className="text-xl font-medium mb-4 text-gray-700">
        <a href="/recipe"> Recipe&nbsp;</a>
        {` > ${tag}`}
      </h3>
      <PostsGrid posts={posts}></PostsGrid>
      <Footer />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { tag } = context.query;

  // Call the searchPagesByTag function to get the filtered pages
  const pages = await getNotionPagesByTag(tag, context.locale, "recipe");

  //console.log(pages);

  // Pass the filtered pages as a prop to the SearchPage component
  return {
    props: {
      posts: pages,
    },
  };
}
