const fs = require("fs");

const maleNames = [
  "Rahul", "Amit", "Rohan", "Arjun", "Vikram",
  "Karan", "Aditya", "Siddharth", "Varun", "Akash"
];

const femaleNames = [
  "Priya", "Sneha", "Ananya", "Neha", "Kavya",
  "Pooja", "Aisha", "Riya", "Nisha", "Meera"
];

const lastNames = [
  "Sharma", "Patel", "Joshi", "Verma", "Kulkarni",
  "Singh", "Khan", "Mehta", "Deshmukh", "Fernandes"
];

const cities = [
  "Mumbai", "Pune", "Delhi", "Bangalore",
  "Hyderabad", "Ahmedabad", "Chennai",
  "Kolkata", "Nashik", "Indore"
];

const religions = [
  "Hindu", "Muslim", "Christian",
  "Sikh", "Jain", "Buddhist"
];

const professions = [
  "Software Engineer",
  "Doctor",
  "Data Scientist",
  "Architect",
  "CA",
  "Teacher",
  "Lawyer",
  "Consultant",
  "Product Manager",
  "Business Owner"
];

const colleges = [
  "IIT Bombay",
  "VJTI",
  "BITS Pilani",
  "SPIT",
  "PCCOE",
  "MIT Pune"
];

const companies = [
  "Google",
  "Microsoft",
  "TCS",
  "Infosys",
  "Accenture",
  "Amazon",
  "Deloitte",
  "Wipro"
];

const statuses = [
  "New Lead",
  "Profile Complete",
  "Verified",
  "Match Sent",
  "Meeting Scheduled",
  "Relationship Progressing",
  "Success Story",
  "Actively Matching"
];

const languagesList = [
  ["English", "Hindi"],
  ["English", "Marathi"],
  ["English", "Hindi", "Marathi"],
  ["English", "Tamil"],
  ["English", "Gujarati"]
];

const customers = [];

for (let i = 1; i <= 100; i++) {
  const gender = i <= 50 ? "Female" : "Male";

  const firstName =
    gender === "Female"
      ? femaleNames[Math.floor(Math.random() * femaleNames.length)]
      : maleNames[Math.floor(Math.random() * maleNames.length)];

  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  const age = Math.floor(Math.random() * 10) + 24;

  customers.push({
    id: i,

    firstName,
    lastName,

    gender,

    age,

    dob: `199${Math.floor(Math.random() * 9)}-0${Math.floor(Math.random() * 9) + 1}-1${Math.floor(Math.random() * 9)}`,

    country: "India",

    city:
      cities[Math.floor(Math.random() * cities.length)],

    religion:
      religions[Math.floor(Math.random() * religions.length)],

    caste: "General",

    email: `${firstName.toLowerCase()}${i}@example.com`,

    phone: `98${Math.floor(
      10000000 + Math.random() * 89999999
    )}`,

    college:
      colleges[Math.floor(Math.random() * colleges.length)],

    degree: "Bachelor's",

    profession:
      professions[Math.floor(Math.random() * professions.length)],

    company:
      companies[Math.floor(Math.random() * companies.length)],

    designation: "Professional",

    income:
      Math.floor(Math.random() * 20) + 6,

    height:
      gender === "Female"
        ? Math.floor(Math.random() * 5) + 61
        : Math.floor(Math.random() * 5) + 68,

    maritalStatus: "Never Married",

    languages:
      languagesList[
        Math.floor(Math.random() * languagesList.length)
      ],

    siblings:
      Math.floor(Math.random() * 3),

    wantKids:
      ["Yes", "Maybe"][
        Math.floor(Math.random() * 2)
      ],

    relocate:
      ["Yes", "No", "Maybe"][
        Math.floor(Math.random() * 3)
      ],

    pets:
      ["Yes", "No", "Maybe"][
        Math.floor(Math.random() * 3)
      ],

    journeyStatus:
      statuses[
        Math.floor(Math.random() * statuses.length)
      ],

    notes:
      "Looking for a compatible life partner."
  });
}

fs.writeFileSync(
  "customers_generated.json",
  JSON.stringify(customers, null, 2)
);

console.log(
  "100 customers generated successfully!"
);