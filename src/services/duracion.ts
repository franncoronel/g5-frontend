export async function getDurationRange() {
  const response = await fetch("http://127.0.0.1:8000/duraciones");

  if (!response.ok) {
    throw new Error("Error al obtener rango de duración en minutos");
  }

  return response.json();
}