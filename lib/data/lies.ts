export interface Lie {
  id: string;
  lie: string;
  realMeaning: string;
  cost: string;
  replacementTruth: string;
}

export interface ReadAloud {
  id: string;
  text: string;
}

export const lies: Lie[] = [
  {
    id: "lie1",
    lie: "God will forgive me tomorrow.",
    realMeaning: "You're treating grace like a credit card with unlimited balance. You're planning to sin right now because you think tomorrow's forgiveness is guaranteed. It's not. Tomorrow isn't promised. And even if it comes, you're hardening your heart with every deliberate choice.",
    cost: "Every planned sin makes the next one easier. You're eroding your own conscience. You're training yourself to see God's grace as a license rather than a gift. Your relationship with God becomes transactional—you sin, he forgives, repeat. That's not relationship. That's manipulation.",
    replacementTruth: "Grace is for the repentant, not the calculating."
  },
  {
    id: "lie2",
    lie: "One more time won't hurt.",
    realMeaning: "You've said this before. Maybe a hundred times. Each 'one more time' adds another link to the chain. You're not getting it out of your system—you're reinforcing the neural pathways that make this harder to quit.",
    cost: "Every 'one more time' is a vote for who you're becoming. It costs you self-respect. It costs you time you'll never get back. It costs you clarity. It costs you intimacy with God. It costs you the ability to look yourself in the mirror.",
    replacementTruth: "One more time always hurts. Every time."
  },
  {
    id: "lie3",
    lie: "Bathroom phone isn't a temptation.",
    realMeaning: "You know exactly why you bring your phone to the bathroom. The privacy. The locked door. The excuse of 'just checking something.' You've created a ritual, and the ritual has a purpose you refuse to admit.",
    cost: "The bathroom has become a trap. A place where you're alone with your worst impulses and a device that gives you instant access to anything. You've turned a necessary room into a recurring crime scene.",
    replacementTruth: "If you can't leave your phone outside for 5 minutes, it owns you."
  },
  {
    id: "lie4",
    lie: "I already messed up yesterday.",
    realMeaning: "You're using yesterday's failure as permission for today's failure. This is the 'might as well' lie—the idea that since you've already fallen, you might as well keep falling. It's the logic of someone who's given up.",
    cost: "A bad day becomes a bad week becomes a bad month. You're turning a single fall into a landslide. Yesterday's failure doesn't require today's surrender. It requires today's resistance.",
    replacementTruth: "Yesterday's fall doesn't give today permission. Get up."
  },
  {
    id: "lie5",
    lie: "I already messed up today.",
    realMeaning: "You're writing off the rest of the day because you slipped once. As if one fall means you should just keep falling. This is defeat thinking. This is quit-on-yourself logic.",
    cost: "The difference between falling once and falling five times is the difference between a stumble and a collapse. You're choosing the collapse. You're choosing to make today worse than it needs to be.",
    replacementTruth: "One fall isn't permission for five more. Stop now."
  },
  {
    id: "lie6",
    lie: "I deserve this.",
    realMeaning: "You're framing poison as a reward. You've had a hard day, a stressful week, a difficult season—so you 'deserve' to indulge in something that makes everything worse? That's not a reward. That's punishment.",
    cost: "You're training your brain to seek comfort in destruction. Hard times become triggers. Stress becomes permission. You're building a system where every difficulty leads you back to the thing that's destroying you.",
    replacementTruth: "You deserve freedom, not chains."
  },
  {
    id: "lie7",
    lie: "Nobody will know.",
    realMeaning: "You'll know. God knows. And the person you're becoming knows. The secrecy isn't protection—it's isolation. You're building a hidden life that separates you from everyone, including yourself.",
    cost: "Secrets create shame. Shame creates isolation. Isolation creates more opportunities to fall. You're building a prison in the dark, and you're the only inmate.",
    replacementTruth: "You will know. And you'll have to live with yourself."
  },
  {
    id: "lie8",
    lie: "I'm just looking.",
    realMeaning: "There's no such thing as 'just looking.' The look is the first step. Jesus said looking lustfully is adultery of the heart. The eyes aren't innocent observers—they're gatekeepers to the soul.",
    cost: "Every look feeds the hunger instead of satisfying it. You're not getting it out of your system. You're making the craving stronger. The look leads to the click leads to the regret.",
    replacementTruth: "Just looking is just sinning."
  },
  {
    id: "lie9",
    lie: "This is just how I am.",
    realMeaning: "You're turning a habit into an identity. You're saying change is impossible. You're giving yourself a permanent excuse. This isn't who you are—it's who you've chosen to be. And you can choose differently.",
    cost: "When you believe change is impossible, you stop trying. You settle into defeat. You accept a diminished life as your fate. You rob yourself of the transformation God offers.",
    replacementTruth: "This is who you've been, not who you have to remain."
  },
  {
    id: "lie10",
    lie: "I'll start fresh on Monday / next month / after this.",
    realMeaning: "You're delaying obedience, which is just disobedience in slow motion. Monday is a fantasy. The fresh start is now—or it's never. Every postponement is a choice to stay in the cycle.",
    cost: "The future version of you who's magically disciplined doesn't exist. There's only the you who decides right now. Every 'I'll start fresh later' is a vote to stay stuck.",
    replacementTruth: "The only fresh start that matters is right now."
  }
];

export const readAloudStatements: ReadAloud[] = [
  {
    id: "ra1",
    text: "I am choosing to damage myself right now. This is not accidental. This is not happening to me. I am doing this to myself, with my own hands, in my own time."
  },
  {
    id: "ra2",
    text: "I am trading my future peace for a few minutes of escape. I will feel worse after this, not better. I know this because I've proven it dozens of times."
  },
  {
    id: "ra3",
    text: "I am lying to God right now by pretending I don't have a choice. I have a choice. I'm just choosing wrong."
  },
  {
    id: "ra4",
    text: "I am becoming the person I don't want to be, one click at a time. Nobody is making me do this. The person destroying my life is me."
  },
  {
    id: "ra5",
    text: "I am smarter than this. I know where this leads. I know how I'll feel after. I am choosing temporary numbness over lasting freedom."
  },
  {
    id: "ra6",
    text: "I cannot serve both God and this addiction. Right now, I am choosing to serve the addiction. I am aware of this. I am doing it anyway."
  }
];
