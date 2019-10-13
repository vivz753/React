import React, { useState } from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa'

export const TaskDate = ({showTaskDate, setShowTaskDate, setTaskDate}) => {

  return (
    showTaskDate && (
      <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
          <li
            aria-label="Selecting today as task date"
            tabIndex={0}
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            data-testid="task-date-today"
          >
            <span>
              <FaSun />
            </span>
            <span>
            Today
            </span>
          </li>
          <li
            aria-label="Selecting tomorrow as task date"
            tabIndex={0}
            onClick={()=> {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
            }}
            data-testid="task-date-tomorrow"
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>
              Tomorrow
            </span>
          </li>
          <li
            aria-label="Selecting next week as task date"
            tabIndex={0}
            onClick={()=> {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'day').format('DD/MM/YYYY'))
            }}
            data-testid="task-date-next-week"
          >
            <span>
              <FaRegPaperPlane /> 
            </span>
            <span>Next Week</span>
          </li>
        </ul>
      </div>
    )
  )
}

  