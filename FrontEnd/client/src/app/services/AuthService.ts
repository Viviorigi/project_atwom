import axios from "axios";
import { ApiUrlUtil } from "../utils/ApiUrlUtil";
import { ParamUtil, RequestParam } from "../utils/ParamUtil";
import { HeadersUtil } from "../utils/Headers.Util";

export class AuthService {
  private static _cateService: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService._cateService) {
      AuthService._cateService = new AuthService();
    }
    return AuthService._cateService;
  }

  public login(login: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/auth/login`);
    return axios.post(url, login, {
      headers: HeadersUtil.getHeaders()
    });
  }

  public register(student:any){
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/student/register`);
    return axios.post(url,student, {
      headers: HeadersUtil.getHeaders()
    });
  }
  
  public update(student:any){
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/student/update`);
    return axios.post(url,student, {
      headers: HeadersUtil.getHeadersAuthFormData()
    });
  }

  public resetPass(email:any){
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/auth/forgot-password`);
    return axios.post(url,email, {
      headers: HeadersUtil.getHeaders()
    });
  }

  public getInfo(){
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/student/myinfo`);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth()
    });
  }

  public changePassword(pass:any){
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/api/student/change-pass`);
    return axios.post(url,pass, {
      headers: HeadersUtil.getHeadersAuth()
    });
  }
 
}