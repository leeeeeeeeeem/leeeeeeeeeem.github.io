<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, title, children }: { id: string; title: string; children: Snippet } = $props();
</script>

<section {id} class="pane" aria-labelledby="{id}-title" box-="round" shear-="top">
	<h2 id="{id}-title" class="pane-title">{title}</h2>
	<div class="pane-body">
		{@render children()}
	</div>
</section>

<style>
	.pane {
		padding-inline: 2.5ch;
		scroll-margin-top: 1lh;
	}

	/* Sits on the top border, like a tmux pane title. */
	.pane-title {
		display: inline-block;
		margin-inline-start: -1ch;
		padding-inline: 1ch;
		background-color: var(--bg);
		color: var(--accent);
		font-weight: var(--font-weight-bold);
	}

	.pane-body {
		padding-block-start: 0.5lh;
	}
</style>
