import type { Lang } from '#lib/content/types.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => ({ lang: (params.lang ?? 'en') as Lang });
