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
		more: 'more',
		buildsOn: 'Builds on',
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
		bio: 'I want to work on machine learning for audio and music, making tools that help artists create better music faster without taking the creative part away from them. At Politecnico di Torino I study AI and data analytics, but I also like low-level work, from operating systems and embedded code to real-time DSP. This comes from my love of music, I started piano and guitar at a young age, and since 2019 I have produced, mixed and mastered songs, some of them released on streaming platforms.'
	},
	// Approved by Stefano 2026-10-18.
	interests: {
		intro:
			"I haven't done research yet, so these are directions and not results. I'd work on anything that helps artists.",
		items: [
			{
				title: 'Source separation and denoising',
				reason: 'As a producer I value these tools I would like to improve them for pulling stems from old bounces and cleaning up recordings.'
			},
			{
				title: 'Real-time ML inside plugins',
				reason: 'In the spirit of Neural Amp Modeler, applied to hardware synth emulation.',
			},
			{
				title: 'Searching your own sample library by description',
				reason:
					"Local tools already exist, but I'm interested in how well they understand the words producers actually use."
			}
		]
	},
	// Approved by Stefano 2026-10-18.
	music: {
		intro:
			'I mainly produce now, in Logic Pro, sometimes adding guitar or piano. My studio is a square room, which had strong reflections, so I built 35 acoustic panels from rockwool, wood and non-woven fabric and mounted them on the walls and ceiling.',
		group:
			'Before that I was in a melodic rap/R&B group with two friends, where I produced and mixed.',
		now: "I'm now working on new material. Three instrumentals:"
	}
};
