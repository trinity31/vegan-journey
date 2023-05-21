import Container from "@/components/container";
import TagLabel from "@/components/posts/category";
import { CATEGORY_VEGAN_JOURNEY } from "@/utils/constants";
import { renderers } from "@/utils/markdown-renderers";
import { getAllNotionPages, getNotionPage } from "@/utils/notion-util";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { parseISO, format } from "date-fns";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Footer from "@/components/footer";

export default function PostDetailPage({ post }) {
  const { t } = useTranslation("common");

  if (!post) {
    return (
      <div>
        <CircularProgress color="success" />
      </div>
    ); // or any other fallback component or message
  }

  return (
    <article>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article"></meta>
      </Head>
      <Container className="!pt-0">
        <div className="max-w-screen-md mx-auto ">
          <div className="uppercase text-blue-600/75 text-xs font-bold tracking-widest leading-loose">
            {post.category}
          </div>
          <div className="uppercase text-gray-600/75 text-xs font-bold tracking-widest leading-loose">
            {post.country}
          </div>

          <h1 className="mt-2 mb-3 text-4xl font-semibold tracking-tight text-left lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
            {post.title}
          </h1>

          <div className="flex justify-left">
            <TagLabel tags={post.tags} />
          </div>

          {post.ingredients.length > 0 && (
            <div className="flex justify-left">
              {/* {t("main_ingredients")} */}
              <TagLabel tags={post.ingredients} />
            </div>
          )}

          {/* <div className="flex justify-left mt-3 space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <time
                className="text-gray-500 dark:text-gray-400"
                dateTime={post.date}
              >
                {format(parseISO(post.date), "MMMM dd, yyyy")}
              </time>
            </div>
          </div> */}

          <Image
            src={post.image}
            alt={post.title}
            width="800"
            height="600"
            className="rounded-lg object-cover object-center mt-3 mb-5"
            style={{ masWidth: 500 }}
          />

          <ReactMarkdown className="markdown" components={renderers}>
            {post.content}
          </ReactMarkdown>
        </div>
      </Container>
      <Footer />
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
      ...(await serverSideTranslations(context.locale, ["common"])),
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
