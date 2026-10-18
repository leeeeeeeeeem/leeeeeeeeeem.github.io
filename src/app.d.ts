// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// WebTUI attribute selectors (note the trailing hyphen).
declare module 'svelte/elements' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- must match the original declaration
	interface HTMLAttributes<T> {
		'box-'?: 'square' | 'round' | 'double';
		'shear-'?: 'top' | 'bottom' | 'both';
	}
}

export {};
