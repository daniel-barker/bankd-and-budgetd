<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { auth, db } from '$lib/firebase/client';
	import { doc, setDoc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	let currentStep = 0;
	let formData = {
		monthlyBudget: 0,
		expenses: [],
		goals: []
	};
	let loading = true;
	let error = null;

	const steps = [
		{ id: 'budget', title: 'Monthly Budget' },
		{ id: 'expenses', title: 'Regular Expenses' },
		{ id: 'goals', title: 'Financial Goals' }
	];

	onMount(async () => {
		try {
			const userId = auth.currentUser?.uid;
			if (!userId) {
				goto('/login');
				return;
			}

			const docRef = doc(db, 'onboarding', userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				formData = docSnap.data();
				currentStep = docSnap.data().currentStep || 0;
			}
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	});

	async function saveProgress() {
		try {
			const userId = auth.currentUser?.uid;
			if (!userId) return;

			const docRef = doc(db, 'onboarding', userId);
			await setDoc(docRef, {
				...formData,
				currentStep,
				updatedAt: new Date()
			});
		} catch (e) {
			error = e.message;
		}
	}

	function nextStep() {
		if (currentStep < steps.length - 1) {
			currentStep++;
			saveProgress();
		} else {
			goto('/dashboard');
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
			saveProgress();
		}
	}
</script>

<div class="container mx-auto px-4 py-8">
	{#if loading}
		<div class="text-center">Loading...</div>
	{:else}
		<div class="mx-auto max-w-2xl">
			<div class="mb-8">
				<div class="mb-2 flex justify-between">
					{#each steps as step, i}
						<div class="flex-1 text-center">
							<div
								class="mx-auto h-8 w-8 rounded-full {i <= currentStep
									? 'bg-blue-500 text-white'
									: 'bg-gray-200'} flex items-center justify-center"
							>
								{i + 1}
							</div>
						</div>
					{/each}
				</div>
			</div>

			{#if error}
				<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
					{error}
				</div>
			{/if}

			<div class="relative h-64">
				{#if currentStep === 0}
					<div
						in:fly={{ x: 100, duration: 300 }}
						out:fly={{ x: -100, duration: 300 }}
						class="absolute w-full"
					>
						<h2 class="mb-4 text-2xl font-bold">Set Your Monthly Budget</h2>
						<input
							type="number"
							bind:value={formData.monthlyBudget}
							class="w-full rounded border p-2"
							placeholder="Enter your monthly budget"
						/>
					</div>
				{:else if currentStep === 1}
					<div
						in:fly={{ x: 100, duration: 300 }}
						out:fly={{ x: -100, duration: 300 }}
						class="absolute w-full"
					>
						<h2 class="mb-4 text-2xl font-bold">Add Regular Expenses</h2>
						<div class="space-y-4">
							{#each formData.expenses as expense, i}
								<div class="flex gap-2">
									<input
										type="text"
										bind:value={expense.name}
										class="flex-1 rounded border p-2"
										placeholder="Expense name"
									/>
									<input
										type="number"
										bind:value={expense.amount}
										class="w-32 rounded border p-2"
										placeholder="Amount"
									/>
									<button
										on:click={() =>
											(formData.expenses = formData.expenses.filter((_, index) => index !== i))}
										class="rounded bg-red-500 px-3 py-2 text-white"
									>
										Remove
									</button>
								</div>
							{/each}
							<button
								on:click={() =>
									(formData.expenses = [...formData.expenses, { name: '', amount: 0 }])}
								class="w-full rounded bg-green-500 p-2 text-white"
							>
								Add Expense
							</button>
						</div>
					</div>
				{:else if currentStep === 2}
					<div
						in:fly={{ x: 100, duration: 300 }}
						out:fly={{ x: -100, duration: 300 }}
						class="absolute w-full"
					>
						<h2 class="mb-4 text-2xl font-bold">Set Financial Goals</h2>
						<div class="space-y-4">
							{#each formData.goals as goal, i}
								<div class="flex gap-2">
									<input
										type="text"
										bind:value={goal.name}
										class="flex-1 rounded border p-2"
										placeholder="Goal name"
									/>
									<input
										type="number"
										bind:value={goal.target}
										class="w-32 rounded border p-2"
										placeholder="Target amount"
									/>
									<button
										on:click={() =>
											(formData.goals = formData.goals.filter((_, index) => index !== i))}
										class="rounded bg-red-500 px-3 py-2 text-white"
									>
										Remove
									</button>
								</div>
							{/each}
							<button
								on:click={() => (formData.goals = [...formData.goals, { name: '', target: 0 }])}
								class="w-full rounded bg-green-500 p-2 text-white"
							>
								Add Goal
							</button>
						</div>
					</div>
				{/if}
			</div>

			<div class="mt-8 flex justify-between">
				<button
					on:click={prevStep}
					disabled={currentStep === 0}
					class="rounded bg-gray-500 px-4 py-2 text-white disabled:opacity-50"
				>
					Previous
				</button>
				<button on:click={nextStep} class="rounded bg-blue-500 px-4 py-2 text-white">
					{currentStep === steps.length - 1 ? 'Finish' : 'Next'}
				</button>
			</div>
		</div>
	{/if}
</div>
