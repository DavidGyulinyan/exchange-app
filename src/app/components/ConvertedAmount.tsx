import * as MaterialUI from "@mui/material";

interface ConvertedAmountProps {
  currencies: any[];
  toCurrency: string;
  convertedAmount: number | string;
}

export default function ConvertedAmount({
  convertedAmount,
}: ConvertedAmountProps) {
  // Format the converted amount with thousands separators and a comma as the decimal separator
  const formatNumber = (value: number | string): string => {
    if (isNaN(+value)) return "00.00";
    const formattedValue = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(+value);

    return formattedValue;
  };

  return (
    <MaterialUI.Typography
      variant="h5"
      sx={{
        textAlign: "center",
        fontSize: {
          xs: "20px",
        },
        color: +convertedAmount < 0 ? "red" : "black",
      }}
    >
      {+convertedAmount < 0
        ? "Please enter a valid number"
        : `Converted Amount: ${formatNumber(convertedAmount)}`}
    </MaterialUI.Typography>
  );
}
