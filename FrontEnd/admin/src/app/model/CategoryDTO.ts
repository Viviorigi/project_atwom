import { BookDTO } from "./BookDTO";

export class  CategoryDTO {
  id?: number;
  name?: string;
  description?: string;
  createdDate?:string;
  updatedDate?:string;
  deleted?: boolean;
  books?: BookDTO[]; 
  }
  