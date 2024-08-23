export class BookDTO {
    id?: number;
    title?: string;
    publisher?:string;
    publicationYear?: number;
    description?:string;
    price?: number;
    image?: string; 
    quantity?: number;
    active?:boolean;
    cateId?:number;
    cateName?:string;
    createdDate?: string;
    updatedDate?: string;
    imagebooks?:[];
  }
  