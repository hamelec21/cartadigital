import { FC } from "react";
import { Producto } from "../types";

interface Props {
  producto: Producto;
}

const ProductoCard: FC<Props> = ({ producto }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-xl duration-300 cursor-pointer">
      {/* Imagen con placeholder */}
      {producto.imagen ? (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
          Sin imagen
        </div>
      )}

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        {/* Nombre + Precio + Badge */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {producto.nombre}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-indigo-600">
              ${producto.precio.toLocaleString("es-CL")}
            </p>
            {producto.oferta && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Oferta
              </span>
            )}
          </div>
        </div>

        {/* Descripción */}
        {producto.descripcion && (
          <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
            {producto.descripcion}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductoCard;
