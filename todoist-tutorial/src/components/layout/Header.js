import React, { useState } from 'react';
import {FaPizzaSlice} from 'react-icons/fa';
import { AddTask } from '../AddTask';

export const Header = ({darkMode, setDarkMode}) => {
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

 return (
  <header className="header" data-testid="header">
    <nav>
      <div className="logo">
        <img src="/images/logo.png" alt="Todoist"/>
      </div>
      <div className="settings">
        <ul>
          <li 
            data-testid="quick-add-task-action" 
            className="settings__add"
          >
            <div
              aria-label="Quick add task"
              tabIndex={0}
              onClick={()=> {
                setShowQuickAddTask(true); 
              }}
              onKeyDown={()=> {
                setShowQuickAddTask(true); 
              }}
            >
              +
            </div>
          </li>
          <li 
            data-testid="dark-mode-action" 
            className="settings__darkmode"
          >
            <div
              aria-label="Darkmode on/off"
              tabIndex={0}
              onClick={()=> {
                setDarkMode(!darkMode)}}
              onKeyDown={()=> {
                setDarkMode(!darkMode)}}
            >
              <FaPizzaSlice/>

            </div>
          </li>
        </ul>
      </div>
    </nav>
    <AddTask
      showQuickAddTask={showQuickAddTask}
      setShowQuickAddTask={setShowQuickAddTask}
    />
   </header>
 ) 
}

