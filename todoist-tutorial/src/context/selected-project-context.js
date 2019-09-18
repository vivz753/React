import React, {createContext, useContext, useState } from 'react';

export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({children}) => {
  // if project is not selected, default to inbox
  const [ selectedProject, setSelectedProject ] = useState('INBOX');
  return (
    <SelectedProjectContext.Provider value={{selectedProject, setSelectedProject}}>
      {children}
    </SelectedProjectContext.Provider>
  )
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);