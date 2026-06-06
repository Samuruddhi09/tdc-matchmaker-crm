export function getMatches(customer, customers) {

  const potentialMatches = customers.filter(
    (person) =>
      person.id !== customer.id &&
      person.gender !== customer.gender
  );

  const scoredMatches = potentialMatches.map(
    (person) => {

      let score = 0;
      let reasons = [];

      // MALE CUSTOMER LOGIC

      if (customer.gender === "Male") {

        if (person.age < customer.age) {
          score += 25;
          reasons.push(
            "Younger than customer"
          );
        }

        if (person.income < customer.income) {
          score += 25;
          reasons.push(
            "Income preference match"
          );
        }

        if (person.height < customer.height) {
          score += 25;
          reasons.push(
            "Height preference match"
          );
        }

        if (
          person.wantKids === customer.wantKids
        ) {
          score += 25;
          reasons.push(
            "Matching views on children"
          );
        }
      }

      // FEMALE CUSTOMER LOGIC

      if (customer.gender === "Female") {

        if (
          customer.religion === person.religion
        ) {
          score += 20;
          reasons.push("Same religion");
        }

        if (
          customer.wantKids === person.wantKids
        ) {
          score += 20;
          reasons.push(
            "Matching family goals"
          );
        }

        if (
          customer.relocate === person.relocate
        ) {
          score += 20;
          reasons.push(
            "Compatible relocation preference"
          );
        }

        if (
          customer.profession &&
          person.profession
        ) {
          score += 20;
          reasons.push(
            "Professional compatibility"
          );
        }

        const ageDifference =
          Math.abs(
            customer.age - person.age
          );

        if (ageDifference <= 5) {
          score += 20;
          reasons.push(
            "Compatible age range"
          );
        }
      }

      // AI Insight

      let aiInsight =
        "Moderate compatibility.";

      if (score >= 80) {
        aiInsight =
          "Excellent compatibility based on lifestyle preferences, family goals and long-term relationship potential.";
      } else if (score >= 60) {
        aiInsight =
          "Good compatibility with several shared preferences and values.";
      }

      return {
        ...person,
        score,
        reasons,
        aiInsight
      };
    }
  );

  return scoredMatches.sort(
    (a, b) => b.score - a.score
  );
}