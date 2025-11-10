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

  const colorPrimario = restaurante.color_primario ?? "#000";

  // Scroll con mouse (arrastrar)
  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

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
      const walk = (x - startX) * 2;
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
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-3"
          />
        )}

        <h1
          className="text-3xl font-bold text-center"
          style={{ color: colorPrimario }}
        >
          {restaurante.nombre}
        </h1>

        {restaurante.descripcion && (
          <p className="text-gray-700 mt-1 text-center text-sm sm:text-base">
            {restaurante.descripcion}
          </p>
        )}
      </header>

      {/* SLIDER CATEGORÍAS */}
      <div className="relative mb-6">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-3 px-2 snap-x snap-mandatory"
        >
          {/* CATEGORÍAS */}
          {restaurante.categorias.map((categoria) => {
            const isActive = categoriaSeleccionada?.id === categoria.id;

            return (
              <div
                key={categoria.id}
                onClick={() => setCategoriaSeleccionada(categoria)}
                style={{
                  backgroundColor: isActive ? colorPrimario : "#e5e7eb",
                  color: isActive ? "white" : "#1f2937",
                }}
                className={`flex-shrink-0 w-28 sm:w-32 rounded-xl p-4 cursor-pointer transition-transform transform ${
                  isActive ? "scale-105 shadow-lg" : "hover:scale-105"
                } snap-start flex flex-col items-center justify-center`}
              >
                <div className="w-14 h-14 mb-2 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {categoria.icono ? (
                    <img
                      src={categoria.icono}
                      alt={categoria.nombre}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-xl font-bold">
                      {categoria.nombre[0]}
                    </span>
                  )}
                </div>

                <span className="text-sm font-semibold text-center">
                  {categoria.nombre}
                </span>
              </div>
            );
          })}

          {/* BOTÓN "TODAS" */}
          <div
            onClick={() => setCategoriaSeleccionada(null)}
            className={`flex-shrink-0 w-28 sm:w-32 rounded-xl p-4 cursor-pointer snap-start flex flex-col items-center justify-center transition-transform hover:scale-105 ${
              !categoriaSeleccionada
                ? "scale-105 shadow-lg"
                : "bg-gray-300 text-gray-800"
            }`}
            style={{
              backgroundColor: !categoriaSeleccionada
                ? colorPrimario
                : "#e5e7eb",
              color: !categoriaSeleccionada ? "white" : "#1f2937",
            }}
          >
            <div className="w-14 h-14 mb-2 rounded-full bg-white flex items-center justify-center">
              <span className="text-xl">★</span>
            </div>
            <span className="text-sm font-semibold">Todas</span>
          </div>
        </div>
      </div>

      {/* PRODUCTOS */}
      <div>
        {categoriaSeleccionada ? (
          <CategoriaSection
            categoria={categoriaSeleccionada}
            colorPrimario={colorPrimario} // 🔹 pasamos el color
          />
        ) : (
          restaurante.categorias.map((categoria) => (
            <CategoriaSection
              key={categoria.id}
              categoria={categoria}
              colorPrimario={colorPrimario} // 🔹 pasamos el color
            />
          ))
        )}
      </div>
    </div>
  );
}
