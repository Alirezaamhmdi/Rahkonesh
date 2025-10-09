import React from 'react';
import { Provider } from 'react-redux';
import Store from './redux/main_store/main_store.tsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import EditTask from './components/edit/editTask.tsx';
import Board from './pages/board/board.tsx';
import Project from './pages/project.tsx';
import Projects from './pages/mainTable.tsx';
import MultiTasks, { NotEmptyTasks } from './pages/tasks/tasks.tsx';
import EmpthyTask from './pages/tasks/notEmpthy.tsx';
import logo_context from './context/page-logo.tsx';
import avatar from '/src/assets/png/Avatar.png';
import office from '/src/assets/png/homeOffice.png';
import miniLogo from '/src/assets/svg/miniLogo.svg';
import teamyer_typograph from '/src/assets/svg/teamyer_mini_type_graphy.svg';
import CallenderWeekDay from './inner_tasks/callender.tsx';
import LoginSignIn from './pages/login_sigin.tsx';
import AuthLayout from './layout/authLayout.tsx';
const App : React.FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
    const logos = logo_context

 return (
    <div className="App">
      <Provider store={Store}>
        <logos.Provider value={{Imglogo: miniLogo , teamyer_mini: teamyer_typograph, Avatar:avatar, HomeOffice: office }} > 

      <Routes location={background || location}>
        <Route path="maintable" element={<Projects />}>
          <Route path="projects" element={<MultiTasks />}>
            <Route index={true} element={<NotEmptyTasks />} />
            <Route path="empthy" element={<EmpthyTask />} />
          </Route>
        </Route>

        <Route path="project/:id" element={<Project />}>
          <Route path="board" element={<Board />} />
          <Route path="gant" element={<Board />} />
          <Route path="calendar" element={<CallenderWeekDay />} />
        </Route>

        <Route path="loginsignIn" element={<LoginSignIn/>}/>
        <Route path='authlayout' element={<AuthLayout/>}/>

  
        
      </Routes>
      {background && (
        <Routes>
          <Route path="c/:id" element={<EditTask />} />
        </Routes>

        

)}
</logos.Provider > 
</Provider>
    </div>
  );
}

export default App ;