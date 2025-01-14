import * as MaterialUI from "@mui/material";
import CurrencyIcon from "../components/CurrencyIcon";

export default function Header() {
  return (
    <MaterialUI.Box
      sx={{
        width: "100%",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
        },
        gap: "10px",
        bgcolor: "#00214A",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <CurrencyIcon
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <MaterialUI.Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <MaterialUI.Typography
          sx={{
            fontSize: {
              xs: "25px",
              sm: "30px",
              md: "35px",
              lg: "35px",
            },
          }}
        >
          RateSnap
        </MaterialUI.Typography>
        <MaterialUI.Typography
          sx={{
            fontSize: {
              xs: "10px",
              sm: "10px",
              md: "15px",
              lg: "15px",
            },
          }}
        >
          Best Exchange Rates
        </MaterialUI.Typography>
      </MaterialUI.Box>
    </MaterialUI.Box>
  );
}
