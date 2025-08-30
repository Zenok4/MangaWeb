### Hướng dẫn sử dụng API của GG mà không cần tự viết API

#### 1. Action
- **Mục đích:** Định nghĩa các hành động (action) tương tác với Service/API.
- **Chi tiết:** Thay vì phải tự xây dựng các endpoint API, bạn chỉ cần khai báo các action tại đây. Mỗi action sẽ đại diện cho một thao tác (ví dụ: lấy dữ liệu, tạo mới, cập nhật, xóa, v.v.).
- **Ví dụ:**  
    ```js
    // actions/getUser.js
    export const getUser = async (id) => {
        // logic gọi Service hoặc xử lý dữ liệu
    }
    ```

#### 2. Drive (Services)
- **Mục đích:** Xử lý logic nghiệp vụ liên quan đến các action.
- **Lưu ý:** Dòng đầu tiên của mỗi file service phải luôn có `use server` để đảm bảo chạy phía server.
- **Chi tiết:** Tại đây, triển khai các logic phức tạp hơn, xử lý dữ liệu trước khi trả về cho client.
- **Ví dụ:**  
    ```js
    // services/userService.js
    'use server'
    import { getUser } from '../actions/getUser'

    export const getUserProfile = async (id) => {
        const user = await getUser(id)
        // xử lý thêm nếu cần
        return user
    }
    ```

#### 3. Tổng kết
- **Action:** Định nghĩa thao tác với Service/API.
- **Drive (Services):** Xử lý logic nghiệp vụ, luôn bắt đầu bằng `use server`.
