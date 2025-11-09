"use client";

import { useState, useRef, useEffect } from "react";
import CategoriaSection from "../../components/CategoriaSection";
import { Restaurante, Categoria } from "../../types";

interface Props {
  restaurante: Restaurante;
}

export default function CartaPageClient({ restaurante }: Props) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<Categoria | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-scroll circular opcional (infinito)
  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeave = () => (isDown = false);
    const mouseUp = () => (isDown = false);
    const mouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // velocidad scroll
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* HEADER */}
      <header className="flex flex-col items-center mb-6">
        {restaurante.logo && (
          <img
            src={restaurante.logo}
            alt={restaurante.nombre}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-2 sm:mb-4"
          />
        )}
        <h1
          className="text-2xl sm:text-3xl font-bold text-center"
          style={{ color: restaurante.color_primario ?? "#000" }}
        >
          {restaurante.nombre}
        </h1>
        {restaurante.descripcion && (
          <p className="text-gray-700 mt-1 sm:mt-2 text-center text-sm sm:text-base">
            {restaurante.descripcion}
          </p>
        )}
      </header>

      {/* CARRUSEL DE CATEGORÍAS */}
      <div className="relative mb-6">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-2 sm:px-4 snap-x snap-mandatory"
        >
          {restaurante.categorias.map((categoria) => (
            <div
              key={categoria.id}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`flex-shrink-0 w-28 sm:w-32 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-transform transform ${
                categoriaSeleccionada?.id === categoria.id
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:scale-105"
              } snap-start`}
            >
              {/* Icono o inicial */}
              <div className="w-12 h-12 mb-2 rounded-full bg-white flex items-center justify-center">
                {categoria.icono ? (
                  <img
                    src={categoria.icono}
                    alt={categoria.nombre}
                    className="w-6 h-6"
                  />
                ) : (
                  <span className="font-bold">{categoria.nombre[0]}</span>
                )}
              </div>
              <span className="text-sm text-center font-semibold">
                {categoria.nombre}
              </span>
            </div>
          ))}

          {/* “Ver todas” integrado */}
          <div
            onClick={() => setCategoriaSeleccionada(null)}
            className="flex-shrink-0 w-28 sm:w-32 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer bg-gray-300 text-gray-800 hover:scale-105 transition-transform snap-start"
          >
            <div className="w-12 h-12 mb-2 rounded-full bg-white flex items-center justify-center">
              <span>★</span>
            </div>
            <span className="text-sm text-center font-semibold">Todas</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE PRODUCTOS */}
      <div>
        {categoriaSeleccionada ? (
          <CategoriaSection categoria={categoriaSeleccionada} />
        ) : (
          restaurante.categorias.map((categoria) => (
            <CategoriaSection key={categoria.id} categoria={categoria} />
          ))
        )}
      </div>
    </div>
  );
}
