"use client";

import { createContext, useEffect, useState } from "react";
import type { Country } from "../utils/countries";
import { getCountries, getCountryByTimezone } from "../utils/countries";

interface CountryContextType {
  country: Country | null;
  setCountry: (country: Country) => void;
  countries: Country[];
}

export const CountryContext = createContext<CountryContextType>({
  country: null,
  setCountry: () => {},
  countries: [],
});

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const countriesList = getCountries();
    setCountries(countriesList);

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const detectedCountry = getCountryByTimezone(timezone, countriesList);

      if (detectedCountry) {
        setCountry(detectedCountry);
      } else {
        setCountry(
          countriesList.find((country) => country.code === "US") ||
            countriesList[0]
        );
      }
    } catch (error) {
      console.error("Error detecting timezone:", error);
      setCountry(
        countriesList.find((country) => country.code === "US") ||
          countriesList[0]
      );
    }
  }, []);

  const handleSetCountry = (countryCode: Country) => {
    setCountry(countryCode);
  };

  return (
    <CountryContext.Provider
      value={{ country, setCountry: handleSetCountry, countries }}
    >
      {children}
    </CountryContext.Provider>
  );
}
