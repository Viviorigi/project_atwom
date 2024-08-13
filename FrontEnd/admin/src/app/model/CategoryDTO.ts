import { BookDTO } from "./BookDTO";

export interface CategoryDTO {
    id: number;
    name: string;
    deleted: boolean;
    books: BookDTO[];  // Giả sử bạn có model `BookDTO`.
  }
  