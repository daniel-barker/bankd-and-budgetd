<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/client';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let userEmail: string | null = null;

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				// If not logged in, send back to /signup
				goto('/signup');
			} else {
				userEmail = user.email;
			}
		});
	});
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div class="text-center">
		<h1 class="mb-2 text-2xl font-semibold">Welcome to bank’d and budget’d!</h1>
		{#if userEmail}
			<p class="text-gray-700">Logged in as {userEmail}</p>
		{/if}

		<p class="mt-4 text-gray-600">Ready to set up your first budget?</p>
		<button
			class="mt-4 rounded-md bg-stone-800 px-6 py-2 text-white hover:bg-stone-700"
			on:click={() => goto('/onboarding')}
		>
			Let’s go →
		</button>
	</div>
</div>
