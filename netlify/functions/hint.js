const Anthropic = require("@anthropic-ai/sdk");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt, lang } = JSON.parse(event.body || "{}");
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey || apiKey.includes("your-anthropic-key")) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          text: lang === "fr"
            ? "Indice : Essaie d'arrondir les nombres pour simplifier le calcul mental."
            : "Hint: Try rounding the numbers to simplify the mental calculation."
        }),
      };
    }

    const client = new Anthropic({ apiKey });

    const msg = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 400,
      system: lang === "fr"
        ? "Tu es un tuteur de maths bienveillant pour élèves de secondaire au Québec. Explique clairement, brièvement, en français québécois naturel."
        : "You are a supportive math tutor for Quebec secondary students. Explain clearly and briefly in plain English.",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg.content[0].text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
