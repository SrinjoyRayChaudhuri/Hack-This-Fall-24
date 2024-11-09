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


        const prompt = `
            You provide guidance on health, lifestyle, and diet for disease management based on common conditions like diabetes, heart disease, and breast cancer. Recommendations should be clear, concise, and tailored to an Indian context. Use numbered lists with HTML formatting, like <ol><li></li></ol>, to format response points and avoid special symbols like '*'.

            If there is a confirmed diagnosis of ${userprompt}, please provide:
            <ol>
                <li>The type of doctor to consult</li>
                <li>Whether urgent medical attention is required</li>
                <li>A brief dietary and lifestyle plan</li>
            </ol>

            If no diagnosis of ${userprompt} is indicated, respond with:
            "No medical consultation or lifestyle adjustments are necessary at this time. Maintain a healthy diet, regular exercise, and routine check-ups for general wellness. Please consult a doctor if any symptoms arise."

            For high-risk indications of ${userprompt}, suggest consulting a doctor for further assessment and guidance.

            If ${userprompt} is anything other than the above, please provide general health advice and lifestyle recommendations, handling the request according to the situation.

            If ${userprompt} is a greeting like "Hi" or "Hello," please respond with a greeting and ask how you can help.

            If ${userprompt} is any form of gratitude like "Thank you" or "Thanks," please respond with a polite response such as "You're welcome!" or "I'm happy to help!".
        `;


        const result = await genAI.getGenerativeModel({ model: "gemini-pro" }).generateContent(prompt);


        const botResponse = result.response.text() ?? 'Sorry, I could not understand that.';

        const sanitizedResponse = botResponse.replace(/\*\*/g, '');


        const formattedResponse = sanitizedResponse
            .replace(/(\d+\.)\s+/g, '<li>')
            .replace(/Diet:/g, '<h4>Diet:</h4>')
            .replace(/Lifestyle:/g, '<h4>Lifestyle:</h4>')
            .replace(/Medications:/g, '<h4>Medications:</h4>')
            .replace(/\n/g, '<br/>')
            .replace(/<\/li>\s*<li>/g, '</li><li>')
            .replace(/<li>([^<]*)$/, '<li>$1</li>')
            .replace(/<li>/g, '<ol><li>')
            .replace(/<\/li>(?!<\/ol>)/g, '</li>')
            .replace(/<\/ol>\s*<ol>/g, '')
            .replace(/<br\/>\s*<br\/>/g, '<br/><br/>')
            .replace(/<ol><li>/, '<ol><li>')
            .replace(/<\/li><\/ol>/, '</li></ol>');

        return `<div>${formattedResponse}</div>`;


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
                        <h2>Chatbot(Only for Medical issue purpose)</h2>
                        <img src="./src/assets/close_circle.svg" className='max-w-10 cursor-pointer' onClick={handleClose} />
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