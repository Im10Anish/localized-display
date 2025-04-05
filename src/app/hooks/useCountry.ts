"use client";

import { useContext } from "react";
import { CountryContext } from "../providers/CountryProvider";

export function useCountry() {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}
