import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import {firebase} from '../firebase';

export const Tasks = () => {
  const { projects, setProjects } = useProjectsValue();
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const { tasks, archivedTasks } = useTasks(selectedProject);
  
  let projectName = '';

  // if the project is not inbox, today, or next 7 days, search through projects list
  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }
  // else search through collated tasks list
  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`
  })

  let tasksToDisplay = []
  selectedProject === 'ARCHIVED' ? tasksToDisplay = archivedTasks : tasksToDisplay = tasks;

  const fbTasks = firebase.firestore().collection('tasks')
  const fbTasksArchived = fbTasks.where('archived', '==', true)

  const restoreAllArchivedTasks = () => {
    fbTasksArchived.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          archived: false
        });
      })
    })
  };

  const deleteAllArchivedTasks = () => {
    fbTasksArchived.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })
  };


  return (
    <div className="tasks" data-testid="tasks">
      <div className="heading">
        <h2 data-testid="project-name">
        {projectName}
        </h2>
        {selectedProject === 'ARCHIVED' &&
          (
            <div className="archived-icons">
              <ul>
                <li
                  onClick={() => restoreAllArchivedTasks()}
                  >
                  <FaTrashRestore /> 
                </li>
                <li
                  onClick={() => deleteAllArchivedTasks()}
                  >
                  <FaTrashAlt />
                </li>
            </ul>
          </div>
          )
        }
      </div>
      <ul className="tasks__list">
        {        
          tasksToDisplay.map(task=> (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskName={task.taskName} archived={selectedProject==='ARCHIVED'}/>
            <span>{task.taskName}</span>
          </li>
        ))}
      </ul>
      <AddTask 
        showAddTaskMain={true}
      />
    </div>
  )
}