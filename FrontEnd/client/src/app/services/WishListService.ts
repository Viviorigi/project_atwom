import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUrlUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { HeadersUtil } from "../utils/Headers.Util";

export class WishService {
  private static _wishListService: WishService;

  public static getInstance(): WishService {
    if (!WishService._wishListService) {
      WishService._wishListService = new WishService();
    }
    return WishService._wishListService;
  }

  public getWishlist() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/wishlist/lst`);

    return axios.get(url,{
      headers: HeadersUtil.getHeadersAuth()
    });
  }


  public add(bookId: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/wishlist/add?bookId=${bookId}`);

    return axios.post(url,{},{
      headers: HeadersUtil.getHeadersAuth()
    });
  }

  public remove(bookId: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/wishlist/remove?bookId=${bookId}`);

    return axios.delete(url,{
      headers: HeadersUtil.getHeadersAuth()
    });
  }

  public check(bookId: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/wishlist/check?bookId=${bookId}`);

    return axios.get(url,{
      headers: HeadersUtil.getHeadersAuth()
    });
  }

 
}