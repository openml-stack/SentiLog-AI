import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {

    const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
        <Navbar />

        <div className="min-h-screen bg-white py-10 px-6 md:px-16 text-gray-800">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-purple-700 mb-6">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last updated: {today}</p>
                <p className="text-lg text-gray-800 mb-8">This privacy notice for <span className="font-bold text-purple-700">SentiLog-AI</span>  describes how and why we might collect, store, use, and/or share your information when you use our services.</p>

            <section className="space-y-6">

                <h2 className="text-2xl font-semibold text-purple-600">Questions or concerns?</h2>
                <p className="text-lg text-gray-800 mb-8">Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="sentilog@gmail.com">sentilog@gmail.com</a></p>
                <div>
                    <h2 className="text-2xl font-semibold text-purple-600">1. Information We Collect</h2>
                    <p>
                    We may collect personal details like your name, email, and usage data when you interact with the app.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-purple-600">2. How We Use Your Information</h2>
                    <p>
                    Data helps us personalize your experience, improve features, and send important updates.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-purple-600">3. Data Sharing</h2>
                    <p>
                    We do not sell or rent your data. Limited sharing may occur with trusted services to run the app.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-purple-600">4. Security</h2>
                    <p>
                    Your data is protected by standard measures, though no system is ever 100% secure online.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-purple-600">5. Changes</h2>
                    <p>
                    We may revise this policy and post the updated version here with a revised date.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-purple-600">6. Contact</h2>
                    <p>
                    Questions? Reach out at <a href="sentilog@gmail.com">sentilog@gmail.com</a>
                    </p>
                </div>
            </section>
            </div>
            <Footer />
        </div>

    </div>
    
  );
};

export default PrivacyPolicy;


