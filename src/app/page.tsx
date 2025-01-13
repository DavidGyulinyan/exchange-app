"use client";

import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";

import "@fontsource/roboto";
import ConvertedAmount from "./components/ConvertedAmount";
import SwapButton from "./components/SwapButton";

import { useEffect, useState } from "react";
import Loading from "./components/Loading";

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

          // Ensure this block runs only on the client side
          if (typeof window !== "undefined") {
            const storedHistory = JSON.parse(
              localStorage.getItem("currencyHistory") || "[]"
            );
            const initialFromCurrency =
              storedHistory[0]?.from || Object.keys(data.conversion_rates)[0];
            const initialToCurrency =
              storedHistory[0]?.to || Object.keys(data.conversion_rates)[1];

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
    const history = JSON.parse(localStorage.getItem("currencyHistory") || "[]");
    const newHistory = [
      { from, to },
      ...history.filter(
        (entry: { from: string; to: string }) =>
          entry.from !== from || entry.to !== to
      ),
    ].slice(0, 5);
    localStorage.setItem("currencyHistory", JSON.stringify(newHistory));
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

  const history = JSON.parse(localStorage.getItem("currencyHistory") || "[]");
  const mergedCurrencyList = mergeHistoryWithList(history, currencyList);

  return (
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
        <Loading />
      ) : (
        <>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
              },
            }}
          >{`Convert ${fromCurrency} to ${toCurrency}`}</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: {
                  xs: "12px",
                },
              }}
            >
              {`Last update: ${currenciesData?.time_last_update_utc}`}
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: {
                  xs: "12px",
                },
              }}
            >
              {`Next update: ${currenciesData?.time_next_update_utc}`}
            </Typography>
          </Box>

          {/* main box */}
          <Box
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
            <TextField
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
                  "&:before": {
                    display: "none",
                  },
                  "&:after": {
                    display: "none",
                  },
                },
              }}
            />

            {/* nested box invisible */}
            <Box
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
              <FormControl>
                <InputLabel id="from-label-id">From</InputLabel>
                <Select
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
                    <MenuItem key={`from-${index}`} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* button that swaps the inputes */}
              <SwapButton onClick={handleSwap} />

              {/* currency to wich should be converted */}
              <FormControl>
                <InputLabel id="to-label-id">To</InputLabel>
                <Select
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
                    <MenuItem key={`to-${index}`} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Typography
              sx={{
                width: "50%",
                textAlign: "center",
                fontSize: {
                  xs: "11px",
                  sm: "13px",
                  md: "14px",
                  lg: "16px",
                },
              }}
            >
              This currency converter provides approximate exchange rates for
              general reference only.
            </Typography>
          </Box>
        </>
      )}
    </div>
  );
}
