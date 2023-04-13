const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let prompt = "";

  if (req.body.type == "cuisine") {
    prompt = `
    Please recommend 10 most popular vegan ${req.body.country} cuisines which is easy to cook at home. Only answer with title, not including explanation. Answer only in English
    `;
  } else if (req.body.type == "recipe") {
    prompt = `
     I need you to think like a chef who knows simple, easy-to-make home made recipes.  The recipe should be simplest as possible, which anyone can follow. The recipe must indicate the amount of each ingredient for 2. Describe me the detailed process to make the recipe of vegan ${req.body.cuisine} serving 2, including ingredients and instructions , using markdown format 
    `;
  } else if (req.body.type == "ingredients") {
    prompt = `
    ${req.body.recipe}\n
    Please extract less than 10 key ingredients excluding salt and sugar, from the above recipe and connect with , no whitespace between each ingredients. 
Answer only with lowercase ingredients connected with ,
    `;
  } else if (req.body.type == "intro") {
    prompt = `
    ${req.body.recipe}\n
    Please write an introduction of the above recipe for blog post, including taste, atmosphere, history
    `;
  } else if (req.body.type == "image") {
    prompt = req.body.cuisine;
  } else if (req.body.type == "summary") {
    prompt = `
    ${req.body.intro}\n
    Please summarize of the above blog post intro. length: 100 words or less.
    `;
  }

  console.log(prompt);

  if (req.body.type == "image") {
    try {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "800x450",
      });
      if (response.status == "200") {
        console.log("Successfully generated image: ");
        console.log(image_url);
        res.status(200).json({ result: "Success", data: image_url });
      } else {
        console.log("Failed to generate image.");
        console.log(response.data.error);
        res
          .status(response.status)
          .json({ result: "Fail", data: response.data.error });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 2000,
    });

    if (response.status == "200") {
      console.log("Successfully fetched response.");
      console.log(response.data.choices);
      res
        .status(200)
        .json({ result: "Success", data: response.data.choices[0].text });
    } else {
      res.status(response.status).json({ result: "Fail" });
    }
  }
}
