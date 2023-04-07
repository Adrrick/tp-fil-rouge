import Grade from "src/app/models/Grade";

// order is important, moviesSeenNb DESC
const grades: Grade[] = [
  { name: "grades.10", moviesSeenNb: 5000 },
  { name: "grades.9", moviesSeenNb: 3000 },
  { name: "grades.8", moviesSeenNb: 1500 },
  { name: "grades.7", moviesSeenNb: 800 },
  { name: "grades.6", moviesSeenNb: 400 },
  { name: "grades.5", moviesSeenNb: 200 },
  { name: "grades.4", moviesSeenNb: 100 },
  { name: "grades.3", moviesSeenNb: 50 },
  { name: "grades.2 ", moviesSeenNb: 25 },
  { name: "grades.1", moviesSeenNb: 0 },
]

export default grades;