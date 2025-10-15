// @ts-ignore: generated Convex server typings may be missing in this environment
import { query, mutation } from './_generated/server';

// Fetch interview questions for a given interview ID
export const GetInterviewQuestions = query(async ({ db }: { db: any }, { interviewId }: { interviewId: string }) => {
  if (!interviewId) {
    throw new Error('Interview ID is required.');
  }

  // Fetch questions from the database
  interface InterviewQuestion {
    _id: string;
    interviewId: string;
    question: string;
    answer?: string | null;
    category?: string | null;
    difficulty?: string | null;
    type?: string | null;
    createdAt: number;
  }

  const questions = await db
    .table('interviewQuestions')
    .filter((q: InterviewQuestion) => q.interviewId === interviewId)
    .collect() as InterviewQuestion[];

  return questions.map((q) => ({
    id: q._id,
    question: q.question,
    answer: q.answer,
    category: q.category,
    difficulty: q.difficulty,
    type: q.type,
    createdAt: q.createdAt,
  }));
});

// Save feedback for an interview
export const SaveInterviewFeedback = mutation(async ({ db }: { db: any }, { interviewId, feedback, score }: { interviewId: string, feedback: string, score: number }) => {
  if (!interviewId || !feedback || score === undefined) {
    throw new Error('Invalid parameters: interviewId, feedback, and score are required.');
  }

  // Save feedback to the database
  await db.insert('interviewFeedback', {
    interviewId,
    feedback,
    score,
    createdAt: Date.now(),
  });
});
