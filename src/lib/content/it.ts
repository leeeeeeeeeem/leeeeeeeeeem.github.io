import type { Content } from './types';

// REVIEW: Italian draft, not yet approved by Stefano.
export const it: Content = {
	meta: {
		title: 'Stefano Lemerle',
		description:
			'Studente magistrale in Ingegneria Informatica al Politecnico di Torino. Machine learning per audio e musica.',
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
		more: 'altro',
		buildsOn: 'Si basa su',
		footer: 'Stefano Lemerle, 2026'
	},
	about: {
		role: 'studente magistrale',
		education: [
			'Laurea magistrale in Ingegneria Informatica (AI e Data Analytics), Politecnico di Torino, in corso',
			'Laurea triennale in Ingegneria Informatica, Politecnico di Torino, 2025'
		],
		// Update when the exchange ends.
		now: 'semestre di scambio al KAIST, autunno 2026',
		focus: "machine learning per l'audio e la musica",
		bio: "Voglio lavorare sul machine learning per l'audio e la musica, creando strumenti che aiutino gli artisti a fare musica migliore e più in fretta, senza togliere loro la parte creativa. Al Politecnico di Torino studio AI e Data Analytics, ma mi piace anche incentrarmi su argomenti di basso livello, come sistemi operativi, codice embedded e DSP in tempo reale. Tutto nasce dalla mia passione per la musica. ho iniziato a suonare pianoforte e chitarra da piccolo e dal 2019 produco, mixo e masterizzo canzoni, alcune delle quali pubblicate sulle piattaforme di streaming."
	},
	interests: {
		intro:
			'Non ho ancora fatto ricerca, quindi queste sono direzioni e non risultati. Lavorerei volentieri su qualsiasi cosa aiuti gli artisti.',
		items: [
			{
				title: 'Separazione delle sorgenti e denoising',
				reason:
					'Da produttore do molta importanza a questi strumenti e vorrei migliorarli per poterli usare meglio per prelevare le stems da vecchie tracce e ripulire registazioni.'
			},
			{
				title: 'ML in tempo reale dentro i plugin',
				reason: "Sulla scia di Neural Amp Modeler, applicato all'emulazione di synth hardware.",
			},
			{
				title: 'Cercare nella propria libreria di campioni descrivendo un suono',
				reason:
					'Esistono già strumenti locali, mi interessa quanto bene capiscano le parole che usano davvero i produttori.'
			}
		]
	},
	music: {
		intro:
			'Oggi principalmente produco in Logic Pro, a volte aggiungendo chitarra o pianoforte. Il mio studio è una stanza quadrata che aveva forti riflessioni, quindi ho costruito 35 pannelli acustici in lana di roccia, legno e tessuto non tessuto e li ho montati su pareti e soffitto.',
		group:
			'Prima facevo parte di un gruppo rap melodico/R&B con due amici, in cui producevo e mixavo.',
		now: 'Ora sto lavorando a nuovo materiale. Tre strumentali:'
	}
};
