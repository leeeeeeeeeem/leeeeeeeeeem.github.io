import type { Content } from './types';

// REVIEW: Italian draft, not yet approved by Stefano.
export const it: Content = {
	meta: {
		title: 'Stefano Lemerle',
		description:
			'Studente di laurea magistrale in Ingegneria Informatica al Politecnico di Torino. Machine learning per audio e musica.',
		ogLocale: 'it_IT'
	},
	ui: {
		skip: 'Vai al contenuto',
		language: 'Lingua',
		windows: {
			about: 'chi-sono',
			projects: 'progetti',
			music: 'musica',
			interests: 'interessi',
			papers: 'articoli'
		},
		kv: { role: 'ruolo', education: 'formazione', now: 'ora', focus: 'focus', open: 'contatti' },
		switchLang: "Passa all'inglese",
		play: 'riproduci',
		pause: 'pausa',
		seek: 'Posizione',
		moreOnGithub: 'altro su GitHub',
		more: 'altro',
		footer: 'Stefano Lemerle, 2026'
	},
	about: {
		role: 'studente magistrale',
		education: [
			'Laurea magistrale in Ingegneria Informatica (AI e analisi dei dati), Politecnico di Torino, in corso',
			'Laurea triennale in Ingegneria Informatica, Politecnico di Torino, 2025'
		],
		// Update when the exchange ends.
		now: 'semestre di scambio al KAIST, autunno 2026',
		focus: "machine learning per l'audio e la musica",
		bio: "Voglio lavorare sul machine learning per l'audio e la musica, creando strumenti che aiutino gli artisti a fare musica migliore e più in fretta, senza togliere loro la parte creativa. Al Politecnico di Torino studio AI e analisi dei dati, ma mi piace anche il lavoro a basso livello, dai sistemi operativi e dal codice embedded fino al DSP in tempo reale. Tutto nasce dalla musica: ho iniziato a suonare pianoforte e chitarra da piccolo e dal 2019 produco, mixo e masterizzo canzoni, alcune delle quali pubblicate sulle piattaforme di streaming."
	},
	interests: [
		// [TODO: confirm each is a real interest]
		{
			title: 'Score following oltre il pianoforte',
			reason: 'a partire dalla libreria Matchmaker e dal dataset violino-pianoforte KRAISLER'
		},
		{ title: 'Robustezza dei modelli audio-linguaggio' }
	]
};
