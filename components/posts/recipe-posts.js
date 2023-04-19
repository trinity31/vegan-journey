import Container from "../container";
import { useTranslation } from "next-i18next";
import RecipeItem from "./recipe-item";
import CountrySelector from "../country-selector";
import { useState } from "react";

export default function RecipePosts(props) {
  const { posts } = props;
  const { t } = useTranslation("common");
  const [selectedCountries, setSelectedCountries] = useState([]);

  console.log(selectedCountries);

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-green-900">
        {t("recipe_posts_title")}
      </h1>
      <h3 className="text-xl font-medium mb-4 text-gray-700">
        {t("recipe_posts_desc")}
      </h3>
      <CountrySelector
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
      <div className="grid grid-cols-1 py-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedCountries.length === 0
          ? posts.map((post, index) => (
              <RecipeItem key={post.slug} post={post} index={index} />
            ))
          : posts
              .filter((post) =>
                selectedCountries.some(
                  (country) => country.name === post.country
                )
              )
              .map((post, index) => (
                <RecipeItem key={post.slug} post={post} index={index} />
              ))}
      </div>
    </Container>
  );
}
