<script lang="ts">
	import type { Lang, Project } from '#lib/content/types.ts';

	let { project, lang, moreLabel }: { project: Project; lang: Lang; moreLabel: string } = $props();
	const linkLabels = { repo: 'repo', demo: 'demo', notes: 'notes' } as const;
</script>

<li class="row" id={project.id}>
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
	/* Columns come from the list (subgrid), so the name column fits the longest name in every row. */
	.row {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
	}

	.name {
		white-space: nowrap;
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

	/* Same muted grey as the reasons under each interest. */
	.detail summary,
	.detail p {
		color: var(--fg-muted);
	}

	.detail summary {
		cursor: pointer;
	}

	.detail summary:hover {
		color: var(--fg);
	}

	/* Narrow: name and links on one line, stack and summary below. */
	@media (max-width: 48rem) {
		.row {
			grid-template-columns: 1fr auto;
			column-gap: 2ch;
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
