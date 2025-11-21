import { FC } from "react";
import { Producto } from "../types";

interface Props {
  producto: Producto;
  colorPrimario?: string;
}

const ProductoCard: FC<Props> = ({ producto, colorPrimario = "#4f46e5" }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <span className="text-sm font-medium">Sin imagen</span>
          </div>
        )}
        
        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="font-bold text-gray-900">
            ${producto.precio.toLocaleString("es-CL")}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {producto.nombre}
          </h3>
        </div>

        {producto.descripcion && (
          <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
            {producto.descripcion}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductoCard;
