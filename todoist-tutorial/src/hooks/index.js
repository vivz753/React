import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

const fbTasks = firebase.firestore().collection('tasks')
const fbProjects = firebase.firestore().collection('projects')

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let userTasks = fbTasks
      // .where('userId', '==', 'TrxBQ6dw2i93VzUVUtnY');

    // get the firebase tasks where project is the selected project
    // if selected project is today, get the tasks where date is today
    // if selected project is inbox, get the tasks where there is no date
    // otherwise get all the tasks
    userTasks = 
      selectedProject && !collatedTasksExist(selectedProject) ?
      (userTasks = userTasks.where('projectId', '==', selectedProject))
      : selectedProject === 'TODAY'
      ? (userTasks = userTasks.where('date', '==', moment().format('DD/MM/YYYY')))
      : selectedProject === 'INBOX'
      ? (userTasks = userTasks.where('date', '==', ''))
      : userTasks;

      userTasks = userTasks.onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(task => ({
          id: task.id,
          ...task.data()
        }));

        setTasks(
          // if selected project is next 7, only show the tasks where the date is from today to the next 7 days
          selectedProject === 'NEXT_7'
            ? newTasks.filter(
              task=> 
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
              )
            : newTasks.filter(task => task.archived !== true)
        );

        setArchivedTasks(newTasks.filter(task => task.archived !== false));
      });

      return () => userTasks();
  }, [selectedProject]);
  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fbProjects
      .where('userId', '==', 'HcafYDT6NqkbwLPxqpsB')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id,
        }));
        if (JSON.stringify(allProjects) !== (JSON.stringify(projects))) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};