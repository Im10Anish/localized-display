import { TIMEZONE_TO_COUNTRY } from "../data/timezone";
import { COUNTRIES } from "../data/countries";
export interface Country {
  code: string;
  name: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  locale: string;
  timezone: string;
  colors: string[];
}

export function getCountryByTimezone(
  timezone: string,
  countries: Country[]
): Country | null {
  const countryCode = TIMEZONE_TO_COUNTRY[timezone];
  if (countryCode) {
    const country = countries.find((country) => country.code === countryCode);
    if (country) {
      return country;
    }
  }

  const country = countries.find((country) => country.timezone === timezone);
  if (country) {
    return country;
  }

  const continentMatch = timezone.split("/")[0];
  if (continentMatch) {
    const continentCountry = countries.find((country) =>
      country.timezone.startsWith(continentMatch + "/")
    );
    if (continentCountry) {
      return continentCountry;
    }
  }
  return null;
}

export function getCountries(): Country[] {
  return COUNTRIES;
}
