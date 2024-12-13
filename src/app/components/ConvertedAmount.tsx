import { Typography } from '@mui/material';

interface ConvertedAmountProps {
  currencies: any[];
  toCurrency: string;
  convertedAmount: number | string;
}

export default function ConvertedAmount({ currencies, toCurrency, convertedAmount }: ConvertedAmountProps) {  
  return (
    <Typography variant="h5">
      {`Converted Amount: ${+convertedAmount || "00.00"} ${currencies.find((c: any) => c.currencyName === toCurrency)?.currencySign}`}
    </Typography>
  );
};
