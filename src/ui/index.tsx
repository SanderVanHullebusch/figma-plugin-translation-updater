import React, {useRef} from 'react'
import ReactDOM from 'react-dom/client'
import {readFileAsText} from "./utils";
import {postPluginMessage} from "./utils/figma.util";

const App = () => {
    const ref = useRef<HTMLInputElement | null>(null);

    const onCreateRectangleClick = (amount: number) => {
        postPluginMessage({ type: 'create-rectangles', payload: { amount } });
    };

    const onGetNodesClick = () => {
        postPluginMessage({ type: 'get-nodes', payload: undefined });
    };

    const handleFileRead = async () => {
        const file = ref.current?.files?.[0];

        if (!file) {
            return;
        }

        const fileContent = await readFileAsText({ file });
        console.log(fileContent);
    };

    return (
        <>
            <input
                ref={ref}
                type="file"
                accept=".json,application/json"
                multiple={false}
                onChange={handleFileRead}
            />
            <button onClick={handleFileRead}>Read file</button>
            <button onClick={() => onCreateRectangleClick(3)}>
                Create rectangle
            </button>
            <button onClick={() => onGetNodesClick()}>Get nodes</button>
        </>
    );
};

try {
    const container = document.getElementById('root');
    if (container) ReactDOM.createRoot(container).render(<App />);
    else console.error('Root element not found');
} catch (e) {
    console.error('React mount error:', e);
}
