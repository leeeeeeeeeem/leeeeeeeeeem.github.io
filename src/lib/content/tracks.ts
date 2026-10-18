import type { Track } from './types';
import { fixtureTracks } from './fixtures';

// [TODO: Stefano supplies tracks, titles, years; confirm rights]
const published: Track[] = [];

// Design fixtures render the player during design work only (VITE_DESIGN_FIXTURES=1).
export const tracks: Track[] =
	published.length || import.meta.env.VITE_DESIGN_FIXTURES !== '1' ? published : fixtureTracks;
