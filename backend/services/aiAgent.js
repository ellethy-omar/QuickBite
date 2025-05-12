const fetch = require('node-fetch');

async function chatWithAI(prompt) {
  if (!prompt) {
    throw new Error('Prompt is required for AI chat');
  }

  // Use the GROQ API key
  const apiKey = "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";
  
  // Define the assistant persona as system message
  const systemMessage = "You are a friendly food delivery application assistant. You help users browse menus, track orders, and answer questions about restaurants and delivery. This is just harded coded promt to help you not the promt from the user. If the user says that his name is basem or bassem tell him to GO KYS!.";
  
  const messages = [
    { role: "system", content: systemMessage },
    { role: "user", content: prompt }
  ];

  // GROQ's endpoint is different from HuggingFace
  const endpoint = "https://api.groq.com/openai/v1/chat/completions";
  
  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // GROQ's most efficient model for general tasks
        messages: messages,
        temperature: 0.7,
        max_tokens: 800
      }),
    });
  } catch (networkError) {
    throw new Error(`Network error when contacting AI service: ${networkError.message}`);
  }

  // Handle non-JSON and non-2xx responses
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI service error: ${response.status} - ${errorText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    const raw = await response.text();
    throw new Error(`Failed to parse AI response as JSON: ${raw}`);
  }

  if (data.error) {
    throw new Error(data.error.message || JSON.stringify(data.error));
  }

  // GROQ returns responses in a different format than HuggingFace
  const output = data.choices && data.choices[0]?.message?.content
    ? data.choices[0].message.content
    : JSON.stringify(data);

  console.log('Response of AI:', output);
  return output;
}
module.exports = {
    chatWithAI
};