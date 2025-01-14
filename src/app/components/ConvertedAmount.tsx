import * as MaterialUI from "@mui/material";

interface ConvertedAmountProps {
  currencies: any[];
  toCurrency: string;
  convertedAmount: number | string;
}

export default function ConvertedAmount({
  convertedAmount,
}: ConvertedAmountProps) {
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
        ? "Please enter the valid number"
        : `Converted Amount: ${+convertedAmount || "00.00"}`}
    </MaterialUI.Typography>
  );
}
