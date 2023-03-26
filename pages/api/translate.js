import { Client } from "@notionhq/client";
// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Creates a client
//const translate = new Translate();

const translate = new Translate({
  projectId: process.env.GOOGLE_CLIENT_ID,
  keyFilename: process.env.GOOGLE_KEY_FILE,
});

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function getPostData(page, content, locale) {
  let body = "";

  //console.log(content.results);

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

  //console.log(body);

  //console.log(page.properties.Tags.multi_select);

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
    category: page.properties.Category.select.name,
  };

  return postData;
}

async function getNotionPagesNotTranslated(notion, from) {
  const databaseId =
    from === "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;
  const pages = [];

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Translate",
          checkbox: {
            equals: true,
          },
        },
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
    const page = await getPostData(result, null, from);
    pages.push(page);
  }

  return pages;
}

export default async function handler(req, res) {
  //   page:
  // {
  //   id: '943fc03b-f12b-45c8-a469-66f946224d31',
  //   slug: 'what-is-essential-oil',
  //   title: 'What is essential oil?',
  //   date: '2023-03-01',
  //   image: 'https://source.unsplash.com/1600x900/?essential,oil',
  //   excerpt: 'essential oils are highly concentrated oils derived from plants, with various uses and benefits. They can be used safely and effectively when used correctly and in moderation. With this comprehensive guide, you are now well-equipped to use essential oils in your daily life.',
  //   isFeatured: true,
  //   content: "Essential oils have been a topic of discussion for quite some time now. Whether it is the therapeutic benefits or the pleasant aroma, essential oils are widely used in today's world. However, not everyone is familiar with these oils, their properties, or their uses. In this article, we'll go over everything you need to know about essential oils, including their definition, extraction methods, uses, benefits, and safety concerns.\n" +
  //   ...
  // }
  //   req.body: { from : 'ko, to: 'en'}

  //Retrive pages which needs to be translated
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = await getNotionPagesNotTranslated(notion, req.body.from);
  const databaseIdTo =
    req.body.to == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;
  //For each page, translate and create a new page in notion database.
  for (const page of pages) {
    const content = await notion.blocks.children.list({
      block_id: page.id,
    });

    // console.log(content);

    // console.log("page: ");
    // console.log(page);
    const titleTo = await translate.translate(page.title, req.body.to);
    // console.log(titleTo[0]);
    const excerptTo = await translate.translate(page.excerpt, req.body.to);
    // console.log(excerptTo[0]);

    // console.log("content.results:");
    // console.log(content.results);

    const contentTo = await Promise.all(
      content.results.map(async ({ object, type, id, ...rest }) => {
        const lastField = rest[type] ? rest[type] : null;

        const plainTextTo = await translate.translate(
          lastField.rich_text != undefined && lastField.rich_text[0]
            ? lastField.rich_text[0].plain_text
            : "",
          req.body.to
        );

        if (type === "bookmark") {
          // console.log(type);
          // console.log(lastField.caption[0].text);
          const captionTo = await translate.translate(
            lastField.caption[0].text.content,
            req.body.to
          );
          return {
            object,
            type,
            [type]: {
              caption: [
                {
                  text: {
                    content: captionTo[0],
                  },
                  plain_text: captionTo[0],
                },
              ],
              url: lastField.url,
            },
          };
        } else if (type === "image") {
          //console.log(lastField);
          return {
            object,
            type,
            [type]: {
              type: "external",
              external: {
                url: lastField.external
                  ? lastField.external.url
                  : lastField.file.url,
              },
            },
          };
        } else {
          return {
            object,
            type,
            [type]: {
              rich_text: [
                {
                  text: {
                    content: plainTextTo[0],
                  },
                },
              ],
            },
          };
        }
      })
    );

    // console.log(contentTo);

    const tagsTo = await Promise.all(
      page.tags.map(async (tag) => {
        const nameTo = await translate.translate(tag.name, req.body.to);
        return {
          name: nameTo[0],
          color: tag.color,
        };
      })
    );

    (async () => {
      const response = await notion.pages.create({
        parent: {
          type: "database_id",
          database_id: databaseIdTo,
        },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: titleTo[0],
                },
              },
            ],
          },
          Summary: {
            rich_text: [
              {
                text: {
                  content: excerptTo[0],
                },
              },
            ],
          },
          Image: {
            files: [
              {
                name: `${page.slug}.jpg`,
                file: {
                  url: page.image,
                },
              },
            ],
          },
          Locale: {
            select: {
              name: req.body.to,
            },
          },
          Tags: {
            multi_select: tagsTo,
          },
          Category: {
            select: {
              name: page.category,
            },
          },
          Published: {
            date: {
              start: page.date,
              end: null,
              time_zone: null,
            },
          },
          Featured: {
            checkbox: page.isFeatured,
          },
          Slug: {
            rich_text: [
              {
                text: {
                  content: page.slug,
                },
              },
            ],
          },
        },
        children: contentTo,
      });
      //console.log(response);
    })();
  }

  res.status(200).json({ result: "Success" });
}
