import { Box, Typography } from "@mui/material";
import CurrencyIcon from "../components/CurrencyIcon";

export default function Header() {
    return (
        <Box
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
                gap:"10px",
                bgcolor: "#00214A",
                color: "white",
                fontFamily: "Inter, Arial, sans-serif"
            }}
        >
            <CurrencyIcon onClick={function (): void {
                throw new Error("Function not implemented.");
            } } />

            <Typography
                sx={{
                    fontSize: {
                        xs: "25px",
                        sm: "30px",
                        md: "35px",
                        lg: "35px",
                    },
                }}
            >
                Best Exchange Rates
            </Typography>
        </Box>
    )
}