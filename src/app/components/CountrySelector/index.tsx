"use client";
import { useEffect, useState, useRef } from "react";
import { useCountry } from "../../hooks/useCountry";

const countryToFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};

export default function CountrySelector() {
  const { country, setCountry, countries } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!country) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center">
          <div className="w-8 mr-3 text-xl">
            {countryToFlagEmoji(country.code)}
          </div>
          <span className="font-medium">{country.name}</span>
        </div>
        <svg
          className={`h-5 w-5 text-gray-400 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredCountries.map((c) => (
              <li key={c.code}>
                <button
                  onClick={() => {
                    setCountry(c);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 ${
                    country.code === c.code ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="w-8 mr-3 text-xl">
                    {countryToFlagEmoji(c.code)}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({c.currency.code})
                    </span>
                  </div>
                </button>
              </li>
            ))}
            {filteredCountries.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
