import { Restaurante } from "../types";

export async function fetchRestaurante(
  slug: string
): Promise<Restaurante | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurantes/${slug}`
    );
    if (!res.ok) return null;
    const data: Restaurante = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching restaurante:", err);
    return null;
  }
}
