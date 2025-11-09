import { FC } from "react";
import { Categoria } from "../types";
import ProductoCard from "./ProductoCard";

interface Props {
  categoria: Categoria;
}

const CategoriaSection: FC<Props> = ({ categoria }) => {
  if (!categoria.productos || categoria.productos.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Título de categoría */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2 text-gray-900 flex items-center gap-2">
        {/* Icono opcional */}
        <span className="inline-block w-4 h-4 bg-indigo-600 rounded-full" />
        {categoria.nombre}
      </h2>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {categoria.productos.map((producto) => (
          <div
            key={producto.id}
            className="transition-transform hover:scale-105 duration-300"
          >
            <ProductoCard producto={producto} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriaSection;
