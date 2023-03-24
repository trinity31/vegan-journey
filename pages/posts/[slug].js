import Container from "@/components/container";
import TagLabel from "@/components/posts/category";
import { CATEGORY_VEGAN_JOURNEY } from "@/utils/constants";
import { renderers } from "@/utils/markdown-renderers";
import { getAllNotionPages, getNotionPage } from "@/utils/notion-util";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { parseISO, format } from "date-fns";
import Image from "next/image";

export default function PostDetailPage({ post }) {
  if (!post) {
    return <div>Loading...</div>; // or any other fallback component or message
  }

  return (
    <article>
      <Container className="!pt-0">
        <div className="max-w-screen-md mx-auto ">
          <div class="uppercase text-blue-600/75 text-xs font-bold tracking-widest leading-loose">
            {post.category}
          </div>

          <h1 className="mt-2 mb-3 text-4xl font-semibold tracking-tight text-left lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
            {post.title}
          </h1>

          <div className="flex justify-left">
            <TagLabel tags={post.tags} />
          </div>

          <div className="flex justify-left mt-3 space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <time
                className="text-gray-500 dark:text-gray-400"
                dateTime={post.date}
              >
                {format(parseISO(post.date), "MMMM dd, yyyy")}
              </time>
              {/* <span>· {post.estReadingTime || "5"} min read</span> */}
            </div>
          </div>

          <Image
            src={post.image}
            alt={post.title}
            width="768"
            height="512"
            className="rounded-lg object-cover object-center  aspect-[16/9] mt-3"
          />

          <ReactMarkdown className="markdown" components={renderers}>
            {post.content}
          </ReactMarkdown>
        </div>
      </Container>
    </article>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = await getNotionPage(
    slug,
    context.locale,
    CATEGORY_VEGAN_JOURNEY
  );

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths({ locales }) {
  let allPages = [];

  for (const locale of locales) {
    const pages = await getAllNotionPages(locale);
    allPages = allPages.concat(pages);
  }

  return {
    paths: allPages.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
    fallback: true,
  };
}
