import { CategoryDTO } from './CategoryDTO';
import { AuthorDTO } from './AuthorDTO';

export class BookDTO {
  id?: number;
  title?: string;
  publisher?:string;
  publicationYear?: number;
  quantityPlaced?: number;
  price?: number;
  image?: string;
  deleted?: number;
  quantity?: number;
  status?: number;
  createdDate?: string;
  updatedDate?: string;
  category?: CategoryDTO;
  authors?: AuthorDTO[];  
}
