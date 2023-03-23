import { Client } from "@notionhq/client";

export async function getPostData(page, content, locale) {
  let body = "";

  content?.results.forEach((result) => {
    if (result.type == "heading_1") {
      body += "# ";
    } else if (result.type == "heading_2") {
      body += "## ";
    } else if (result.type == "heading_3") {
      body += "### ";
    } else if (result.type == "bulleted_list_item") {
      body += "- ";
    } else if (result.type == "numbered_list_item") {
      body += "- ";
    }
    if (result[result.type].rich_text?.length > 0) {
      body += result[result.type].rich_text[0]?.plain_text;
    }

    body += "\n";
    if (result.type == "paragraph") {
      body += "\n";
    }
  });

  // console.log(body);

  const postData = {
    id: page.id,
    slug: page.properties.Slug.rich_text[0].plain_text,
    title: page.properties.Title.title[0].plain_text,
    date: page.properties.Published.date.start,
    image: page.properties.Image.files[0].file.url,
    excerpt: page.properties.Summary.rich_text[0].plain_text,
    isFeatured: page.properties.Featured.checkbox,
    content: body,
    locale: locale,
  };

  return postData;
}

export async function getFeaturedNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Done",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Featured",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  });

  //   console.log("response:");
  //   console.log(response.results[0].properties.Featured.checkbox);

  for (const result of response.results) {
    pages.push(await getPostData(result, null, locale));
  }

  console.log("pages:");
  console.log(pages);

  return pages;
}
