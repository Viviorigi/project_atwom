import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUrlUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { HeadersUtil } from "../utils/Headers.Util";

export class BannerService {
  private static _bannerService: BannerService;

  public static getInstance(): BannerService {
    if (!BannerService._bannerService) {
        BannerService._bannerService = new BannerService();
    }
    return BannerService._bannerService;
  }

  public getList(modelSearch: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/admin/banner/getAll`, params);

    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth()
    });
  }
 
}