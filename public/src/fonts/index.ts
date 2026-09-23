import localFont from "next/font/local";

export const manrope = localFont({
  src: [
    {
      path: "./manrope/Manrope-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./manrope/Manrope-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./manrope/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./manrope/Manrope-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./manrope/Manrope-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./manrope/Manrope-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./manrope/Manrope-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});
