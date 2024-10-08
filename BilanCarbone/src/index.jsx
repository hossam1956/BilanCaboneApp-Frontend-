import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <App />
);

reportWebVitals();
