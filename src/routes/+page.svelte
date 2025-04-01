<script>
	import { fade, fly } from 'svelte/transition';
</script>

<div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
	<!-- Hero Section -->
	<header class="container mx-auto px-4 py-16">
		<section class="container mx-auto px-4 py-16">
			<div class="relative h-[400px] overflow-hidden rounded-xl bg-white shadow-xl">
				<!-- Placeholder for carousel - we'll implement this later -->
				<div class="absolute inset-0 flex items-center justify-center bg-gray-100">
					<p class="text-gray-500">Screenshots coming soon</p>
				</div>
			</div>
		</section>

		<section class="flex flex-col items-center text-center">
			<h1 class="mt-6 text-5xl font-bold text-gray-900" in:fly={{ y: 20, duration: 800 }}>
				Take control of your money.<br />
				<span class="text-indigo-600">No stress. No shame.</span>
			</h1>

			<p class="mb-8 max-w-2xl text-xl text-gray-600" in:fly={{ y: 20, duration: 800, delay: 200 }}>
				A beautiful, beginner-friendly budgeting tool built for real people.
			</p>

			<div class="flex gap-4" in:fly={{ y: 20, duration: 800, delay: 400 }}>
				<a
					href="/signup"
					class="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
				>
					Sign Up Free
				</a>
				<a
					href="/login"
					class="rounded-lg border-2 border-indigo-600 bg-white px-8 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
				>
					Login
				</a>
			</div>
		</section>
	</header>

	<!-- Screenshot Carousel -->

</div>
