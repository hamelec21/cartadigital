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
    <div className="min-h-screen bg-gray-50 p-2 sm:p-6">
      {/* HEADER estilo app */}
      <header className="flex flex-col items-center mb-8 bg-white rounded-2xl shadow-lg py-8 px-6 sm:px-10">
        {/* LOGO */}
        {restaurante.logo && (
          <div className="mb-4 w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={restaurante.logo}
              alt={restaurante.nombre}
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
        )}

        {/* NOMBRE */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight"
          style={{ color: colorPrimario }}
        >
          {restaurante.nombre}
        </h1>

        {/* DESCRIPCIÓN */}
        {restaurante.descripcion && (
          <p className="text-gray-700 mt-3 text-center text-sm sm:text-base max-w-md leading-relaxed">
            {restaurante.descripcion}
          </p>
        )}

        {/* DATOS DE CONTACTO */}
        {(restaurante.telefono ||
          restaurante.direccion ||
          restaurante.horario_atencion) && (
          <div className="mt-6 w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
            {/* Teléfono */}
            {restaurante.telefono && (
              <a
                href={`tel:${restaurante.telefono}`}
                className="flex items-center gap-3 bg-indigo-50 px-4 py-3 rounded-xl shadow-sm hover:bg-indigo-100 transition"
              >
                <img
                  src="/iconos/llama.png"
                  alt="Teléfono"
                  className="w-6 h-6"
                />
                <span className="font-semibold">{restaurante.telefono}</span>
              </a>
            )}

            {/* Dirección */}
            {restaurante.direccion && (
              <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl shadow-sm">
                <img
                  src="/iconos/ubicacion.png"
                  alt="Ubicación"
                  className="w-6 h-6"
                />
                <span className="font-semibold">{restaurante.direccion}</span>
              </div>
            )}

            {/* Horario */}
            {restaurante.horario_atencion && (
              <div className="flex items-center gap-3 bg-yellow-50 px-4 py-3 rounded-xl shadow-sm">
                <img
                  src="/iconos/reloj.png"
                  alt="Horario"
                  className="w-6 h-6"
                />
                <span className="font-semibold">
                  {restaurante.horario_atencion}
                </span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* SLIDER CATEGORÍAS estilo app */}
      <div className="relative mb-6">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-3 px-2 snap-x snap-mandatory"
        >
          {/* BOTÓN "TODAS" — AHORA PRIMERO */}
          <div
            onClick={() => setCategoriaSeleccionada(null)}
            className={`flex-shrink-0 w-28 sm:w-32 rounded-xl p-3 cursor-pointer snap-start flex flex-col items-center justify-center transition-transform hover:scale-105 ${
              !categoriaSeleccionada ? "scale-105 shadow-lg" : ""
            }`}
            style={{
              backgroundColor: !categoriaSeleccionada
                ? colorPrimario
                : "#e5e7eb",
              color: !categoriaSeleccionada ? "white" : "#1f2937",
            }}
          >
            <div className="w-14 h-14 mb-2 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-xl">★</span>
            </div>
            <span className="text-sm font-semibold">Todas</span>
          </div>

          {/* CATEGORÍAS */}
          {restaurante.categorias.map((categoria) => {
            const isActive = categoriaSeleccionada?.id === categoria.id;
            return (
              <div
                key={categoria.id}
                onClick={() => setCategoriaSeleccionada(categoria)}
                style={{
                  backgroundColor: isActive ? colorPrimario : "#f3f4f6",
                  color: isActive ? "white" : "#1f2937",
                }}
                className={`flex-shrink-0 w-28 sm:w-32 rounded-xl p-3 cursor-pointer snap-start flex flex-col items-center justify-center transition-transform transform ${
                  isActive ? "scale-105 shadow-lg" : "hover:scale-105"
                }`}
              >
                <div className="w-14 h-14 mb-2 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
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
        </div>
      </div>

      {/* PRODUCTOS estilo app grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
        {categoriaSeleccionada ? (
          <CategoriaSection
            categoria={categoriaSeleccionada}
            colorPrimario={colorPrimario}
          />
        ) : (
          restaurante.categorias.map((categoria) => (
            <CategoriaSection
              key={categoria.id}
              categoria={categoria}
              colorPrimario={colorPrimario}
            />
          ))
        )}
      </div>
    </div>
  );
}
