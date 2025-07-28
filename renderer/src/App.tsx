import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import electronLogo from "/electron-seeklogo.svg";
import "./App.css";
import { Button } from "./components";
import { useLocalStorage, useToggle } from "./hooks";

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [showFeatures, toggleFeatures] = useToggle(false);

  const handleElectronTest = async () => {
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.ping();
        alert(`Electron API Response: ${result}`);
      } else {
        alert("Electron API not available (running in browser)");
      }
    } catch (error) {
      console.error("Error calling Electron API:", error);
      alert("Error calling Electron API");
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <div className="logos">
          <a
            href="https://electronjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={electronLogo} className="logo electron" alt="Electron logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
        <h1>Electron + React + Vite Template</h1>
        <p className="subtitle">
          A modern starter template for desktop applications
        </p>
      </div>

      <div className="content">
        <div className="card">
          <h2>🚀 Quick Start</h2>
          <div className="button-group">
            <Button onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </Button>
            <Button variant="secondary" onClick={handleElectronTest}>
              Test Electron API
            </Button>
            <Button
              variant={darkMode ? "danger" : "primary"}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"} Mode
            </Button>
          </div>
        </div>

        <div className="card">
          <h2>📦 Template Features</h2>
          <Button onClick={toggleFeatures} variant="secondary">
            {showFeatures ? "Hide" : "Show"} Features
          </Button>

          {showFeatures && (
            <div className="features">
              <div className="feature-grid">
                <div className="feature">
                  <h3>⚡ Vite</h3>
                  <p>Lightning fast development with HMR</p>
                </div>
                <div className="feature">
                  <h3>⚛️ React 19</h3>
                  <p>Latest React with modern hooks</p>
                </div>
                <div className="feature">
                  <h3>🔷 TypeScript</h3>
                  <p>Full type safety and IntelliSense</p>
                </div>
                <div className="feature">
                  <h3>🖥️ Electron</h3>
                  <p>Cross-platform desktop applications</p>
                </div>
                <div className="feature">
                  <h3>🔧 ESLint</h3>
                  <p>Code linting and formatting</p>
                </div>
                <div className="feature">
                  <h3>📦 Easy Build</h3>
                  <p>One-command packaging for all platforms</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2>🛠️ Next Steps</h2>
          <ol className="next-steps">
            <li>
              Edit <code>src/App.tsx</code> to start building your app
            </li>
            <li>
              Add new components in <code>src/components/</code>
            </li>
            <li>
              Implement Electron features in <code>electron/main.js</code>
            </li>
            <li>
              Add IPC communication in <code>electron/preload.js</code>
            </li>
            <li>
              Build and package with <code>npm run package</code>
            </li>
          </ol>
        </div>
      </div>

      <footer className="footer">
        <p>
          Built with ❤️ using{" "}
          <a
            href="https://electronjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Electron
          </a>
          {", "}
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            React
          </a>
          {", and "}
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            Vite
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
