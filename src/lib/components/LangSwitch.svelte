<script lang="ts">
	import type { Lang } from '#lib/content/types.ts';

	let {
		lang,
		hrefs,
		label,
		switchLabel
	}: { lang: Lang; hrefs: Record<Lang, string>; label: string; switchLabel: string } = $props();

	const langs: Lang[] = ['en', 'it'];

	// Keep the section when switching language.
	function keepHash(e: MouseEvent) {
		(e.currentTarget as HTMLAnchorElement).hash = location.hash;
	}
</script>

<ul class="langs" aria-label={label}>
	{#each langs as l (l)}
		<li>
			<a
				href={hrefs[l]}
				hreflang={l}
				lang={l}
				aria-current={l === lang ? 'true' : undefined}
				aria-label={l === lang ? undefined : switchLabel}
				data-sveltekit-reload
				onclick={keepHash}>{l === lang ? `[${l.toUpperCase()}]` : l.toUpperCase()}</a
			>
		</li>
	{/each}
</ul>

<style>
	.langs {
		display: flex;
		gap: 1ch;
	}

	li::before {
		content: none;
	}

	a {
		color: var(--fg-muted);
		text-decoration: none;
	}

	a:hover {
		color: var(--fg);
	}

	a[aria-current='true'] {
		color: var(--accent);
	}

	@media (pointer: coarse) {
		a {
			display: inline-block;
			min-height: 44px;
			line-height: 44px;
		}
	}
</style>
