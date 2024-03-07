import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';
import {Printable} from '../components/utility/Printable';

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {

  //state variable to store and update history
  const [history, setHistory] = useState<string[]>([]);

  //state variable to store and update the output mode
  const [outputMode, setOutputMode] = useState<string>('brief');

  //state variable to store and update the command output
  const [commandOutput, setCommandOutput] = useState<Printable<any>[]>([]);


  return (
    <div className="repl">  
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory history={history} outputMode={outputMode} commandOutput={commandOutput}/>
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} outputMode={outputMode} 
      setOutputMode={setOutputMode} commandOutput={commandOutput} setCommandOutput={setCommandOutput}/>
    </div>
  );
}
