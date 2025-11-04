import React, { lazy } from "react";
import { Provider } from "react-redux";
import Store from "./redux/main_store/main_store.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import logo_context from "./context/page-logo.tsx";
import avatar from "/src/assets/png/Avatar.png";
import office from "/src/assets/png/homeOffice.png";
import miniLogo from "/src/assets/svg/miniLogo.svg";
import teamyer_typograph from "/src/assets/svg/teamyer_mini_type_graphy.svg";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";
import Users from "./pages/users.tsx";
import UsersList from "./components/user/usersList.tsx";
import InviteList from "./components/user/inviteList.tsx";
import Workspaces from "./pages/workspaces.tsx";
import Invite from "./components/inviteUser/invite.tsx";
import InviteMember from "./components/inviteUser/invitemember.tsx";
import UserProfile from "./pages/userProfile.tsx";
import useMediaQuery from "./hooks/useMediaQuery.tsx";
import Projects from "./pages/mainTable.tsx";
import EditUser from "./components/inviteUser/editUser.tsx";
import AddArea from "./components/area/addArea.tsx";
import EditArea from "./components/area/editArea.tsx";
import { UserProvider } from "./context/userContext.tsx";
import { AreaProvider } from "./context/areaContext.tsx";
import { ToastContainer } from "react-toastify";
import Programs from "./pages/programs.tsx";
import AddProgram from "./components/programs/123.tsx";
import AddPro from "./components/programs/addPro.tsx";
import { ProgramProvider } from "./context/programContext.tsx";
const Footer = lazy(() => import('./components/foot_bar/foot_bar.tsx'))

const App: React.FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const logos = logo_context;
  const isLargeScreen = useMediaQuery("(max-width: 48rem)");

  return (
    <div className="App">
      {isLargeScreen && <Footer />}
      <AreaProvider>
        <ProgramProvider>
          <UserProvider>
            <Provider store={Store}>
              <logos.Provider
                value={{
                  Imglogo: miniLogo,
                  teamyer_mini: teamyer_typograph,
                  Avatar: avatar,
                  HomeOffice: office,
                }}
              >
                <Routes location={background || location}>

                  <Route path="panel" element={<Projects />}>
                    <Route path='users' element={<Users />}>
//             <Route path='list' index element={<UsersList />}></Route>
//             <Route path='invite' index element={<InviteList />}></Route>
//           </Route>
//           <Route path='area' element={<Workspaces />} />
//           <Route path='programs' element={<Programs />} />
                  </Route>

                  <Route path="register" element={<Signup />} />
                  <Route path="login" element={<Login />} />

                </Routes>
                {background && (
                  <Routes>
                    <Route path="add-user" element={<Invite />} />
                    <Route path="edit-user/:id" element={<EditUser />} />
                    <Route path="add-area" element={<AddArea />} />
                    <Route path="add-program" element={<AddPro />} />
                    <Route path="edit-area/:id" element={<EditArea />} />
                    <Route path="invite-member/:id" element={<InviteMember />} />
                    <Route path="profile/:id" element={<UserProfile />} />
                  </Routes>
                )}
              </logos.Provider>
            </Provider>
            <ToastContainer />
          </UserProvider>
        </ProgramProvider>
      </AreaProvider>
    </div>
  );
};

export default App;
