import { Box } from "@mui/material";
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
                color: "white"
            }}
        >
            <CurrencyIcon />
            
        </Box>
    )
}