# Deploy (Vercel / Netlify) + Google Sheet Rates

## 1) Chuẩn bị Google Sheet
- Tạo 1 sheet công khai (Anyone with the link -> Viewer)
- Ở hàng 2:
  - B2: MUA_VAO (số)
  - C2: BAN_RA (số)
  - D2: TOPUP_GAME (số)

## 2) Set Environment Variables
Trên Vercel/Netlify, thêm:
- `SHEET_ID` = ID của Google Sheet (đoạn giữa `/d/` và `/edit`)
- (Optional) `SHEET_GID` = gid của tab (ví dụ 0)
- (Optional) `SHEET_NAME` = tên tab nếu không dùng gid

## 3) Deploy lên Vercel
1. Push code lên GitHub
2. Vercel -> New Project -> Import repo
3. Add env vars ở bước cấu hình
4. Deploy

## 4) Deploy lên Netlify
1. Push code lên GitHub
2. Netlify -> New site from Git -> chọn repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add env vars trong Site settings -> Environment variables
6. Deploy

## 5) Test API
Mở:
- `/api/rates`

Bạn sẽ nhận JSON:
```json
{
  "ok": true,
  "source": "google_sheet",
  "updatedAt": "...",
  "rates": { "buy": 0, "sell": 0, "topup": 0 }
}
```
