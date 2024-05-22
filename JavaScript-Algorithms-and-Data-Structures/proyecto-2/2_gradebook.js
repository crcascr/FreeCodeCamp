// Test 1

function getAverage(scores) {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

// Test 2

function getGrade(score) {
  let grade = "";
  if (score === 100) {
    grade = "A++";
  } else if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }
  return grade;
}

console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56));

// Test 3

function hasPassingGrade(score) {
  let passing = false;
  const actual = getGrade(score);
  if (actual !== "F") {
    passing = true;
  }
  return passing;
}

console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));

// Test 4

function studentMsg(totalScores, studentScore) {
  let msg = "";
  const average = getAverage(totalScores);
  const grade = getGrade(studentScore);

  if (hasPassingGrade(studentScore)) {
    msg =
      "Class average: " +
      average +
      ". Your grade: " +
      grade +
      ". You passed the course.";
  } else {
    msg =
      "Class average: " +
      average +
      ". Your grade: " +
      grade +
      ". You failed the course.";
  }

  return msg;
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
