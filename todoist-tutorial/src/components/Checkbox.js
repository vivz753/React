import React from 'react';
import {firebase} from '../firebase';

export const Checkbox = ({id, taskName, archived}) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .update({
        archived: !archived
      });
  };

  return (
    <div 
      role="button"
      className="checkbox-holder"
      data-testid="checkbox-action"
      aria-label={`Mark task ${taskName} as done`}
      tabIndex={0} 
      onKeyDown={()=> archiveTask()}
      onClick={()=> archiveTask()}
    >
      <span
         className={archived ? "checkbox-checked" : "checkbox-unchecked"}
      />  
    </div>
  )
}