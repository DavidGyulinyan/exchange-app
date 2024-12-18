import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    bgcolor: "#00214A",
                    color: "white",
                }}
            >
                <Typography>
                    © 2024 Exchange App. All rights reserved.
                </Typography>
            <Box
                sx={{
                    width: "100%",
                    height:"10px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >

                <Link href="https://www.exchangerate-api.com/terms">terms of use</Link>
            </Box>
            </Box>
        </>
    )
}