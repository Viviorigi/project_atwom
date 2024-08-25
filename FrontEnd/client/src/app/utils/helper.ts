export function currencyFormat(num: number | undefined): string {
    if (num === undefined || isNaN(num)) {
        return "0.00đ"; // Hoặc xử lý lỗi theo cách bạn muốn
    }
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "đ";
}