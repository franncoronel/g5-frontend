export async function getYearsRange() {
  const response = await fetch("http://127.0.0.1:8000/anios");

  if (!response.ok) {
    throw new Error("Error al obtener rango de años");
  }

  return response.json();
}