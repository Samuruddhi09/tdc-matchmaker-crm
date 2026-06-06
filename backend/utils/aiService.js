const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

async function generateMatchExplanation(
  customer,
  match,
  score,
  reasons
) {
  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

    const prompt = `
You are an Indian matrimonial compatibility expert.

Customer:
${customer.firstName}, ${customer.age} years old,
${customer.profession} from ${customer.city}

Match:
${match.firstName}, ${match.age} years old,
${match.profession} from ${match.city}

Compatibility Score:
${score}/100

Reasons:
${reasons.join(", ")}

Write a warm compatibility analysis in 2-3 sentences.
Explain why they are a good match.
`;

    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();

  } catch (error) {

    console.error(
      "Gemini Error:",
      error
    );

    return `${customer.firstName} and ${match.firstName} show strong compatibility based on shared values, family goals and lifestyle preferences. Their profile alignment suggests promising long-term relationship potential.`;
  }
}

async function generateMatchIntro(
  customer,
  match
) {
  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

    const prompt = `
Write a warm and professional matrimonial introduction email.

Customer:
${customer.firstName} ${customer.lastName}
Age: ${customer.age}
Profession: ${customer.profession}
City: ${customer.city}

Match:
${match.firstName} ${match.lastName}
Age: ${match.age}
Profession: ${match.profession}
City: ${match.city}

Write 4-5 professional sentences.

The tone should be respectful, warm and suitable for an Indian matchmaking company.

Start directly with the introduction.
`;

    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();

  } catch (error) {

    console.error(
      "Gemini Error:",
      error
    );

    return `We are pleased to introduce ${match.firstName} ${match.lastName}, whose profile shows strong compatibility with your preferences and long-term relationship goals. We believe this connection has promising potential for a meaningful relationship.`;
  }
}

module.exports = {
  generateMatchExplanation,
  generateMatchIntro
};