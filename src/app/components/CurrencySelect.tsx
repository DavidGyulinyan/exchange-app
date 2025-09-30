import * as MaterialUI from "@mui/material";
import { useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
  labelId: string;
  id: string;
}

export default function CurrencySelect({
  label,
  value,
  onChange,
  currencies,
  labelId,
  id,
}: CurrencySelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // Filter currencies based on search term
  const filteredCurrencies = useMemo(() => {
    if (!searchTerm) return currencies;
    return currencies.filter((currency) =>
      currency.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currencies, searchTerm]);

  const handleClose = () => {
    setOpen(false);
    setSearchTerm(""); // Reset search when closing
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <MaterialUI.FormControl>
      <MaterialUI.InputLabel id={labelId}>{label}</MaterialUI.InputLabel>
      <MaterialUI.Select
        labelId={labelId}
        id={id}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        sx={{
          minWidth: {
            xs: "100%",
            sm: "20rem",
            md: "20.7rem",
            lg: "20.7rem",
          },
          borderRadius: "12px",
          backgroundColor: "#f8fafc",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#f1f5f9",
          },
          "&.Mui-focused": {
            backgroundColor: "white",
            boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "12px",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 400,
              borderRadius: "12px",
              marginTop: "8px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            },
          },
          autoFocus: false,
        }}
      >
        {/* Search Field */}
        <MaterialUI.Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
            padding: "12px",
            borderBottom: "1px solid #e2e8f0",
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <MaterialUI.TextField
            size="small"
            placeholder="Search currency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            autoFocus
            InputProps={{
              startAdornment: (
                <MaterialUI.InputAdornment position="start">
                  <SearchIcon sx={{ color: "#64748b", fontSize: 20 }} />
                </MaterialUI.InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f8fafc",
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                },
                "&.Mui-focused": {
                  backgroundColor: "white",
                },
              },
            }}
          />
        </MaterialUI.Box>

        {/* Currency List */}
        {filteredCurrencies.length > 0 ? (
          filteredCurrencies.map((currency, index) => (
            <MaterialUI.MenuItem
              key={`${id}-${index}`}
              value={currency}
              sx={{
                "&:hover": {
                  backgroundColor: "#e0f2fe",
                },
                "&.Mui-selected": {
                  backgroundColor: "#dbeafe",
                  "&:hover": {
                    backgroundColor: "#bfdbfe",
                  },
                },
              }}
            >
              {currency}
            </MaterialUI.MenuItem>
          ))
        ) : (
          <MaterialUI.MenuItem disabled>
            <MaterialUI.Typography
              sx={{
                color: "#64748b",
                fontStyle: "italic",
                textAlign: "center",
                width: "100%",
              }}
            >
              No currencies found
            </MaterialUI.Typography>
          </MaterialUI.MenuItem>
        )}
      </MaterialUI.Select>
    </MaterialUI.FormControl>
  );
}