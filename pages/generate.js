import Select from "react-select";
import { useState } from "react";
import Container from "@/components/container";
import { TextField } from "@mui/material";
import Image from "next/image";

// 왼쪽 드롭다운 옵션
const options = [
  { value: "korea", label: "Korea" },
  { value: "japan", label: "Japan" },
  { value: "china", label: "China" },
  { value: "thailand", label: "Thailand" },
  { value: "indonesia", label: "Indonesia" },
  { value: "india", label: "India" },
  { value: "america", label: "America" },
  { value: "uk", label: "United Kingdom" },
  { value: "mexico", label: "Mexico" },
  { value: "middle east", label: "Middle East" },
  { value: "north africa", label: "North Africa" },
  { value: "italy", label: "Italy" },
  { value: "france", label: "France" },
];

export default function GenerateePage(props) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [text, setText] = useState("");
  const [ingredients, setIngredients] = useState(null);
  const [intro, setIntro] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");

  const handleSubmitCountry = async (e) => {
    e.preventDefault();

    const data = { country: selectedCountry.value, type: "cuisine" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/generate", options);
    const resultData = await response.json();
    // console.log(resultData.data);

    const result = resultData.data
      .split("\n")
      .slice(1)
      .map((line) => {
        return { name: line.replace(/^\d+\.\s+/, ""), checked: false };
      });

    setCuisines(result);
  };

  const handleSubmitCuisine = async (e) => {
    e.preventDefault();

    const data = { cuisine: selectedCuisine.name, type: "recipe" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/generate", options);
    const resultData = await response.json();
    console.log(resultData.data);

    setText(resultData.data);
  };

  const handleCheckboxChange = (index) => {
    setSelectedCuisine(cuisines[index]);

    const newCuisines = [...cuisines];
    newCuisines[index].checked = !newCuisines[index].checked;
    setCuisines(newCuisines);

    // console.log(cuisines);
  };

  const getIngredients = async (e) => {
    e.preventDefault();
    const data = { recipe: text, type: "ingredients" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/generate", options);
    const resultData = await response.json();
    setIngredients(resultData.data);
  };

  const getIntro = async (e) => {
    e.preventDefault();
    const data = { recipe: text, type: "intro" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/generate", options);
    const resultData = await response.json();
    setIntro(resultData.data);
  };

  const getSummary = async (e) => {
    e.preventDefault();
    const data = { intro: intro, type: "summary" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/generate", options);
    const resultData = await response.json();
    setSummary(resultData.data);
  };

  const getImage = async (e) => {
    e.preventDefault();
    const data = { cuisine: selectedCuisine.name, type: "image" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("/api/generate", options);
      const resultData = await response.json();
      console.log(resultData);
      setImage(resultData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRecipe = async (e) => {
    e.preventDefault();
    const data = {
      recipe: text,
      ingredients: ingredients,
      title: selectedCuisine.name,
      country: selectedCountry.label,
      locale: "en",
      category: "recipe",
      summary: summary,
      intro: intro,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/create", options);
    console.log(response);
  };

  return (
    <Container>
      <form>
        <div className="flex flex-col items-center justify-center p-8">
          <Select
            value={selectedCountry}
            onChange={setSelectedCountry}
            options={options}
            className="w-full mb-4"
            placeholder="Select a country"
          />
          {/* <TextField
            className=" w-full resize-none my-4 border border-gray-400 rounded"
            value={selectedCountry.value}
            onChange={(e) =>
              setSelectedCountry({
                value: e.target.value,
                label: e.target.value,
              })
            }
          /> */}
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={handleSubmitCountry}
          >
            Get Cuisines
          </button>
        </div>
        <div className="flex flex-col items-start justify-start px-8">
          {cuisines.map((cuisine, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={cuisine.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <label className="ml-2">{cuisine.name}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center px-8">
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={handleSubmitCuisine}
          >
            Get Recipe
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-8">
          <textarea
            className="h-80 w-full resize-none p-4 mb-4 border border-gray-400 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={getIngredients}
          >
            Get Ingredients
          </button>
          <TextField
            className=" w-full resize-none my-4 border border-gray-400 rounded"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={getIntro}
          >
            Get Intro
          </button>
          <textarea
            className="h-40 w-full my-4 resize-none p-4 mb-4 border border-gray-400 rounded"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={getSummary}
          >
            Get Summary
          </button>
          <textarea
            className="h-40 w-full my-4 resize-none p-4 mb-4 border border-gray-400 rounded"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={getImage}
          >
            Get Image
          </button>
          <Image
            src={image}
            alt={selectedCuisine?.name}
            width="512"
            height="512"
            className="rounded-lg object-cover object-center  aspect-[1/1]"
          />
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={createRecipe}
          >
            Create Recipe
          </button>
        </div>
      </form>
    </Container>
  );
}
