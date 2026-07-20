# Open Dialogue Sources

Mục tiêu là loại bỏ hội thoại tạo theo khuôn lặp, dùng corpus mở để nghiên cứu
tình huống và nhịp lượt lời, rồi biên soạn nội dung học mới theo CEFR. Không
sao chép nguyên văn transcript bên ngoài vào sản phẩm.

## Uu tien dua vao pipeline

| Source | License | Nen dung cho |
|---|---:|---|
| Google Taskmaster | CC BY 4.0 | Dich vu doi song, dat lich, goi mon, phim, di chuyen |
| MultiWOZ | CC BY 4.0 | Nha hang, khach san, taxi, tau, dia diem |
| Schema-Guided Dialogue | CC BY-SA 4.0 | Travel, events, weather, restaurants, media |
| DRAL | CC0 | Cau ngan, fragment hoi thoai song ngu |

## Cách dùng trong phiên bản hiện tại

- Taskmaster, MultiWOZ và Schema-Guided Dialogue cung cấp taxonomy cho các miền
  dịch vụ, di chuyển, đặt lịch, mua sắm và xử lý vấn đề.
- DRAL cung cấp tham chiếu về lời nói tự nhiên và ý định dụng học.
- 2.000 bài xuất bản trong `app/dialogues.ts` và `app/dialogues-expanded.ts`
  đều là nội dung biên soạn mới, tổ chức thành 20 nhóm đời sống và phân bổ gần
  đều cho 7 bậc từ A0–Pre A1 đến C2.
- Mỗi bài mở rộng ghi rõ corpus được dùng làm cơ sở taxonomy; nhãn này không có
  nghĩa là bài học sao chép transcript của corpus đó.
- DailyDialog và DailyTalk không được nhập vào sản phẩm vì có điều kiện phi
  thương mại hoặc mô tả phạm vi dùng cho học thuật.

DailyDialog chi dung neu web phi thuong mai vi license CC BY-NC-SA 4.0.

BBC Learning English va ESL Fast chi nen tham khao cau truc/chuyen de, khong copy transcript/audio neu chua co quyen.
