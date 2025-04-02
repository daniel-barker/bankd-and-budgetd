<div class="flex min-h-screen items-center justify-center p-4">
	<div class="flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row">
		<!-- Phones Image -->
		<div class="flex w-full justify-center lg:w-1/2">
			<img
				src="/image/image.png"
				alt="bank'd and budget'd budgeting app preview"
				class="w-auto max-w-xs sm:max-w-sm lg:max-w-md"
			/>
		</div>

		<!-- Text and Buttons -->
		<div
			class="flex w-full flex-col items-center gap-4 text-center lg:w-1/2 lg:items-start lg:text-left"
		>
			<div
				class="flex flex-col text-5xl font-light tracking-tight lowercase sm:text-6xl lg:text-7xl"
			>
				<span>bank'd</span>
				<span>and</span>
				<span>budget'd</span>
			</div>

			<div class="text-xl font-medium lowercase sm:text-2xl">simple. free.</div>
			<div class="text-sm text-gray-600 lowercase sm:text-base">done.</div>

			<div class="mt-6 flex flex-col gap-3 sm:flex-row">
				<a
					href="/signup"
					class="rounded-md bg-stone-800 px-6 py-3 text-white transition hover:bg-stone-700"
					>Sign Up Free</a
				>
				<a
					href="/login"
					class="rounded-md border border-stone-800 px-6 py-3 text-stone-800 transition hover:bg-stone-100"
					>Login</a
				>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	:global(body) {
		background-color: theme(colors.stone.100);
	}
</style>
