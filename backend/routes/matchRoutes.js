const express = require("express");
const router = express.Router();

const customers = require("../data/customers");

const {
  generateMatchExplanation,
  generateMatchIntro
} = require("../utils/aiService");

function getRelocationScore(customer, person) {
  if (customer.relocate === person.relocate) {
    return 20;
  }

  if (
    customer.relocate === "Yes" ||
    person.relocate === "Yes"
  ) {
    return 15;
  }

  if (
    customer.relocate === "Maybe" ||
    person.relocate === "Maybe"
  ) {
    return 8;
  }

  return 0;
}

function getProfessionGroup(profession) {
  const groups = {
    Tech: [
      "Software Engineer",
      "Data Scientist",
      "Product Manager"
    ],

    Medical: ["Doctor"],

    Business: [
      "Consultant",
      "Manager",
      "Chartered Accountant"
    ],

    Legal: ["Lawyer"],

    Creative: [
      "Architect",
      "Designer"
    ],

    Education: ["Teacher"]
  };

  for (const group in groups) {
    if (
      groups[group].includes(
        profession
      )
    ) {
      return group;
    }
  }

  return "Other";
}

function getProfessionScore(
  customer,
  person
) {
  const customerGroup =
    getProfessionGroup(
      customer.profession
    );

  const personGroup =
    getProfessionGroup(
      person.profession
    );

  if (
    customer.profession ===
    person.profession
  ) {
    return 15;
  }

  if (
    customerGroup === personGroup
  ) {
    return 12;
  }

  return 3;
}

router.get("/:id", (req, res) => {

  const customerId = Number(
    req.params.id
  );

  const customer = customers.find(
    (c) => c.id === customerId
  );

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found"
    });
  }

  const potentialMatches =
    customers.filter((person) => {

      if (
        person.id === customer.id ||
        person.gender === customer.gender
      ) {
        return false;
      }

      // Relocation feasibility

      if (
        customer.city !== person.city
      ) {

        if (
          customer.relocate === "No" &&
          person.relocate === "No"
        ) {
          return false;
        }

        if (
          customer.relocate === "No" &&
          person.relocate === "Maybe"
        ) {
          return false;
        }

        if (
          customer.relocate === "Maybe" &&
          person.relocate === "No"
        ) {
          return false;
        }
      }

      return true;
    });

  const scoredMatches =
    potentialMatches.map((person) => {

      let score = 0;
      let reasons = [];

      // Children Preference

      if (
        customer.wantKids ===
        person.wantKids
      ) {
        score += 25;
        reasons.push(
          "Matching family goals"
        );
      } else if (
        customer.wantKids ===
          "Maybe" ||
        person.wantKids === "Maybe"
      ) {
        score += 15;
      }

      // Relocation

      const relocationScore =
        getRelocationScore(
          customer,
          person
        );

      score += relocationScore;

      if (relocationScore > 0) {
        reasons.push(
          "Relocation compatibility"
        );
      }

      // Religion

      if (
          customer.religion ===
          person.religion
        ) {
          score += 25;
          reasons.push(
            "Shared religious background"
          );
        } else {
          score -= 5;
      }

      // Caste Compatibility

      if (
        customer.caste &&
        person.caste &&
        customer.caste === person.caste
      ) {
        score += 10;

        reasons.push(
          "Similar cultural background"
        );
      }

      // Profession

      const professionScore =
        getProfessionScore(
          customer,
          person
        );

      score += professionScore;

      if (
        professionScore >= 12
      ) {
        reasons.push(
          "Professional compatibility"
        );
      }

      // Language Compatibility

      const commonLanguages =
        customer.languages?.filter(
          (lang) =>
            person.languages?.includes(lang)
        ) || [];

      if (commonLanguages.length > 0) {

        score += 10;

        reasons.push(
          `Shared language: ${commonLanguages[0]}`
        );
      }

      // Age

      const ageDifference =
        Math.abs(
          customer.age -
          person.age
        );

      if (ageDifference <= 3) {
        score += 10;
        reasons.push(
          "Ideal age compatibility"
        );
      } else if (
        ageDifference <= 5
      ) {
        score += 8;
      } else if (
        ageDifference <= 8
      ) {
        score += 5;
      }

      // Income

      const incomeDifference =
        Math.abs(
          customer.income -
          person.income
        );

      if (
        incomeDifference <= 5
      ) {
        score += 10;
      } else if (
        incomeDifference <= 10
      ) {
        score += 5;
      }

      // City

      if (
        customer.city ===
        person.city
      ) {
        score += 5;
        reasons.push(
          "Same city"
        );
      }

      // Lifestyle Compatibility

      if (
        customer.pets ===
        person.pets
      ) {
        score += 5;

        reasons.push(
          "Lifestyle compatibility"
        );
      }

      // Male specific

      if (
        customer.gender === "Male"
        ) {

        const ageGap =
          customer.age - person.age;

        if (
          ageGap >= 1 &&
          ageGap <= 5
        ) {
          score += 8;

          reasons.push(
            "Traditional age preference match"
          );
        }

        const incomeGap =
          person.income -
          customer.income;

        if (
          incomeGap >= 0
        ) {
          score += 8;

          reasons.push(
            "Strong financial compatibility"
          );
        }
        else if (
          incomeGap >= -5
        ) {
          score += 5;
        }

        if (
            person.height <
            customer.height
        ) {
            score += 5;
            reasons.push(
            "Height preference match"
            );
        }
        }

      // Female specific

      if (
        customer.gender === "Female"
      ) {

        if (
          professionScore >= 12
        ) {
          score += 5;
        }

        if (
          relocationScore >= 15
        ) {
          score += 5;
        }
      }

      let matchLevel =
        "Low Compatibility";

      let aiInsight =
        "Limited alignment across major compatibility factors.";

      if (score >= 90) {

        matchLevel =
          "Excellent Match";

        aiInsight =
          "Strong alignment in family goals, relocation preferences, religion and professional compatibility.";

      } else if (
        score >= 75
      ) {

        matchLevel =
          "Strong Match";

        aiInsight =
          "Good compatibility with several shared values and long-term relationship potential.";

      } else if (
        score >= 60
      ) {

        matchLevel =
          "Moderate Match";

        aiInsight =
          "Potential compatibility with a few areas requiring discussion.";
      }

      if (score > 100) {
        score = 100;
      }

      if (score < 0) {
        score = 0;
      }

     return {
      ...person,
      score: Math.round(score),
      reasons,
      matchLevel,
      aiInsight
    };

    });

    const sortedMatches =
    scoredMatches.sort(
      (a, b) => b.score - a.score
    );

  res.json(
    sortedMatches.slice(0, 10)
  );
});

router.post("/ai-analysis", async (req, res) => {

  try {

    const {
      customer,
      match,
      score,
      reasons
    } = req.body;

    const aiAnalysis =
      await generateMatchExplanation(
        customer,
        match,
        score,
        reasons
      );

    res.json({
      analysis: aiAnalysis
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to generate AI analysis"
    });

  }

});

router.post(
  "/generate-intro",
  async (req, res) => {

    try {

      const {
        customer,
        match
      } = req.body;

      const intro =
        await generateMatchIntro(
          customer,
          match
        );

      res.json({
        intro
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to generate intro"
      });

    }

  }
);


module.exports = router;