import { Client } from "@notionhq/client";

export async function getPostData(page, content, locale) {
  let body = "";
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  //content?.results.forEach((result) => {
  if (content) {
    for (const result of content.results) {
      // console.log(result);
      if (result.type == "heading_1") {
        body += "# ";
      } else if (result.type == "heading_2") {
        // console.log("heading_2");
        // console.log(result.heading_2.rich_text[0].plain_text);
        body += "## " + result.heading_2.rich_text[0]?.plain_text;
      } else if (result.type == "heading_3") {
        // console.log("heading_2");
        // console.log(result.heading_2.rich_text[0].plain_text);
        body += "### ";
      } else if (result.type == "bulleted_list_item") {
        body += "- " + result.bulleted_list_item.rich_text[0]?.plain_text;
      } else if (result.type == "numbered_list_item") {
        body += "- " + result.numbered_list_item.rich_text[0]?.plain_text;
      } else if (result.type == "paragraph") {
        // console.log("paragraph");
        body += result.paragraph.rich_text[0]
          ? result.paragraph.rich_text[0]?.plain_text
          : "\n";
        //  console.log(result.paragraph.rich_text[0]?.plain_text);
      } else if (result.type == "bookmark") {
        // console.log("bookmark");
        const caption =
          result.bookmark.caption.length > 0
            ? result.bookmark.caption[0].plain_text
            : "";
        // console.log(result.bookmark);
        body += `[${caption}](${result.bookmark.url})`;
        //   console.log(`[${caption}](${result.bookmark.url})`);
      } else if (result.type == "image") {
        console.log("image:");
        console.log(result.image);
        const caption =
          result.image.caption.length > 0
            ? result.image.caption[0].plain_text
            : "";
        body += `![alt ${caption}](${result.image.external.url})`;
      } else if (result.type == "toggle") {
        //console.log("toggle");
        //console.log(result);
        const response = await notion.blocks.children.list({
          block_id: result.id,
        });
        const children = response.results;
        let markdown = "";
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const text =
            child.type === "paragraph"
              ? child.paragraph.rich_text[0].plain_text
              : "";
          markdown += `- ${text}\n`;
        }
        body += markdown;
        //console.log(markdown);
      } else {
        console.log("Unprocessed type: ", result.type);
      }

      body += "\n";
      if (result.type == "paragraph") {
        body += "\n";
      }
    }
  }

  //console.log(body);

  //console.log(page.properties.Category.select);

  const postData = {
    id: page.id,
    slug: page.properties.Slug.rich_text[0].plain_text,
    title: page.properties.Title.title[0].plain_text,
    date: page.properties.Published.date.start,
    image: page.properties.Image.files[0].file.url,
    excerpt: page.properties.Summary.rich_text[0].plain_text,
    isFeatured: page.properties.Featured.checkbox,
    tags: page.properties.Tags.multi_select,
    content: body,
    locale: locale,
    category: page.properties.Category.select
      ? page.properties.Category.select.name
      : "",
    ingredients: page.properties.Ingredients.multi_select,
    country: page.properties.Country.select
      ? page.properties.Country.select.name
      : "",
    Course: page.properties.Course.select
      ? page.properties.Course.select.name
      : "",
  };

  return postData;
}

export async function getFeaturedNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;

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

  //console.log("response:");
  //console.log(response.results[0].properties.Featured.checkbox);

  for (const result of response.results) {
    pages.push(await getPostData(result, null, locale));
  }

  // console.log("pages:");
  // console.log(pages);

  return pages;
}

export async function getJourneyNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;

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
          property: "Category",
          select: {
            equals: "journey",
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

  for (const result of response.results) {
    pages.push(await getPostData(result, null, locale));
  }

  return pages;
}

export async function getRecipeNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;

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
          property: "Category",
          select: {
            equals: "recipe",
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

  for (const result of response.results) {
    pages.push(await getPostData(result, null, locale));
  }

  return pages;
}

export async function getNotionPage(slug, locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  });

  const content = await notion.blocks.children.list({
    block_id: response.results[0].id,
  });
  const postData = await getPostData(response.results[0], content, locale);

  return postData;
}

export async function getAllNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;

  const pages = [];

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: "Done",
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

  for (const result of response.results) {
    pages.push(await getPostData(result, null, locale));
  }

  // console.log(pages);

  return pages;
}
