import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

// async function seed() {

//   // Create a course
//   const course1 = await db.course.create({
//       data: {
//           userId:"clxy2azgj0000xa7nrsxxg3bd",
//           courseName: 'Introduction to Programming',
//           numberOfDays: 30,
//           structure: { /* JSON structure */ },
//           createdAt: new Date(),
//       },
//   });

//   // Create modules for the course
//   const module1 = await db.module.create({
//       data: {
//           courseId: course1.id,
//           dayNumber: 1,
//           moduleNumber: 1,
//           title: 'Introduction to JavaScript',
//           createdAt: new Date(),
//       },
//   });

//   // Create topics for the module
//   const topic1 = await db.topic.create({
//       data: {
//           moduleId: module1.id,
//           title: 'Variables and Data Types',
//           content: 'In this module, we cover variables and data types in JavaScript.',
//           createdAt: new Date(),
//       },
//   });

//   // Create assessments for the module
//   const assessment1 = await db.assessment.create({
//       data: {
//           moduleId: module1.id,
//           type: 'multiple_choice',
//           question: 'What is the result of 2 + 2?',
//           options: { A: '3', B: '4', C: '5' },
//           answer: 'B',
//           createdAt: new Date(),
//       },
//   });

//   // Create progress for the user
//   const progress1 = await db.progress.create({
//       data: {
//           userId: "clxy2azgj0000xa7nrsxxg3bd",
//           courseId: course1.id,
//           moduleId: module1.id,
//           status: '80%',
//           createdAt: new Date(),
//       },
//   });

//   console.log('Dummy data seeded successfully!');
// }

// Call the seed function
// seed();