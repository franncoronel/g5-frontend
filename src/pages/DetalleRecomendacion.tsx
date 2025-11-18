import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Film, ArrowUpDown } from "lucide-react"

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

const DatosAdicionales = () => {
    return (
        <>
            <article className="flex flex-col gap-1">
                <h3 className="text-md font-bold">Sinopsis</h3>
                <p className="text-sm max-w-prose md:max-w-3xl bg-stone-900 rounded-sm p-2 opacity-85">{mockLady.sinopsis}</p>
            </article>
            <section className="md:max-lg:w-full lg:w-2/3 flex flex-col md:max-lg:flex-row md:max-lg:justify-between gap-2">
                <footer className="flex flex-col gap-1">
                    <h2 className="text-md font-bold">La puedes encontrar en</h2>
                    <div className="flex flex-row flex-wrap gap-1">
                        {mockLady.plataformas.map(plataforma => <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">{plataforma}</p>)}
                    </div>
                </footer>
                <footer className="flex flex-col gap-1">
                    <h4 className="text-md font-bold">También conocida como</h4>
                    <div className="flex flex-row flex-wrap gap-1">
                        <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Lorem ipsum</p>
                        <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Dolor sit</p>
                    </div>
                </footer>
            </section>
        </>
    )
}

export const DetalleRecomendacion = () => {
    const navigate = useNavigate()


    const handleBack = () => {
        navigate("/")
    }


    return (
        <main className="bg-center bg-cover bg-black/25 backdrop-blur-sm bg-blend-darken" style={{backgroundImage: `url(${mockLady.fondo})`}}>
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
                        <img alt="MAN" className="object-cover object-center" src={mockLady.portada}>
                        </img>
                    </figure>

                    <header className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center md:text-start font-bold">{mockLady.nombre}</h1>
                        <section className="flex w-full lg:w-1/2 justify-between">
                            <p className="text-md font-bold">{mockLady.anioEstreno}</p>
                            <p className="text-md">{mockLady.duracion}</p>
                            <p className="text-md">*****</p>
                        </section>
                        <article className="flex flex-col gap-1.5">
                            <h4 className="text-sm font-bold">Géneros</h4>
                            <div className="flex flex-row flex-wrap gap-1">
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                            </div>
                            <h4 className="text-sm font-bold">Directores</h4>
                            <div className="flex flex-row flex-wrap gap-1">
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Paul Thomas Anderson</p>
                            </div>
                            <h4 className="text-sm font-bold">Elenco</h4>
                            <div className="flex flex-row flex-wrap gap-1">
                                <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Benicio del Toro</p>
                            </div>
                        </article>
                        <div className="hidden lg:flex lg:flex-col lg:gap-2">
                            <DatosAdicionales/>
                        </div>
                    </header>
                </div>
                <div className="lg:hidden flex flex-col gap-3">
                    <DatosAdicionales/>
                </div>
            </main>
        </main>
    )
}