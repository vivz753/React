import React from 'react';
import { useProjectsValue } from '../context';

export const ProjectOverlay = ({
  setProject,
  // setSelectedProject, 
  showProjectOverlay, 
  setShowProjectOverlay
}) => {
  const { projects } = useProjectsValue();

  return (
    projects && showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map(project => (
            <li
              key={project.projectId}
              data-testid="project-overlay-action"
              aria-label={`Selecting project ${project.name} to add task`}
              tabIndex={0}
              onClick={() => {
                setProject(project.projectId);
                setShowProjectOverlay(false);
              }}
              onKeyDown={() => {
                setProject(project.projectId);
                setShowProjectOverlay(false);
              }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    )
  )
}