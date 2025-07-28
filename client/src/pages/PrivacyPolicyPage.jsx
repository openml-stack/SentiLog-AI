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
  "Contact Us"
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
      window.scrollTo({ top: ref.offsetTop - 60, behavior: "smooth" });
    }
  };


  return (
    <div>
       
  
            <div className="flex flex-col md:flex-row min-h-screen text-gray-800 dark:text-gray-200">
                {/* Sidebar */}
                    <aside className="w-[250px] bg-gray-100 dark:bg-gray-900 border-r dark:border-gray-700 p-4 fixed top-15 left-0 h-screen w-64 text-gray-800 dark:text-gray-200">
                        <ul className="space-y-2 text-sm">
                            {sections.map((section, index) => (
                                <li
                                key={section}
                                className={`cursor-pointer transition-colors duration-200 ${
                                    activeSection === section ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"
                                }`}
                                onClick={() => scrollToSection(index)}
                                >
                                {section}
                                </li>
                            ))}
                        </ul>
                    </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-auto ml-64">
                    <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                    <p className="text-gray-600 dark:text-gray-500 italic mb-4">Last updated on {today}</p>

                    <section className="space-y-8">
                    {sections.map((title, index) => (
                        <div key={title} ref={(el) => (sectionRefs.current[index] = el)}>
                        <h2 className="text-xl font-semibold">{index + 1}. {title}</h2>
                        <p className="mt-2">
                            {(() => {

                  switch (title) {
                    case "Applicability and Scope":
                      return (<p className="mt-2 text-gray-800 dark:text-gray-200 ">This Privacy Policy applies to the personal data collected by <span className="font-bold text-purple-700">SentiLog AI</span> (“SentiLog”, “we”, “our”, or “us”) when you access or use our website, products, services, and any other features we provide (collectively, the “Services”).By using our Services, you agree to the collection and use of information in accordance with this policy.</p>)

                    case "Information We Collect":
                      return (
                       <p className="mt-2 text-gray-800 dark:text-gray-200 ">We may collect the following types of information:
                            <ul className="list-disc pl-6 mt-2">
                                <li><span className="font-bold">Personal Data:</span> Your name, email address, contact info, or profile data provided during signup or interactions.</li>
                                <li><span className="font-bold">Usage Data:</span> Your interactions with our platform, pages visited, time spent, and activity logs.</li>
                                <li><span className="font-bold">Device & Technical Data:</span> IP address, browser type, device identifiers, cookies, and similar technologies.</li>
                                <li><span className="font-bold">Feedback and Logs:</span> Any feedback, comments, bug reports, or interaction history submitted to us.</li>
                            </ul>
                        </p>
                      );
                      
                    case "How We Use Information":
                      return (<p className="mt-2 text-gray-800 dark:text-gray-200 "> Your data helps us personalize your journaling experience, offer mood insights,
                        improve the platform's performance, and communicate important updates.
                            <ul className="list-disc pl-6 mt-2">
                                <li><span className="font-bold">Your Personal Information:</span> Information that relates to an identified or identifiable individual. This may include data you provide directly, data generated through your use of the Services, or data obtained from third parties, which, either alone or in combination with other information we possess or are likely to access, can identify you. Examples are further detailed throughout this policy.</li>
                                <li><span className="font-bold">Other Information:</span>Data related to your use of the Services that may not directly identify you by itself but is collected in connection with your account or activities. This includes, but is not limited to, information about your internet connection, the specific device(s) and equipment you use to access our Services, and details about your usage patterns and interactions with the Services.</li>
                            </ul>
                        </p>);

                    case "Sharing and Disclosure":
                      return ( <p className="mt-2 text-gray-800 dark:text-gray-200 ">  We do not sell or rent your data. Your data may be shared only with trusted
                        services required to operate and improve SentiLog, and only when necessary.
                        Legal disclosure may apply if required by law.
                        </p>);

                    case "Data of Minors":
                      return(<p className="mt-2 text-gray-800 dark:text-gray-200 "> Our Services are generally not directed to or intended for use by individuals under the age of <span className="font-bold text-purple-700">18 ("Minors")</span>, and we do not knowingly collect personal information from Minors for the purposes of creating an account or for general use of our platform. However, we recognize that certain services offered through our platform may be open to use by Minors. By providing personal information of a Minor, you, the adult user, represent and warrant that:
                            <ul className="list-disc pl-6 mt-2 mb-2">
                                <li>You are the parent or legal guardian of the Minor; and</li>
                                <li>You give your explicit consent for Eternal to collect and process the Minor's information for the specific and limited purpose disclosed at the time of collection.</li>
                            </ul>
                        The information collected will be used solely to facilitate the requested service and will not be used to create a user profile for the Minor or for any marketing, profiling, or other secondary purposes. You are responsible for any information you provide about a Minor. If we become aware that personal information of a Minor has been provided without the requisite and valid parental or guardian consent, we reserve the right to delete such information immediately.
                        </p>);

                    case "Security":
                      return ( <p>We use reasonable measures to secure your data. However, no internet-based
                        service can be completely secure, and users should take care to protect their
                        login credentials.
                        </p>);

                    case "Data Storage":
                        return ( <p>We may process and retain your personal information on its servers in India where its data centers are located, and/or on the servers of its third parties (in or outside India), having contractual relationships with us.</p>);

                    case "Cookies & Tracking":
                      return(<p>At Sentilog, we use cookies and similar tracking technologies to enhance your experience, improve our services, and better understand user behavior. These technologies help us remember your preferences, enable core functionalities such as login and theme settings, and analyze traffic patterns to optimize performance.<p/>
                      <br/>

You can choose to accept or decline cookies through your browser settings. Please note that disabling cookies may impact the functionality and performance of certain features within the app. By using Sentilog, you consent to the use of cookies as described in this section, unless you adjust your browser settings to refuse them.
                        </p>);

                    case "Changes to Policy":
                      return ( <p>We may revise or update this Privacy Policy periodically to reflect changes in legal requirements, our data handling practices, or the features of our platform. When we make changes, we will update the “Last Updated” date at the top of this page and provide appropriate notice where required.<p/>
                        <br/>

We encourage you to review this Privacy Policy regularly to stay informed about how we protect your data and your rights as a user. Continued use of Sentilog after any changes indicates your acceptance of the updated policy.

                        </p>);

                    case "Contact Us":
                      return (
                        <p>  If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please don’t hesitate to reach out. We are committed to addressing your concerns and assisting you with any privacy-related issues.<p/>
                        <br/>    You can contact us at:
              <br />
              <a
                href="mailto:sentilog@gmail.com"
                className="text-purple-700 underline"
              >
                sentilog@gmail.com
              </a></p>
                      );
                    default:
                      return "";
                  }
                })()}
              </p>
            </div>
          ))}
        </section>
            </main>
            </div>
            <Footer/>
    </div>

    
  );
};

export default PrivacyPolicy;


