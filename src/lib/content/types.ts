export type Lang = 'en' | 'it';
export type Localized = Record<Lang, string>;

export type WindowId = 'about' | 'projects' | 'interests' | 'music' | 'papers';

export type Content = {
	meta: { title: string; description: string; ogLocale: string };
	ui: {
		skip: string;
		language: string;
		windows: Record<WindowId, string>;
		kv: { role: string; education: string; now: string; focus: string; open: string };
		switchLang: string;
		play: string;
		pause: string;
		seek: string;
		more: string;
		buildsOn: string;
		footer: string;
	};
	about: {
		role: string;
		education: string[];
		now: string;
		focus: string;
		bio: string;
	};
	interests: {
		intro: string;
		// project: id of a Project that backs the interest, linked as "builds on".
		items: { title: string; reason?: string; project?: string }[];
	};
	// group is followed by a link to profile.spotify; now introduces the player.
	music: { intro: string; group: string; now: string };
};

export type Project = {
	id: string;
	name: string;
	stack: string[];
	links: { repo?: string; demo?: string; notes?: string };
	summary: Localized;
	detail?: Localized;
};

export type Track = {
	id: string;
	title: string;
	files: { src: string; type: string }[];
	duration?: number;
	year?: number;
	note?: Localized;
};

export type Paper = {
	title: string;
	venue: string;
	year: number;
	links: { pdf?: string; doi?: string; code?: string };
};
