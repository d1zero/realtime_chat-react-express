import { useState, useRef } from "react";
import styled from "styled-components";

const Form = styled.div`
    display: flex;
    flex-direction: column;
    border: 3px solid #00ADB5;
    padding: 5px 10px;
    border-radius: 8px;
`;

const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");

    function connect() {
        socket.current = new WebSocket("ws://localhost:5000");

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: "connection",
                username,
                id: Date.now(),
            };
            socket.current.send(JSON.stringify(message));
        };

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev) => [message, ...prev]);
        };

        socket.current.onclose = () => {
            console.log("Socket закрыт");
        };

        socket.current.onerror = () => {
            console.log("Socket произошла ошибка");
        };
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: "message",
        };
        socket.current.send(JSON.stringify(message));
    };

    if (!connected) {
        return (
            <Form>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Введите имя"
                />
                <br />
                <button onClick={connect}>Войти</button>
            </Form>
        );
    }

    return (
        <div>
            <Form>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                />
                <br />
                <button onClick={sendMessage}>Send</button>
            </Form>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id}>
                        {msg.event === "connection" ? (
                            <div style={{ color: "red" }}>
                                Пользователь {msg.username} подключился
                            </div>
                        ) : (
                            <div>
                                {msg.username}: {msg.message}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WebSock;
