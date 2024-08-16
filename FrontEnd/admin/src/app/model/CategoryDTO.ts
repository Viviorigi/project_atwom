import { BookDTO } from "./BookDTO";

export class  CategoryDTO {
  id?: number;
  name?: string;
  description?: string;
  deleted?: boolean;
  books?: BookDTO[];
  }
  