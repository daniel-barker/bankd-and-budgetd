<script lang="ts">
	import { auth } from '$lib/firebase/client';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let error = '';

	async function handleSubmit() {
		if (password !== confirmPassword) {
			error = 'Access codes do not match';
			return;
		}

		try {
			await createUserWithEmailAndPassword(auth, email, password);
			goto('/dashboard');
		} catch (e: any) {
			error =
				e?.code === 'auth/email-already-in-use'
					? 'Employee ID already registered'
					: 'Registration failed';
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
	<div class="w-full max-w-md rounded bg-white p-8 shadow">
		<h1 class="mb-2 text-center text-2xl text-gray-800">New Employee Registration</h1>
		<p class="mb-8 text-center text-sm text-gray-600">QuackCorp™ Internal Systems Portal</p>

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

			<div class="mb-6">
				<label for="confirmPassword" class="mb-2 block text-sm text-gray-700"
					>Confirm Access Code</label
				>
				<input
					type="password"
					id="confirmPassword"
					bind:value={confirmPassword}
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
				Register
			</button>
		</form>

		<p class="mt-8 text-center text-xs text-gray-500">
			<a href="/" class="text-blue-500 hover:underline">Return to Login</a> | © 1997-2024 QuackCorp™
			| All Rights Reserved
		</p>
	</div>
</div>
