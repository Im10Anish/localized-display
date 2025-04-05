"use client";
import { useEffect, useState } from "react";
import { useCountry } from "./hooks/useCountry";
import Layout from "./components/Layout";
import LocalizedDisplay from "./components/LocalizeDisplay";
import CountrySelector from "./components/CountrySelector";

export default function Home() {
  const { country } = useCountry();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Localized Display
        </h1>

        <div className="mb-8">
          <CountrySelector />
        </div>

        {country && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <LocalizedDisplay fixedAmount={1000} />
          </div>
        )}
      </div>
    </Layout>
  );
}
