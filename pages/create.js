import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { getCountryValues } from "@/utils/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { renderers } from "@/utils/markdown-renderers";
import { useRouter } from "next/router";
import Image from "next/image";
import { CircularProgress, LinearProgress } from "@mui/material";
import Footer from "@/components/footer";
import Head from "next/head";

export default function RecipeBuilder(props) {
  const [ingredients, setIngredients] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealtype, setMealtype] = useState("");
  const [generating, setGenerating] = useState(false);
  const quantities = [1, 2, 3, 4, 5];
  const methods = ["Any", "Baked", "Fried", "Boiled", "Raw"];
  // const cuisines = ["Korean", "Thai", "Mexican"];
  const { cuisines } = props;
  const types = ["Breakfast", "Lunch", "Dinner"];
  const [markdownData, setMarkdownData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { t } = useTranslation("common");
  const router = useRouter();

  const fetchFromServer = async (url, data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    return response;
  };

  const generateRecipe = async (e) => {
    e.preventDefault();

    if (generating) return;

    setMarkdownData("");
    setImageUrl("");
    setGenerating(true);

    try {
      const response = await fetchFromServer(
        "https://zrtnvin112.execute-api.ap-northeast-2.amazonaws.com/dev/recipe",
        {
          ingredients,
          quantity,
          cuisine,
          mealtype,
          locale: router.locale,
        }
      );

      if (response.status === 200) {
        const response_data = await response.json();
        // console.log("response:");
        // console.log(response_data);

        setMarkdownData(response_data.data.recipe);
        await fetchImage(response_data.data.title);
      } else {
        console.log("Failed. status: " + response.status);
      }

      setGenerating(false);
    } catch (error) {
      console.log(error);
      setGenerating(false);
    }
  };

  const fetchImage = async (title) => {
    const response = await fetchFromServer(
      "https://zrtnvin112.execute-api.ap-northeast-2.amazonaws.com/dev/image",
      { title }
    );

    if (response.status === 200) {
      const response_image = await response.json();
      // console.log("image :");
      // console.log(response_image);
      setImageUrl(response_image.data.image);
    }
  };

  return (
    <>
      <Head>
        <title>{t("ai_recipe_creator")}</title>
        <meta name="description" content={t("create_your_own_recipe")} />
        <meta property="og:title" content={t("ai_recipe_creator")} />
        <meta property="og:description" content={t("create_your_own_recipe")} />
        <meta
          property="og:image"
          content={
            "https://i.ibb.co/LZdzwDX/Trinity-illustration-of-various-kind-of-plant-based-ingredients-ce935051-ec57-481a-bdc0-d965beb4d63f.jpg"
          }
        />
        <meta property="og:type" content="blog"></meta>
      </Head>
      <div className="flex flex-col items-center min-h-screen">
        <div className="p-6 bg-white dark:bg-black border-gray-200">
          <h1 className="text-3xl font-bold text-green-700">
            {t("ai_recipe_creator")}
          </h1>
          <p className="mt-5 text-xl text-gray-600">
            {t("create_your_own_recipe")}
          </p>
          <form className="flex flex-col mt-4">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={t("enter_ingredients")}
              className="p-2 border border-gray-300 my-2"
            />

            <div className="flex justify-between my-2">
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 border border-gray-300 w-1/2 mr-2"
              >
                <option value="">{t("select_quantity")}</option>
                {quantities.map((quantity, index) => (
                  <option key={index} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>

              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="p-2 border border-gray-300 w-1/2 ml-2"
              >
                <option value="">{t("select_cuisine")}</option>
                {cuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>

              <select
                value={mealtype}
                onChange={(e) => setMealtype(e.target.value)}
                className="p-2 border border-gray-300 w-1/2 ml-2"
              >
                <option value="">{t("select_type")}</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {!generating && (
              <button
                type="button"
                onClick={generateRecipe}
                className={`p-2 ${
                  generating ? "bg-gray-500" : "bg-green-700"
                } text-white mt-2`}
              >
                {t("generate_recipe")}
                {/* {generating ? t("generating_recipe") : t("generate_recipe")} */}
              </button>
            )}

            {generating && (
              <div>
                {/* <CircularProgress color="success" />
              <LinearProgress color="secondary" /> */}
                <LinearProgress color="success" />
                {/* <LinearProgress color="inherit" /> */}
              </div>
            )}
          </form>
        </div>

        {!markdownData && (
          <div className="flex justify-center">
            <Image
              src={
                "https://i.ibb.co/LZdzwDX/Trinity-illustration-of-various-kind-of-plant-based-ingredients-ce935051-ec57-481a-bdc0-d965beb4d63f.jpg"
              }
              alt={"Image"}
              width="1024"
              height="1024"
              className="m-4 p-4 rounded-lg object-cover object-center  aspect-[1/1]"
            />
          </div>
        )}

        {markdownData && (
          <div className="m-4 p-4 border-2 border-green-500 shadow-lg bg-white dark:bg-black rounded-lg overflow-hidden">
            {/* <ReactMarkdown children={markdownData} renderers={renderers} /> */}
            <ReactMarkdown className="markdown" components={renderers}>
              {markdownData}
            </ReactMarkdown>
          </div>
        )}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={"Image"}
            width="512"
            height="512"
            className="m-4 p-4 rounded-lg object-cover object-center  aspect-[1/1]"
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  // const notionPages = await getRecipeNotionPages(locale);
  const countries = await getCountryValues(locale);

  return {
    props: {
      cuisines: countries.map((country) => country.name),
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
