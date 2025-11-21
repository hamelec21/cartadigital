import { FC } from "react";
import { Categoria } from "../types";
import ProductoCard from "./ProductoCard";

interface Props {
  categoria: Categoria;
  colorPrimario?: string;
}

const CategoriaSection: FC<Props> = ({ categoria, colorPrimario }) => {
  if (!categoria.productos || categoria.productos.length === 0) return null;

  return (
    <section className="scroll-mt-24" id={`categoria-${categoria.id}`}>
      {/* Título de categoría */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="h-8 w-1.5 rounded-full"
          style={{ backgroundColor: colorPrimario ?? "#4f46e5" }}
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {categoria.nombre}
        </h2>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoria.productos.map((producto) => (
          <div
            key={producto.id}
            className="h-full"
          >
            <ProductoCard producto={producto} colorPrimario={colorPrimario} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriaSection;
