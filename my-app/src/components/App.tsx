import { useState } from 'react';
import '../styles/App.css';
import { LoginButton } from './LoginButton';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <p className="App-header">
        <h1 className="title">Mock</h1>
        <div className="button">
          <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </p>

      { isLoggedIn && <REPL /> }
    </div>
  );
}

export default App;