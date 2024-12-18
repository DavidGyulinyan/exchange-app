"use client";

import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel
} from "@mui/material";

import "@fontsource/roboto";
import Header from "./components/Header";
import ConvertedAmount from "./components/ConvertedAmount";
import SwapButton from "./components/SwapButton";

import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

export default function Home() {
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [currenciesData, setCurrenciesData] = useState<Data>();
  const [fromCurrency, setFromCurrency] = useState<string>("AMD");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState<boolean>(true);
  const [currencyList, setCurrencyList] = useState<string[]>([]);

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
  };

  //Request to the api to get exchange rates
  useEffect(() => {

    const getExchangeData = () => {
      fetch(`https://v6.exchangerate-api.com/v6/202d201dda9ebd5a8b2d3591/latest/USD`)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error: Status ${response.status}`);
          return response.json()
        })
        .then((data) => {
          setCurrenciesData(data);
          setCurrencyList(Object.keys(data.conversion_rates));
          setLoading(false);

        })
        .catch((error) => {
          console.error(error);
          setLoading(false);

        })
    };

    getExchangeData();
  }, []);

  // console.log(currenciesData?.conversion_rates);


  const handleSwap = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  // Placeholder conversion logic
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

  return (

    <div
      style={{
        width: "100%",
        height: `${loading ? "100vh" : "100%"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: `${loading ? "center" : "space-between"}`,
        alignItems: "center",
        gap: "30px"
      }}
    >
      {loading ? <Loading /> :
        <>

          <Header />
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem"
              }
            }}

          >{`Convert ${fromCurrency} to ${toCurrency}`}</Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.7rem"
              }
            }}
          >Currency Converter</Typography>

          {/* main box */}
          <Box
            sx={{
              width: {
                sm: "70%",
                xs: "90%"
              },
              height: "25rem",
              border: "1px solid #1992E2",
              borderRadius: "20px",
              padding: "1rem",
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

            <TextField
              id="amount"
              label="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              sx={{
                width: {
                  sm: "",
                  md: "45.5rem",
                  lg: "45.5rem"
                },
                borderRadius: "4px",
                backgroundColor: "white",
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                  '&:before': {
                    display: 'none',
                  },
                  '&:after': {
                    display: 'none',
                  },
                },
              }}
            />

            {/* nested box invisible */}
            <Box sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row"
              },
              gap: {
                xs: "0",
                sm: "0",
                md: "20px",
                lg: "20px",
              },
            }}>
              <FormControl>
                <InputLabel id="from-label-id" >From</InputLabel>
                <Select
                  labelId="from-label-id"
                  id="from-id"
                  label="from"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  sx={{ width: "20rem" }}
                >

                  {currencyList.map((currency) => (
                    <MenuItem selected={true} key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <SwapButton onClick={handleSwap} />

              <FormControl>
                <InputLabel id="to-label-id">To</InputLabel>
                <Select
                  labelId="to-label-id"
                  id="to-id"
                  label="to"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  sx={{ width: "20rem" }}
                >

                  {currencyList.map((currency) => (
                    <MenuItem selected={true} key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Footer />
        </>
      }
    </div>
  );
};