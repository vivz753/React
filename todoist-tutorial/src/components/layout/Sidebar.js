import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context/index';
import { Projects } from '../Projects';
import { CollatedProjects } from '../CollatedProjects';
import { AddProject } from '../AddProject';

export const Sidebar = () => {
  const [ showProjects, setShowProjects ] = useState(true)

  return (
    <div className="sidebar" data-testid="sidebar">
      <div className="sidebar__generic">
        <CollatedProjects />
      </div>
      <div 
        aria-label="Show/hide projects"
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown
            className={showProjects ? undefined : 'hidden-projects'}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjects && <Projects />}
      </ul>
      {showProjects && <AddProject />}
    </div>
  )
}