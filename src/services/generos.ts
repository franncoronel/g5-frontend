export async function getGenres() {
  const response = await fetch("http://127.0.0.1:8000/generos");
  if (!response.ok) {
    throw new Error("Error al obtener los géneros");
  }
  return response.json();
}