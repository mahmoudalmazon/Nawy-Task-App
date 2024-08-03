import { Inter } from "next/font/google";
import "./globals.css";
import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nawy Task App",
  description: "apartment task app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Container padding={2}>
      {children}
      </Container>
      </body>
    </html>
  );
}
