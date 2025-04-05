"use client";

import { useEffect, useState } from "react";
import { useCountry } from "../../hooks/useCountry";
import { formatDate, formatTime, formatCurrency } from "../../utils/formatter";

interface LocalizedDisplayProps {
  fixedAmount: number;
}

export default function LocalizedDisplay({
  fixedAmount,
}: LocalizedDisplayProps) {
  const { country } = useCountry();
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!country) {
    return <div className="animate-pulse">Loading...</div>;
  }

  // Get the current date and time in the selected country's timezone
  const options = { timeZone: country.timezone };
  const localDateTime = new Date(
    currentDateTime.toLocaleString("en-US", options)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {country.name} ({country.timezone})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500 mb-1">Date</div>
          <div className="text-xl font-bold">
            {formatDate(localDateTime, country.locale)}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500 mb-1">Time</div>
          <div className="text-xl font-bold">
            {formatTime(localDateTime, country.locale)}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500 mb-1">Amount</div>
          <div className="text-xl font-bold">
            {formatCurrency(fixedAmount, country.currency.code, country.locale)}
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Additional Formats</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              Full Date & Time
            </div>
            <div className="text-sm">
              {localDateTime.toLocaleString(country.locale, {
                dateStyle: "full",
                timeStyle: "long",
              })}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              Short Date & Time
            </div>
            <div className="text-sm">
              {localDateTime.toLocaleString(country.locale, {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              Currency (Accounting)
            </div>
            <div className="text-sm">
              {new Intl.NumberFormat(country.locale, {
                style: "currency",
                currency: country.currency.code,
                currencySign: "accounting",
              }).format(fixedAmount * -1)}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              Currency (With Grouping)
            </div>
            <div className="text-sm">
              {new Intl.NumberFormat(country.locale, {
                style: "currency",
                currency: country.currency.code,
                useGrouping: true,
              }).format(fixedAmount * 1000)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
