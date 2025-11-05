import { useEffect, useState } from "react";
import { getGenres } from "@/services/generos";
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/label"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input"
import { Slider } from "@/components/ui/Slider"
import { Film } from "lucide-react"

interface MoviePreferences {
  genres?: string[];
  yearRange: [number, number];
  duration: [number, number];
  actors?: string[];
  directors?: string[];
}

interface MoviePreferencesFormProps {
  onSubmit: (preferences: MoviePreferences) => void;
}


export function MoviePreferencesForm({ onSubmit }: MoviePreferencesFormProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, 2024]);
  const [duration, setDuration] = useState<[number, number]>([90, 180]);
  const [actorsArray, setActorsArray] = useState<string[]>([]);
  const [actorInput, setActorInput] = useState("");
  const [directorsArray, setDirectorsArray] = useState<string[]>([]);
  const [directorInput, setDirectorInput] = useState("");
  const [genres, setGenres] = useState<string[]>([]);

useEffect(() => {
  getGenres()
    .then((data) => {
      setGenres(data.map((g: any) => g.nombre));
    })
    .catch((err) => {
      console.error("Error cargando géneros:", err);
    });
}, []);


  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const preferences = {
    genres: selectedGenres,
    yearRange,
    duration,
    actors: actorsArray,
    directors: directorsArray,
  };

  console.log("Enviando preferencias:", preferences);

  try {
    const response = await fetch("http://localhost:8000/preferencias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    // Si querés, podés pasar la respuesta a un handler o estado
    // onSubmit(data);

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
      <Card className="bg-card border-border">
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
              {genres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    selectedGenres.includes(genre)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Rango de años */}
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
  <Label htmlFor="actors" className="text-base font-semibold">
    Actores favoritos
  </Label>

  {/* Mostrar las etiquetas */}
  <div className="flex flex-wrap gap-2 mb-2">
    {actorsArray.map((actor, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
      >
        {actor}
        <button
          type="button"
          onClick={() =>
            setActorsArray((prev) => prev.filter((_, i) => i !== idx))
          }
          className="text-muted-foreground hover:text-destructive"
        >
          ×
        </button>
      </div>
    ))}
  </div>

  <Input
    id="actors"
    placeholder="Ej: Tom Hanks, Meryl Streep"
    value={actorInput}
    onChange={(e) => setActorInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = actorInput.trim();
        if (value && !actorsArray.includes(value)) {
          setActorsArray((prev) => [...prev, value]);
        }
        setActorInput("");
      }
    }}
    className="bg-input border-border"
  />
</div>

          {/* Directores */}
          <div className="space-y-3">
  <Label htmlFor="directors" className="text-base font-semibold">
    Directores favoritos
  </Label>

  {/* Mostrar las etiquetas */}
  <div className="flex flex-wrap gap-2 mb-2">
    {directorsArray.map((director, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
      >
        {director}
        <button
          type="button"
          onClick={() =>
            setDirectorsArray((prev) => prev.filter((_, i) => i !== idx))
          }
          className="text-muted-foreground hover:text-destructive"
        >
          ×
        </button>
      </div>
    ))}
  </div>

  <Input
    id="directors"
    placeholder="Ej: Christopher Nolan, Greta Gerwig"
    value={directorInput}
    onChange={(e) => setDirectorInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = directorInput.trim();
        if (value && !directorsArray.includes(value)) {
          setDirectorsArray((prev) => [...prev, value]);
        }
      setDirectorInput("");
      }
    }}
    className="bg-input border-border"
  />
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
