export class BookSearch{
    keySearch: string
    cate_name: string
    public_year: number
    nxb: string
    page: number
    cate_id: number
    timer: number

    constructor(keySearch: string, cate_name: string, public_year: number, nxb: string, page: number, cate_id: number, timer: number){
        this.keySearch = keySearch;
        this.cate_name = cate_name
        this.public_year = public_year
        this.nxb = nxb
        this.page = page;
        this.cate_id = cate_id;
        this.timer = timer;
    }
}