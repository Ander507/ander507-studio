import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ander507 · Web developer",
    short_name: "Ander507",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#14213d",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
