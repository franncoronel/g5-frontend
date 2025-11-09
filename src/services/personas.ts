export async function buscarActoresPorNombre(nombre: string) {
  const response = await fetch(`http://localhost:8000/personas?rol=actor&nombre=${encodeURIComponent(nombre)}`);
  if (!response.ok) throw new Error("Error buscando actores");
  return response.json(); // Devuelve [{ id, nombre }]
}