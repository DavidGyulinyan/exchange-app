"use client";
import * as MaterialUI from "@mui/material";

import "@fontsource/roboto";
import dynamic from "next/dynamic";

// Lazy load components
const ConvertedAmount = dynamic(() => import("./components/ConvertedAmount"));
const SwapButton = dynamic(() => import("./components/SwapButton"));
const SavedRates = dynamic(() => import("./components/SavedRates"));
const CurrencySelect = dynamic(() => import("./components/CurrencySelect"));

import Head from "next/head";

import {useCallback, useEffect, useState} from "react";
import CurrencyConverterSkeleton from "@/app/skeleton/ConverterSkeleton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { getUserStorageKey } from "./utils/userUtils";

export default function Home() {
    const [amount, setAmount] = useState<string>("");
    const [convertedAmount, setConvertedAmount] = useState<string>("");
    const [currenciesData, setCurrenciesData] = useState<Data>();
    const [fromCurrency, setFromCurrency] = useState<string>("");
    const [toCurrency, setToCurrency] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [currencyList, setCurrencyList] = useState<string[]>([]);
    const [savedRates, setSavedRates] = useState<SavedRate[]>([]);
    const [showSavedRates, setShowSavedRates] = useState<boolean>(false);

    interface SavedRate {
        id: string;
        fromCurrency: string;
        toCurrency: string;
        rate: number;
        timestamp: number;
    }

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
                    if (typeof window !== "undefined") {
                        const userKey = getUserStorageKey("currencyHistory");
                        const storedHistory = JSON.parse(
                            localStorage.getItem(userKey) || "[]"
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

    // Load saved rates from localStorage (user-specific)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const userKey = getUserStorageKey("savedRates");
            const stored = localStorage.getItem(userKey);
            if (stored) {
                setSavedRates(JSON.parse(stored));
            }
        }
    }, []);

    // Save rate function (user-specific)
    const handleSaveRate = (): void => {
        if (!fromCurrency || !toCurrency || !currenciesData) return;

        const fromRate = currenciesData.conversion_rates[fromCurrency];
        const toRate = currenciesData.conversion_rates[toCurrency];
        const rate = toRate / fromRate;

        const newRate: SavedRate = {
            id: `${fromCurrency}-${toCurrency}-${Date.now()}`,
            fromCurrency,
            toCurrency,
            rate,
            timestamp: Date.now(),
        };

        const updatedRates = [newRate, ...savedRates].slice(0, 10); // Keep max 10 saved rates
        setSavedRates(updatedRates);
        
        if (typeof window !== "undefined") {
            const userKey = getUserStorageKey("savedRates");
            localStorage.setItem(userKey, JSON.stringify(updatedRates));
        }
    };

    // Delete saved rate function (user-specific)
    const handleDeleteRate = (id: string): void => {
        const updatedRates = savedRates.filter((rate) => rate.id !== id);
        setSavedRates(updatedRates);
        
        if (typeof window !== "undefined") {
            const userKey = getUserStorageKey("savedRates");
            localStorage.setItem(userKey, JSON.stringify(updatedRates));
        }
    };

    // Select saved rate function
    const handleSelectRate = (from: string, to: string): void => {
        setFromCurrency(from);
        setToCurrency(to);
        setShowSavedRates(false);
    };

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
            const userKey = getUserStorageKey("currencyHistory");
            const history = JSON.parse(
                localStorage.getItem(userKey) || "[]"
            );
            const newHistory = [
                {from, to},
                ...history.filter(
                    (entry: { from: string; to: string }) =>
                        entry.from !== from || entry.to !== to
                ),
            ].slice(0, 5);
            localStorage.setItem(userKey, JSON.stringify(newHistory));
        }
    };

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            updateHistory(fromCurrency, toCurrency);
        }
    }, [fromCurrency, toCurrency]);

    const handleConvert = useCallback((): void => {
        if (currenciesData && amount) {
            const fromRate = currenciesData.conversion_rates[fromCurrency];
            const toRate = currenciesData.conversion_rates[toCurrency];
            const convertedValue = (parseFloat(amount) / fromRate) * toRate;
            setConvertedAmount(convertedValue.toFixed(4));
        }
    }, [currenciesData, amount, fromCurrency, toCurrency]);

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
            ? JSON.parse(localStorage.getItem(getUserStorageKey("currencyHistory")) || "[]")
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
                <link rel="canonical" href="https://ratesnap.netlify.app/"/>
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
                <meta property="og:url" content="https://ratesnap.netlify.app/"/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content="https://ratesnap.netlify.app/"/>

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta
                    name="twitter:title"
                    content={`Convert ${fromCurrency} to ${toCurrency}`}
                />
                <meta
                    name="twitter:description"
                    content={`Real-time currency exchange rates to convert ${fromCurrency} to ${toCurrency}. Easy and accurate conversions.`}
                />
                <meta name="twitter:image" content="https://ratesnap.netlify.app"/>

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
                        <CurrencyConverterSkeleton/>
                    ) : (
                        <>
                            <MaterialUI.Typography
                                variant="h2"
                                sx={{
                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "1.75rem",
                                        md: "2rem",
                                        lg: "2.5rem",
                                    },
                                    fontWeight: "700",
                                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    textAlign: "center",
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
                                            xs: "0.75rem",
                                            sm: "0.875rem",
                                        },
                                        color: "#64748b",
                                        fontWeight: 500,
                                    }}
                                >
                                    {`Last update: ${currenciesData?.time_last_update_utc}`}
                                </MaterialUI.Typography>

                                <MaterialUI.Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.875rem",
                                        },
                                        color: "#64748b",
                                        fontWeight: 500,
                                    }}
                                >
                                    {`Next update: ${currenciesData?.time_next_update_utc}`}
                                </MaterialUI.Typography>
                            </MaterialUI.Box>

                            {/* main box */}
                            <MaterialUI.Box
                                sx={{
                                    width: {
                                        xs: "95%",
                                        sm: "85%",
                                        md: "80%",
                                    },
                                    minHeight: "25rem",
                                    border: "2px solid #e2e8f0",
                                    borderRadius: "16px",
                                    padding: {
                                        xs: "2rem 1rem",
                                        md: "3rem 2rem",
                                    },
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: "24px",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                                    },
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
                                    variant="outlined"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "20rem",
                                            md: "45.5rem",
                                            lg: "45.5rem",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px",
                                            backgroundColor: "#f8fafc",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                backgroundColor: "#f1f5f9",
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#2563eb",
                                                },
                                            },
                                            "&.Mui-focused": {
                                                backgroundColor: "white",
                                                boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            fontWeight: 500,
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
                                    {/* currency from which should start converting */}
                                    <CurrencySelect
                                        label="From"
                                        value={fromCurrency}
                                        onChange={setFromCurrency}
                                        currencies={mergedCurrencyList}
                                        labelId="from-label-id"
                                        id="from-id"
                                    />

                                    {/* button that swaps the inputs */}
                                    <SwapButton onClick={handleSwap}/>

                                    {/* currency to which should be converted */}
                                    <CurrencySelect
                                        label="To"
                                        value={toCurrency}
                                        onChange={setToCurrency}
                                        currencies={mergedCurrencyList}
                                        labelId="to-label-id"
                                        id="to-id"
                                    />
                                </MaterialUI.Box>

                                {/* Save Rate Button */}
                                <MaterialUI.Button
                                    variant="contained"
                                    startIcon={<BookmarkAddIcon />}
                                    onClick={handleSaveRate}
                                    sx={{
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        padding: "10px 24px",
                                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
                                        },
                                    }}
                                >
                                    Save This Rate
                                </MaterialUI.Button>

                                <MaterialUI.Typography
                                    sx={{
                                        width: {
                                            xs: "90%",
                                            sm: "80%",
                                            md: "60%",
                                        },
                                        textAlign: "center",
                                        fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.8125rem",
                                            md: "0.875rem",
                                            lg: "1rem",
                                        },
                                        color: "#64748b",
                                        fontStyle: "italic",
                                        marginTop: "0.5rem",
                                    }}
                                >
                                    This currency converter provides approximate exchange rates
                                    for general reference only.
                                </MaterialUI.Typography>
                            </MaterialUI.Box>

                            {/* Saved Rates Section */}
                            <MaterialUI.Box
                                sx={{
                                    width: {
                                        xs: "95%",
                                        sm: "85%",
                                        md: "80%",
                                    },
                                    marginTop: "2rem",
                                }}
                            >
                                <MaterialUI.Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <MaterialUI.Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: {
                                                xs: "1.25rem",
                                                md: "1.5rem",
                                            },
                                            fontWeight: 600,
                                            color: "#1e293b",
                                        }}
                                    >
                                        <BookmarkIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                                        Saved Rates ({savedRates.length})
                                    </MaterialUI.Typography>
                                    {savedRates.length > 0 && (
                                        <MaterialUI.Button
                                            size="small"
                                            onClick={() => setShowSavedRates(!showSavedRates)}
                                            sx={{
                                                textTransform: "none",
                                                color: "#2563eb",
                                            }}
                                        >
                                            {showSavedRates ? "Hide" : "Show"}
                                        </MaterialUI.Button>
                                    )}
                                </MaterialUI.Box>

                                <MaterialUI.Collapse in={showSavedRates || savedRates.length === 0}>
                                    <MaterialUI.Box
                                        sx={{
                                            border: "2px solid #e2e8f0",
                                            borderRadius: "16px",
                                            padding: {
                                                xs: "1rem",
                                                md: "2rem",
                                            },
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                        }}
                                    >
                                        <SavedRates
                                            savedRates={savedRates}
                                            onDelete={handleDeleteRate}
                                            onSelect={handleSelectRate}
                                        />
                                    </MaterialUI.Box>
                                </MaterialUI.Collapse>
                            </MaterialUI.Box>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}
