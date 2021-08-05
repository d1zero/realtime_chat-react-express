import styled from "styled-components";
import WebSock from "./WebSocket";


const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`

function App() {
    return (
        <AppWrapper>
            <WebSock />
        </AppWrapper>
    );
}

export default App;
