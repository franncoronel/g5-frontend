import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import { Movie } from '@/data/domain/Movie';

interface Item {
  id: string;
  movie?: Movie;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  blurToFocus?: boolean;
  gapX?: number;
  gapY?: number;
}

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, []);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) =>
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    );
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.8,
  stagger = 0.15,
  blurToFocus = true,
  gapX = 16,
  gapY = 24
}) => {
  const navigate = useNavigate();
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const prevCount = useRef(0);
  const hasMounted = useRef(false);

  // Preload imágenes
  useEffect(() => {
    const urls = items.map(i => i.movie?.poster || '');
    Promise.all(
      urls.map(url =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = img.onerror = () => resolve();
        })
      )
    ).then(() => setImagesReady(true));
  }, [items]);

  // Columnas responsive
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    2
  );

  // Calcula ancho y alto de las cards
  const cardWidth = width && columns ? (width - gapX * (columns - 1)) / columns : 250;
  const cardHeight = cardWidth * 4 / 3 + 90; // Se alarga un poco para mostrar mejor detalle

  // Layout grid
  const grid = useMemo<GridItem[]>(() => {
    if (!width || width < 10) return [];
    const colHeights = new Array(columns).fill(0);

    return items.map(item => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (cardWidth + gapX);
      const y = colHeights[col];
      colHeights[col] += cardHeight + gapY;
      return { ...item, x, y, w: cardWidth, h: cardHeight };
    });
  }, [items, columns, width, cardWidth, cardHeight, gapX, gapY]);

  const getInitialPosition = (item: GridItem, isNew: boolean) => ({
    x: item.x,
    y: item.y + (isNew ? 200 : 150)
  });

  // Animaciones GSAP
  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const isNew = index >= prevCount.current;
      const start = getInitialPosition(item, isNew);

      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          { opacity: 0, x: start.x, y: start.y, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, x: item.x, y: item.y, ...(blurToFocus && { filter: 'blur(0px)' }), duration, ease, delay: index * stagger }
        );
      } else if (isNew) {
        gsap.fromTo(
          selector,
          { opacity: 0, x: start.x, y: start.y, filter: 'blur(10px)' },
          { opacity: 1, x: item.x, y: item.y, filter: 'blur(0px)', duration, ease, delay: (index - prevCount.current) * 0.05 }
        );
      } else {
        gsap.to(selector, { x: item.x, y: item.y, duration: 0.4, ease });
      }
    });
    prevCount.current = grid.length;
    hasMounted.current = true;
  }, [grid, imagesReady, cardWidth, cardHeight]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: grid.length ? Math.max(...grid.map(i => i.y + i.h)) + gapY : 0 }}
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute"
          style={{
            width: item.w,
            height: item.h,
            opacity: 0,
            willChange: 'transform, width, height, opacity'
          }}
          onClick={() => {
              if (item.movie) {
                navigate(`/pelicula/${item.movie.id}`);
              }
            }}
        >
          {item.movie && <MovieCard movie={item.movie} />}
        </div>
      ))}
    </div>
  );
};

export default Masonry;