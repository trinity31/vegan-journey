const { Configuration, OpenAIApi } = require("openai");
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  projectId: process.env.GOOGLE_CLIENT_ID,
  keyFilename: process.env.GOOGLE_KEY_FILE,
});

export default async function handler(req, res) {
  // Set the timeout to 100 seconds
  req.socket.server.timeout = 100000;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // console.log("Ingredients:", req.body.ingredients);
  // console.log("Quantity: ", req.body.quantity);
  // console.log("Method: ", req.body.method);

  let result_recipe = "";
  let result_recipe_translated = "";

  let prompt = "";

  let recipe_title = "";

  const intro =
    "I want you to act as my personal vegan chef who can suggest delicious recipes which are nutritionally beneficial but also easy to cook at home.";
  // const intro =
  //   "I want you to act as my personal chef. who knows creative, nutritious, easy-to-make home made recipes.";

  let serving = req.body.quantity === "" ? "2" : req.body.quantity;
  let cuisine = req.body.cuisine === "" ? "" : "cuisine: " + req.body.cuisine;
  let mealtype =
    req.body.mealtype === "" ? "" : "meal type: " + req.body.mealtype;
  prompt = `
  ${intro}
  Answer in markdown format. You should only reply
     with the recipes you recommend, and nothing else. Do not write explanations.
     title of recipe does not have to include cuisine type, meal type and all the ingredients.
     The recipe must be vegan and must include ingredients: ${req.body.ingredients}
     The recipe must indicate the amount of each ingredient for serving ${serving}. 
     Describe me the detailed process to make the recipe.
     Title should be h1 format. 
     ${cuisine}.  ${mealtype}
     Answer in English.
     `;
  console.log(prompt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 2000,
  });

  if (response.status == "200") {
    console.log("Successfully fetched response.");
    // console.log(response.data.choices);
    result_recipe = response.data.choices[0].text;

    const match = result_recipe.match(/^#\s(.*)$/m);
    recipe_title = match ? match[1] : null;

    // res
    //   .status(200)
    //   .json({ result: "Success", data: response.data.choices[0].text });
  } else {
    console.log("Failed to fetch response.");
    console.log(response.data.error);
    res.status(response.status).json({ result: "Fail" });
  }

  console.log(result_recipe);

  let titleEn = recipe_title;
  result_recipe_translated = result_recipe;

  if (req.body.locale !== "en") {
    titleEn = await translate.translate(recipe_title, "en");
    result_recipe_translated = await translate.translate(
      result_recipe,
      req.body.locale
    );
  }

  console.log(titleEn[0]); // Outputs: "Your Markdown String"

  try {
    const response = await openai.createImage({
      prompt: titleEn[0],
      n: 1,
      size: "512x512",
    });
    //console.log(response);
    const image_url = response.data.data[0].url;
    if (response.status == "200") {
      console.log("Successfully generated image: ");
      console.log(image_url);
      res.status(200).json({
        result: "Success",
        data: {
          recipe: result_recipe_translated[0],
          image: image_url,
        },
      });
    } else {
      console.log("Failed to generate image.");
      console.log(response.data.error);
      res.status(200).json({
        result: "Success",
        data: {
          recipe: result_recipe_translated[0],
          image: "",
        },
      });
    }
  } catch (error) {
    console.log("Error catched during image generation.");
    res.status(200).json({
      result: "Success",
      data: {
        recipe: result_recipe_translated[0],
        image: "",
      },
    });
  }
}
