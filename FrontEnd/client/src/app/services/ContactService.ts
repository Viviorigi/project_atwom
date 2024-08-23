import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUrlUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { HeadersUtil } from "../utils/Headers.Util";

export class ContactService {
  private static _contactService: ContactService;

  public static getInstance(): ContactService {
    if (!ContactService._contactService) {
        ContactService._contactService = new ContactService();
    }
    return ContactService._contactService;
  }

  public create(data: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/admin/contact/create`);
    return axios.post(url, data, {
      headers: HeadersUtil.getHeaders()
    });
  }
 
}