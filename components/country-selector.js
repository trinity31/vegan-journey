import { useTranslation } from "next-i18next";
import { useState } from "react";

// const countries = [
//   { id: 1, name: "Korea" },
//   { id: 2, name: "Thailand" },
//   { id: 3, name: "India" },
//   { id: 4, name: "France" },
//   { id: 5, name: "Japan" },
//   { id: 6, name: "Indonesia" },
//   { id: 7, name: "China" },
//   { id: 8, name: "America" },
//   { id: 9, name: "Middle East" },
//   { id: 10, name: "North Africa" },
// ];

export default function CountrySelector({
  selectedCountries,
  setSelectedCountries,
  countries,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCountry = (country) => {
    const index = selectedCountries.findIndex((c) => c.id === country.id);
    if (index === -1) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      const newSelectedCountries = [...selectedCountries];
      newSelectedCountries.splice(index, 1);
      setSelectedCountries(newSelectedCountries);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="options-menu"
        onClick={toggleDropdown}
      >
        {t("select_country")}
        {isOpen && (
          <svg width="10" height="10" style={{ marginLeft: "5px" }}>
            <polygon points="0,10 5,0 10,10" />
          </svg>
        )}
        {!isOpen && (
          <svg width="10" height="10" style={{ marginLeft: "5px" }}>
            <polygon points="0,0 5,10 10,0" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className="flex mt-2 flex-wrap gap-2"
          role="menu"
          // aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {countries.map((country) => (
            <button
              key={country.id}
              type="button"
              className={`${
                selectedCountries.some((c) => c.id === country.id)
                  ? "border-green-800"
                  : "border-green-100"
              } border-2 border-solid rounded-full px-3 py-1 text-sm font-semibold  mr-2 flex items-center`}
              onClick={() => handleSelectCountry(country)}
            >
              <span className="flex items-center">
                {selectedCountries.some((c) => c.id === country.id) && (
                  <svg
                    className="mr-2 h-4 w-4 fill-current text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.293 5.293a1 1 0 00-1.414 0L8 10.586 6.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0L14 7.414a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {country.name}
              </span>
            </button>
          ))}
        </div>
      )}
      {selectedCountries.length > 0 && (
        <div className="flex mt-2 flex-wrap gap-2">
          {selectedCountries.map((country) => (
            <div
              key={country.id}
              className="bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 flex items-center"
            >
              {country.name}
              <button
                type="button"
                className="ml-2 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
                onClick={() => handleSelectCountry(country)}
              >
                <svg
                  className="h-4 w-4 fill-current text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.293 5.293a1 1 0 00-1.414 0L10 8.586l-2.293-2.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
