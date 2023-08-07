"use client";

import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import NavbarComp from "./homeComponents/NavbarComp";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "./redux/store";

const inter = Inter({ subsets: ["latin"] });


const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#88b4b4",
    },
    secondary: {
      main: "#eaeaf2",
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Provider store={store}>
        <body className={inter.className} suppressHydrationWarning={true}>
          <Box>
            <ThemeProvider theme={theme}>
              <NavbarComp />
              {children}
            </ThemeProvider>
          </Box>
        </body>
      </Provider>
    </html>
  );
}
