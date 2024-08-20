
export interface UserDTO {
    userUid: string;
    fullName: string;
}

export interface CheckoutDTO {
    id: number;
    status: string;
    startTime: string;
    endTime: string;
    user: UserDTO;
}

export interface ReturnDTO {
    id: number;
    returnDate: string;
    status: string;
    user: UserDTO;
    checkout: CheckoutDTO;
    fine:number;
}
