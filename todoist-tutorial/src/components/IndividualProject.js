import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { firebase } from '../firebase';

export const IndividualProject = ({project}) => {
  const [ active, setActive ] = useState();
  const [ showConfirm, setShowConfirm ] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(()=> {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      })
  };

  return (
    <li
      key={project.projectId}
      data-doc-id={project.docId}
      data-testid="project-action"
      className={
        active === project.projectId
        ? 'active sidebar__project'
        : 'sidebar__project'
      }
      onClick={() => {
        setActive(project.projectId);
        setSelectedProject(project.projectId);
      }}
    >
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span 
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </div>
        )}
      </span>
    </li>
  )
}