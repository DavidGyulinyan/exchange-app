import { createTheme } from "@mui/material/styles";

const fontTheme = createTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#2563eb", // Modern blue
    },
    secondary: {
      main: "#10b981", // Emerald green
    },
    background: {
      default: "#f8fafc", // Light gray
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default fontTheme;
