import { CheckoutDTO } from './CheckoutDTO';

export interface UserFineDTO {
  id: number;
  checkoutId: number;
  amount: number;
}

export class UserFine {
  id: number;
  checkout: CheckoutDTO;
  amount: number;

  constructor(id: number, checkout: CheckoutDTO, amount: number) {
    this.id = id;
    this.checkout = checkout;
    this.amount = amount;
  }

  static fromDTO(dto: UserFineDTO, checkout: CheckoutDTO): UserFine {
    return new UserFine(dto.id, checkout, dto.amount);
  }

  toDTO(): UserFineDTO {
    return {
      id: this.id,
      checkoutId: this.checkout.id,
      amount: this.amount,
    };
  }
}
