import { Typography } from '@mui/material';

interface ConvertedAmountProps {
  currencies: any[];
  toCurrency: string;
  convertedAmount: number | string;
}

export default function ConvertedAmount({ currencies, toCurrency, convertedAmount }: ConvertedAmountProps) {
  return (
    <Typography
      variant="h5"
      sx={{
        textAlign:"center",
        fontSize: {
          xs: "20px"
        }
      }}
    >
      {`Converted Amount: ${+convertedAmount || "00.00"}`}
    </Typography>
  );
};
