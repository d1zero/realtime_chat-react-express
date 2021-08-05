import { useState, useEffect } from "react";
import axios from "axios";

const LongPolling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/get-messages",
            );
            setMessages((prev) => [data, ...prev]);
            await subscribe();
        } catch (error) {
            setTimeout(() => {
                subscribe();
            }, 500);
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

export default LongPolling;
