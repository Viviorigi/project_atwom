import { BookDTO } from "./BookDTO";

export class CategoryDTO {
    id?: number;
    name?: string;
    description?: string;
    deleted?: boolean;
    books?: BookDTO[];  // Giả sử bạn có model `BookDTO`.
  }
  