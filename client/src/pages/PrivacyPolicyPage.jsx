import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  "Applicability and Scope",
  "Information We Collect",
  "How We Use Information",
  "Sharing and Disclosure",
  "Data of Minors",
  "Security",
  "Data Storage",
  "Cookies & Tracking",
  "Changes to Policy",
  "Contact Us",
];

const PrivacyPolicy = () => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      sectionRefs.current.forEach((ref, index) => {
        if (ref && ref.offsetTop <= scrollPosition) {
          setActiveSection(sections[index]);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const ref = sectionRefs.current[index];
    if (ref) {
      window.scrollTo({ top: ref.offsetTop - 95, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800 dark:text-gray-200">
      {/* <Navbar /> */}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r dark:border-gray-700 p-4 hidden md:block sticky top-20 h-fit self-start transition-all duration-300 ease-in-out">
        <ul className="space-y-8 md:space-y-10 lg:space-y-11 text-sm">

            {sections.map((section, index) => (
              <li
                key={section}
                className={`cursor-pointer transition-colors duration-200 ${
                  activeSection === section
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "hover:text-blue-500"
                }`}
                onClick={() => scrollToSection(index)}
              >
                {section}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-500 italic mb-4">
            Last updated on {today}
          </p>

          <section className="space-y-8">
            {sections.map((title, index) => (
              <div key={title} ref={(el) => (sectionRefs.current[index] = el)}>
                <h2 className="text-xl font-semibold">
                  {index + 1}. {title}
                </h2>
                <div className="mt-2 text-gray-800 dark:text-gray-200">
                  {(() => {
                    switch (title) {
                      case "Applicability and Scope":
                        return (
                          <>
                            This Privacy Policy applies to the personal data
                            collected by{" "}
                            <span className="font-bold text-purple-700">
                              SentiLog AI
                            </span>{" "}
                            (“SentiLog”, “we”, “our”, or “us”) when you access or
                            use our website, products, services, and any other
                            features we provide (collectively, the “Services”).
                            By using our Services, you agree to the collection
                            and use of information in accordance with this
                            policy.
                          </>
                        );

                      case "Information We Collect":
                        return (
                          <>
                            We may collect the following types of information:
                            <ul className="list-disc pl-6 mt-2">
                              <li>
                                <span className="font-bold">Personal Data:</span>{" "}
                                Your name, email address, contact info, or
                                profile data provided during signup or
                                interactions.
                              </li>
                              <li>
                                <span className="font-bold">Usage Data:</span>{" "}
                                Your interactions with our platform, pages
                                visited, time spent, and activity logs.
                              </li>
                              <li>
                                <span className="font-bold">
                                  Device & Technical Data:
                                </span>{" "}
                                IP address, browser type, device identifiers,
                                cookies, and similar technologies.
                              </li>
                              <li>
                                <span className="font-bold">Feedback and Logs:</span>{" "}
                                Any feedback, comments, bug reports, or
                                interaction history submitted to us.
                              </li>
                            </ul>
                          </>
                        );

                      case "How We Use Information":
                        return (
                          <>
                            Your data helps us personalize your journaling
                            experience, offer mood insights, improve the
                            platform's performance, and communicate important
                            updates.
                            <ul className="list-disc pl-6 mt-2">
                              <li>
                                <span className="font-bold">Your Personal Information:</span>{" "}
                                Data that directly or indirectly identifies you.
                              </li>
                              <li>
                                <span className="font-bold">Other Information:</span>{" "}
                                Data related to use of Services, device details,
                                etc.
                              </li>
                            </ul>
                          </>
                        );

                      case "Sharing and Disclosure":
                        return (
                          <>
                            We do not sell or rent your data. Your data may be
                            shared only with trusted services required to
                            operate and improve SentiLog, and only when
                            necessary. Legal disclosure may apply if required by
                            law.
                          </>
                        );

                      case "Data of Minors":
                        return (
                          <>
                            Our Services are generally not directed to
                            individuals under 18 ("Minors"), and we do not
                            knowingly collect personal information from them.
                            <ul className="list-disc pl-6 mt-2 mb-2">
                              <li>You are the parent or legal guardian.</li>
                              <li>
                                You give explicit consent to collect and process
                                minor's data.
                              </li>
                            </ul>
                            If we learn such data was collected without proper
                            consent, we may delete it.
                          </>
                        );

                      case "Security":
                        return (
                          <>
                            We use reasonable measures to secure your data.
                            However, no internet-based service can be completely
                            secure, so protect your login credentials.
                          </>
                        );

                      case "Data Storage":
                        return (
                          <>
                            Your data may be stored on servers in India or on
                            third-party servers under contract (possibly outside
                            India).
                          </>
                        );

                      case "Cookies & Tracking":
                        return (
                          <>
                            At SentiLog, we use cookies and similar tracking
                            technologies to enhance your experience and analyze
                            usage. You can manage cookie preferences in your
                            browser. Disabling cookies may affect functionality.
                          </>
                        );

                      case "Changes to Policy":
                        return (
                          <>
                            We may update this policy periodically. Changes will
                            be posted with the new “Last Updated” date. Continued
                            use indicates your acceptance of the updated policy.
                          </>
                        );

                      case "Contact Us":
                        return (
                          <>
                            If you have questions, concerns, or data requests:
                            <br />
                            <a
                              href="mailto:sentilog@gmail.com"
                              className="text-purple-700 underline"
                            >
                              sentilog@gmail.com
                            </a>
                          </>
                        );

                      default:
                        return "";
                    }
                  })()}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default PrivacyPolicy;

