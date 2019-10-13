import React from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context'

export const IndividualProject = ({project}) => {
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();

  return (
    <li
      key={project.projectId}
      data-doc-id={project.docId}
      data-testid="project-action"
      className={
        selectedProject === project.docId
        ? 'active sidebar__project'
        : 'sidebar__project'
      }

    >
      <div
        role="button"
        aria-label={`Selecting project ${project.name}`}
        tabIndex={2}
        onClick={() => {
          setSelectedProject(project.docId);

        }}
        onKeyDown={() => {
          setSelectedProject(project.projectId);
        }}
      >
          
        <span className="sidebar__dot">•</span>
        <span className="sidebar__project-name">{project.name}</span>
      </div>
    </li>
  )
}