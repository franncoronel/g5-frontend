import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { Movie } from "@/data/domain/Movie";
import { mockMovies } from "@/data/mock/MoviesData";
import Masonry from "@/components/Masonry";
import { MovieCard } from "@/components/MovieCard";
import Particles from "@/components/ui/Particles";



const Recommendations = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [preferences, setPreferences] = useState<any>(null);
  const [sortBy, setSortBy] = useState<string>("rating-desc");
  const [page, setPage] = useState(1);
  const perPage = 60; // cantidad de películas por tanda

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
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    }, { rootMargin: "1000px" });

    const sentinel = document.getElementById("sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();

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

  const moviesToShow = sortedMovies.slice(0, page * perPage);

  const masonryItems =moviesToShow.map(movie => ({
    id: movie.id.toString(),
    img: movie.poster,
    url: "#",
    movie
  }));

  return (
    <div className="min-h-screen bg-background  overflow-x-hidden">
      {/*Particles*/}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0">
        <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={300}
            particleSpread={5}
            speed={0.1}
            particleBaseSize={100}
            alphaParticles={true}
            disableRotation={false}/>
      </div>
      
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2 text-base sm:text-lg"
            >
              <ArrowLeft className="h-6 w-6" />
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
              <span className="font-semibold text-lg sm:text-xl lg:text-2xl tracking-wide">7Frames</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-9">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 leading-tight tracking-tight">
              Tus Recomendaciones
            </h1>
            <p  className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Encontramos {movies.length} películas perfectas para ti
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[220px] h-11 text-base sm:w-[240px] sm:h-12 sm:text-lg">
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
          stagger={0.3}  // retraso entre animaciones de elementos consecutivos
          animateFrom='bottom'  // direciones : 'top', 'bottom', 'left', 'right', 'center', 'random'.
          scaleOnHover={true} // activacion del hover
          hoverScale={0.95} //escala de hover
          blurToFocus={true}  // efecto de desenfoque en la carga inicial
          colorShiftOnHover={false} //efecto de superposicion de color al pasar el mouse
        />
      </div>
      <div id="sentinel" className="h-16 w-full" />
    </div> 
  );
};

export default Recommendations;
