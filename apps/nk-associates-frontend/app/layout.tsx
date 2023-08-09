import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "../components/footer/footer";
import Navigation from "../components/navigation/navigation";

const metropolisRegular = localFont({
  src: "./assets/fonts/Metropolis-Regular.otf",
  variable: "--font-metroplis",
});

const metropolisSemiBold = localFont({
  src: "./assets/fonts/Metropolis-SemiBold.otf",
  variable: "--font-metroplis-semiBold",
});

const metropolisBold = localFont({
  src: "./assets/fonts/Metropolis-Bold.otf",
  variable: "--font-metroplis-bold",
});

const metropolisExtraBold = localFont({
  src: "./assets/fonts/Metropolis-ExtraBold.otf",
  variable: "--font-metroplis-extraBold",
});

const metropolisLight = localFont({
  src: "./assets/fonts/Metropolis-Light.otf",
  variable: "--font-metroplis-light",
});

const metropolisMedium = localFont({
  src: "./assets/fonts/Metropolis-Medium.otf",
  variable: "--font-metroplis-medium",
});

const metropolisExtraLight = localFont({
  src: "./assets/fonts/Metropolis-ExtraLight.otf",
  variable: "--font-metroplis-extraLight",
});

const metropolisThin = localFont({
  src: "./assets/fonts/Metropolis-Thin.otf",
  variable: "--font-metroplis-Thin",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <main className="mt-[7rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
