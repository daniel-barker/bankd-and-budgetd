<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, db } from '$lib/firebase/client';
  import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let errorMessage = '';
  let loading = false;

  // Handle form submission
  async function handleSignup() {
    errorMessage = '';
    loading = true;

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2. Create Firestore user doc with minimal onboarding data
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        onboardingStep: 'income' // or 'start'—whatever your next step is
      });

      // 3. Redirect to the next step (welcome screen or direct to Step 1)
      goto('/welcome'); // or '/onboarding' etc.
    } catch (err) {
      console.error(err);
      errorMessage = err.message || 'Signup failed. Please try again.';
    } finally {
      loading = false;
    }
  }

  async function handleGoogleSignup() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Set doc in Firestore if new user
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        onboardingStep: 'income'
      }, { merge: true });

      goto('/welcome');
    } catch (err) {
      console.error(err);
      errorMessage = err.message;
    }
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-4">
  <h1 class="mb-4 text-2xl font-semibold">Create your free account</h1>

  <form
    class="flex w-full max-w-sm flex-col gap-4"
    on:submit|preventDefault={handleSignup}
  >
    <!-- Email -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        bind:value={email}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
      />
    </div>

    <!-- Password -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        bind:value={password}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
      />
    </div>

    <!-- Error Message -->
    {#if errorMessage}
      <div class="rounded bg-red-100 p-2 text-red-600">
        {errorMessage}
      </div>
    {/if}

    <!-- Submit -->
    <button
      type="submit"
      class="inline-flex items-center justify-center rounded-md bg-stone-800 px-4 py-2 text-white hover:bg-stone-700"
      disabled={loading}
    >
      {#if loading}
        <span class="loader mr-2 h-4 w-4 border-2 border-white border-t-transparent"></span>
        Creating account...
      {:else}
        Sign Up
      {/if}
    </button>
    <button
  on:click|preventDefault={handleGoogleSignup}
  class="flex items-center justify-center rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100"
>
  <img src="/image/google-logo.webp" alt="Google logo" class="mr-2 h-4 w-4" />
  Sign up with Google
</button>

    <p class="mt-4 text-sm text-gray-500">
      Already have an account? <a href="/login" class="text-stone-800">Log in</a>
    </p>
    <p class="mt-4 text-sm text-gray-500">
      By signing up, you agree to our <a href="/terms" class="text-stone-800">Terms of Service</a> and <a href="/privacy" class="text-stone-800">Privacy Policy</a>.
    </p>
  </form>
</div>

<style lang="postcss">
  /* Simple spinner style */
  .loader {
    border-radius: 9999px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
