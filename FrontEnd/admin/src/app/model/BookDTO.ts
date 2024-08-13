import { CategoryDTO } from './CategoryDTO';
import { AuthorDTO } from './AuthorDTO';

export interface BookDTO {
  id: number;
  title: string;
  publicationYear: number;
  quantityPlaced: number;
  price: number;
  image: string;
  deleted: boolean;
  publisher: string;
  quantity: number;
  status: number;
  createdDate: string;
  updatedDate: string;
  category: CategoryDTO;
  authors: AuthorDTO[];
}
