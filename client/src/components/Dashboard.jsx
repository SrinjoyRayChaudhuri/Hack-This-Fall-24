import { Heart, Activity, ChevronRight } from 'lucide-react';
import Chatbot from './Chatbot';

const DashboardCard = ({ icon: Icon, title, description, link, color }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl ${color}`}>
      <Icon className="text-white" size={32} />
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>

    {/* Ensuring button alignment in the center */}
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex justify-center items-center px-6 py-3 ${color} text-white rounded-xl hover:opacity-90 transition-all duration-300 w-full`}
    >
      Click Here to Access
      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </a>

    <div className="mt-6 pt-4 border-t border-gray-100">
      <p className="text-sm italic text-gray-500 flex items-center justify-center">
        <span className="inline-block w-6 h-px bg-gray-300 mr-3"></span>
        Hope for the best
        <span className="inline-block w-6 h-px bg-gray-300 ml-3"></span>
      </p>
    </div>
  </div>
);

const StatCard = ({ value, label, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <p className={`text-4xl font-bold ${color} mb-2`}>{value}</p>
    <span className="text-gray-600 text-sm">{label}</span>
  </div>
);

const Dashboard = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 p-4 md:p-8 relative"
      style={{
        backgroundImage: `url('/dashboard.jpg')`, // Image from public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to make the background more soothing */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Disease Prediction Models
          </h1>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
            Advanced AI-powered health prediction models to help identify potential health risks early
          </p>
        </div>

        {/* Model Cards Section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <DashboardCard
            icon={Heart}
            title="Diabetes Prediction"
            description="Advanced AI model that analyzes various health metrics to predict diabetes risk with high accuracy. Get instant risk assessment and preventive recommendations."
            link={import.meta.env.VITE_DIABETES_PREDICTION_URL} // Using the environment variable
            color="bg-red-500"
          />
          <DashboardCard
            icon={Activity}
            title="Breast Cancer Prediction"
            description="State-of-the-art breast cancer risk assessment tool utilizing machine learning for early detection and prevention strategies."
            link={import.meta.env.VITE_BREAST_CANCER_PREDICTION_URL} 
            color="bg-pink-500"
          />
          <DashboardCard
            icon={Heart}
            title="Heart Disease Prediction"
            description="Comprehensive heart health analysis using multiple parameters to evaluate cardiovascular disease risk and provide actionable insights."
            link={import.meta.env.VITE_HEART_DISEASE_PREDICTION_URL} 
            color="bg-blue-500"
          />
        </div>

        {/* Chatbot Section */}
        <Chatbot />

        {/* Impact Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Impact</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard 
              value="90%-100%" 
              label="Prediction Accuracy"
              color="text-blue-600"
            />
            <StatCard 
              value="24/7" 
              label="Health Monitoring"
              color="text-green-600"
            />
            <StatCard 
              value="In Testing Mode" 
              label="Users Helped"
              color="text-yellow-900"
            />
            <StatCard 
              value="3+" 
              label="Disease Models"
              color="text-pink-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
