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
      "Provide a brief overview of your project, including scope, location, key stakeholders, applicable standards or specifications, and any existing WHS or QA/QC processes. This helps us understand your requirements and provide the most appropriate engineering support.",
  },
  {
    question: "Do you support both greenfield and brownfield projects?",
    answer:
      "Yes. We work across both greenfield and brownfield projects — establishing frameworks for new developments and improving or formalising QA, documentation, and delivery processes within active operations.",
  },
  {
    question: "Can we schedule an on-site or office visit?",
    answer:
      "Absolutely. After our initial conversation, we can arrange a meeting or site walk-through to understand your current approach and align on scope.",
  },
  {
    question: "What regions does MESCo support?",
    answer:
      "MESCo supports projects Australia-wide, across metropolitan, regional, and remote locations. Get in touch to discuss your project requirements and delivery approach.",
  },
  {
    question: "How do you approach pricing for MESCo services?",
    answer:
      "We start with a high-level view of project scope, timeframes, and deliverables, then provide a transparent proposal covering systems setup, documentation, and ongoing support where required.",
  },
];
