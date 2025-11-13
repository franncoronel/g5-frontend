// export interface MoviePreferences {
//   genres: string[];
//   yearRange: [number, number];
//   duration: [number, number];
//   actors: string;
//   directors: string;
// }

export interface MoviePreferences {
  genres?: number[];
  yearRange: [number, number];
  duration: [number, number];
  actors?: string[];
  directors?: string[];
}