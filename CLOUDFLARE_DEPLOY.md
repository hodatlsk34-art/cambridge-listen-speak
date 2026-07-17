# Triển khai Cambridge Listen & Speak trên Cloudflare

Ứng dụng chạy bằng Cloudflare Workers với hai binding:

- `DB`: D1, lưu tài khoản, tiến độ, điểm và thông tin bản ghi.
- `BUCKET`: R2, lưu tệp ghi âm.

Không ghi mật khẩu hoặc khóa API vào GitHub.

## 1. Đưa mã lên GitHub

Giải nén gói mã nguồn và đưa toàn bộ nội dung vào repository riêng tư:
`hodatlsk34-art/cambridge-listen-speak`.

## 2. Tạo Worker từ GitHub

Trong Cloudflare Dashboard:

1. Mở **Workers & Pages**.
2. Chọn **Create application** > **Import a repository**.
3. Kết nối GitHub và chọn `cambridge-listen-speak`.
4. Dùng lệnh build `npm run build`.
5. Giữ thư mục gốc của repository làm root directory.

Cloudflare có thể tự nhận diện dự án Next.js/Workers. Nếu được hỏi lệnh triển khai,
dùng `npx wrangler deploy`.

## 3. Tạo và gắn D1

1. Mở **Storage & Databases** > **D1 SQL Database**.
2. Tạo database `cambridge-listen-speak-db`.
3. Mở database vừa tạo và sao chép **Database ID**.
4. Trong cấu hình build/deploy của Worker, thêm biến
   `CLOUDFLARE_D1_DATABASE_ID` với giá trị là Database ID vừa sao chép.
5. Deploy lại dự án. Cấu hình build sẽ tạo D1 binding tên chính xác `DB`.

Không dùng ID mẫu `00000000-0000-4000-8000-000000000000`. Nếu chưa khai báo
`CLOUDFLARE_D1_DATABASE_ID`, dự án vẫn deploy được nhưng các chức năng đăng nhập,
quản trị và lưu tiến độ cần database sẽ chưa hoạt động.

Ứng dụng tự tạo bảng cần thiết trong lần đăng nhập đầu tiên.

## 4. Tạo và gắn R2

1. Mở **R2 Object Storage**.
2. Tạo bucket `cambridge-listen-speak-recordings`.
3. Trong Worker, mở **Settings** > **Bindings**.
4. Thêm R2 binding với tên biến chính xác `BUCKET`.
5. Chọn bucket vừa tạo.

## 5. Thiết lập Secrets

Trong **Settings** > **Variables and Secrets**, tạo ba secret:

- `ADMIN_LOGIN_CODE`: mã đăng nhập Admin.
- `ADMIN_INITIAL_PASSWORD`: đặt mật khẩu Admin mới, không dùng lại mật khẩu từng chia sẻ.
- `SESSION_SECRET`: chuỗi ngẫu nhiên dài tối thiểu 32 ký tự.

Không đặt các giá trị này trong `.env`, README, mã nguồn hoặc GitHub Actions.

## 6. Xuất bản và kiểm tra

Deploy lại Worker sau khi thêm bindings và secrets. Cloudflare sẽ cấp URL dạng:
`https://cambridge-listen-speak.<subdomain>.workers.dev`.

Kiểm tra lần lượt `/`, `/login`, đăng nhập Admin, tạo một tài khoản thử và đăng nhập
tài khoản đó trước khi mời học viên.

## Lưu ý dữ liệu trẻ em

Chỉ bật lưu bản ghi sau khi đã có thông báo xin quyền micro, cơ chế xóa bản ghi và
xác nhận của phụ huynh cho học viên nhỏ tuổi.
