import { useEffect, useState } from "react";
import { getGenres } from "@/services/generos";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Film } from "lucide-react";
import { buscarActoresPorNombre } from "@/services/personas";

interface MoviePreferences {
  genres?: number[];
  yearRange: [number, number];
  duration: [number, number];
  actors?: string[];
  directors?: string[];
}

interface MoviePreferencesFormProps {
  onSubmit: (preferences: MoviePreferences) => void;
}

export function MoviePreferencesForm({ onSubmit }: MoviePreferencesFormProps) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, 2024]);
  const [duration, setDuration] = useState<[number, number]>([90, 180]);
  const [actorInput, setActorInput] = useState("");
  const [actorsArray, setActorsArray] = useState<{ id: string; nombre: string }[]>([]);
  const [suggestions, setSuggestions] = useState<{ id: string; nombre: string }[]>([]);

  const [directorInput, setDirectorInput] = useState("");
  const [directorsArray, setDirectorsArray] = useState<{ id: string; nombre: string }[]>([]);
  const [directorSuggestions, setDirectorSuggestions] = useState<{ id: string; nombre: string }[]>([]);

  const [genres, setGenres] = useState<{ id: number; nombre: string }[]>([]);

  // 🔹 Cargar géneros
  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data))
      .catch((err) => console.error("Error cargando géneros:", err));
  }, []);

  // 🔹 Búsqueda de actores
  const handleActorInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setActorInput(value);

    if (value.length >= 2) {
      try {
        const results = await buscarActoresPorNombre(value);
        setSuggestions(results);
      } catch (err) {
        console.error("Error buscando actores:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectActor = (actor: { id: string; nombre: string }) => {
    if (!actorsArray.find((a) => a.id === actor.id)) {
      setActorsArray((prev) => [...prev, actor]);
    }
    setActorInput("");
    setSuggestions([]);
  };

  const handleRemoveActor = (id: string) => {
    setActorsArray((prev) => prev.filter((a) => a.id !== id));
  };

  // 🔹 Búsqueda de directores (usa el mismo endpoint)
  const handleDirectorInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDirectorInput(value);

    if (value.length >= 2) {
      try {
        const results = await buscarActoresPorNombre(value);
        setDirectorSuggestions(results);
      } catch (err) {
        console.error("Error buscando directores:", err);
      }
    } else {
      setDirectorSuggestions([]);
    }
  };

  const handleSelectDirector = (director: { id: string; nombre: string }) => {
    if (!directorsArray.find((d) => d.id === director.id)) {
      setDirectorsArray((prev) => [...prev, director]);
    }
    setDirectorInput("");
    setDirectorSuggestions([]);
  };

  const handleRemoveDirector = (id: string) => {
    setDirectorsArray((prev) => prev.filter((d) => d.id !== id));
  };

  // 🔹 Selección de géneros
  const handleGenreToggle = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  // 🔹 Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preferences: MoviePreferences = {
      genres: selectedGenres,
      yearRange,
      duration,
      actors: actorsArray.map((a) => a.id),
      directors: directorsArray.map((d) => d.id),
    };

    console.log("Enviando preferencias:", preferences);

    try {
      const response = await fetch("http://localhost:8000/preferencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta del backend:", data);
    } catch (error) {
      console.error("Error al enviar preferencias:", error);
    }
  };

  const noPreferencesSelected =
    selectedGenres.length === 0 &&
    directorsArray.length === 0 &&
    actorsArray.length === 0;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <Card className="bg-card border-border overflow-visible">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-hero">
              <Film className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Tus Preferencias</CardTitle>
              <CardDescription>Cuéntanos qué tipo de películas te gustan</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Géneros */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Géneros favoritos</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    selectedGenres.includes(genre.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {genre.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Año */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Año de estreno</Label>
            <div className="space-y-2">
              <Slider
                min={1950}
                max={2024}
                step={1}
                value={yearRange}
                onValueChange={(value: [number, number]) => setYearRange(value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Duración */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Duración (minutos)</Label>
            <div className="space-y-2">
              <Slider
                min={90}
                max={240}
                step={10}
                value={duration}
                onValueChange={(value: [number, number]) => setDuration(value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{duration[0]} min</span>
                <span>{duration[1]} min</span>
              </div>
            </div>
          </div>

          {/* Actores */}
          <div className="space-y-3">
            <Label htmlFor="actors" className="text-base font-semibold">Actores favoritos</Label>

            <div className="flex flex-wrap gap-2 mb-2">
              {actorsArray.map((actor) => (
                <div
                  key={actor.id}
                  className="flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {actor.nombre}
                  <button
                    type="button"
                    onClick={() => handleRemoveActor(actor.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
              <div className="relative z-[9999]">
              <Input
                id="actors"
                placeholder="Meryl Streep, Tom Hanks"
                value={actorInput}
                onChange={handleActorInputChange}
                className="bg-input border-border relative z-10"
              />

            {suggestions.length > 0 && (
            <ul className="absolute left-0 w-full bg-card border border-border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto z-[9999]">
            {suggestions.map((actor) => (
            <li
              key={actor.id}
              onClick={() => handleSelectActor(actor)}
              className="px-3 py-2 cursor-pointer hover:bg-accent"
            >
            {actor.nombre}
              </li>
              ))}
              </ul>
              )}
            </div>
          </div>

          {/* Directores */}
          <div className="space-y-3">
            <Label htmlFor="directors" className="text-base font-semibold">Directores favoritos</Label>

            <div className="flex flex-wrap gap-2 mb-2">
              {directorsArray.map((director) => (
                <div
                  key={director.id}
                  className="flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {director.nombre}
                  <button
                    type="button"
                    onClick={() => handleRemoveDirector(director.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="relative z-50">
              <Input
                id="directors"
                placeholder="Greta Gerwig, Steven Spielberg"
                value={directorInput}
                onChange={handleDirectorInputChange}
                className="bg-input border-border"
              />
              {directorSuggestions.length > 0 && (
                <ul className="absolute left-0 w-full bg-card border border-border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto z-50">
                  {directorSuggestions.map((director) => (
                    <li
                      key={director.id}
                      onClick={() => handleSelectDirector(director)}
                      className="px-3 py-2 cursor-pointer hover:bg-accent"
                    >
                      {director.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={noPreferencesSelected}
          >
            Buscar Recomendaciones
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}