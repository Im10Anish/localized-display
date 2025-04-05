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

const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  "America/New_York": "US",
  "Asia/Calcutta": "IN",
};

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
  return [
    {
      code: "US",
      name: "United States",
      currency: {
        code: "USD",
        name: "United States Dollar",
        symbol: "$",
      },
      locale: "en-US",
      timezone: "America/New_York",
      colors: ["#3b5998", "#ffffff"],
    },
    {
      code: "FR",
      name: "France",
      currency: {
        code: "EUR",
        name: "Euro",
        symbol: "€",
      },
      locale: "fr-FR",
      timezone: "Europe/Paris",
      colors: ["#3b5998", "#ffffff"],
    },
    {
      code: "IN",
      name: "India",
      currency: { code: "INR", name: "Indian Rupee", symbol: "₹" },
      locale: "en-IN",
      timezone: "Asia/Calcutta",
      colors: ["#FF9933", "#FFFFFF", "#138808"],
    },
    // Add more countries as needed
  ];
}
