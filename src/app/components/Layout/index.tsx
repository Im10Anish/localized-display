"use client";

import { useCountry } from "../../hooks/useCountry";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { country } = useCountry();

  return (
    <div className="min-h-screen bg-gray-50">
      {country && (
        <div
          className="h-2"
          style={{
            background: `linear-gradient(90deg, ${
              country.colors[0] || "#ccc"
            } 33%, ${country.colors[1] || "#ddd"} 33%, ${
              country.colors[1] || "#ddd"
            } 67%, ${country.colors[2] || "#eee"} 67%)`,
          }}
        />
      )}

      <div className="container mx-auto min-h-screen">{children}</div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Localized Display App</p>
      </footer>
    </div>
  );
}
