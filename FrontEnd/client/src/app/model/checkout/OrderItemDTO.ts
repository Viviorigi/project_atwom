export class OrderItemDTO {
    bookId: number;
    cateId: number;
    quantity: number;
    checkoutId: number;//main
    userUid: number;
    startTime: string;
    status: string;
    checkoutDetails: any[];
    bookTitle: string;
    bookImage: string;
    categoryName: string;
    totalPrice: number;
  
    constructor(
      bookId: number,
      cateId: number,
      quantity: number,
      checkoutId: number,
      userUid: number,
      startTime: string,
      status: string,
      checkoutDetails: any[],
      bookTitle: string,
      bookImage: string,
      categoryName: string,
      totalPrice: number
    ) {
      this.bookId = bookId;
      this.cateId = cateId;
      this.quantity = quantity;
      this.checkoutId = checkoutId;
      this.userUid = userUid;
      this.startTime = startTime;
      this.status = status;
      this.checkoutDetails = checkoutDetails;
      this.bookTitle = bookTitle;
      this.bookImage = bookImage;
      this.categoryName = categoryName;
      this.totalPrice = totalPrice;
    }
  
    static fromCheckoutDTO(checkout: any): OrderItemDTO[] {
      return checkout.checkoutDetails.map((detail: any) => {
        const book = detail.book;
        const category = book.category;
        const totalPrice = book.price * detail.quantity;
  
        return new OrderItemDTO(
          book.id,
          category.id,
          detail.quantity,
          checkout.id,
          checkout.userUid,
          checkout.startTime,
          checkout.status,
          checkout.checkoutDetails,
          book.title,
          book.image,
          category.name,
          totalPrice
        );
      });
    }
  }
  