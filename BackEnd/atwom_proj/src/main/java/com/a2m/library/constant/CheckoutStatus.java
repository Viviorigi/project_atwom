package com.a2m.library.constant;

public enum CheckoutStatus {
    REQUESTED,//Đã gửi thông báo tới admin
    APPROVED,//Admin duyệt
    REJECTED,//Admin từ chối
    BORROWED,//Người dùng đã ấy sách
    EXPIRED,//Sách hết hạn
    RETURNED,//Sách đã được trả thành công
    PENALTY//Sách quá hạn 2 tuần hoặc không trả được sách
}
