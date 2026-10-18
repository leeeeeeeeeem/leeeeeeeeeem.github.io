import type { Project } from './types';

const gh = (repo: string) => `https://github.com/leeeeeeeeeem/${repo}`;

// Ordered by relevance to ML and audio, not by date. Approved by Stefano 2026-10-18.
// REVIEW: Italian versions are drafts, not yet approved by Stefano.
export const projects: Project[] = [
	{
		id: 'chorus-param-estimation',
		name: 'chorus-param-estimation',
		stack: ['Python', 'PyTorch', 'Rust'],
		links: { repo: gh('chorus-param-estimation') },
		summary: {
			en: 'A small CNN that listens to audio processed by my chorus plugin and estimates its four knob settings.',
			it: "Una piccola CNN che ascolta l'audio processato dal mio plugin chorus e ne stima le quattro impostazioni delle manopole."
		},
		detail: {
			en: "An educational project to learn audio ML: can a small network hear which rate, depth, delay and mix settings were used? I built a dataset of 26,000 two-second clips by running cleaned dry recordings (VocalSet, IDMT, GuitarSet) through the plugin's own Rust DSP with random settings, then trained a CNN on spectrograms. Giving the model mid and side channels instead of left and right was the biggest gain, cutting validation error from 0.060 to 0.033. On stereo test files it beats a cross-correlation baseline on rate, depth and mix without hearing the dry signal, but is still worse on delay. Next step: testing it on my own recordings.",
			it: "Un progetto didattico per imparare l'audio ML: una piccola rete riesce a sentire quali valori di rate, depth, delay e mix sono stati usati? Ho costruito un dataset di 26.000 clip da due secondi facendo passare registrazioni dry ripulite (VocalSet, IDMT, GuitarSet) nel DSP Rust del plugin con impostazioni casuali, poi ho addestrato una CNN sugli spettrogrammi. Dare al modello i canali mid e side invece di left e right è stato il miglioramento più grande, riducendo l'errore di validazione da 0,060 a 0,033. Sui file stereo di test batte un metodo di riferimento basato sulla cross-correlazione su rate, depth e mix senza sentire il segnale dry, ma resta peggiore sul delay. Prossimo passo: provarlo sulle mie registrazioni."
		}
	},
	{
		id: 'crazy-chorus',
		name: 'crazy-chorus',
		stack: ['Rust', 'truce', 'Slint'],
		links: { repo: gh('crazy-chorus') },
		summary: {
			en: 'A stereo chorus plugin in Rust (AU, VST3, CLAP and standalone), with the DSP written by hand.',
			it: 'Un plugin chorus stereo in Rust (AU, VST3, CLAP e standalone), con il DSP scritto a mano.'
		},
		detail: {
			en: 'An educational project to get better at DSP and to write audio code in Rust. I wrote the delay line, LFO and chorus with no audio libraries: each channel reads its delay line at a position moved by a sine LFO, the right LFO runs a quarter cycle ahead for stereo width, and fractional delays use cubic Hermite interpolation. The audio thread never allocates, locks or logs, every parameter on the delay path is smoothed to avoid clicks, and the DSP crate is unit tested on its own. The truce framework handles the plugin formats and the GUI is written in Slint. Finished; its DSP is reused unchanged in chorus-param-estimation.',
			it: "Un progetto didattico per migliorare nel DSP e scrivere codice audio in Rust. Ho scritto linea di ritardo, LFO e chorus senza librerie audio: ogni canale legge la propria linea di ritardo in una posizione mossa da un LFO sinusoidale, l'LFO destro è avanti di un quarto di ciclo per dare ampiezza stereo e i ritardi frazionari usano l'interpolazione cubica di Hermite. Il thread audio non alloca, non usa lock e non scrive log, ogni parametro sul percorso del ritardo è smussato per evitare click e il crate DSP ha i propri test unitari. Il framework truce gestisce i formati del plugin e la GUI è scritta in Slint. Concluso; il suo DSP è riusato senza modifiche in chorus-param-estimation."
		}
	},
	{
		id: 'os161-vm',
		name: 'os161-vm',
		stack: ['C', 'OS161'],
		links: { repo: gh('os161-vm') },
		summary: {
			en: 'Virtual memory for the OS161 teaching kernel: demand paging, page replacement and swap, replacing dumbvm.',
			it: 'Memoria virtuale per il kernel didattico OS161: paginazione su richiesta, sostituzione delle pagine e swap, al posto di dumbvm.'
		},
		detail: {
			en: "Replaces OS161's dumbvm with on-demand allocation, FIFO page replacement and a swap partition. A coremap tracks every physical frame, and fork, exit, waitpid and sbrk were added so the VM could be tested with concurrent processes. Finished.",
			it: 'Sostituisce dumbvm di OS161 con allocazione su richiesta, sostituzione delle pagine FIFO e una partizione di swap. Una coremap tiene traccia di ogni frame fisico, e sono state aggiunte fork, exit, waitpid e sbrk per poter testare la memoria virtuale con processi concorrenti. Concluso.'
		}
	},
	{
		id: 'landtiger-tetris',
		name: 'landtiger-tetris',
		stack: ['C', 'LPC1768', 'Keil µVision'],
		links: { repo: gh('landtiger-tetris'), demo: `${gh('landtiger-tetris')}#gameplay` },
		summary: {
			en: 'Tetris for the LandTiger LPC1768 board, written in C.',
			it: 'Tetris per la scheda LandTiger LPC1768, scritto in C.'
		},
		detail: {
			en: "Tetris on the board's screen, played with the joystick and buttons, with soft drop, hard drop, rotation and a high score kept between games. The game is tick-based: each Timer1 interrupt advances it by one step, while the RIT handles joystick debouncing. A gameplay video is in the repo. Finished.",
			it: "Tetris sullo schermo della scheda, giocato con joystick e pulsanti, con soft drop, hard drop, rotazione e un record mantenuto tra le partite. Il gioco è basato su tick: ogni interrupt del Timer1 lo fa avanzare di un passo, mentre il RIT gestisce il debouncing del joystick. Nel repository c'è un video del gameplay. Concluso."
		}
	},
	{
		id: 'race-the-guild',
		name: 'race-the-guild',
		stack: ['React', 'Express', 'SQLite'],
		links: { repo: gh('race-the-guild') },
		summary: {
			en: 'A route-planning web game set in the Dune universe, played against the clock.',
			it: "Un gioco web di pianificazione di percorsi ambientato nell'universo di Dune, a tempo."
		},
		detail: {
			en: "Players memorize the Spacing Guild's network of lines, then plan a valid route between two planets before time runs out, while random events along the way change their score. I built the React client, which draws the map as SVG and steps through the game's four phases, and an Express API with Passport session login and a SQLite database. The server validates submitted routes, applies the travel events and keeps a leaderboard. Finished.",
			it: "I giocatori memorizzano la rete di linee della Gilda Spaziale, poi pianificano un percorso valido tra due pianeti prima che scada il tempo, mentre eventi casuali lungo il viaggio cambiano il punteggio. Ho realizzato il client React, che disegna la mappa in SVG e gestisce le quattro fasi del gioco, e un'API Express con login a sessione tramite Passport e un database SQLite. Il server convalida i percorsi inviati, applica gli eventi del viaggio e tiene una classifica. Concluso."
		}
	}
];
