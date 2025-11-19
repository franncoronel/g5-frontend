const API_URL = "http://localhost:8000";

export async function buscarActoresPorNombre(nombre: string, signal?: AbortSignal) {
  const response = await fetch(`${API_URL}/actores?busqueda=${encodeURIComponent(nombre)}`, { signal });
  if (!response.ok) throw new Error("Error al buscar actores");
  return response.json();
}

export async function buscarDirectoresPorNombre(nombre: string, signal?: AbortSignal) {
  const response = await fetch(`${API_URL}/directores?busqueda=${encodeURIComponent(nombre)}`, { signal });
  if (!response.ok) throw new Error("Error al buscar directores");
  return response.json();
}