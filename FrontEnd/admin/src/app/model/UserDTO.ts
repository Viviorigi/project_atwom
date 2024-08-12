import { RoleDTO } from "./RoleDTO";

export interface UserDTO {
    userUid: number;
    username: string;
    password: string;
    email: string;
    fullName: string;
    dob: string;  // ISO string format for dates
    className: string;
    phone: string;
    address: string;
    avatar: string;
    cre_dt: string;  // ISO string
    upd_dt: string;  // ISO string
    deleted: boolean;
    isActive: boolean;
    resetPasswordToken?: string;
    tokenExpirationDate?: string;  // ISO string
    roles: RoleDTO[];  // Giả sử bạn có model `RoleDTO`.
  }
  