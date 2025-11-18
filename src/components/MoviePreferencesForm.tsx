import { useEffect, useState, useRef } from "react";
import { getGenres } from "@/services/generos";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Film, Loader2 } from "lucide-react";
import { buscarActoresPorNombre, buscarDirectoresPorNombre } from "@/services/personas";
import { MoviePreferences } from "@/data/domain/MoviePreferences";
import { useNavigate } from "react-router";

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
  const [isLoadingActors, setIsLoadingActors] = useState(false);
  const [selectedActorIndex, setSelectedActorIndex] = useState(-1);
  const actorDropdownRef = useRef<HTMLDivElement>(null);

  const [directorInput, setDirectorInput] = useState("");
  const [directorsArray, setDirectorsArray] = useState<{ id: string; nombre: string }[]>([]);
  const [directorSuggestions, setDirectorSuggestions] = useState<{ id: string; nombre: string }[]>([]);
  const [isLoadingDirectors, setIsLoadingDirectors] = useState(false);
  const [selectedDirectorIndex, setSelectedDirectorIndex] = useState(-1);
  const directorDropdownRef = useRef<HTMLDivElement>(null);

  const [genres, setGenres] = useState<{ id: number; nombre: string }[]>([]);
  const navigate = useNavigate()

  // 🔹 Cargar géneros
  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data))
      .catch((err) => console.error("Error cargando géneros:", err));
  }, []);

  // 🔹 Debounce para búsqueda de actores
  useEffect(() => {
    const abortController = new AbortController();

    if (actorInput.length >= 2) {
      setIsLoadingActors(true);
      const timeoutId = setTimeout(async () => {
        try {
          const results = await buscarActoresPorNombre(actorInput, abortController.signal);
          setSuggestions(results);
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error("Error buscando actores:", err);
          }
        } finally {
          setIsLoadingActors(false);
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        abortController.abort();
        setIsLoadingActors(false);
      };
    } else {
      setSuggestions([]);
      setIsLoadingActors(false);
      return () => abortController.abort();
    }
  }, [actorInput]);

  // 🔹 Debounce para búsqueda de directores
  useEffect(() => {
    const abortController = new AbortController();

    if (directorInput.length >= 2) {
      setIsLoadingDirectors(true);
      const timeoutId = setTimeout(async () => {
        try {
          const results = await buscarDirectoresPorNombre(directorInput, abortController.signal);
          setDirectorSuggestions(results);
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error("Error buscando directores:", err);
          }
        } finally {
          setIsLoadingDirectors(false);
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        abortController.abort();
        setIsLoadingDirectors(false);
      };
    } else {
      setDirectorSuggestions([]);
      setIsLoadingDirectors(false);
      return () => abortController.abort();
    }
  }, [directorInput]);

  // 🔹 Cerrar desplegables al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actorDropdownRef.current && !actorDropdownRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setSelectedActorIndex(-1);
      }
      if (directorDropdownRef.current && !directorDropdownRef.current.contains(event.target as Node)) {
        setDirectorSuggestions([]);
        setSelectedDirectorIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔹 Búsqueda de actores
  const handleActorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setActorInput(value);
    setSelectedActorIndex(-1);
  };

  const handleActorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedActorIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedActorIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedActorIndex >= 0 && selectedActorIndex < suggestions.length) {
          handleSelectActor(suggestions[selectedActorIndex]);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedActorIndex(-1);
        break;
    }
  };

  const handleSelectActor = (actor: { id: string; nombre: string }) => {
    if (!actorsArray.find((a) => a.id === actor.id)) {
      setActorsArray((prev) => [...prev, actor]);
    }
    setActorInput("");
    setSuggestions([]);
    setSelectedActorIndex(-1);
  };

  const handleRemoveActor = (id: string) => {
    setActorsArray((prev) => prev.filter((a) => a.id !== id));
  };

  // 🔹 Búsqueda de directores
  const handleDirectorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDirectorInput(value);
    setSelectedDirectorIndex(-1);
  };

  const handleDirectorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (directorSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedDirectorIndex(prev =>
          prev < directorSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedDirectorIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedDirectorIndex >= 0 && selectedDirectorIndex < directorSuggestions.length) {
          handleSelectDirector(directorSuggestions[selectedDirectorIndex]);
        }
        break;
      case 'Escape':
        setDirectorSuggestions([]);
        setSelectedDirectorIndex(-1);
        break;
    }
  };

  const handleSelectDirector = (director: { id: string; nombre: string }) => {
    if (!directorsArray.find((d) => d.id === director.id)) {
      setDirectorsArray((prev) => [...prev, director]);
    }
    setDirectorInput("");
    setDirectorSuggestions([]);
    setSelectedDirectorIndex(-1);
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

    sessionStorage.setItem("moviePreferences", JSON.stringify(preferences));
    navigate("/recommendations");


  };

  const noPreferencesSelected =
    selectedGenres.length === 0 &&
    directorsArray.length === 0 &&
    actorsArray.length === 0;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto lg:max-w-7xl">
      <Card className="bg-card border-border overflow-visible lg:shadow-2xl lg:rounded-3xl lg:border-border/40">
        <CardHeader className="space-y-2 ">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-hero">
              <Film className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl lg:text-4xl font-bold">Tus Preferencias</CardTitle>
              <CardDescription className="text-sm lg:text-lg">Cuéntanos qué tipo de películas te gustan</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 lg:space-y-10 lg:p-10">
          {/* Géneros */}
          <div className="space-y-3">
            <Label className="text-base font-semibold lg:text-xl xl:text-2xl">Géneros favoritos</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-smooth ${
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
            <Label className="text-base font-semibold lg:text-xl xl:text-2xl">Año de estreno</Label>
            <div className="space-y-2">
              <Slider
                min={1950}
                max={2024}
                step={1}
                value={yearRange}
                onValueChange={(value: [number, number]) => setYearRange(value)}
                className="w-full lg:h-3"
              />
              <div className="flex justify-between text-sm lg:text-base xl:text-lg text-muted-foreground">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Duración */}
          <div className="space-y-3">
            <Label className="text-base font-semibold lg:text-xl xl:text-2xl">Duración (minutos)</Label>
            <div className="space-y-2">
              <Slider
                min={90}
                max={240}
                step={10}
                value={duration}
                onValueChange={(value: [number, number]) => setDuration(value)}
                className="w-full lg:h-3"
              />
              <div className="flex justify-between text-sm lg:text-base xl:text-lg text-muted-foreground">
                <span>{duration[0]} min</span>
                <span>{duration[1]} min</span>
              </div>
            </div>
          </div>

          {/* Actores */}
          <div className="space-y-3">
            <Label htmlFor="actors" className="text-base font-semibold lg:text-xl xl:text-2xl">Actores favoritos</Label>

            <div className="flex flex-wrap gap-2 mb-2">
              {actorsArray.map((actor) => (
                <div
                  key={actor.id}
                  className="flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 bg-secondary text-secondary-foreground rounded-full text-sm lg:text-base"
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
              <div className="relative z-[9999]" ref={actorDropdownRef}>
              <div className="relative">
              <Input
                id="actors"
                placeholder="Meryl Streep, Tom Hanks"
                value={actorInput}
                onChange={handleActorInputChange}
                onKeyDown={handleActorKeyDown}
                className="bg-input border-border lg:h-12 lg:text-lg pr-10"
              />
              {isLoadingActors && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                  <Loader2 className="h-5 w-5 lg:h-6 lg:w-6 animate-spin text-primary" />
                </div>
              )}
              </div>

            {suggestions.length > 0 && (
            <ul className="absolute left-0 w-full bg-card border border-border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto z-[9999]">
            {suggestions.map((actor, index) => (
            <li
              key={actor.id}
              onClick={() => handleSelectActor(actor)}
              className={`px-3 py-2 cursor-pointer hover:bg-accent ${
                index === selectedActorIndex ? 'bg-accent' : ''
              }`}
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
            <Label htmlFor="directors" className="text-base font-semibold lg:text-xl xl:text-2xl">Directores favoritos</Label>

            <div className="flex flex-wrap gap-2 mb-2">
              {directorsArray.map((director) => (
                <div
                  key={director.id}
                  className="flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 bg-secondary text-secondary-foreground rounded-full text-sm lg:text-base"
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

            <div className="relative z-50" ref={directorDropdownRef}>
              <div className="relative">
              <Input
                id="directors"
                placeholder="Greta Gerwig, Steven Spielberg"
                value={directorInput}
                onChange={handleDirectorInputChange}
                onKeyDown={handleDirectorKeyDown}
                className="bg-input border-border lg:h-12 lg:text-lg pr-10"
              />
              {isLoadingDirectors && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                  <Loader2 className="h-5 w-5 lg:h-6 lg:w-6 animate-spin text-primary" />
                </div>
              )}
              </div>
              {directorSuggestions.length > 0 && (
                <ul className="absolute left-0 w-full bg-card border border-border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto z-50">
                  {directorSuggestions.map((director, index) => (
                    <li
                      key={director.id}
                      onClick={() => handleSelectDirector(director)}
                      className={`px-3 py-2 cursor-pointer hover:bg-accent ${
                        index === selectedDirectorIndex ? 'bg-accent' : ''
                      }`}
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
            className="w-full lg:h-14 lg:text-xl rounded-xl"
            disabled={noPreferencesSelected}
          >
            Buscar Recomendaciones
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}