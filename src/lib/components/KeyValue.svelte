<script lang="ts">
	import type { Snippet } from 'svelte';

	let { rows }: { rows: { key: string; value: string | string[] | Snippet }[] } = $props();
</script>

<dl class="kv">
	{#each rows as row (row.key)}
		<dt>{row.key}</dt>
		<dd>
			{#if typeof row.value === 'string'}
				{row.value}
			{:else if Array.isArray(row.value)}
				{#each row.value as line (line)}<span class="line">{line}</span>{/each}
			{:else}
				{@render row.value()}
			{/if}
		</dd>
	{/each}
</dl>

<style>
	.kv {
		display: grid;
		grid-template-columns: max-content 1fr;
		column-gap: 2ch;
	}

	dt {
		color: var(--fg-muted);
	}

	.line {
		display: block;
	}
</style>
