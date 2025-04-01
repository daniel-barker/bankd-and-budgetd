<script>
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/client';
	import { goto } from '$app/navigation';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				goto('/');
			}
		});
		return unsubscribe;
	});
</script>

<div class="mx-auto max-w-7xl p-8">
	<header class="mb-8 flex items-center justify-between">
		<h1>QuackCorp™ Dashboard</h1>
		<button
			on:click={() => auth.signOut()}
			class="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
		>
			Logout
		</button>
	</header>

	<main>
		<div class="rounded bg-white p-8 shadow">
			<h2>Welcome, {auth.currentUser?.email}</h2>
			<p>Your secure dashboard is ready.</p>
		</div>
	</main>
</div>
