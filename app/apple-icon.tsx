import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 48,
          background:
            "radial-gradient(180px 140px at 50% 0%, rgba(236,72,153,0.5) 0%, rgba(0,0,0,1) 70%), linear-gradient(135deg, rgba(236,72,153,0.18), rgba(162,28,175,0.14))",
          color: "white",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 900,
          fontSize: 96,
          letterSpacing: -2,
        }}
      >
        A
      </div>
    ),
    size,
  );
}

