"use client";
import * as MaterialUI from "@mui/material";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import fontTheme from "./theme/fontTheme";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MaterialUI.ThemeProvider theme={fontTheme}>
          <MaterialUI.CssBaseline />
          <Header />
          {children}
          <Footer />
        </MaterialUI.ThemeProvider>
      </body>
    </html>
  );
}
