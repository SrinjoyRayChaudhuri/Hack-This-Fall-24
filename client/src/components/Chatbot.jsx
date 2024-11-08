import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../Chatbot.css';


const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'bot', content: "Hi there 👋<br />Please Paste the OUTPUT of the model for further assistance." }
    ]);
    const [isVisible, setIsVisible] = useState(false); 
    const chatInputRef = useRef(null);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && window.innerWidth > 800) {
            event.preventDefault();
            handleChat();
        }
    };

    const handleChat = async () => {
        const message = userMessage.trim();
        if (!message) return;

        
        setChatMessages(prevMessages => [
            ...prevMessages,
            { role: 'user', content: message }
        ]);

        setUserMessage('');
        chatInputRef.current.style.height = 'auto';

        
        const response = await fetchResponseFromAPI(message);

        
        setChatMessages(prevMessages => [
            ...prevMessages,
            { role: 'bot', content: response }
        ]);
    };

    const fetchResponseFromAPI = async (message) => {
        const userprompt = message;
        const prompt = `YOU PROVIDE GUIDANCE ON HEALTH AND LIFESTYLE AND DIET PLAN FOR DISEASE MANAGEMENT. BASE YOUR RECOMMENDATIONS ON COMMON HEALTH CONDITIONS LIKE DIABETES, HEART DISEASE, AND BREAST CANCER. PROVIDE CRISP, EASY-TO-UNDERSTAND ANSWERS SPECIFIC TO AN INDIAN CONTEXT. DO NOT INCLUDE SPECIAL SYMBOLS LIKE '*'. ORGANIZE ANSWERS IN A NUMBERED LIST. FOR A DIAGNOSIS OF ${userprompt}, PROVIDE:
        1. THE TYPE OF DOCTOR TO CONSULT
        2. WHETHER URGENT MEDICAL ATTENTION IS REQUIRED
        3. A BRIEF DIETARY AND LIFESTYLE PLAN`;
        console.log(prompt);
        const result = await genAI.getGenerativeModel({ model: "gemini-pro" }).generateContent(prompt);
        console.log(result);
        
        const botResponse = result.response.text() ?? 'Sorry, I could not understand that.';
        console.log(botResponse);
        const sanitizedResponse = botResponse.replace(/\*\*/g, '');
        console.log(sanitizedResponse);

        return sanitizedResponse;

    };

    const handleClose = () => {
        setIsVisible(false); 
    };

    const handleOpen = () => {
        setIsVisible(true); 
    };

    return (
        <>
            {isVisible ? (
                <div className="chatbot">
                    <header>
                        <h2>Chatbot</h2>
                        <img src= "./src/assets/close_circle.svg" className='max-w-10 cursor-pointer' onClick={handleClose} />
                    </header>
                    <ul className="chatbox">
                        {chatMessages.map((message, index) => (
                            <li key={index} className={`chat ${message.role}`}>
                                {message.role === 'bot'}
                                <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
                            </li>
                        ))}
                    </ul>
                    <div className="chat-input text-black">
                        <textarea
                            placeholder="Enter a message..."
                            spellCheck="false"
                            required
                            value={userMessage}
                            onChange={handleInputChange}
                            ref={chatInputRef}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>Send</span>
                    </div>
                </div>
            ) : (
                <div className="open-button z-[1000]" onClick={handleOpen}>
                    <span className="material-symbols-outlined">chat</span>
                </div>
            )}
        </>
    );
};

export default Chatbot;