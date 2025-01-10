"use client";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
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
        <ThemeProvider theme={fontTheme}>
          <CssBaseline />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
