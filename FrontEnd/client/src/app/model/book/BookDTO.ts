import { CategoryDTO } from './CategoryDTO';
import { AuthorDTO } from './AuthorDTO';

export class BookDTO {
  id: number | undefined;
  title?: string;
  publisher?:string;
  publicationYear?: number;
  quantityPlaced?: number;
  description?:string;
  price?: number;
  image?: string; 
  deleted?: number;
  quantity?: number;
  status?: number;
  active?:boolean;
  createdDate?: string;
  updatedDate?: string;
  category?: CategoryDTO;
  authors?: AuthorDTO[];  
}
