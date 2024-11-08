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
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="logo flex items-center text-lg font-bold">
                            <img src="./logo.png" alt="" className="h-10 mr-2"/>
                            <span className="text-xl font-bold">HealthPredict</span>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="container mx-auto px-6 pt-20 pb-24">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 space-y-8">
                        <h1 className="text-5xl font-bold leading-tight">
                            Advanced Disease Prediction Using AI Technology
                        </h1>
                        <p className="text-xl text-gray-600">
                            Get early insights into potential health risks with our advanced AI-powered prediction system.
                            Make informed decisions about your health journey.
                        </p>
                        <div className="flex space-x-4">
                            <button onClick={handleGetStarted} className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center">
                                Get Started
                                <ChevronRight className="ml-2" size={20} />
                            </button>
                            <button
                                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
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

            
            <section className="container mx-auto px-6 py-20" id="how-to-use">
                <h2 className="text-3xl font-bold text-center mb-8">How to USE?</h2>
                <p className="text-xl text-center text-gray-600">
                    HealthPredict is a simple and easy-to-use platform that helps you predict diseases using your health data. Click Get Started and then predict your disease from the dashboard. After giving the required inputs, you will get the prediction results. Copy the results and come back to the dashboard and then open out chatbot and paste the results. The chatbot further assists you with diet, lifestyle changes and which type of doctor you should consult .
                </p>
            </section>

            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
                    <p className="mb-8 text-blue-100">Join many of users who trust HealthPredict for their health predictions.</p>
                    <button
                        onClick={openModal} 
                        className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Start Free Trial
                    </button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-6 py-20" id="faq-section">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-lg">
                        <button
                            className="w-full text-left p-4 font-semibold flex justify-between items-center"
                            onClick={() => toggleFAQ(0)}
                        >
                            <span>What diseases can I predict?</span>
                            {openFAQ === 0 ? <Minus /> : <Plus />}
                        </button>
                        {openFAQ === 0 && (
                            <div className="p-4 text-gray-600">
                                You can predict diseases like diabetes, breast cancer, and heart disease using our AI-powered models.
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-lg">
                        <button
                            className="w-full text-left p-4 font-semibold flex justify-between items-center"
                            onClick={() => toggleFAQ(1)}
                        >
                            <span>How accurate are the predictions?</span>
                            {openFAQ === 1 ? <Minus /> : <Plus />}
                        </button>
                        {openFAQ === 1 && (
                            <div className="p-4 text-gray-600">
                                Our predictions are based on advanced machine learning models that are constantly improving. Accuracy varies based on the input data.
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-lg">
                        <button
                            className="w-full text-left p-4 font-semibold flex justify-between items-center"
                            onClick={() => toggleFAQ(2)}
                        >
                            <span>Is my data secure?</span>
                            {openFAQ === 2 ? <Minus /> : <Plus />}
                        </button>
                        {openFAQ === 2 && (
                            <div className="p-4 text-gray-600">
                                Yes, we take your privacy seriously. Your data is encrypted and stored securely to ensure it remains confidential.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">For now We only support disease prediction. Would you like to try that?</h3>
                        <div className="flex justify-center space-x-4">
                            <button type='button'
                                onClick={handleGetStarted}
                                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                Yes, Start Prediction
                            </button>
                            <button
                                onClick={closeModal}
                                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
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
                                <Heart className="text-blue-400" />
                                <span className="text-xl font-bold text-white">HealthPredict</span>
                            </div>
                            <p className="text-sm">Advanced disease prediction platform powered by AI</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
