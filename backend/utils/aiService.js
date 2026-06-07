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
        model: "gemini-2.5-flash"
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

    const result = await model.generateContent(prompt);

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
You are a professional relationship manager working for a premium Indian matchmaking company.

Create a personalized introduction email.

Customer Profile:
Name: ${customer.firstName} ${customer.lastName}
Age: ${customer.age}
Profession: ${customer.profession}
City: ${customer.city}
Religion: ${customer.religion}

Recommended Match:
Name: ${match.firstName} ${match.lastName}
Age: ${match.age}
Profession: ${match.profession}
City: ${match.city}
Religion: ${match.religion}

Write a professional email with:

1. Greeting
2. Introduction of the recommended match
3. Why they are compatible
4. Shared values and strengths
5. Positive closing

Length: 150-200 words.

Tone: Warm, professional, premium matchmaking service.
Format as a real email.
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