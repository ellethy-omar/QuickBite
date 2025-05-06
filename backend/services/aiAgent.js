const fetch = require('node-fetch');

async function chatWithAI(prompt) {
  if(!prompt) {
    throw new Error('Prompt is required for AI chat');
  }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const model = 'gpt2';
  
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    });
  
    const data = await response.json();
  
    if (data.error) {
      throw new Error(data.error);
    }
    console.log('response of AI:', data[0].generated_text);
    return data[0].generated_text;
}

module.exports = {
    chatWithAI
};