const API_URL = "http://localhost:8000";

export async function buscarActoresPorNombre(nombre: string) {
  const response = await fetch(`${API_URL}/actores?busqueda=${encodeURIComponent(nombre)}`);
  if (!response.ok) throw new Error("Error al buscar actores");
  return response.json();
}

export async function buscarDirectoresPorNombre(nombre: string) {
  const response = await fetch(`${API_URL}/directores?busqueda=${encodeURIComponent(nombre)}`);
  if (!response.ok) throw new Error("Error al buscar directores");
  return response.json();
}

interface RecomendacionRequestDto{
  genres: number[];
  yearRange: [number, number];
  duration: [number, number];
  actors: string[];
  directors: string[];
}

export async function obtenerRecomendaciones(preference: RecomendacionRequestDto, qty: number=20, alpha: number=1.0) {
  const response = await fetch(`${API_URL}/preferencias?top_k=${qty}&alpha=${alpha}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preference),
  });

  if (!response.ok) throw new Error("Error al obtener recomendaciones");
  return response.json();
}

export async function obtenerDetalleRecomendacion(id: string) {
  const response = await fetch(`${API_URL}/pelicula/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) throw new Error("Error al obtener detalle de la recomendación");
  return response.json();
}