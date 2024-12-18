import { Box, Typography} from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                width: "100%",
                height:"109px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection:"column",
                bgcolor: "#00214A",
                color: "white"
            }}
        >
                <Typography>
                © 2024 Exchange App. All rights reserved.
                </Typography>
        </Box>
    )
}