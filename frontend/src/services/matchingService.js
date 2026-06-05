export function getMatches(customer, customers) {

  const potentialMatches = customers.filter(
    (person) =>
      person.id !== customer.id &&
      person.gender !== customer.gender
  );

  const scoredMatches = potentialMatches.map((person) => {

    let score = 0;
    let reasons = [];

    // Same Religion
    if (customer.religion === person.religion) {
      score += 20;
      reasons.push("Same religion");
    }

    // Children Preference
    if (customer.wantKids === person.wantKids) {
      score += 20;
      reasons.push("Matching children preference");
    }

    // Same City
    if (customer.city === person.city) {
      score += 15;
      reasons.push("Same city");
    }

    // Relocation
    if (customer.relocate === person.relocate) {
      score += 15;
      reasons.push("Compatible relocation preference");
    }

    // Male-specific logic
    if (customer.gender === "Male") {

      if (person.age < customer.age) {
        score += 10;
        reasons.push("Younger age");
      }

      if (person.height < customer.height) {
        score += 10;
        reasons.push("Shorter height");
      }

      if (person.income < customer.income) {
        score += 10;
        reasons.push("Income compatibility");
      }
    }

    // Female-specific logic
    if (customer.gender === "Female") {

      if (
        customer.profession !== "" &&
        person.profession !== ""
      ) {
        score += 10;
        reasons.push("Professional compatibility");
      }
    }

    return {
      ...person,
      score,
      reasons
    };
  });

  return scoredMatches.sort(
    (a, b) => b.score - a.score
  );
}