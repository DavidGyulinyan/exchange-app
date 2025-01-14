import * as MaterialUI from "@mui/material";

export default function Footer() {
  function getCurrentYear(): number {
    const date = new Date();
    return date.getFullYear();
  }

  return (
    <>
      <MaterialUI.Box
        sx={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "#00214A",
          color: "white",
        }}
      >
        <MaterialUI.Typography>
          © {getCurrentYear()} Exchange App. All rights reserved.
        </MaterialUI.Typography>
        <MaterialUI.Typography
          sx={{
            fontSize: "12px",
          }}
        >
          Created by Davit Gyulinyan
        </MaterialUI.Typography>
        <MaterialUI.Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <MaterialUI.Link
            href="https://docs.google.com/document/d/e/2PACX-1vSqgDzlbEnxw-KoCS6ecj_tGzjSlkxDc7bUBMwzor65LKNLTEqzxm4q2iVvStCkmzo4N6dnVlcRGRuo/pub"
            sx={{
              fontSize: "12px",
            }}
          >
            Terms of use
          </MaterialUI.Link>
        </MaterialUI.Box>
        <MaterialUI.Box
          sx={{
            width: "100%",
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          <MaterialUI.Typography
            sx={{
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            Looking for a skilled developer?
          </MaterialUI.Typography>
          <MaterialUI.Link
            href="mailto:gyulinyand@gmail.com"
            sx={{
              fontSize: "14px",
              color: "#4CAF50",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Contact me at gyulinyand@gmail.com
          </MaterialUI.Link>
        </MaterialUI.Box>
      </MaterialUI.Box>
    </>
  );
}
