import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

const metropolisRegular = localFont({
  src: "./fonts/Metropolis-Regular.otf",
  variable: "--font-metroplis",
});

const metropolisSemiBold = localFont({
  src: "./fonts/Metropolis-SemiBold.otf",
  variable: "--font-metroplis-semiBold",
});

const metropolisBold = localFont({
  src: "./fonts/Metropolis-Bold.otf",
  variable: "--font-metroplis-bold",
});

const metropolisExtraBold = localFont({
  src: "./fonts/Metropolis-ExtraBold.otf",
  variable: "--font-metroplis-extraBold",
});

const metropolisLight = localFont({
  src: "./fonts/Metropolis-Light.otf",
  variable: "--font-metroplis-light",
});

const metropolisMedium = localFont({
  src: "./fonts/Metropolis-Medium.otf",
  variable: "--font-metroplis-medium",
});

const metropolisExtraLight = localFont({
  src: "./fonts/Metropolis-ExtraLight.otf",
  variable: "--font-metroplis-extraLight",
});

const metropolisThin = localFont({
  src: "./fonts/Metropolis-Thin.otf",
  variable: "--font-metroplis-Thin",
});

export const metadata: Metadata = {
  title: "NK Associates & Builders",
  description: "NK Associates & Builders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${metropolisRegular.variable} ${metropolisMedium.variable} ${metropolisSemiBold.variable} ${metropolisBold.variable} ${metropolisExtraBold.variable} ${metropolisLight.variable} ${metropolisExtraLight.variable} ${metropolisThin.variable} bg-nk-background font-metropolis`}
      >
        <Navigation />
        <main className="mt-[5.5rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
