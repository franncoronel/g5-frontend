import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ArrowLeft, Film, ArrowUpDown } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  duration: number;
  rating: number;
  poster: string;
  director: string;
}

// Datos de ejemplo - en una app real vendría de una API
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Ciencia Ficción",
    duration: 148,
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    director: "Christopher Nolan"
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    duration: 142,
    rating: 9.3,
    poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    director: "Frank Darabont"
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Acción",
    duration: 152,
    rating: 9.0,
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    director: "Christopher Nolan"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Thriller",
    duration: 154,
    rating: 8.9,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    director: "Quentin Tarantino"
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    duration: 142,
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    director: "Robert Zemeckis"
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    genre: "Ciencia Ficción",
    duration: 136,
    rating: 8.7,
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    director: "Lana Wachowski"
  },
  {
    id: 7,
    title: "Interstellar",
    year: 2014,
    genre: "Ciencia Ficción",
    duration: 169,
    rating: 8.6,
    poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
    director: "Christopher Nolan"
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: "Drama",
    duration: 146,
    rating: 8.7,
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    director: "Martin Scorsese"
  }
];

const Recommendations = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [preferences, setPreferences] = useState<any>(null);
  const [sortBy, setSortBy] = useState<string>("rating-desc");

  useEffect(() => {
    // Obtener preferencias del sessionStorage
    const storedPreferences = sessionStorage.getItem("moviePreferences");
    if (!storedPreferences) {
      navigate("/");
      return;
    }

    const prefs = JSON.parse(storedPreferences);
    setPreferences(prefs);

    // Filtrar películas basadas en preferencias
    const filtered = mockMovies.filter(movie => {
      const matchesGenre = prefs.genres.length === 0 || prefs.genres.includes(movie.genre);
      const matchesYear = movie.year >= prefs.yearRange[0] && movie.year <= prefs.yearRange[1];
      const matchesDuration = movie.duration >= prefs.duration[0] && movie.duration <= prefs.duration[1];

      return matchesGenre && matchesYear && matchesDuration;
    });

    setMovies(filtered.length > 0 ? filtered : mockMovies);
  }, [navigate]);

  // Ordenar películas basadas en la opción seleccionada
  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      case "duration-desc":
        return b.duration - a.duration;
      case "duration-asc":
        return a.duration - b.duration;
      case "year-desc":
        return b.year - a.year;
      case "year-asc":
        return a.year - b.year;
      default:
        return 0;
    }
  });

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">7Frames</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Tus Recomendaciones
            </h1>
            <p className="text-muted-foreground">
              Encontramos {movies.length} películas perfectas para ti
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ordenar Por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating-desc">Rating: Mayor a Menor</SelectItem>
                <SelectItem value="rating-asc">Rating: Menor a Mayor</SelectItem>
                <SelectItem value="duration-desc">Duración: Mayor a Menor</SelectItem>
                <SelectItem value="duration-asc">Duración: Menor a Mayor</SelectItem>
                <SelectItem value="year-desc">Año: Más Reciente</SelectItem>
                <SelectItem value="year-asc">Año: Más Antiguo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
