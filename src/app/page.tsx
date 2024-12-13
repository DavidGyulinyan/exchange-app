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

// Mock currency data (to be replaced with API call)
const currencies = [
  {
    id: 1,
    currencyName: "AMD - Armenian Dram",
    currencySign: "֏",
    flag: "am",
  },
  {
    id: 2,
    currencyName: "USD - US Dollar",
    currencySign: "$",
    flag: "us",
  },
];

export default function Home() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<string>(currencies[1]?.currencyName);
  const [toCurrency, setToCurrency] = useState<string>(currencies[0]?.currencyName);
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleSwap = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  // Placeholder conversion logic
  const handleConvert = (): void => {
    if (fromCurrency === "USD - US Dollar" && toCurrency === "AMD - Armenian Dram") {
      setConvertedAmount((parseFloat(amount) * 394.86).toFixed(2));
    } else if (fromCurrency === "AMD - Armenian Dram" && toCurrency === "USD - US Dollar") {
      setConvertedAmount((parseFloat(amount) / 394.86).toFixed(2));
    } else {
      setConvertedAmount(amount);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [handleConvert])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap:"30px"
      }}
    >
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
          currencies={currencies}
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
            width: "50%",
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
          gap: "20px",
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
              {currencies.map((currency) => (
                <MenuItem key={currency.id} value={currency.currencyName}>
                  {currency.currencySign} {currency.currencyName}
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
              {currencies.map((currency) => (
                <MenuItem key={currency.id} value={currency.currencyName}>
                  {currency.currencySign} {currency.currencyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};
