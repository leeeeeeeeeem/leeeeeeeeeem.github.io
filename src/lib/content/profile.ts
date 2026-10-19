import type { Lang } from './types.ts';

export const profile = {
	name: 'Stefano Lemerle',
	site: 'https://leeeeeeeeeem.github.io',
	github: 'https://github.com/leeeeeeeeeem',
	// The group's artist page (Stefano produced and mixed).
	spotify: 'https://open.spotify.com/artist/4tfUwDRymNEwPfaR9CH2xS',
	email: 'stefano.lemerle@gmail.com',
	linkedin: 'https://www.linkedin.com/in/stefano-lemerle-7a8a69441/' as null | string,
	// Copied from ~/Documents/CV/cv/cv.pdf and cv-it.pdf; re-copy when the CV changes.
	cv: {
		en: '/cv/stefano-lemerle-cv.pdf',
		it: '/cv/stefano-lemerle-cv-it.pdf'
	} as null | Record<Lang, string>
};
