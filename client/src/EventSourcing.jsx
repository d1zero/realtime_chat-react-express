import { useState, useEffect } from "react";
import axios from "axios";

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        const eventSource = new EventSource("http://localhost:5000/connect")
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
    };

    const sendMessage = async () => {
        await axios.post("http://localhost:5000/new-message", {
            message: value,
            id: Date.now(),
        });
    };

    return (
        <div>
            <div className="form">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div className="messages">
                {messages.map((msg) => {
                    return (
                        <div className="message" key={msg.id}>
                            {msg.message}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventSourcing;
