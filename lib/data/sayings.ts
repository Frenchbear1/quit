export const mentorSayings: string[] = [
  "You didn't 'accidentally' end up here.",
  "This is a choice. Choose.",
  "You're not weak. You're undisciplined. Fix it.",
  "The best time to stop was years ago. The second best time is now.",
  "Nobody is coming to rescue you. You have to decide.",
  "Every time you give in, you vote for who you're becoming.",
  "You know exactly what happens next if you don't leave.",
  "This won't feel good in 10 minutes. You know this.",
  "Your future self is watching. Don't disappoint him.",
  "The lie says this will help. It never has.",
  "You've done this before. It never works.",
  "One more time is one too many.",
  "Stop negotiating with yourself.",
  "The door is right there. Walk through it.",
  "You're stronger than this moment. Prove it.",
  "What would the man you want to be do right now?",
  "This isn't who you have to be.",
  "The chain breaks one link at a time. Start now.",
  "Your integrity is watching.",
  "Temporary pleasure, permanent regret. Every time.",
  "You're trading gold for garbage.",
  "The struggle is proof you haven't given up. Keep fighting.",
  "This moment will pass. Your decision won't.",
  "You came to this app for a reason. Listen to it.",
  "You have more strength than you think. Use it.",
  "Discipline is choosing what you want most over what you want now.",
  "The man you want to be doesn't do this.",
  "Every 'no' makes the next 'no' easier.",
  "You're not just fighting for today. You're fighting for your future.",
  "The battle is in this moment. Win it."
];

export function getRandomSaying(): string {
  return mentorSayings[Math.floor(Math.random() * mentorSayings.length)];
}
