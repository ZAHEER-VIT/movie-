<script>
	import { GoogleGenerativeAI } from '@google/generative-ai';

	let mood = '';
	let language = '';
	let recommendations = '';
	let loading = false;

	const genAI = new GoogleGenerativeAI('AIzaSyB-eG9Mzr3tMqVWuK4y2u3rs4aaXX3YqcE'); // Replace with your actual API key

	async function getRecommendations() {
		loading = true;
		const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

		const prompt = `You are a movie recommendation system. Based on the user's mood and preferred language, suggest 5 most underated movies along with the OTT platforms where they can be watched. Format your response as a bulleted list.

User's mood: ${mood}
Preferred language: ${language}

Provide recommendations in this format:
- Movie Title (Year) - Available on: [OTT Platform]`;

		try {
			const result = await model.generateContent(prompt);
			recommendations = result.response.text();
		} catch (error) {
			console.error('Error:', error);
			recommendations = 'Sorry, an error occurred while getting recommendations.';
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<h1>Movie Mood Recommender</h1>
	<form on:submit|preventDefault={getRecommendations}>
		<label for="mood">What's your mood?</label>
		<input id="mood" bind:value={mood} required />

		<label for="language">Preferred language:</label>
		<input id="language" bind:value={language} required />

		<button type="submit" disabled={loading}>Get Recommendations</button>
	</form>

	{#if loading}
		<p>Loading recommendations...</p>
	{:else if recommendations}
		<h2>Your Recommendations:</h2>
		<p>{@html recommendations.replace(/\n/g, '<br>')}</p>
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 20px;
	}
	input,
	button {
		padding: 5px;
	}
</style>
