<script lang="ts">
	import { resolve } from '$app/paths';
	import KeyValue from '#lib/components/KeyValue.svelte';
	import LangSwitch from '#lib/components/LangSwitch.svelte';
	import Pane from '#lib/components/Pane.svelte';
	import Player from '#lib/components/Player.svelte';
	import ProjectRow from '#lib/components/ProjectRow.svelte';
	import { content } from '#lib/content/index.ts';
	import { papers } from '#lib/content/papers.ts';
	import { profile } from '#lib/content/profile.ts';
	import { projects } from '#lib/content/projects.ts';
	import { tracks } from '#lib/content/tracks.ts';
	import type { Lang } from '#lib/content/types.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const lang = $derived(data.lang);
	const c = $derived(content[lang]);

	// Absolute URLs for canonical/hreflang; relative hrefs (via resolve) for in-page links.
	const langPaths: Record<Lang, string> = { en: '/', it: '/it/' };
	const langHrefs: Record<Lang, string> = {
		en: resolve('/[[lang=lang]]', {}),
		it: `${resolve('/[[lang=lang]]', { lang: 'it' })}/`
	};
	const url = (l: Lang) => profile.site + langPaths[l];

	const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

	// Icons are Nerd Font code points (fa-github, fa-envelope, fa-linkedin_in, fa-file_pdf_o).
	// A null href renders as a placeholder link until the URL is set in profile.ts.
	const links: { id: string; icon: string; label: string; href: string | null }[] = $derived([
		{ id: 'github', icon: '\uf09b', label: 'github', href: profile.github },
		{ id: 'mail', icon: '\uf0e0', label: 'mail', href: `mailto:${profile.email}` },
		{ id: 'linkedin', icon: '\uf0e1', label: 'linkedin', href: profile.linkedin },
		{ id: 'cv', icon: '\uf1c1', label: 'cv.pdf', href: profile.cv?.[lang] ?? null }
	]);
</script>

<svelte:head>
	<title>{c.meta.title}</title>
	<meta name="description" content={c.meta.description} />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="canonical" href={url(lang)} />
	<link rel="alternate" hreflang="en" href={url('en')} />
	<link rel="alternate" hreflang="it" href={url('it')} />
	<link rel="alternate" hreflang="x-default" href={url('en')} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={c.meta.title} />
	<meta property="og:description" content={c.meta.description} />
	<meta property="og:url" content={url(lang)} />
	<meta property="og:locale" content={c.meta.ogLocale} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

{#snippet open()}
	<span class="open">
		{#each links as l (l.id)}
			<a href={l.href ?? undefined} rel={l.href ? 'noopener' : undefined}
				><span class="icon" aria-hidden="true">{l.icon}</span>
				<span class="label">{l.label}</span></a
			>
		{/each}
	</span>
{/snippet}

<a class="skip-link" href="#main">{c.ui.skip}</a>

<header>
	<LangSwitch {lang} hrefs={langHrefs} label={c.ui.language} switchLabel={c.ui.switchLang} />
</header>

<main id="main">
	<Pane id="about" title={c.ui.windows.about}>
		<h1>{profile.name}</h1>
		<KeyValue
			rows={[
				{ key: c.ui.kv.role, value: c.about.role },
				{ key: c.ui.kv.education, value: c.about.education },
				{ key: c.ui.kv.now, value: c.about.now },
				{ key: c.ui.kv.focus, value: c.about.focus },
				{ key: c.ui.kv.open, value: open }
			]}
		/>
		<p class="bio">{c.about.bio}</p>
	</Pane>

	<Pane id="projects" title={c.ui.windows.projects}>
		<ul class="projects">
			{#each projects.slice(0, 6) as p (p.id)}
				<ProjectRow project={p} {lang} moreLabel={c.ui.more} />
			{/each}
		</ul>
	</Pane>

	<Pane id="interests" title={c.ui.windows.interests}>
		<p class="intro">{c.interests.intro}</p>
		<ul class="interests">
			{#each c.interests.items as r (r.title)}
				<li>
					{r.title}
					{#if r.reason || r.project}
						<span class="reason">
							{r.reason}
							{#if r.project}{c.ui.buildsOn}
								<a href="#{r.project}">{projectName(r.project)}</a>.{/if}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	</Pane>

	{#if tracks.length}
		<Pane id="music" title={c.ui.windows.music}>
			<p>{c.music.intro}</p>
			<p class="group">
				{c.music.group} <a href={profile.spotify} rel="noopener">Spotify</a>
			</p>
			<p class="now">{c.music.now}</p>
			<Player {tracks} {lang} labels={{ play: c.ui.play, pause: c.ui.pause, seek: c.ui.seek }} />
		</Pane>
	{/if}

	{#if papers.length}
		<Pane id="papers" title={c.ui.windows.papers}>
			<ul>
				{#each papers as p (p.title)}
					<li>{p.title}, {p.venue}, {p.year}</li>
				{/each}
			</ul>
		</Pane>
	{/if}
</main>

<footer>
	<p>{c.ui.footer}</p>
</footer>

<style>
	header,
	main,
	footer {
		max-width: 100ch;
		margin-inline: auto;
		padding-inline: 2ch;
	}

	header {
		display: flex;
		justify-content: flex-end;
		padding-block-start: 0.5lh;
	}

	main {
		display: flex;
		flex-direction: column;
		/* WebTUI insets each border by 0.5lh, so adjacent panes already sit 1lh apart. */
		padding-block: 0.5lh;
	}

	footer {
		padding-block-end: calc(1lh + env(safe-area-inset-bottom));
	}

	/* Line up with the pane borders, which WebTUI insets by half a cell. */
	header > :global(*),
	footer p {
		margin-inline: 0.5ch;
	}

	footer p {
		color: var(--fg-muted);
	}

	h1 {
		font-size: 1.25rem;
		margin-block-end: 0.5lh;
	}

	.open {
		display: flex;
		flex-wrap: wrap;
		gap: 0 3ch;
	}

	/* Underline the label only, not the icon. */
	.open a {
		text-decoration: none;
	}

	.open .label {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	/* Placeholder links (no URL yet). */
	.open a:not([href]) {
		color: var(--fg-muted);
	}

	.open a:not([href]) .label {
		text-decoration: none;
	}

	.bio {
		margin-block-start: 1lh;
	}

	.projects {
		display: grid;
		grid-template-columns: max-content 1fr auto;
		gap: 1lh 2ch;
	}

	@media (max-width: 48rem) {
		.projects {
			grid-template-columns: 1fr;
		}
	}

	.intro,
	.group,
	.now {
		margin-block-end: 1lh;
	}

	.group {
		margin-block-start: 1lh;
	}

	.interests {
		display: flex;
		flex-direction: column;
		gap: 0.5lh;
	}

	/* Hanging indent: wrapped lines align with the text, not the "- " marker. */
	.interests li {
		padding-inline-start: 2ch;
	}

	.interests li::before {
		margin-inline-start: -2ch;
	}

	.reason {
		display: block;
		color: var(--fg-muted);
	}

	@media (max-width: 60ch) {
		header,
		main,
		footer {
			padding-inline: 1ch;
		}
	}
</style>
