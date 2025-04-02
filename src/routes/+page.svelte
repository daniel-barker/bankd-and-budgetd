<div class="flex min-h-screen items-center justify-center bg-stone-300 p-4">
	<div class="flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row">
		<!-- Phones Image -->
		<div class="flex w-full justify-center lg:w-1/2">
			<img
				src="/image/phones.png"
				alt="bank'd and budget'd budgeting app preview"
				class="w-auto max-w-xs rounded-xl border border-gray-300 shadow-md sm:max-w-sm lg:max-w-md"
			/>
		</div>

		<!-- Text and Buttons -->
		<div class="flex w-full flex-col items-start gap-4 lg:w-1/2">
			<h1 class="text-4xl font-light tracking-tight lowercase sm:text-5xl">bank'd and budget'd</h1>

			<div class="text-xl font-medium sm:text-2xl">simple. free.</div>
			<div class="text-sm text-gray-600 sm:text-base">done.</div>

			<div class="mt-6 flex flex-col gap-3 sm:flex-row">
				<a
					href="/signup"
					class="rounded-md bg-gray-800 px-6 py-3 text-white transition hover:bg-gray-700"
					>Sign Up Free</a
				>
				<a
					href="/login"
					class="rounded-md border border-gray-800 px-6 py-3 text-gray-800 transition hover:bg-gray-100"
					>Login</a
				>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	:global(body) {
		background-color: #93c5fd;
	}
</style>
