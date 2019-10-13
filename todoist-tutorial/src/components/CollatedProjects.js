import React, { useState } from 'react'; 
import { collatedTasks } from '../constants';
import { useSelectedProjectValue } from '../context';
import { 
  FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar,
  FaArchive
 } from 'react-icons/fa';

export const CollatedProjects = (CollatedProjects) => {
  const [ active, setActive ] = useState('INBOX');
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();

  return (
    <ul>
      {collatedTasks.map(task => {
        return (
        <li
        aria-label={`Show ${task.key} tasks`} 
        key={task.key}
        data-testid={task.key}
        className={selectedProject === task.key ? 'active' : undefined}
        onClick={() => {
          // setActive(task.key);
          setSelectedProject(task.key);
        }}
        onKeyDown={() => {
          // setActive(task.key);
          setSelectedProject(task.key);
        }}
        tabIndex={1}
        >
          <span>
            {task.key === 'INBOX' && <FaInbox />}
            {task.key === 'TODAY' && <FaRegCalendar />}
            {task.key === 'NEXT_7' && <FaRegCalendarAlt />}
            {task.key === 'ARCHIVED' && <FaArchive />}
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