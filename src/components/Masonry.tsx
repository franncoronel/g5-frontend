import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import { Movie } from '@/data/domain/Movie';

// === Hooks auxiliares ===
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

// === Tipos ===
interface Item {
  id: string;
  img: string;
  url: string;
  movie?: Movie;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

// === Componente principal ===
const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const navigate = useNavigate()

  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    2
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const prevCount = useRef(0);

  // Calcula la posición inicial de aparición
  const getInitialPosition = (item: any, isNew: boolean) => {
    if (isNew) {
      // En nuevas tandas: aparecer desde abajo
      return { x: item.x, y: item.y + 250 };
    }

    // En carga inicial: dependerá de animateFrom
    switch (animateFrom) {
      case "left":
        return {
          x: item.x - 200,
          y: item.y };
      case "right":
        return {
          x: item.x + 200,
          y: item.y };
      case "top":
        return {
          x: item.x,
          y: item.y - 200 };
      case "bottom":
        return {
          x: item.x,
          y: item.y + 200 };
      case "center":
        return {
          x: item.x + 100,
          y: item.y + 100 };
      default:
        return {
          x: item.x,
          y: item.y };
    }
  };

  // === Preload de imágenes ===
  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  // === Layout dinámico ===
  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const aspectRatio = 1.33; // relación 3:4 del poster (4/3)
    const contentOffset = 80; // espacio adicional para texto

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
       const height = columnWidth * aspectRatio + contentOffset;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  // === Animaciones ===
  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const element = document.querySelector(selector);
      if (!element) return;

      const animProps = { x: item.x, y: item.y, width: item.w };

      // Detectar si este ítem es nuevo (no estaba en la tanda anterior)
      const isNew = index >= prevCount.current;
      const start = getInitialPosition(item, isNew);

          if (!hasMounted.current) {
            // Primera tanda → animar todos
            gsap.fromTo(
              selector,
              {
                opacity: 0,
                x: start.x,
                y: start.y,
                width: item.w,
                ...(blurToFocus && { filter: "blur(10px)" })
              },
              {
                opacity: 1,
                ...animProps,
                ...(blurToFocus && { filter: "blur(0px)" }),
                duration: 0.8,
                ease: "power3.out",
                delay: index * stagger,
                onComplete: () => element.classList.add("animated")
              }
            );
          } else if (isNew) {
            // Scroll infinito → animar solo las nuevas desde abajo
            gsap.fromTo(
              selector,
              {
                opacity: 0,
                x: item.x,
                y: start.y,
                filter: "blur(10px)"
              },
              {
                opacity: 1,
                ...animProps,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power3.out",
                delay: (index - prevCount.current) * 0.05,
                onComplete: () => element.classList.add("animated")
              }
            );
          } else {
            // Elementos ya visibles → solo reposicionar sin animar
            gsap.to(selector, {
              ...animProps,
              duration,
              ease,
              overwrite: 'auto'
            });
          }
        });

        prevCount.current = grid.length;
        hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  // === Hover ===
  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  // === Render ===
  return (
    <div ref={containerRef} className="relative w-full">
      {/*
      El contenedor interior (con ref={containerRef}) usa posición absoluta para las cards.
      Como los elementos absolutos no expanden la altura del contenedor por sí mismos,
      se calculó manualmente una altura mínima (`minHeight`) basada en la posición vertical
      más baja (y) de las cards ya colocadas.

      A eso se le sumó un margen extra (+500) para que haya espacio visible
      al final del layout, evitando que las últimas cards queden pegadas
      al borde inferior de la página.
      */}
      <div  ref={containerRef} className="relative w-full"
            style={{ minHeight: grid.length ? Math.max(...grid.map(i => i.y)) + 500 : 0 }}>
        {grid.map(item => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content"
            style={{ willChange: 'transform, width, height, opacity' }}
            // onClick={() => window.open(item.url, '_blank', 'noopener')}
            onClick={() => {
              if (item.movie) {
                navigate(`/pelicula/${item.movie.id}`);
              }
            }}
            onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
            onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
          >
            <MovieCard movie={item.movie}/>
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Masonry;