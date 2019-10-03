import React, {useState} from 'react';
import { Header } from './components/layout/Header'
import { Content } from './components/layout/Content'
import { ProjectsProvider, SelectedProjectProvider } from './context';

export const App = ({darkModeDefault = false}) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className="App">
          <main
            data-testid="application"
            className={darkMode ? 'darkMode' : undefined}
          >
          <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Content />
          </main>
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};