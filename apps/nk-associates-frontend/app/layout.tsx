import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScrollContainer from "./smooth-scroll";
import Footer from "../components/footer/footer";
import { MapApiProvider } from "./context/map-context";
import Navigation from "../components/navigation/navigation";

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
  title: "NK Associates",
  description:
    "NK Associates Pvt Ltd is a real estate development, construction, and investment consultancy company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${metropolisRegular.variable} ${metropolisMedium.variable} ${metropolisSemiBold.variable} ${metropolisBold.variable} ${metropolisExtraBold.variable} ${metropolisLight.variable} ${metropolisExtraLight.variable} ${metropolisThin.variable} bg-nk-background font-metropolis`}
      >
        <div id="smooth-wrapper">
          <Navigation />
          <main id="smooth-content">
            <MapApiProvider>
              <SmoothScrollContainer>{children}</SmoothScrollContainer>
            </MapApiProvider>
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
