export interface PropertyImage { id:number; image:string; alt:string }
export interface Property {
  id:number; title:string; slug:string; description?:string; price:string; currency:string;
  address?:string; city?:string; state?:string; country?:string;
  bedrooms:number; bathrooms:number; area_sqft?:string|null; is_published:boolean;
  created_at:string; updated_at:string; images: PropertyImage[];
}
export interface Agent { id:number; slug:string; name:string; phone?:string; bio?:string; avatar?:string|null }
