import React, { useState } from 'react';
import { 
  FaChevronDown, 
  FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar } from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context/index';
import { Projects } from '../Projects';
import { CollatedProjects } from '../CollatedProjects';

export const Sidebar = () => {
  // const { setSelectedProject } = useSelectedProjectValue();
  // const [ active, setActive ] = useState('INBOX');
  const [ showProjects, setShowProjects ] = useState(true)

  return (
    <div className="sidebar" data-testid="sidebar">
      <div className="sidebar__generic">
        <CollatedProjects />
      </div>
      <div className="sidebar__middle">
        <span><FaChevronDown /></span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjects && <Projects />}
      </ul>
      {/* {showProjects && <AddProjects />} */}
    </div>
  )
}