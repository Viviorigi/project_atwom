import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUrlUtil";
import { HeadersUtil } from "../utils/Headers.Util";
import { BookDTO } from "../model/BookDTO";

export class CartService {
  private static _cartService: CartService;

  public static getInstance(): CartService {
    if (!CartService._cartService) {
      CartService._cartService = new CartService();
    }
    return CartService._cartService;
  }

  async getBookById(id: number): Promise<BookDTO> {
    return axios.get(process.env.REACT_APP_API_URL +`/book/${id}`).then(response => response.data);
  }

  public getCart() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/cart`);

    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public addBookToCart(bookId: number, quantity: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/api/cart/add?bookId=${bookId}&quantity=${quantity}`
    );

    return axios.post(url, {}, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public removeBookFromCart(cartId: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/api/cart/remove?cartId=${cartId}`
    );

    return axios.delete(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public updateBookQuantity(cartId: number, quantity: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/api/cart/update?cartId=${cartId}&quantity=${quantity}`
    );

    return axios.put(url, {}, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public clearCart() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/cart/clear`);

    return axios.delete(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
}
