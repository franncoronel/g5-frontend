import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Film, ArrowUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { obtenerDetalleRecomendacion } from "@/services/recomendaciones"
import posterStock from "@/assets/poster_stock.png"


const mockLady = {
    id: 'tt8613070',
    tipoTitulo: 'movie',
    nombre: 'Portrait of a Lady on Fire',
    anioEstreno: 2019,
    duracion: 531428.0,
    puntuacion: 7.9,
    sinopsis: 'Bretaña francesa, 1770. Marianne es una pintora que debe realizar el retrato matrimonial de Héloïse, una joven que acaba de dejar el convento. Héloïse no acepta su destino como mujer casada y se niega a posar, por lo que Marianne debe trabajar en secreto. Para ello, se hace pasar por dama de compañía, para así observarla de día y pintarla de noche. Su relación se vuelve más intensa a medida que comparten juntas los últimos momentos de libertad de Héloïse antes de su boda.',
    portada: 'https://image.tmdb.org/t/p/w500/muAsDE6qAqdKB2VJsIzo1uVSSuM.jpg,fr',
    plataformas: ['Amazon Prime Video', 'MUBI'],
    fondo: 'https://image.tmdb.org/t/p/original/foFq1RZWQIgFuCQ0nyYccywjFyX.jpg'
}

const DatosAdicionales = ({ movie }: { movie: Movie | null }) => {
    return (
        <>
            <article className="flex flex-col gap-1">
                <h3 className="text-md font-bold">Sinopsis</h3>
                {
                    movie?.sinopsis &&
                    <p className="text-sm max-w-prose md:max-w-3xl bg-stone-900 rounded-sm p-2 opacity-85">{movie?.sinopsis}</p>
                }
                {

                    !movie?.sinopsis &&
                    <p className="text-sm max-w-prose md:max-w-3xl bg-stone-900 rounded-sm p-2 opacity-85">No hay sinopsis disponible.</p>
                }
            </article>
            <section className="md:max-lg:w-full lg:w-2/3 flex flex-col md:max-lg:flex-row md:max-lg:justify-between gap-2">
                <footer className="flex flex-col gap-1">
                    { movie?.plataformas.length > 0 && <h2 className="text-md font-bold">La puedes encontrar en</h2> }
                    <div className="flex flex-row flex-wrap gap-1">
                        {
                            movie?.plataformas.map(plataforma => (
                                <p key={plataforma} className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">{plataforma}</p>
                            ))
                        }
                    </div>
                </footer>
                <footer className="flex flex-col gap-1">
                    <h4 className="text-md font-bold">También conocida como</h4>
                    <div className="flex flex-row flex-wrap gap-1">
                        {
                            movie?.titulos_alternativos.map(titulo => (
                                <p key={titulo} className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">{titulo}</p>
                            ))
                        }
                    </div>
                </footer>
            </section>
        </>
    )
}

export interface Movie {
    id: string
    tipo: string
    titulo: string
    duracion: number
    fecha_estreno: string
    idioma_original: string | null
    sinopsis: string
    poster: string | null
    backdrop: string | null
    generos: string[]
    puntaje: {
        promedio: number,
        cantidad_votos: number
    },
    directores: string[],
    elenco: string[],
    plataformas: string[],
    titulos_alternativos: string[]

}

export const DetalleRecomendacion = () => {
    const [movie, setMovie] = useState<Movie | null>(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(()=>{
        // Aquí iría la llamada a la API para obtener el detalle de la recomendación usando el id
        if (id) {
            fetchMovieDetail(id)
        }

    },[])

    const fetchMovieDetail = async (movieId: string) => {
        const movieResponse = await obtenerDetalleRecomendacion(id as string)
        console.log('Detalle Recomendación',movieResponse)
        setMovie(movieResponse)
    }

    const handleBack = () => {
        navigate("/")
    }


    return (
        <main className="bg-center bg-cover bg-black/25 backdrop-blur-sm bg-blend-darken" style={{backgroundImage: `url(${movie?.backdrop})`}}>
            {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div> */}
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

            <main className="flex flex-col w-full h-full gap-1 px-5 lg:px-10 py-10">
                {/* Portada + plataformas */}
                <div className="flex flex-col md:flex-row gap-3">
                    <figure className="flex flex-col items-center w-full md:w-fit md:max-lg:h-1/3  size-3/4">
                        <img alt="MAN" className="object-cover object-center" src={movie?.poster ? movie.poster : posterStock}>
                        </img>
                    </figure>

                    <header className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center md:text-start font-bold">{movie?.titulo}</h1>
                        <section className="flex w-full lg:w-1/2 justify-between">
                            <p className="text-md font-bold">{movie?.fecha_estreno}</p>
                            <p className="text-md">{movie?.duracion} (min)</p>
                            <p className="text-md">{movie?.puntaje.promedio} ({movie?.puntaje.cantidad_votos} votos)</p>
                        </section>
                        <article className="flex flex-col gap-1.5">
                            <h4 className="text-sm font-bold">Géneros</h4>
                            <div className="flex flex-row flex-wrap gap-1">
                                {
                                    movie?.generos.map(genero => (
                                        <p key={genero} className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">{genero}</p>
                                    ))
                                }
                            </div>
                            <h4 className="text-sm font-bold">Directores</h4>
                            <div className="flex flex-row flex-wrap gap-1">
                                {
                                    movie?.directores.map(director => (
                                        <p key={director} className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">{director}</p>
                                    ))
                                }
                            </div>
                            <h4 className="text-sm font-bold">Elenco</h4>
                            <div className="flex flex-row flex-wrap gap-1">
                                {
                                    movie?.elenco.map(actor => (
                                        <p key={actor} className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">{actor}</p>
                                    ))
                                }
                            </div>
                        </article>
                        <div className="hidden lg:flex lg:flex-col lg:gap-2">
                            <DatosAdicionales movie={movie} />
                        </div>
                    </header>
                </div>
                <div className="lg:hidden flex flex-col gap-3">
                    <DatosAdicionales movie={movie} />
                </div>
            </main>
        </main>
    )
}