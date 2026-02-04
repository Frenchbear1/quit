export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  category: "shorts" | "talks" | "testimony" | "neuroscience" | "faith";
  tags: string[];
}

export const videos: Video[] = [
  // =========================
  // IN THE MOMENT (hit play when you're tempted)
  // =========================

  // Shorts — immediate “get out / cut it off / choose the exit” content
  {
    id: "v8",
    title: "A Way Out of Temptation — Short",
    description: "Straight to the point: temptation isn’t unbeatable—this shows the exit.",
    url: "https://www.youtube.com/shorts/kw4mGKZBgBg",
    duration: "Short",
    category: "shorts",
    tags: ["faith", "temptation", "escape", "hope"]
  },
  {
    id: "v24",
    title: "God Always Leaves a Way Out (Short)",
    description: "Clear reminder: temptation never removes responsibility.",
    url: "https://youtube.com/shorts/waVs3X1rGVk",
    duration: "Short",
    category: "shorts",
    tags: ["faith", "escape", "hope"]
  },
  {
    id: "v25",
    title: "Stop Negotiating With Temptation (Short)",
    description: "Negotiation is already a loss — this calls it out.",
    url: "https://youtube.com/shorts/ywEsZL63XM4",
    duration: "Short",
    category: "shorts",
    tags: ["temptation", "discipline", "boundaries"]
  },
  {
    id: "v3",
    title: "When Life Gets Heavy, Choose Prayer Over Your Vice — Short",
    description: "Calls out the escape habits (including porn) and gives a real way out.",
    url: "https://www.youtube.com/shorts/hY67SY2E7Cc",
    duration: "Short",
    category: "shorts",
    tags: ["faith", "prayer", "temptation", "motivation"]
  },
  {
    id: "v22",
    title: "You Don’t Need More Willpower — You Need a Decision (Short)",
    description: "Sharp correction to the willpower myth.",
    url: "https://youtube.com/shorts/vXX36Fuxsos",
    duration: "Short",
    category: "shorts",
    tags: ["decision", "discipline", "mindset"]
  },
  {
    id: "v4",
    title: "Want to Quit Porn? Do This Today! — Short",
    description: "A simple first step to move from intention to action.",
    url: "https://www.youtube.com/shorts/ZlSkB0nykLg",
    duration: "Short",
    category: "shorts",
    tags: ["first-step", "action", "accountability"]
  },
  {
    id: "v7",
    title: "The 3-Step System to Quit Porn Correctly — Short",
    description: "A quick framework to get serious and stay consistent.",
    url: "https://www.youtube.com/shorts/Ae-XfOO6a5M",
    duration: "Short",
    category: "shorts",
    tags: ["system", "plan", "discipline"]
  },
  {
    id: "v5",
    title: "How to deal with masturbation and pornography — Short",
    description: "Direct, practical advice on resisting temptation and breaking the habit loop.",
    url: "https://www.youtube.com/shorts/0xKNGqMZQMI",
    duration: "Short",
    category: "shorts",
    tags: ["practical", "temptation", "discipline", "freedom"]
  },

  // “Wake up / exposure” shorts (still useful in-the-moment)
  {
    id: "v20",
    title: "This Is What Porn Is Really Doing To You (Short)",
    description: "Straight truth — no sugarcoating, no excuses.",
    url: "https://youtube.com/shorts/VJ_KkkzJlfQ",
    duration: "Short",
    category: "shorts",
    tags: ["truth", "wake-up", "discipline"]
  },
  {
    id: "v21",
    title: "Porn Promises Relief — Then Leaves You Empty (Short)",
    description: "Calls out the escape lie and points toward real freedom.",
    url: "https://youtube.com/shorts/vbxIiJGNcQY",
    duration: "Short",
    category: "shorts",
    tags: ["escape", "freedom", "motivation"]
  },
  {
    id: "v19",
    title: "You Are Being Lied To — Porn Exposed (Short)",
    description: "Direct exposure of the lies porn feeds and why it keeps you stuck.",
    url: "https://youtube.com/shorts/60yZJ621SqM",
    duration: "Short",
    category: "shorts",
    tags: ["exposure", "lies", "motivation"]
  },
  {
    id: "v26",
    title: "You Can’t Heal What You Keep Feeding (Short)",
    description: "Hard truth about relapse and half-measures.",
    url: "https://youtube.com/shorts/lmQEB0gyFJ4",
    duration: "Short",
    category: "shorts",
    tags: ["relapse", "truth", "discipline"]
  },
  {
    id: "v23",
    title: "Porn Thrives in Secrecy (Short)",
    description: "Why hiding keeps the addiction alive.",
    url: "https://youtube.com/shorts/Np0e7FcoAQ0",
    duration: "Short",
    category: "shorts",
    tags: ["secrecy", "accountability", "truth"]
  },

  // =========================
  // QUICK RESETS (short talks you can finish fast)
  // =========================
  {
    id: "v10",
    title: "Give me 3 minutes & I'll make you Quit Porn Forever",
    description: "Short, punchy advice focused on breaking the loop.",
    url: "https://www.youtube.com/watch?v=sfm_t2fjFv0",
    duration: "3:09",
    category: "talks",
    tags: ["motivation", "practical", "reset"]
  },
  {
    id: "v9",
    title: "The Science of Dopamine & Porn Addiction (Explained in 3 Minutes)",
    description: "Fast, science-style explanation of the dopamine loop.",
    url: "https://www.youtube.com/watch?v=1oAGMO7jJ6Q",
    duration: "3:32",
    category: "talks",
    tags: ["neuroscience", "dopamine", "brain"]
  },
  {
    id: "v12",
    title: "Give me 3:40 minutes… I'll help you QUIT Masturbation for Good",
    description: "Short advice that overlaps heavily with porn triggers and relapse loops.",
    url: "https://www.youtube.com/watch?v=aarGZQrDKvo",
    duration: "3:40",
    category: "talks",
    tags: ["urges", "relapse", "discipline"]
  },
  {
    id: "v29",
    title: "Why Porn Never Satisfies",
    description: "Explains the emptiness loop and why it always demands more.",
    url: "https://youtu.be/K4DqnlX9_q0",
    duration: "5:55",
    category: "talks",
    tags: ["dopamine", "satisfaction", "truth"]
  },
  {
    id: "v6",
    title: "The 3 AAA's That Make Porn Addictive — Short",
    description: "Explains what keeps the cycle sticky and hard to break.",
    url: "https://www.youtube.com/shorts/keLsysGxyB4",
    duration: "Short",
    category: "shorts",
    tags: ["addiction", "cycle", "triggers"]
  },

  // =========================
  // BUILD THE FOUNDATION (identity / hope / rebuilding)
  // =========================
  {
    id: "v1",
    title: "The Truth About Porn and Mental Health (and How to Quit) — Short",
    description: "Quick reminder of the mental health cost and why quitting matters.",
    url: "https://www.youtube.com/shorts/-Og0Y5Uprdo",
    duration: "Short",
    category: "shorts",
    tags: ["mental-health", "motivation", "quitting"]
  },
  {
    id: "v14",
    title: "How Quitting Porn Addiction Can Transform Your Mental Health — Short",
    description: "Short clip on mental changes that happen when you stop feeding it.",
    url: "https://www.youtube.com/shorts/1YZFuRMFqFQ",
    duration: "Short",
    category: "testimony",
    tags: ["mental-health", "hope", "progress"]
  },
  {
    id: "v13",
    title: "Quitting Porn isn't Enough — Short",
    description: "Short reminder: quitting is step one; rebuilding is the win.",
    url: "https://www.youtube.com/shorts/-BvsgP1G1Lg",
    duration: "Short",
    category: "testimony",
    tags: ["recovery", "identity", "growth"]
  },
  {
    id: "v2",
    title: "GRACE WASN'T MEANT FOR YOUR PORN ADDICTION! — Short",
    description: "A direct call-out: grace isn’t a cover to stay stuck—it's power to change.",
    url: "https://www.youtube.com/shorts/sqT-uljjL18",
    duration: "Short",
    category: "shorts",
    tags: ["faith", "grace", "motivation", "freedom"]
  },

  // =========================
  // NEUROSCIENCE / CLINICAL ANGLES (understand the brain + triggers)
  // =========================
  {
    id: "v16",
    title: "Can I Quit Porn and Still Masturbate? — Short",
    description: "Short perspective on separating triggers and rebuilding control.",
    url: "https://www.youtube.com/shorts/mWmenRUJpUo",
    duration: "Short",
    category: "neuroscience",
    tags: ["behavior", "triggers", "recovery"]
  },
  {
    id: "v15",
    title: "2 Psychiatric Conditions Behind “Porn Addiction” — Short",
    description: "Short clinical lens that can help you understand what’s driving it.",
    url: "https://www.youtube.com/shorts/y4E61bHqhvI",
    duration: "Short",
    category: "neuroscience",
    tags: ["psychology", "brain", "behavior"]
  },
  {
    id: "v33",
    title: "Why Quitting Porn Feels Impossible (At First)",
    description: "Explains withdrawal, discomfort, and why it’s normal.",
    url: "https://youtu.be/Y0zePr-5ilE",
    duration: "6:14",
    category: "neuroscience",
    tags: ["withdrawal", "recovery", "hope"]
  },
  {
    id: "v32",
    title: "You Are Training Your Brain — Either Way",
    description: "Neuroscience-meets-discipline explanation.",
    url: "https://youtu.be/Gul2SRqChpo",
    duration: "10:41",
    category: "neuroscience",
    tags: ["brain", "habits", "training"]
  },

  // =========================
  // PRACTICAL DISCIPLINE (environment, shame, relapse patterns)
  // =========================
  {
    id: "v36",
    title: "Why You Must Change Your Environment",
    description: "Environment beats willpower — clearly explained.",
    url: "https://youtu.be/M9HWZI9Y9EI",
    duration: "7:28",
    category: "talks",
    tags: ["environment", "habits", "practical"]
  },
  {
    id: "v35",
    title: "Discipline Is Built — Not Felt",
    description: "Why waiting to feel ready keeps you stuck.",
    url: "https://youtu.be/imTuF7Rys50",
    duration: "7:04",
    category: "talks",
    tags: ["discipline", "action", "mindset"]
  },
  {
    id: "v38",
    title: "Why Shame Keeps You Addicted",
    description: "Shame exposure without enabling behavior.",
    url: "https://youtu.be/Yh_7y2PYH1o",
    duration: "9:11",
    category: "talks",
    tags: ["shame", "freedom", "psychology"]
  },
  {
    id: "v30",
    title: "This Is Why You Keep Relapsing",
    description: "Breaks down the relapse cycle clearly and honestly.",
    url: "https://youtu.be/wvCTiY4clyM",
    duration: "10:35",
    category: "talks",
    tags: ["relapse", "cycle", "recovery"]
  },
  {
    id: "v37",
    title: "You Don’t Fall — You Drift",
    description: "How small compromises lead back to relapse.",
    url: "https://youtu.be/rFvPNmpl2ug",
    duration: "11:16",
    category: "talks",
    tags: ["compromise", "relapse", "awareness"]
  },
  {
    id: "v34",
    title: "The Cost Porn Never Tells You About",
    description: "Relational, mental, and spiritual consequences explained.",
    url: "https://youtu.be/UsI6LHWJRTk",
    duration: "3:40",
    category: "talks",
    tags: ["consequences", "truth", "motivation"]
  },

  // =========================
  // FAITH / WARFARE / LONGER FORM (when you need deeper weight)
  // =========================
  {
    id: "v18",
    title: "How to Quit Porn — Short Talk",
    description: "Short practical encouragement to stop isolating and start changing patterns.",
    url: "https://www.youtube.com/watch?v=fiP4GtAUm5I",
    duration: "7:50",
    category: "faith",
    tags: ["practical", "accountability", "freedom"]
  },
  {
    id: "v31",
    title: "Porn Addiction and the Battle for Your Mind",
    description: "Talk on spiritual and mental warfare behind addiction.",
    url: "https://youtu.be/0eHtYWs__38",
    duration: "10:23",
    category: "faith",
    tags: ["faith", "warfare", "mind"]
  },
  {
    id: "v41",
    title: "This Is a War — Act Like It",
    description: "Strong framing: addiction as warfare, not weakness.",
    url: "https://youtu.be/1_U2sNCWPDg",
    duration: "7:12",
    category: "faith",
    tags: ["warfare", "discipline", "urgency"]
  },
  {
    id: "v40",
    title: "The Lie of Private Sin",
    description: "Why private sin never stays private.",
    url: "https://youtu.be/_5BbUFJMtqQ",
    duration: "17:35",
    category: "faith",
    tags: ["sin", "truth", "exposure"]
  },
  {
    id: "v39",
    title: "You Were Not Meant to Live Like This",
    description: "Pastor-style reminder of identity and purpose.",
    url: "https://youtu.be/kLcKgzKA1cw",
    duration: "37:30",
    category: "faith",
    tags: ["identity", "purpose", "freedom"]
  },
  {
    id: "v42",
    title: "Freedom Requires Action",
    description: "Ends excuses and points directly to responsibility.",
    url: "https://youtu.be/66rma6-lhrE",
    duration: "31:46",
    category: "talks",
    tags: ["responsibility", "action", "freedom"]
  },

  // =========================
  // MINDSET ROOTS (zoom out)
  // =========================
  {
    id: "v27",
    title: "Comfort Is the Real Addiction (Short)",
    description: "Why porn isn’t the root — comfort is.",
    url: "https://youtube.com/shorts/VHTG3eUZQcw",
    duration: "Short",
    category: "shorts",
    tags: ["comfort", "addiction", "mindset"]
  },
  {
    id: "v28",
    title: "If You Keep Feeding It, It Will Keep Growing (Short)",
    description: "Simple truth about escalation and tolerance.",
    url: "https://youtube.com/shorts/BkHJhoq1r74",
    duration: "Short",
    category: "shorts",
    tags: ["escalation", "tolerance", "warning"]
  }
];

export const videoCategories = [
  { id: 'shorts', label: 'Shorts', description: 'Quick, punchy clips' },
  { id: 'talks', label: 'Longer Talks', description: '5-10 minute deep dives' },
  { id: 'testimony', label: 'Testimonies', description: 'Real stories of freedom' },
  { id: 'neuroscience', label: 'Neuroscience', description: 'Brain science and dopamine' },
  { id: 'faith', label: 'Faith + Discipline', description: 'Biblical wisdom' },
];

export const allVideoTags = [...new Set(videos.flatMap(v => v.tags))];
