import type { Track } from './types';

// Not real music: placeholder rows so the player can be designed before tracks exist.
// Never used in production builds.
export const fixtureTracks: Track[] = [
	{ id: 'fixture-a', title: 'fixture-track-a', files: [], duration: 220 },
	{ id: 'fixture-b', title: 'fixture-track-b', files: [], duration: 178 }
];
