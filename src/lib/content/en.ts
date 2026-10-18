import type { Content } from './types';

export const en: Content = {
	meta: {
		title: 'Stefano Lemerle',
		description:
			'MSc student in Computer Engineering at Politecnico di Torino. Machine learning for audio and music.',
		ogLocale: 'en_GB'
	},
	ui: {
		skip: 'Skip to content',
		language: 'Language',
		windows: {
			about: 'about',
			projects: 'projects',
			music: 'music',
			interests: 'interests',
			papers: 'papers'
		},
		kv: { role: 'role', education: 'education', now: 'now', focus: 'focus', open: 'open' },
		switchLang: 'Switch to Italian',
		play: 'play',
		pause: 'pause',
		seek: 'Seek',
		moreOnGithub: 'more on GitHub',
		more: 'more',
		footer: 'Stefano Lemerle, 2026'
	},
	about: {
		role: 'MSc student',
		education: [
			'MSc Computer Engineering (AI and data analytics), Politecnico di Torino, current',
			'BSc Computer Engineering, Politecnico di Torino, 2025'
		],
		// Update when the exchange ends.
		now: 'exchange semester at KAIST, fall 2026',
		focus: 'machine learning for audio and music',
		bio: 'I want to work on machine learning for audio and music, making tools that help artists create better music faster without taking the creative part away from them. At Politecnico di Torino I study AI and data analytics, but I also like low-level work, from operating systems and embedded code to real-time DSP. All of this comes from music: I started piano and guitar at a young age, and since 2019 I have produced, mixed and mastered songs, some of them released on streaming platforms.'
	},
	interests: [
		// [TODO: confirm each is a real interest]
		{
			title: 'Score following beyond piano',
			reason: 'building on the Matchmaker library and the KRAISLER violin-piano dataset'
		},
		{ title: 'Robustness of audio-language models' }
	]
};
