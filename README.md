# MangaWeb

MangaWeb là một dự án web giúp bạn đọc và quản lý truyện tranh trực tuyến dễ dàng.

## Tính năng

- Đăng nhập, đăng ký tài khoản để đồng bộ dữ liệu cá nhân.
- Phân quyền dễ dàng thông qua giao diện cho admin
- Duyệt, tìm kiếm và đọc truyện tranh với giao diện hiện đại.
- Quản lý danh sách truyện yêu thích.
- Quản lý truyện cho các nhóm dịch
- Tối ưu hiệu năng với Next.js và TypeScript.


## Bắt đầu

### Cấu trúc thư mục dự án

```plaintext
manage-manga-web/
├── public/               # Tài nguyên tĩnh (ảnh, favicon, v.v.)
├── src/
│   ├── app/              # Cấu trúc ứng dụng Next.js (routing, layout)
│   ├── components/       # Các thành phần giao diện dùng chung
│   ├── helpers/          # Các hàm hỗ trợ, xử lý logic nhỏ
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Xử lý logic kết nối API, Supabase, v.v.
│   ├── types/            # Định nghĩa TypeScript types/interfaces
│   └── utils/            # Tiện ích, hàm dùng chung
├── .env                  # Biến môi trường
├── next.config.js        # Cấu hình Next.js
├── tailwind.config.js    # Cấu hình Tailwind CSS
├── package.json          # Thông tin và phụ thuộc dự án
└── README.md             # Tài liệu dự án
```

Cài đặt các phụ thuộc:

```bash
npm install

Chạy server phát triển:

```bash
npm run dev

Truy cập [http://localhost:3000](http://localhost:3000) để sử dụng ứng dụng.

## Công nghệ sử dụng

- [Next.js](https://nextjs.org) – Framework React hiện đại.
- [TypeScript](https://www.typescriptlang.org/) – Ngôn ngữ lập trình mạnh mẽ cho JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) – Thiết kế giao diện nhanh chóng.
- [Supabase](https://supabase.com/) – Lưu trữ dữ liệu truyện và người dùng.
- [Google Drive](https://drive.google.com/) – Giải pháp lưu trữ hiệu quả cho trang Web.

## Triển khai

Có thể triển khai nhanh chóng trên [Vercel](https://vercel.com/) hoặc các nền tảng cloud khác.
