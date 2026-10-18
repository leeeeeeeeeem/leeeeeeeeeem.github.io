import type { Track } from './types';
import { fixtureTracks } from './fixtures';

// Instrumentals, all parts by Stefano. Clips are cut from the WAVs in audio/ (gitignored):
// dal-mio-mondo.mp3 is 0:00-1:25 with a 2.5 s fade-out; love.mp3 and finche-non-mi-riconoscono.mp3 are full bounces.
// [TODO: years]
const published: Track[] = [
	{
		id: 'dal-mio-mondo',
		title: 'Dal Mio Mondo',
		files: [{ src: '/audio/dal-mio-mondo.mp3', type: 'audio/mpeg' }],
		duration: 85
	},
	{
		id: 'love',
		title: 'Love',
		files: [{ src: '/audio/love.mp3', type: 'audio/mpeg' }],
		duration: 81
	},
	{
		id: 'finche-non-mi-riconoscono',
		title: 'Finché Non Mi Riconoscono',
		files: [{ src: '/audio/finche-non-mi-riconoscono.mp3', type: 'audio/mpeg' }],
		duration: 96
	}
];

// Design fixtures render the player during design work only (VITE_DESIGN_FIXTURES=1).
export const tracks: Track[] =
	published.length || import.meta.env.VITE_DESIGN_FIXTURES !== '1' ? published : fixtureTracks;
