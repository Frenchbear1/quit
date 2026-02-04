export interface ExitAction {
  id: string;
  title: string;
  description?: string;
  category: 'bathroom' | 'late-night' | 'immediate' | 'accountability' | 'physical' | 'breathing';
  icon: 'phone' | 'walk' | 'water' | 'message' | 'exercise' | 'breathe' | 'pray' | 'stand';
}

export interface TriggerTag {
  id: string;
  label: string;
  icon: string;
}

export const exitActions: ExitAction[] = [
  {
    id: "ea1",
    title: "Put the phone outside the bathroom. Now.",
    description: "Not on the counter. Not 'in a minute.' Outside the door. Close the door. Do what you came to do. Leave.",
    category: "bathroom",
    icon: "phone"
  },
  {
    id: "ea2",
    title: "Stand up. Wash your face. Leave.",
    description: "Cold water. Look yourself in the mirror. Then walk out of whatever room you're in.",
    category: "immediate",
    icon: "stand"
  },
  {
    id: "ea3",
    title: "10 pushups + cold water.",
    description: "Physical reset. Get blood flowing somewhere else. Break the trance.",
    category: "physical",
    icon: "exercise"
  },
  {
    id: "ea4",
    title: "Text accountability partner.",
    description: "You don't have to explain everything. Just say: 'I'm struggling right now. Pray for me.'",
    category: "accountability",
    icon: "message"
  },
  {
    id: "ea5",
    title: "60-second breathing reset.",
    description: "4 seconds in. Hold 4. Out 4. Repeat for one minute. Your brain needs oxygen, not dopamine.",
    category: "breathing",
    icon: "breathe"
  },
  {
    id: "ea6",
    title: "Leave the bedroom. Go to a public space.",
    description: "Kitchen. Living room. Anywhere with visibility. Darkness and privacy are the enemy right now.",
    category: "late-night",
    icon: "walk"
  },
  {
    id: "ea7",
    title: "Put the phone in another room.",
    description: "Plug it in somewhere you have to get up to reach. Break the proximity.",
    category: "late-night",
    icon: "phone"
  },
  {
    id: "ea8",
    title: "Pray out loud. Name what you're feeling.",
    description: "'God, I want to look at porn right now. Help me.' Say it. Bring it into the light.",
    category: "immediate",
    icon: "pray"
  },
  {
    id: "ea9",
    title: "Get dressed and go outside.",
    description: "Even for 2 minutes. Break the environment. The temptation is tied to the context.",
    category: "immediate",
    icon: "walk"
  },
  {
    id: "ea10",
    title: "Splash cold water on your face and neck.",
    description: "Shock your system. Wake up. You're in a trance and you need to break it.",
    category: "physical",
    icon: "water"
  },
  {
    id: "ea11",
    title: "Do a plank until you can't anymore.",
    description: "Physical discomfort redirects mental energy. Hold it until the urge fades.",
    category: "physical",
    icon: "exercise"
  },
  {
    id: "ea12",
    title: "Read Psalm 51 out loud.",
    description: "David's prayer of repentance. Let his words become yours.",
    category: "immediate",
    icon: "pray"
  }
];

export const triggerTags: TriggerTag[] = [
  { id: "t1", label: "Habit", icon: "repeat" },
  { id: "t2", label: "Boredom", icon: "meh" },
  { id: "t3", label: "Toilet", icon: "door" },
  { id: "t4", label: "Late-night", icon: "moon" },
  { id: "t5", label: "Stress", icon: "zap" },
  { id: "t6", label: "Loneliness", icon: "user" },
  { id: "t7", label: "Anger", icon: "flame" },
  { id: "t8", label: "Rejection", icon: "x-circle" },
  { id: "t9", label: "Tiredness", icon: "battery-low" },
  { id: "t10", label: "Anxiety", icon: "alert" }
];

export const lateNightActions = exitActions.filter(a => a.category === 'late-night' || a.category === 'immediate' || a.category === 'breathing');
