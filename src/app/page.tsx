"use client";
import * as MaterialUI from "@mui/material";

import "@fontsource/roboto";
import dynamic from "next/dynamic";

// Lazy load components
const ConvertedAmount = dynamic(() => import("./components/ConvertedAmount"));
const SwapButton = dynamic(() => import("./components/SwapButton"));

import Head from "next/head";

import { useEffect, useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [currenciesData, setCurrenciesData] = useState<Data>();
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  //currencies data interface
  interface Data {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: {
      [key: string]: number;
    };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const getExchangeData = () => {
      fetch(`${apiUrl}${apiKey}/latest/USD`)
        .then((response) => {
          if (!response.ok)
            throw new Error(`HTTP error: Status ${response.status}`);
          return response.json();
        })
        .then((data) => {
          setCurrenciesData(data);
          console.log(data);
          if (typeof window !== "undefined") {
            const storedHistory = JSON.parse(
              localStorage.getItem("currencyHistory") || "[]"
            );
            const initialFromCurrency =
              storedHistory[0]?.from || Object.keys(data.conversion_rates)[0];
            const initialToCurrency =
              storedHistory[0]?.to || Object.keys(data.conversion_rates)[4];

            setFromCurrency(initialFromCurrency);
            setToCurrency(initialToCurrency);
          }
          setCurrencyList(Object.keys(data.conversion_rates));
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    getExchangeData();
  }, []);

  const handleSwap = (): void => {
    setFromCurrency((prev) => {
      const newFromCurrency = toCurrency;
      updateHistory(newFromCurrency, fromCurrency);
      return newFromCurrency;
    });
    setToCurrency((prev) => {
      const newToCurrency = fromCurrency;
      updateHistory(toCurrency, newToCurrency);
      return newToCurrency;
    });
  };

  const updateHistory = (from: string, to: string): void => {
    if (typeof window !== "undefined") {
      const history = JSON.parse(
        localStorage.getItem("currencyHistory") || "[]"
      );
      const newHistory = [
        { from, to },
        ...history.filter(
          (entry: { from: string; to: string }) =>
            entry.from !== from || entry.to !== to
        ),
      ].slice(0, 5);
      localStorage.setItem("currencyHistory", JSON.stringify(newHistory));
    }
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      updateHistory(fromCurrency, toCurrency);
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = (): void => {
    if (currenciesData && amount) {
      const fromRate = currenciesData.conversion_rates[fromCurrency];
      const toRate = currenciesData.conversion_rates[toCurrency];
      const convertedValue = (parseFloat(amount) / fromRate) * toRate;
      setConvertedAmount(convertedValue.toFixed(2));
    }
  };

  useEffect(() => {
    handleConvert();
  }, [handleConvert]);

  const mergeHistoryWithList = (
    history: { from: string; to: string }[],
    list: string[]
  ): string[] => {
    const uniqueCurrencies = new Set();
    const mergedList: string[] = [];

    history.forEach((entry) => {
      if (!uniqueCurrencies.has(entry.from)) {
        uniqueCurrencies.add(entry.from);
        mergedList.push(entry.from);
      }
    });

    list.forEach((currency) => {
      if (!uniqueCurrencies.has(currency)) {
        uniqueCurrencies.add(currency);
        mergedList.push(currency);
      }
    });

    return mergedList;
  };

  const history =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currencyHistory") || "[]")
      : [];
  const mergedCurrencyList = mergeHistoryWithList(history, currencyList);

  return (
    <>
      <Head>
        <title>{`Convert ${fromCurrency} to ${toCurrency} | Real-Time Currency Exchange`}</title>
        <meta
          name="description"
          content={`Easily convert ${fromCurrency} to ${toCurrency} using our real-time currency converter. Get up-to-date exchange rates and accurate conversions.`}
        />
        <meta
          name="keywords"
          content={`convert ${fromCurrency} to ${toCurrency}, real-time currency converter, ${fromCurrency} to ${toCurrency} exchange rates, currency conversion tool`}
        />
        <link rel="canonical" href="https://ratesnap.netlify.app/" />
        <link
          rel="preload"
          href="/path-to-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={`Convert ${fromCurrency} to ${toCurrency} | Real-Time Exchange`}
        />
        <meta
          property="og:description"
          content={`Use our real-time currency converter to easily convert ${fromCurrency} to ${toCurrency} with accurate exchange rates.`}
        />
        <meta property="og:url" content="https://ratesnap.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ratesnap.netlify.app/" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Convert ${fromCurrency} to ${toCurrency}`}
        />
        <meta
          name="twitter:description"
          content={`Real-time currency exchange rates to convert ${fromCurrency} to ${toCurrency}. Easy and accurate conversions.`}
        />
        <meta name="twitter:image" content="https://ratesnap.netlify.app" />

        {/* Structured Data */}
        <script
          defer
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: `Convert ${fromCurrency} to ${toCurrency}`,
              description: `Easily convert ${fromCurrency} to ${toCurrency} with real-time exchange rates.`,
              url: "https://ratesnap.netlify.app/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://ratesnap.netlify.app/",
                "query-input": "required name=query",
              },
            }),
          }}
        />
      </Head>
      <main>
        <div
          style={{
            width: "100%",
            height: `${loading ? "100vh" : "100%"}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: `${loading ? "center" : "space-between"}`,
            alignItems: "center",
            gap: "30px",
            margin: "30px 0 30px 0",
          }}
        >
          {loading ? (
            <MaterialUI.Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
                color: "#444",
              }}
            >
              Preparing the currency converter...
            </MaterialUI.Typography>
          ) : (
            <>
              <MaterialUI.Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                }}
              >
                {`Convert ${fromCurrency} to ${toCurrency}`}
              </MaterialUI.Typography>

              <MaterialUI.Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <MaterialUI.Typography
                  sx={{
                    textAlign: "center",
                    fontSize: {
                      xs: "12px",
                    },
                  }}
                >
                  {`Last update: ${currenciesData?.time_last_update_utc}`}
                </MaterialUI.Typography>

                <MaterialUI.Typography
                  sx={{
                    textAlign: "center",
                    fontSize: {
                      xs: "12px",
                    },
                  }}
                >
                  {`Next update: ${currenciesData?.time_next_update_utc}`}
                </MaterialUI.Typography>
              </MaterialUI.Box>

              {/* main box */}
              <MaterialUI.Box
                sx={{
                  width: {
                    xs: "98%",
                    sm: "90%",
                  },
                  height: "25rem",
                  border: "3px solid #00214A",
                  borderRadius: "20px",
                  padding: "4rem 1rem 3.5rem 1rem",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <ConvertedAmount
                  currencies={currencyList}
                  toCurrency={toCurrency}
                  convertedAmount={convertedAmount}
                />

                {/* amount text field */}
                <MaterialUI.TextField
                  id="amount"
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  sx={{
                    width: {
                      xs: "20rem",
                      sm: "20rem",
                      md: "45.5rem",
                      lg: "45.5rem",
                    },
                    borderRadius: "4px",
                    backgroundColor: "white",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white",
                      },
                    },
                  }}
                />

                {/* nested box invisible */}
                <MaterialUI.Box
                  sx={{
                    display: "flex",
                    alignItems: {
                      xs: "end",
                    },

                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    gap: {
                      xs: "10px",
                      sm: "10px",
                      md: "20px",
                      lg: "20px",
                    },
                  }}
                >
                  {/* currency from wich should start converting */}
                  <MaterialUI.FormControl>
                    <MaterialUI.InputLabel id="from-label-id">
                      From
                    </MaterialUI.InputLabel>
                    <MaterialUI.Select
                      labelId="from-label-id"
                      id="from-id"
                      label="from"
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      sx={{
                        minWidth: {
                          xs: "20rem",
                          sm: "20rem",
                          md: "20.7rem",
                          lg: "20.7rem",
                        },
                      }}
                    >
                      {mergedCurrencyList.map((currency, index) => (
                        <MaterialUI.MenuItem
                          key={`from-${index}`}
                          value={currency}
                        >
                          {currency}
                        </MaterialUI.MenuItem>
                      ))}
                    </MaterialUI.Select>
                  </MaterialUI.FormControl>

                  {/* button that swaps the inputes */}
                  <SwapButton onClick={handleSwap} />

                  {/* currency to wich should be converted */}
                  <MaterialUI.FormControl>
                    <MaterialUI.InputLabel id="to-label-id">
                      To
                    </MaterialUI.InputLabel>
                    <MaterialUI.Select
                      labelId="to-label-id"
                      id="to-id"
                      label="from"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      sx={{
                        minWidth: {
                          xs: "20rem",
                          sm: "20rem",
                          md: "20.7rem",
                          lg: "20.7rem",
                        },
                      }}
                    >
                      {mergedCurrencyList.map((currency, index) => (
                        <MaterialUI.MenuItem
                          key={`to-${index}`}
                          value={currency}
                        >
                          {currency}
                        </MaterialUI.MenuItem>
                      ))}
                    </MaterialUI.Select>
                  </MaterialUI.FormControl>
                </MaterialUI.Box>
                <MaterialUI.Typography
                  sx={{
                    width: "50%",
                    textAlign: "center",
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "16px",
                    },
                  }}
                >
                  This currency converter provides approximate exchange rates
                  for general reference only.
                </MaterialUI.Typography>
              </MaterialUI.Box>
            </>
          )}
        </div>
      </main>
    </>
  );
}
