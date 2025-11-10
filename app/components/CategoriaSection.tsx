import { FC } from "react";
import { Categoria } from "../types";
import ProductoCard from "./ProductoCard";

interface Props {
  categoria: Categoria;
  colorPrimario?: string; // 🔹 color recibido
}

const CategoriaSection: FC<Props> = ({ categoria, colorPrimario }) => {
  if (!categoria.productos || categoria.productos.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Título de categoría */}
      <h2
        className="text-2xl sm:text-3xl font-bold mb-6 pb-2 text-gray-900 flex items-center gap-2"
        style={{
          borderBottom: `3px solid ${colorPrimario ?? "#4f46e5"}`, // 🔹 color dinámico
        }}
      >
        {/* Icono opcional */}
        <span
          className="inline-block w-4 h-4 rounded-full"
          style={{ backgroundColor: colorPrimario ?? "#4f46e5" }} // 🔹 color dinámico
        />
        {categoria.nombre}
      </h2>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {categoria.productos.map((producto) => (
          <div
            key={producto.id}
            className="transition-transform hover:scale-105 duration-300"
          >
            <ProductoCard producto={producto} colorPrimario={colorPrimario} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriaSection;
