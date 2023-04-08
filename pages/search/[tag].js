import Container from "@/components/container";
import PostsGrid from "@/components/posts/post-grid";
import { getNotionPagesByTag } from "@/utils/notion-util";
import { useRouter } from "next/router";

export default function SearchByTagResultPage({ posts }) {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <Container>
      <h3 class="text-xl font-medium mb-4 text-gray-700">{tag}</h3>
      <PostsGrid posts={posts}></PostsGrid>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { tag } = context.query;

  // Call the searchPagesByTag function to get the filtered pages
  const pages = await getNotionPagesByTag(tag, context.locale);

  //console.log(pages);

  // Pass the filtered pages as a prop to the SearchPage component
  return {
    props: {
      posts: pages,
    },
  };
}
