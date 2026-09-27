import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ander507.dev — Web Apps, Minecraft Mods & Projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(192,38,211,0.35) 0%, rgba(0,0,0,1) 55%), linear-gradient(90deg, rgba(236,72,153,0.08), rgba(162,28,175,0.06))",
          color: "white",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.05 }}>
            Ander507.dev
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.78)", lineHeight: 1.3 }}>
            Web apps, Minecraft mods, and projects.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

