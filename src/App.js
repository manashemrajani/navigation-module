import './App.css';
import InfoComponent from './components/InfoComponent';

function App() {
  return (
    <div className="App">
        <InfoComponent />
        <br />
        Current Navigation Stack :: <span id="stack-viewer" />
        <div id="current-route" />
    </div>
  );
}

export default App;
