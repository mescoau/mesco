export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How quickly will you respond to my enquiry?",
    answer:
      "We typically reply within one business day. If your request is urgent, include your phone number so we can prioritise a call back.",
  },
  {
    question: "What details should I share about my project or systems?",
    answer:
      "A short description of the project, its location, key stakeholders, and any existing WHS or quality systems helps us point you to the right support.",
  },
  {
    question: "Do you support both new builds and existing projects?",
    answer:
      "Yes. We help set up systems for new projects and also improve or formalise documentation and processes on live jobs.",
  },
  {
    question: "Can we schedule an on-site or office visit?",
    answer:
      "Absolutely. After our initial conversation, we can arrange a meeting or site walk-through to understand your current approach and align on scope.",
  },
  {
    question: "What regions does MESCo support?",
    answer:
      "MESCo primarily supports Australian projects, with a focus on major metropolitan and infrastructure corridors. Discuss your location with us and we can confirm fit.",
  },
  {
    question: "How do you approach pricing for MESCo services?",
    answer:
      "We start with a high-level view of project scope, timeframes, and deliverables, then provide a transparent proposal covering systems setup, documentation, and ongoing support where required.",
  },
];
