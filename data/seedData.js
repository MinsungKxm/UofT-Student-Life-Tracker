const RESOURCES = [
  { name: 'ACORN', desc: 'Enrolment & finances', url: 'https://acorn.utoronto.ca/' },
  { name: 'Quercus', desc: 'Courses & grades', url: 'https://q.utoronto.ca/', badgeCount: 3 },
  { name: 'Crowdmark', desc: 'Submit assignments', url: 'https://crowdmark.com/', badgeCount: 1 },
  { name: 'MarkUs', desc: 'Code & assignment grading', url: 'https://markus.teach.cs.toronto.edu/' },
  { name: 'Folio', desc: 'Co-curricular record', url: 'https://folio.utoronto.ca/' },
  { name: 'CLNx', desc: 'Career learning network', url: 'https://clnx.utoronto.ca/' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WORKOUT_TYPES = ['Run', 'Gym', 'Swim', 'Bike', 'Sport', 'Other'];

// ---- Seed data -----------------------------------------------------------------
const TODAY_CLASSES = [
  { id: 1, course: 'CSC207', title: 'Software Design Lecture', time: '10:00 AM', location: 'BA 1170' },
  { id: 2, course: 'MAT223', title: 'Linear Algebra Tutorial', time: '1:00 PM', location: 'SS 1088' },
  { id: 3, course: 'STA257', title: 'Probability Lecture', time: '3:00 PM', location: 'MP 134' },
];

const INITIAL_CHECKLIST = [
  { id: 1, text: 'Verify your contact information on ACORN', done: true },
  { id: 2, text: 'Enrol in Fall/Winter courses', done: false },
  { id: 3, text: 'Pay or defer your tuition fees', done: false },
  { id: 4, text: 'Set up two-factor authentication for UTORid', done: true },
  { id: 5, text: 'Order your TCard', done: false },
];

export { RESOURCES, WEEKDAYS, MONTH_NAMES, WORKOUT_TYPES, TODAY_CLASSES, INITIAL_CHECKLIST };