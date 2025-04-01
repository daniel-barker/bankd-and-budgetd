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

<div class="container">
	<div class="login-box">
		<h1>New Employee Registration</h1>
		<p class="subtitle">QuackCorp™ Internal Systems Portal</p>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<label for="email">Employee ID</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="employee@quackcorp.internal"
					required
				/>
			</div>

			<div class="form-group">
				<label for="password">Access Code</label>
				<input type="password" id="password" bind:value={password} required />
			</div>

			<div class="form-group">
				<label for="confirmPassword">Confirm Access Code</label>
				<input type="password" id="confirmPassword" bind:value={confirmPassword} required />
			</div>

			{#if error}
				<p class="error">{error}</p>
			{/if}

			<button type="submit">Register</button>
		</form>

		<p class="footer">
			<a href="/">Return to Login</a> | © 1997-2024 QuackCorp™ | All Rights Reserved
		</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: #f0f0f0;
		font-family: 'Arial', sans-serif;
	}

	.login-box {
		background: white;
		padding: 2rem;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
	}

	h1 {
		color: #2c3e50;
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.subtitle {
		color: #7f8c8d;
		text-align: center;
		font-size: 0.9rem;
		margin-bottom: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: #34495e;
		font-size: 0.9rem;
	}

	input {
		width: 100%;
		padding: 0.8rem;
		border: 1px solid #bdc3c7;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	button {
		width: 100%;
		padding: 0.8rem;
		background: #3498db;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 0.9rem;
		cursor: pointer;
	}

	button:hover {
		background: #2980b9;
	}

	.error {
		color: #e74c3c;
		font-size: 0.9rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.footer {
		margin-top: 2rem;
		text-align: center;
		color: #95a5a6;
		font-size: 0.8rem;
	}

	a {
		color: #3498db;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
