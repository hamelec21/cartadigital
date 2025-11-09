export interface Producto {
  id: number;
  categoria_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  activo: boolean;
}

export interface Categoria {
  id: number;
  restaurante_id: number;
  nombre: string;
  orden: number;
  activo: boolean;
  productos: Producto[];
}

export interface Restaurante {
  id: number;
  nombre: string;
  slug: string;
  logo?: string;
  color_primario?: string;
  descripcion?: string;
  telefono?: string;
  direccion?: string;
  activo: boolean;
  fecha_pago?: string;
  categorias: Categoria[];
}
