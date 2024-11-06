import "@/app/global.css";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { MoviesProvider } from "./context/MoviesContext";

export const metadata: Metadata = {
  title: "Cinema Guru | Michael Moser",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <MoviesProvider>
            {children}
          </MoviesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
