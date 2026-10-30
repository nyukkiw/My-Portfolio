import { ImageResponse } from "next/og";
import { content } from "@/content";

export const alt = content.site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Warna dari design-system/nyu-portfolio/MASTER.md
const colors = {
  background: "#0A1224",
  card: "#0F1B33",
  border: "#2A4170",
  foreground: "#E6EDF7",
  muted: "#8FA3C2",
  accent: "#22D3EE",
};

// Siku ala kartu situs: dua garis aksen 36px x 3px di tiap sudut.
function Corner({ top, left }: { top: boolean; left: boolean }) {
  const pos = {
    [top ? "top" : "bottom"]: 40,
    [left ? "left" : "right"]: 40,
  };
  return (
    <div style={{ position: "absolute", display: "flex", width: 36, height: 36, ...pos }}>
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 0,
          [left ? "left" : "right"]: 0,
          width: 36,
          height: 3,
          background: colors.accent,
        }}
      />
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 0,
          [left ? "left" : "right"]: 0,
          width: 3,
          height: 36,
          background: colors.accent,
        }}
      />
    </div>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 120px",
          background: colors.background,
          color: colors.foreground,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
            display: "flex",
            border: `1px solid ${colors.border}`,
          }}
        />
        <Corner top left />
        <Corner top left={false} />
        <Corner top={false} left />
        <Corner top={false} left={false} />

        <div style={{ display: "flex", alignItems: "baseline", fontSize: 200, fontWeight: 700, lineHeight: 1 }}>
          <span>{content.site.wordmark}</span>
          <span style={{ color: colors.accent }}>_</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            maxWidth: 900,
            fontSize: 40,
            lineHeight: 1.35,
            color: colors.muted,
          }}
        >
          {content.hero.lead}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 120,
            bottom: 80,
            fontSize: 24,
            letterSpacing: 4,
            color: colors.accent,
          }}
        >
          {content.footer.brand}
        </div>
      </div>
    ),
    { ...size },
  );
}
