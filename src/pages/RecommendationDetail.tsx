import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Film, ArrowUpDown } from "lucide-react"

export const RecommendationDetail = () => {
    const navigate = useNavigate()


    const handleBack = () => {
        navigate("/");
    };


    return (
        <main className="bg-red-300">
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

            <section className="flex flex-col md:flex-row w-full h-full gap-5 px-8 py-5">
                {/* Portada + plataformas */}
                <figure className="flex flex-col items-center w-full md:h-screen md:sticky md:top-0 md:w-1/3">
                    <img alt="MAN" className="object-cover object-center h-120 w-11/12 h-96 md:h-3/4" src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop">
                    </img>
                </figure>

                {/* Detalles */}
                <main className="md:w-2/3 flex flex-col gap-4">
                    <header className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-5xl text-center md:text-start font-bold">Batman: The Dark Knight</h1>
                        <section className="flex w-full md:w-1/2 justify-between">
                            <p className="text-md">2019</p>
                            <p className="text-md">2 hr 30 min</p>
                            <p className="text-md">*****</p>
                        </section>
                    </header>

                    <section className="flex flex-col gap-2">
                        <article className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold">Géneros</h4>
                            <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Drama</p>
                            <h4 className="text-sm font-bold">Directores</h4>
                            <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Paul Thomas Anderson</p>
                            <h4 className="text-sm font-bold">Elenco</h4>
                            <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">Benicio del Toro</p>
                        </article>
                        <article className="flex flex-col gap-1">
                            <h3 className="text-md font-bold">Sinopsis</h3>
                            <p className="text-sm max-w-prose md:max-w-3xl bg-stone-900 rounded-sm p-2 opacity-85">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum pharetra odio. Cras interdum sit amet nisi non volutpat. Donec ultricies condimentum mi. Duis interdum tempor ipsum vitae auctor. Nulla auctor vestibulum ante, at interdum lectus faucibus sit amet. Morbi consequat, lectus vel viverra posuere, nisi ex mollis nunc, ac ullamcorper eros orci id ante. Donec euismod pretium laoreet. Suspendisse ipsum sem, lacinia at nibh at, posuere cursus ipsum. Vivamus ut quam id diam malesuada tempor. Cras lectus nisi, porta nec nibh ut, gravida convallis sapien. Curabitur ultricies enim erat. Etiam pulvinar nibh nec libero hendrerit, nec fermentum augue dictum.</p>
                        </article>
                        <footer className="flex flex-col gap-1">
                            <h2 className="text-md font-bold">La puedes encontrar en</h2>
                            <p className="text-sm w-fit bg-stone-900 rounded-2xl px-2 opacity-85">HBO</p>
                        </footer>
                        <footer className="flex flex-col gap-1">
                            <h4 className="text-md font-bold">También conocida como</h4>
                            <p className="text-sm max-w-prose md:max-w-3xl bg-stone-900 rounded-sm p-2 opacity-85">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum pharetra odio. Cras interdum sit amet nisi non volutpat. Donec ultricies condimentum mi. Duis interdum tempor ipsum vitae auctor. Nulla auctor vestibulum ante, at interdum lectus faucibus sit amet. Morbi consequat, lectus vel viverra posuere, nisi ex mollis nunc, ac ullamcorper eros orci id ante. Donec euismod pretium laoreet. Suspendisse ipsum sem, lacinia at nibh at, posuere cursus ipsum. Vivamus ut quam id diam malesuada tempor. Cras lectus nisi, porta nec nibh ut, gravida convallis sapien. Curabitur ultricies enim erat. Etiam pulvinar nibh nec libero hendrerit, nec fermentum augue dictum.</p>
                        </footer>
                    </section>

                </main>
            </section>
        </main>
    )
}