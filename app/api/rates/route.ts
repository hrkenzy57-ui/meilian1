import { NextResponse } from "next/server";

export const runtime = "edge";

/**
 * Google Sheet setup:
 * 1) Tạo 1 Google Sheet với các ô:
 *    - B2: MUA_VAO
 *    - C2: BAN_RA
 *    - D2: TOPUP_GAME
 * 2) Share sheet -> Anyone with the link -> Viewer
 * 3) Copy SHEET_ID vào .env (SHEET_ID=...)
 * 4) (Optional) Nếu sheet của bạn có tab khác "Sheet1" thì set SHEET_GID hoặc SHEET_NAME
 *
 * Endpoint này đọc sheet thông qua Google Visualization API (không cần API key).
 */

function parseGViz(text: string) {
  // Google returns: google.visualization.Query.setResponse({...});
  const match = text.match(/setResponse\(([\s\S]*)\);?\s*$/);
  if (!match) return null;
  return JSON.parse(match[1]);
}

export async function GET() {
  const SHEET_ID = process.env.SHEET_ID;
  const SHEET_GID = process.env.SHEET_GID; // optional
  const SHEET_NAME = process.env.SHEET_NAME; // optional

  if (!SHEET_ID) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing SHEET_ID env. Add SHEET_ID to your environment variables.",
      },
      { status: 400 }
    );
  }

  // Use GViz API (public sheet)
  const sheetPart = SHEET_GID
    ? `gid=${encodeURIComponent(SHEET_GID)}`
    : SHEET_NAME
      ? `sheet=${encodeURIComponent(SHEET_NAME)}`
      : "";

  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
    SHEET_ID
  )}/gviz/tq?${sheetPart}&tqx=out:json&tq=${encodeURIComponent(
    "select B,C,D limit 1"
  )}`;

  const res = await fetch(url, {
    // Edge caching: cache for 60s
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: "Failed to fetch Google Sheet", status: res.status },
      { status: 500 }
    );
  }

  const raw = await res.text();
  const json = parseGViz(raw);

  try {
    const row = json.table.rows?.[0]?.c || [];
    const buy = Number(row?.[0]?.v ?? 0);
    const sell = Number(row?.[1]?.v ?? 0);
    const topup = Number(row?.[2]?.v ?? 0);

    return NextResponse.json(
      {
        ok: true,
        source: "google_sheet",
        updatedAt: new Date().toISOString(),
        rates: {
          buy,
          sell,
          topup,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Could not parse sheet response", raw: raw.slice(0, 200) },
      { status: 500 }
    );
  }
}
