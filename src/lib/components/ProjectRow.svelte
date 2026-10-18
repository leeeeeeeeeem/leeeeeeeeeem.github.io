<script lang="ts">
	import type { Lang, Project } from '#lib/content/types.ts';

	let { project, lang, moreLabel }: { project: Project; lang: Lang; moreLabel: string } = $props();
	const linkLabels = { repo: 'repo', demo: 'demo', notes: 'notes' } as const;
</script>

<li class="row">
	<span class="name">{project.name}</span>
	<span class="stack">{project.stack.join(', ')}</span>
	<span class="links">
		{#each Object.entries(project.links) as [kind, href] (kind)}
			{#if typeof href === 'string'}
				<a {href} rel="noopener">{linkLabels[kind as keyof typeof linkLabels]}</a>
			{/if}
		{/each}
	</span>
	<p class="summary">{project.summary[lang]}</p>
	{#if project.detail}
		<details class="detail">
			<summary>{moreLabel}</summary>
			<p>{project.detail[lang]}</p>
		</details>
	{/if}
</li>

<style>
	.row {
		display: grid;
		grid-template-columns: 24ch 1fr auto;
		column-gap: 1ch;
	}

	.row::before {
		content: none;
	}

	.stack {
		color: var(--fg-muted);
	}

	.links {
		display: flex;
		gap: 2ch;
	}

	.summary,
	.detail {
		grid-column: 1 / -1;
	}

	/* Narrow: name and links on one line, stack and summary below. */
	@media (max-width: 48rem) {
		.row {
			grid-template-columns: 1fr auto;
		}

		.links {
			grid-row: 1;
			grid-column: 2;
		}

		.stack {
			grid-column: 1 / -1;
		}
	}
</style>
