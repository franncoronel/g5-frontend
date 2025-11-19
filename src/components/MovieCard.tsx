import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Star, Calendar, Clock } from "lucide-react"
import posterStock from "@/assets/poster_stock.png"
import { Movie } from "@/data/domain/Movie";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-smooth cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={movie.poster? movie.poster : posterStock}
          alt={movie.title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-smooth">
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-semibold">{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-2 space-y-1">
        <h3 className="font-bold text-xs line-clamp-1 group-hover:text-primary transition-smooth">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{movie.year}</span>
          <span>•</span>
          <Clock className="h-3 w-3" />
          <span>{movie.duration} min</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {movie.genre}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">
          Dir. {movie.director}
        </p>
      </CardContent>
    </Card>
  );
}
