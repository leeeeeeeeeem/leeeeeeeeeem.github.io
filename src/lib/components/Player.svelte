<script lang="ts">
	import { onMount } from 'svelte';
	import type { Lang, Track } from '#lib/content/types.ts';

	let {
		tracks,
		lang,
		labels
	}: { tracks: Track[]; lang: Lang; labels: { play: string; pause: string; seek: string } } =
		$props();

	const BAR_CELLS = 24;

	let enhanced = $state(false);
	let audio = $state<HTMLAudioElement>();
	let index = $state(0);
	let playing = $state(false);
	let time = $state(0);
	let durations = $state<Record<string, number>>({});

	const current = $derived(tracks[index]);
	const duration = $derived(durations[current.id] ?? current.duration ?? 0);

	onMount(() => (enhanced = true));

	function fmt(seconds: number) {
		if (!Number.isFinite(seconds) || seconds <= 0) return '00:00';
		const s = Math.floor(seconds);
		return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
	}

	function bar(progress: number) {
		const filled = Math.min(BAR_CELLS - 1, Math.round(progress * (BAR_CELLS - 1)));
		return progress > 0
			? '='.repeat(filled) + 'o' + '-'.repeat(BAR_CELLS - filled - 1)
			: '-'.repeat(BAR_CELLS);
	}

	async function toggle() {
		if (!audio) return;
		if (audio.paused) {
			try {
				await audio.play();
			} catch {
				playing = false;
			}
		} else audio.pause();
	}

	async function select(i: number) {
		if (i === index) return toggle();
		audio?.pause();
		index = i;
		time = 0;
		// Wait for the new <source> elements before loading.
		await Promise.resolve();
		audio?.load();
		await toggle();
	}

	const announcement = $derived(`${playing ? labels.play : labels.pause}: ${current.title}`);
</script>

{#if enhanced}
	<audio
		bind:this={audio}
		preload="metadata"
		bind:currentTime={time}
		onplay={() => (playing = true)}
		onpause={() => (playing = false)}
		onended={() => (playing = false)}
		onloadedmetadata={() => {
			if (audio) durations[current.id] = audio.duration;
		}}
	>
		{#each current.files as f (f.src)}
			<source src={f.src} type={f.type} />
		{/each}
	</audio>

	<ul class="tracks">
		{#each tracks as t, i (t.id)}
			{@const isCurrent = i === index}
			{@const total = isCurrent ? duration : (durations[t.id] ?? t.duration ?? 0)}
			{@const elapsed = isCurrent ? time : 0}
			<li class="track">
				<span class="ctl">
					{#if isCurrent}
						<button
							type="button"
							class="toggle"
							aria-label={playing ? labels.pause : labels.play}
							onclick={toggle}>{playing ? '||' : '>'}</button
						>
					{/if}
				</span>
				<button
					type="button"
					class="title"
					aria-current={isCurrent ? 'true' : undefined}
					onclick={() => select(i)}>{t.title}</button
				>
				<span class="bar">
					<span aria-hidden="true">{bar(total ? elapsed / total : 0)}</span>
					{#if isCurrent}
						<input
							type="range"
							min="0"
							max={total || 0}
							step="1"
							bind:value={time}
							oninput={(e) => audio && (audio.currentTime = +e.currentTarget.value)}
							aria-label={labels.seek}
							aria-valuetext="{fmt(elapsed)} / {fmt(total)}"
						/>
					{/if}
				</span>
				<span class="time">{fmt(elapsed)} / {fmt(total)}</span>
				{#if t.note}<span class="note">{t.note[lang]}</span>{/if}
			</li>
		{/each}
	</ul>
	<p class="visually-hidden" aria-live="polite">{announcement}</p>
{:else}
	<ul class="tracks">
		{#each tracks as t (t.id)}
			<li class="fallback">
				<span>{t.title}</span>
				<audio controls preload="none">
					{#each t.files as f (f.src)}<source src={f.src} type={f.type} />{/each}
				</audio>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.tracks li::before {
		content: none;
	}

	.track {
		display: grid;
		grid-template-columns: 3ch 24ch 24ch auto;
		column-gap: 1ch;
	}

	button {
		font: inherit;
		color: inherit;
		background: none;
		border: none;
		cursor: pointer;
		text-align: start;
	}

	.toggle {
		color: var(--accent);
	}

	.title {
		color: var(--fg-muted);
	}

	.title[aria-current='true'] {
		color: var(--fg);
	}

	.title:hover,
	.toggle:hover {
		color: var(--accent-hover);
	}

	.bar {
		position: relative;
		color: var(--fg-muted);
	}

	/* The native range sits invisibly over the text bar and does the seeking. */
	.bar input {
		position: absolute;
		inset: 0;
		width: 100%;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	.bar:has(input:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.time {
		color: var(--fg-muted);
		font-variant-numeric: tabular-nums;
	}

	.note {
		grid-column: 2 / -1;
		color: var(--fg-muted);
	}

	.fallback {
		display: flex;
		flex-wrap: wrap;
		gap: 1ch 2ch;
		align-items: center;
	}

	@media (max-width: 48rem) {
		.track {
			grid-template-columns: 3ch 1fr;
		}

		.bar,
		.time,
		.note {
			grid-column: 2;
		}
	}
</style>
