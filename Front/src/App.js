import { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";

import UserContext from "./components/UserContext";
import Protected from "./components/Protected";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import AllAdmins from "./pages/admins/AllAdmins";
import AddAdmin from "./pages/admins/AddAdmin";
import UpdateAdmin from "./pages/admins/UpdateAdmin";

import AllServices from "./pages/services/AllServices";
import ViewServices from "./pages/services/ViewServices";
import AddServices from "./pages/services/AddServices";
import UpdateServices from "./pages/services/UpdateServices";
import AllEmergencies from "./pages/emergencies/AllEmergencies.js";
import ViewEmergencies from "./pages/emergencies/ViewEmergencies.js";

const Main = styled.main`
  width: 80%;
  margin: 5rem auto 0;
  padding-left: 4rem;
`;

const App = () => {
  const [token, setToken] = useState(null);
  const providerValue = useMemo(() => ({ token, setToken }), [token, setToken]);
  axios.defaults.headers.common["Authorization"] = "bearer " + token;
  const jwtSecret =
    "D1JEtLxZ2muTayOXgUbPI7CdDD5N9QXa12T4aegWqbhKSbdALIDeDvumZGvM9DwP";

  useEffect(() => {
    if (cookie.get("token")) {
      setToken(cookie.get("token"));
    }
  }, []);

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        cookie.remove("token");
        setToken(null);
      } else {
        if (decoded.iss !== "http://localhost:8000/api/admin/login") {
          cookie.remove("token");
          setToken(null);
        }
      }
    });
  }

  return (
    <>
      <UserContext.Provider value={providerValue}>
        <Router>
          <Switch>
            <Route
              exact={true}
              path="/login"
              component={(props) => <LoginPage isAuth={token} />}
            />
            <Main>
              <Sidebar />
              <NavBar />

              <Protected
                isAuth={token}
                exact={true}
                path="/admins/add"
                component={(props) => <AddAdmin />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/admins"
                component={(props) => <AllAdmins />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/admins/edit/:id"
                component={(props) => <UpdateAdmin />}
              />

              {/* <Protected
                isAuth={token}
                exact={true}
                path="/tips/add"
                component={(props) => <AddTips />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/tips/edit/:id"
                component={(props) => <UpdateTips />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/tips"
                component={(props) => <AllTips />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/tips/view/:id"
                component={(props) => <ViewTips />}
              /> */}
              <Protected
                isAuth={token}
                exact={true}
                path="/services/add"
                component={(props) => <AddServices />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/services/edit/:id"
                component={(props) => <UpdateServices />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/services"
                component={(props) => <AllServices />}
              />
              <Protected
                isAuth={token}
                exact={true}
                path="/services/view/:id"
                component={(props) => <ViewServices />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/"
                component={(props) => <AllEmergencies />}
              />

              <Protected
                isAuth={token}
                exact={true}
                path="/emergencies/view/:id"
                component={(props) => <ViewEmergencies />}
              />

              <Redirect from="/*" to="/" />
            </Main>
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
