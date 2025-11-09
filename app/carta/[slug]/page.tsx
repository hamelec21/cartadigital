// app/carta/[slug]/page.tsx
import CartaPageClient from "./CartaPageClient";
import { Restaurante } from "../../types";
import axios from "axios";

interface Props {
  params: { slug: string };
}

// Fetch del restaurante
async function fetchRestaurante(slug: string): Promise<Restaurante | null> {
  try {
    const res = await axios.get<Restaurante>(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurantes/${slug}`
    );
    return res.data;
  } catch (err) {
    console.error("Error al traer el restaurante:", err);
    return null;
  }
}

export default async function CartaPage(props: Props) {
  // 🔹 Aquí hacemos "await" para extraer params
  const params = await props.params;
  const slug = params.slug;

  const restaurante = await fetchRestaurante(slug);

  if (!restaurante) {
    return (
      <p className="text-center mt-10 text-red-600">
        Restaurante no encontrado.
      </p>
    );
  }

  return <CartaPageClient restaurante={restaurante} />;
}
