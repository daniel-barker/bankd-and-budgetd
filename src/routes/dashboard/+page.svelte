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

<div class="dashboard">
	<header>
		<h1>QuackCorp™ Dashboard</h1>
		<button on:click={() => auth.signOut()}>Logout</button>
	</header>

	<main>
		<div class="welcome">
			<h2>Welcome, {auth.currentUser?.email}</h2>
			<p>Your secure dashboard is ready.</p>
		</div>
	</main>
</div>

<style>
	.dashboard {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	button {
		padding: 0.5rem 1rem;
		background: #e74c3c;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background: #c0392b;
	}

	.welcome {
		background: white;
		padding: 2rem;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
