import React, { useState} from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../context';

import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeNull = true }) => {
  // const [ active, setActive ] = useState();
  // const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  
  return (
    projects &&
    projects.map(project => (
      // <li
      //     key={project.projectId}
      //     data-doc-id={project.docId}
      //     data-testid="project-action"
      //     className={
      //       active === project.projectId
      //       ? 'active sidebar__project'
      //       : 'sidebar__project'
      //     }
      //     onClick={() => {
      //       setActive(project.projectId);
      //       setSelectedProject(project.projectId);
      //     }}
      //   >
          <IndividualProject project={project} />
        // </li>
    ))
  )
}