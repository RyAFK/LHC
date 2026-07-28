import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0A2540",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontSize: 96, fontWeight: 700, color: "#F0F8FA" }}>LHC</span>
          <span style={{ fontSize: 28, color: "#C8C1B5", letterSpacing: 2 }}>
            LONDON HEART CENTRE
          </span>
        </div>
        <div style={{ width: 120, height: 4, backgroundColor: "#AA875C", marginTop: 32, marginBottom: 32 }} />
        <span style={{ fontSize: 42, color: "#F0F8FA", maxWidth: 900 }}>
          Expert heart care, without the uncertainty.
        </span>
        <span style={{ fontSize: 24, color: "#C8C1B5", marginTop: 20 }}>
          {siteConfig.address.line1}, {siteConfig.address.locality}
        </span>
      </div>
    ),
    { ...size }
  );
}
