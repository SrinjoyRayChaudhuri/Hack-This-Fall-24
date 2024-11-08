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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <header className="bg-white shadow-sm">
                <nav className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="logo flex items-center text-lg font-bold">
                            <img src="./logo.png" alt="" className="h-8 md:h-10 mr-2" />
                            <span className="text-lg md:text-xl font-bold">HealthPredict</span>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="container mx-auto px-4 md:px-6 pt-20 pb-24">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Advanced Disease Prediction Using AI Technology
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            Get early insights into potential health risks with our advanced AI-powered prediction system.
                            Make informed decisions about your health journey.
                        </p>
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                            <button
                                onClick={handleGetStarted}
                                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center"
                            >
                                Get Started
                                <ChevronRight className="ml-2" size={20} />
                            </button>
                            <button
                                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                                onClick={scrollToSection}
                            >
                                How to Use?
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
                        <div className="relative overflow-hidden rounded-xl shadow-lg">
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

            <section className="container mx-auto px-4 md:px-6 py-20" id="how-to-use">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">How to USE?</h2>
                <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto">
                    HealthPredict is a simple and easy-to-use platform that helps you predict diseases using your health data.
                    Click Get Started and then predict your disease from the dashboard. After giving the required inputs, you will get the prediction results. Copy the results and come back to the dashboard, then open our chatbot and paste the results. The chatbot further assists you with diet, lifestyle changes, and which type of doctor you should consult.
                </p>
            </section>

            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
                    <p className="mb-6 md:mb-8 text-blue-100">Join many users who trust HealthPredict for their health predictions.</p>
                    <button
                        onClick={openModal}
                        className="bg-white text-blue-600 px-6 md:px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Start Free Trial
                    </button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 md:px-6 py-20" id="faq-section">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        { question: "What diseases can I predict?", answer: "You can predict diseases like diabetes, breast cancer, and heart disease using our AI-powered models." },
                        { question: "How accurate are the predictions?", answer: "Our predictions are based on advanced machine learning models that are constantly improving. Accuracy varies based on the input data." },
                        { question: "Is my data secure?", answer: "Yes, we take your privacy seriously. Your data is encrypted and stored securely to ensure it remains confidential." },
                    ].map((faq, index) => (
                        <div className="bg-white rounded-lg shadow-lg" key={index}>
                            <button
                                className="w-full text-left p-4 font-semibold flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                {openFAQ === index ? <Minus /> : <Plus />}
                            </button>
                            {openFAQ === index && (
                                <div className="p-4 text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg md:text-xl font-semibold mb-4">For now, we only support disease prediction. Would you like to try that?</h3>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleGetStarted}
                                className="bg-blue-600 text-white px-4 md:px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                Yes, Start Prediction
                            </button>
                            <button
                                onClick={closeModal}
                                className="border-2 border-blue-600 text-blue-600 px-4 md:px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                            >
                                No, Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-8 md:mb-0">
                            <div className="flex items-center space-x-2 mb-4">
                                <Heart className="text-blue-400" />
                                <span className="text-lg md:text-xl font-bold text-white">HealthPredict</span>
                            </div>
                            <p className="text-sm">Advanced disease prediction platform powered by AI</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                            <div>
                                <h3 className="text-white font-semibold mb-4">Product</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>Features</li>
                                    <li>Pricing</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Company</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>About</li>
                                    <li>Careers</li>
                                    <li>Privacy Policy</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Support</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>FAQ</li>
                                    <li>Help Center</li>
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

