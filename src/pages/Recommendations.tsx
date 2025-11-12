import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { Movie } from "@/data/domain/Movie";
import { mockMovies } from "@/data/mock/MoviesData";
import Masonry from "@/components/Masonry";
import { MovieCard } from "@/components/MovieCard";


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

  const masonryItems = sortedMovies.map(movie => ({
    id: movie.id.toString(),
    img: movie.poster,
    url: "#",
    movie
  }));

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
                <div className="flex items-center justify-center gap-3">
                <img
                  src="/icon3.png"
                  alt="7Frames Logo"
                  className="h-9 w-9 object-contain animate-pulse"
                />
              </div>
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
      
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div> */}
        <Masonry 
          items={masonryItems}
          ease="power3.out"
          duration={1.2}  // duración de la animación en segundos
          stagger={0.20}  // retraso entre animaciones de elementos consecutivos
          animateFrom='bottom'  // direciones : 'top', 'bottom', 'left', 'right', 'center', 'random'.
          scaleOnHover={true} // activacion del hover
          hoverScale={0.95} //escala de hover
          blurToFocus={true}  // efecto de desenfoque en la carga inicial
          colorShiftOnHover={false} //efecto de superposicion de color al pasar el mouse
        />
      </div>
    </div> 
  );
};

export default Recommendations;
