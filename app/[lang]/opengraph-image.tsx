import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content";

export const alt = "Ander507";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;
  const t = getContent(isLocale(lang) ? lang : "en");
  const [first, ...rest] = t.hero.title.split(", ");
  const tags = t.services.items.slice(0, 3).map((item) => item.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#14213d",
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 20, height: 20, background: "#d62839" }} />
          ander507.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>
            {`${first},`}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>
            {rest.join(", ")}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 22,
                padding: "10px 18px",
                borderRadius: 6,
                border: "1px solid #d9dee6",
                background: "#ffffff",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
