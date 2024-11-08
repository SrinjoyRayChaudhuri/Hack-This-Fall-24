import { Heart, ChevronRight, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);

    const handleGetStarted = () => {
        navigate('/dashboard');
        if (isModalOpen) {
            setIsModalOpen(false);
        }
    };

    const scrollToSection = () => {
        const element = document.getElementById("how-to-use");
        element.scrollIntoView({ behavior: 'smooth' });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 via-teal-200 to-green-200">
            {/* Header */}
            <header className="bg-white shadow-lg shadow-gray-300">
                <nav className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="logo flex items-center text-lg font-semibold text-gray-700">
                            <img src="./logo.png" alt="" className="h-8 md:h-10 mr-2" />
                            <span className="text-2xl md:text-3xl font-bold text-teal-500">HealthPredict</span>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-24 pb-28">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
                            Advanced Disease Prediction with AI Technology
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            Discover health risks early with AI-powered predictions. Stay proactive about your health journey.
                        </p>
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                            <button
                                onClick={handleGetStarted}
                                className="bg-teal-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-300 flex items-center"
                            >
                                Get Started
                                <ChevronRight className="ml-2" size={20} />
                            </button>
                            <button
                                className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full shadow-lg hover:bg-teal-50 transform hover:scale-105 transition-all duration-300"
                                onClick={scrollToSection}
                            >
                                How to Use?
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
                        <div className="relative overflow-hidden rounded-xl shadow-2xl">
                            <img
                                className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-300"
                                loading="lazy"
                                src="./image.png"
                                alt="Healthcare Image"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    console.error('Image failed to load');
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="container mx-auto px-6 py-24 bg-white rounded-lg shadow-lg shadow-teal-200" id="how-to-use">
                <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">How to USE?</h2>
                <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto">
                    HealthPredict is a simple and easy-to-use platform that helps you predict diseases using your health data.
                    Click Get Started and then predict your disease from the dashboard. After giving the required inputs, you will get the prediction results. Copy the results and come back to the dashboard, then open our chatbot and paste the results. The chatbot further assists you with diet, lifestyle changes, and which type of doctor you should consult.
                </p>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Take Control of Your Health Today!</h2>
                    <p className="text-lg mb-6">Join thousands who trust HealthPredict for their disease prediction needs.</p>
                    <button
                        onClick={openModal}
                        className="bg-white text-teal-600 px-8 py-4 rounded-full hover:bg-teal-50 transition-colors"
                    >
                        Start Free Trial
                    </button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-6 py-24" id="faq-section">
                <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {[
                        { question: "What diseases can I predict?", answer: "You can predict diseases like diabetes, breast cancer, and heart disease using our AI models." },
                        { question: "How accurate are the predictions?", answer: "Our predictions are based on advanced machine learning models. Accuracy improves with data." },
                        { question: "Is my data secure?", answer: "We prioritize your privacy. Your data is encrypted and stored securely." },
                    ].map((faq, index) => (
                        <div className="bg-white rounded-lg shadow-xl" key={index}>
                            <button
                                className="w-full text-left p-6 font-semibold text-teal-600 flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                {openFAQ === index ? <Minus /> : <Plus />}
                            </button>
                            {openFAQ === index && (
                                <div className="p-6 text-gray-600">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-6">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-800">We currently only support disease prediction. Would you like to try it?</h3>
                        <div className="flex justify-center space-x-6">
                            <button
                                onClick={handleGetStarted}
                                className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors"
                            >
                                Yes, Start Prediction
                            </button>
                            <button
                                onClick={closeModal}
                                className="border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-full hover:bg-teal-50 transition-colors"
                            >
                                No, Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-8 md:mb-0">
                            <div className="flex items-center space-x-2 mb-4">
                                <Heart className="text-teal-400" />
                                <span className="text-xl font-bold text-white">HealthPredict</span>
                            </div>
                            <p className="text-sm text-teal-200">AI-powered disease prediction platform</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-white font-semibold mb-4">Product</h3>
                                <ul className="space-y-2 text-sm text-teal-200">
                                    <li>Features</li>
                                    <li>Pricing</li>
                                    <li>Blog</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Company</h3>
                                <ul className="space-y-2 text-sm text-teal-200">
                                    <li>About</li>
                                    <li>Careers</li>
                                    <li>Privacy Policy</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Support</h3>
                                <ul className="space-y-2 text-sm text-teal-200">
                                    <li>FAQ</li>
                                    <li>Help Center</li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
