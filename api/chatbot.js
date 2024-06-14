const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    res.status(400).json({ error: 'No prompt provided' });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });
    res.status(200).json({ response: completion.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
