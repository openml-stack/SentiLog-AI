import { useState } from "react";
import {
  Zap,
  FileText,
  Shield,
  Heart,
  ExternalLink,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const helpCategories = [
  {
    title: "Getting Started",
    icon: <Zap className="w-5 h-5" />,
    items: [
      {
        question: "How do I create my first journal entry?",
        answer:
          'Creating your first journal entry is simple! Go to your journal page, click "New Entry", and start writing. Your entries are saved automatically as you type, so you can focus on expressing your thoughts.',
        links: [{ text: "Start Journaling", href: "/journal" }],
      },
      {
        question: "How do I track my mood daily?",
        answer:
          "Use the dashboard to log your daily moods. Add notes, track patterns, and see how your feelings change over time. This helps you understand your emotional trends and make informed self-care decisions.",
        links: [{ text: "Track Mood", href: "/dashboard" }],
      },
    ],
  },
  {
    title: "Feature Tutorials",
    icon: <FileText className="w-5 h-5" />,
    items: [
      {
        question: "How do I analyze a document for emotions?",
        answer:
          "Upload text documents in the Analyze page. The AI will detect emotions, sentiments, and patterns, giving you insights into the tone and emotional content of your text.",
        links: [{ text: "Upload Document", href: "/analyze" }],
      },
      {
        question: "How can I see how my mood changes with current events?",
        answer:
          "Compare your mood entries on the dashboard with news content to see correlations and patterns. This helps you understand how external events may influence your emotions.",
        links: [{ text: "View Dashboard", href: "/dashboard" }],
      },
      {
        question: "How can I analyze newsletters or news articles?",
        answer:
          "Copy the content of your newsletter or news article into the Analyze page. The AI evaluates the sentiment, tone, and emotional cues, giving you insights on the overall mood and impact of the text.",
        links: [{ text: "Analyze Document", href: "/analyze" }],
      },
    ],
  },
  {
    title: "Privacy & Security",
    icon: <Shield className="w-5 h-5" />,
    items: [
      {
        question: "Is my journaling data private?",
        answer:
          "All your data is end-to-end encrypted and stored securely. Only you have access to your entries. Privacy is our top priority.",
        links: [{ text: "Privacy Policy", href: "/privacy-policy" }],
      },
      {
        question: "How can I manage my journaling data?",
        answer:
          "You can export your entries as PDF or JSON files for backup or permanently delete your account from your profile page. Full control is in your hands.",
        links: [{ text: "Manage Data", href: "/user-profile" }],
      },
    ],
  },
  {
    title: "Wellness Resources",
    icon: <Heart className="w-5 h-5" />,
    items: [
      {
        question: "Where can I find ideas for journaling?",
        answer:
          "Start by reflecting on your day, goals, or emotions. Prompts like: 'What am I grateful for today?' or 'What challenged me and how did I respond?' help you explore your thoughts deeply.",
        links: [{ text: "Guided Prompts", href: "/journal" }],
      },
      {
        question:
          "What should I do if I feel stressed, anxious, or emotionally overwhelmed?",
        answer:
          "Take a pause, breathe, and try grounding exercises. Journaling, talking to a friend, or engaging in calming activities like walking, meditating, or creative hobbies can help manage stress.",
      },
      {
        question:
          "How can I analyze my own journal entries for emotional trends?",
        answer:
          "Upload your entries to the Analyze page. The AI highlights emotions, patterns, and sentiment trends over time, helping you better understand your emotional well-being.",
        links: [{ text: "Analyze Journal", href: "/analyze" }],
      },
      {
        question: "Can I track my emotional responses to news or events?",
        answer:
          "Log your mood daily and compare it to the sentiment of news content in the dashboard. This helps you see patterns, understand triggers, and manage your emotional responses proactively.",
        links: [{ text: "View Dashboard", href: "/dashboard" }],
      },
    ],
  },
];

const HelpCenterPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="min-h-screen px-6 py-12 transition-all duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Help Center
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Find answers, explore guides, and get support whenever you need.
          </p>
        </div>

        {/* Categories & FAQs */}
        {helpCategories.map((category, catIndex) => {
          const categoryColors = [
            "text-blue-600",
            "text-purple-600",
            "text-red-600",
            "text-green-600",
          ];
          const textColor = categoryColors[catIndex % categoryColors.length];

          return (
            <div key={catIndex} className="space-y-6">
              <div
                className={`flex items-center gap-3 font-semibold text-lg ${textColor}`}
              >
                {category.icon}
                <span>{category.title}</span>
              </div>

              {category.items.map((item, idx) => {
                const faqIndex = `${catIndex}-${idx}`;
                return (
                  <div
                    key={faqIndex}
                    className="overflow-hidden transition-all duration-300 shadow hover:shadow-md"
                  >
                    <button
                      onClick={() =>
                        setOpenFAQ(openFAQ === faqIndex ? null : faqIndex)
                      }
                      className="w-full flex justify-between items-center px-4 py-3 font-semibold text-white text-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-300 text-lg"
                    >
                      {item.question}
                      <span className="text-xl">
                        {openFAQ === faqIndex ? "−" : "+"}
                      </span>
                    </button>

                    {openFAQ === faqIndex && (
                      <div className="p-4 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 space-y-3 text-base">
                        <p>{item.answer}</p>
                        {item.links && item.links.length > 0 && (
                          <div className="flex flex-col gap-2">
                            {item.links.map((link, linkIdx) => (
                              <a
                                key={linkIdx}
                                href={link.href}
                                target={link.external ? "_blank" : "_self"}
                                rel={
                                  link.external
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                              >
                                {link.text}
                                {link.external && (
                                  <ExternalLink className="w-4 h-4" />
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="mt-12 p-8 text-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Still need help?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is here to assist you with any questions or
            concerns about your wellness journey.
          </p>
          <div className="flex justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
