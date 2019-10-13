import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

const fbTasks = firebase.firestore().collection('tasks');

export const AddTask = ({
  showAddTaskMain,
  showQuickAddTask,
  setShowQuickAddTask
}) => {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(false);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  

  const { selectedProject, setSelectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    }
    else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
    }
    
    return (
      taskName && 
      projectId && 
      fbTasks
        .add({
          archived: false,
          projectId,
          taskName,
          date: collatedDate || taskDate,
        })
        .then(()=> {
          // after adding task to firebase,
          // clear task name, project overlay selection
          // toggle display for regular add task module
          // toggle display for project overlay and task date
          // toggle display for quick add task module
          setShowQuickAddTask && setShowQuickAddTask(false);
          setShowMain(false);
          setTaskName('');
          setProject('');
          setShowProjectOverlay(false);
          setShowTaskDate(false);

        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {/* Regular Add Task Prompt */}
      {showAddTaskMain && (
        <div
        aria-label="Add task"
        tabIndex={0}
        className="add-task__shallow"
        data-testid="show-main-action"
        onClick={()=> setShowMain(!showMain)}
        onKeyDown={()=> setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {/* Quick Add Task Module Header and X cancel button */}
          {
            showQuickAddTask && (
            <div data-testid="quick-add-task">
              <h2 className="header">Quick Add Task</h2>
              <span
                tabIndex={0}
                className="add-task__cancel-x"
                data-testid="add-task-quick-cancel"
                aria-label="Cancel adding a task"
                onClick={() => {
                  setShowQuickAddTask(false)
                  setShowProjectOverlay(false);
                  setShowTaskDate(false);
                }}
                onKeyDown={() => {
                  setShowQuickAddTask(false)
                  setShowProjectOverlay(false);
                  setShowTaskDate(false);
                }}
              >
                X
              </span>
            </div>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate 
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            aria-label="Enter your task"
            className="add-task__content"
            data-testid="add-task-content"
            type="text"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            tabIndex={0}

          />
          <button
            aria-label="Submit your task"
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            tabIndex={0}
            onClick={()=> {
              addTask()
            }}
            onKeyDown={()=> {
              addTask()
            }}
          >
            Add Task
          </button>
          {/* Regular Add Task Module Cancel button */}
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              tabIndex={0}
              aria-label="Cancel adding task"
              onClick={()=> {
                setShowMain(false);
                setShowProjectOverlay(false);
                setShowTaskDate(false);
              }}
              onKeyDown={()=> {
                setShowMain(false);
                setShowProjectOverlay(false);
                setShowTaskDate(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            aria-label="Select project"
            tabIndex={0}
            onClick={()=> setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={()=> setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            aria-label="Select task date"
            tabIndex={0}
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
        
      )}

    </div>
  );
}