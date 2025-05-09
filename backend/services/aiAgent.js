const fetch = require('node-fetch');

async function chatWithAI(prompt) {
  if (!prompt) {
    throw new Error('Prompt is required for AI chat');
  }

  const apiKey = process.env.HUGGINGFACE_API_KEY;
  // Choose a model that's hosted and supports text generation
  const model = 'gpt2-large';

  // Define the assistant persona
  const systemPrompt = "You are a friendly food delivery application assistant. You help users browse menus, track orders, and answer questions about restaurants and delivery.";
  const fullPrompt = `${systemPrompt}\nUser: ${prompt}\nAssistant:`;

  let response;
  try {
    response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: fullPrompt }),
    });
  } catch (networkError) {
    throw new Error(`Network error when contacting AI service: ${networkError.message}`);
  }

  // Handle non-JSON and non-2xx responses
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI service error: ${errorText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    const raw = await response.text();
    throw new Error(`Failed to parse AI response as JSON: ${raw}`);
  }

  if (data.error) {
    throw new Error(data.error);
  }

  const output = Array.isArray(data) && data[0]?.generated_text
    ? data[0].generated_text
    : data.generated_text || JSON.stringify(data);

  console.log('Response of AI:', output);
  return output;
}

module.exports = {
    chatWithAI
};