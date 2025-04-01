<script lang="ts">
	import { auth } from '$lib/firebase/client';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	async function handleSubmit() {
		if (!auth) return;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			goto('/dashboard');
		} catch (e) {
			error = 'Invalid credentials';
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
	<div class="w-full max-w-md rounded bg-white p-8 shadow">
		<h1 class="mb-2 text-center text-2xl text-gray-800">Welcome to QuackCorp™</h1>
		<p class="mb-8 text-center text-sm text-gray-600">Internal Systems Portal v2.3.1</p>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-6">
				<label for="email" class="mb-2 block text-sm text-gray-700">Employee ID</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="employee@quackcorp.internal"
					required
					class="w-full rounded border border-gray-300 p-3 text-sm"
				/>
			</div>

			<div class="mb-6">
				<label for="password" class="mb-2 block text-sm text-gray-700">Access Code</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="w-full rounded border border-gray-300 p-3 text-sm"
				/>
			</div>

			{#if error}
				<p class="mb-4 text-center text-sm text-red-500">{error}</p>
			{/if}

			<button
				type="submit"
				class="w-full rounded bg-blue-500 p-3 text-sm text-white transition-colors hover:bg-blue-600"
			>
				Authenticate
			</button>
		</form>

		<p class="mt-8 text-center text-xs text-gray-500">
			<a href="/signup" class="text-blue-500 hover:underline">New Employee Registration</a> | © 1997-2024
			QuackCorp™ | All Rights Reserved
		</p>
	</div>
</div>
