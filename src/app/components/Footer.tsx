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
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <MaterialUI.Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Looking for a skilled developer?
          </MaterialUI.Typography>
          <MaterialUI.Link
            href="mailto:gyulinyand@gmail.com?subject=interested"
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
          <MaterialUI.Link
            href="tel:+37441855800"
            sx={{
              fontSize: "14px",
              color: "#4CAF50",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Call us at +37441855800
          </MaterialUI.Link>
        </MaterialUI.Box>
      </MaterialUI.Box>
    </>
  );
}
