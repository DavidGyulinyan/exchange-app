import * as MaterialUI from "@mui/material";

interface ConvertedAmountProps {
  currencies: any[];
  toCurrency: string;
  convertedAmount: number | string;
}

export default function ConvertedAmount({
  convertedAmount,
}: ConvertedAmountProps) {
  const formatNumber = (value: number | string): string => {
    if (isNaN(+value) || +value === 0) return "0";
    return String(value);
  };

  return (
    <MaterialUI.Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
        border: "2px solid #bae6fd",
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 16px rgba(37, 99, 235, 0.15)",
        },
      }}
    >
      <MaterialUI.Typography
        variant="h5"
        sx={{
          overflowWrap: "break-word",
          fontSize: {
            xs: "1.25rem",
            sm: "1.5rem",
            md: "1.75rem",
          },
          fontWeight: 600,
          color: +convertedAmount < 0 ? "#dc2626" : "#1e293b",
          textShadow:
            +convertedAmount < 0 ? "none" : "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {+convertedAmount < 0
          ? "Please enter a valid number"
          : `Converted Amount: ${formatNumber(convertedAmount)}`}
      </MaterialUI.Typography>
    </MaterialUI.Box>
  );
}
