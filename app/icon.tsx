import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background:
            "radial-gradient(60px 60px at 50% 10%, rgba(236,72,153,0.55) 0%, rgba(0,0,0,1) 70%), linear-gradient(135deg, rgba(236,72,153,0.15), rgba(162,28,175,0.12))",
          color: "white",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 900,
          fontSize: 34,
          letterSpacing: -1,
        }}
      >
        A
      </div>
    ),
    size,
  );
}

