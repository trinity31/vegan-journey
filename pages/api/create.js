import { Client } from "@notionhq/client";

function createSlug(text) {
  console.log("Create slug for: ", text);
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default async function handler(req, res) {
  // const data = {
  //   recipe: text,
  //   ingredients: ingredients,
  //   title: selectedCuisine,
  //   country: selectedCountry.label,
  //   locale: "en",
  //   category: "recipe",
  // };
  const { recipe, ingredients, title, country, locale, category, summary } =
    req.body;
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseIdTo =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KO
      : process.env.NOTION_DATABASE_ID_EN;

  const ingredientsTo = ingredients.split(",").map((ingredient) => {
    return {
      name: ingredient,
    };
  });

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
                content: title,
              },
            },
          ],
        },
        Summary: {
          rich_text: [
            {
              text: {
                content: summary.trim(),
              },
            },
          ],
        },
        Locale: {
          select: {
            name: locale,
          },
        },
        Country: {
          select: {
            name: country,
          },
        },
        Category: {
          select: {
            name: category,
          },
        },
        Ingredients: {
          multi_select: ingredientsTo,
        },
        Slug: {
          rich_text: [
            {
              text: {
                content: createSlug(title),
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: recipe.trim(),
                },
              },
            ],
          },
        },
      ],
    });
    //console.log(response);
  })();

  res.status(200).json({ result: "Success" });
}
