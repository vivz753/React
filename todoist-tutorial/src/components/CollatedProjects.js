import React, { useState } from 'react'; 
import { collatedTasks } from '../constants';
import { useSelectedProjectValue } from '../context';
import { FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar } from 'react-icons/fa';

export const CollatedProjects = (CollatedProjects) => {
  const [ active, setActive ] = useState('INBOX');
  const { setSelectedProject } = useSelectedProjectValue();

  return (
    <ul>
      {collatedTasks.map(task => {
        return (
        <li 
        key={task.key}
        data-testid={task.key}
        className={active === task.key ? 'active' : undefined}
        onClick={() => {
          setActive(task.key);
          setSelectedProject(task.key);
        }}>
          <span>
            {task.key === 'INBOX' && <FaInbox />}
            {task.key === 'TODAY' && <FaRegCalendar />}
            {task.key === 'NEXT_7' && <FaRegCalendarAlt />}
          </span>
          <span>
            {task.name}
          </span>
        </li>
        )
      })}
  </ul>
  )
}