import { Box, Typography} from "@mui/material";
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
                bgcolor: "#00214A",
                color: "white",
                fontFamily: "Inter, Arial, sans-serif"
            }}
        >
            <CurrencyIcon />
                <Typography variant="h3">
                    Best Exchange Rates
                </Typography>
        </Box>
    )
}