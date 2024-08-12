package com.a2m.library.constant;

public enum CheckoutStatus {
    REQUESTED,//Gui tin nhan cho admin
    APPROVED,//Admin duyet
    REJECTED,//Admin tu choi
    BORROWED,//Nguoi dung da lay sach
    EXPIRED,//Sach het han
    RETURNED//Sach da duoc tra thanh cong
}
