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
  const [isScrolled, setIsScrolled] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const colorPrimario = restaurante.color_primario ?? "#4f46e5";

  // Detect scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO / HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-sm py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {restaurante.logo && (
              <img
                src={restaurante.logo}
                alt={restaurante.nombre}
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? "w-10 h-10" : "w-16 h-16"
                }`}
              />
            )}
            <h1
              className={`font-bold transition-all duration-300 ${
                isScrolled ? "text-lg" : "text-2xl"
              }`}
              style={{ color: isScrolled ? "#1f2937" : colorPrimario }}
            >
              {restaurante.nombre}
            </h1>
          </div>
          
          {/* Contact Icons Mini (Visible on Scroll) */}
          <div className={`flex gap-3 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
             {restaurante.telefono && (
                <a href={`tel:${restaurante.telefono}`} className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <img src="/iconos/llama.png" alt="Call" className="w-4 h-4" />
                </a>
             )}
          </div>
        </div>
      </header>

      {/* SPACE FOR FIXED HEADER */}
      <div className="h-24"></div>

      {/* INFO RESTAURANTE (Non-sticky part) */}
      <div className="max-w-4xl mx-auto px-4 mb-8 text-center">
        {!isScrolled && (
            <>
                {restaurante.descripcion && (
                <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                    {restaurante.descripcion}
                </p>
                )}

                {/* DATOS DE CONTACTO */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {restaurante.telefono && (
                    <a
                        href={`tel:${restaurante.telefono}`}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition text-sm text-gray-700"
                    >
                        <img src="/iconos/llama.png" alt="Teléfono" className="w-4 h-4" />
                        <span>{restaurante.telefono}</span>
                    </a>
                    )}
                    {restaurante.direccion && (
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm text-gray-700">
                        <img src="/iconos/ubicacion.png" alt="Ubicación" className="w-4 h-4" />
                        <span>{restaurante.direccion}</span>
                    </div>
                    )}
                    {restaurante.horario_atencion && (
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm text-gray-700">
                        <img src="/iconos/reloj.png" alt="Horario" className="w-4 h-4" />
                        <span>{restaurante.horario_atencion}</span>
                    </div>
                    )}
                </div>
            </>
        )}
      </div>

      {/* SLIDER CATEGORÍAS */}
      <div className="sticky top-[60px] z-40 bg-gray-50/95 backdrop-blur-sm py-2 mb-6 border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto">
            <div
            ref={sliderRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory"
            >
            {/* BOTÓN "TODAS" */}
            <button
                onClick={() => setCategoriaSeleccionada(null)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all snap-start ${
                !categoriaSeleccionada
                    ? "text-white shadow-md transform scale-105"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
                style={{
                backgroundColor: !categoriaSeleccionada ? colorPrimario : undefined,
                }}
            >
                Todas
            </button>

            {/* CATEGORÍAS */}
            {restaurante.categorias.map((categoria) => {
                const isActive = categoriaSeleccionada?.id === categoria.id;
                return (
                <button
                    key={categoria.id}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                    className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all snap-start flex items-center gap-2 ${
                    isActive
                        ? "text-white shadow-md transform scale-105"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                    style={{
                    backgroundColor: isActive ? colorPrimario : undefined,
                    }}
                >
                    {categoria.icono && (
                        <img src={categoria.icono} alt="" className="w-4 h-4 object-contain invert-0" style={{ filter: isActive ? 'brightness(0) invert(1)' : 'none' }} />
                    )}
                    {categoria.nombre}
                </button>
                );
            })}
            </div>
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8">
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
    </div>
  );
}
