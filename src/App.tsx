import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PATH } from "./libs/constants/path";
import { MobileDetector, MobileWrapper, LoadingScreen } from "./common";

// CLIENT
import ProtectedRoute from "./client/components/ProtectedRoute";
import Layout from "./client/components/Layout";
import Home from "./client/pages/Home";
import { ListTour } from "./client/pages/ListTour";
import ActivityList from "./client/pages/ActivityList";
import Reserve from "@/client/pages/PaymentStep/StepOne";
import PaymentStepTwo from "./client/pages/PaymentStep/StepTwo";
import PaymentStepThree from "@/client/pages/PaymentStep/StepThree";
import PaymentStepFour from "@/client/pages/PaymentStep/StepFour";
import PaymentStepDone from "@/client/pages/PaymentStep/StepDone";
import ReportChart from "./client/pages/Report";
import News from "./client/pages/News";
import NewDetail from "./client/pages/News/NewDetail";
import Contact from "./client/pages/Contact";
import ChatBox from "./client/pages/Chat";
import Profile from "./client/pages/Profile";

// LOGIN REGISTER
import Login from "./admin/Login";
import Register from "./admin/Register";

// ADMIN_PATHS
import { AuthProvider } from "./admin/components/AuthProvider";
function App() {
  return (
    <>
      <MobileDetector />
      <LoadingScreen />
      <MobileWrapper>
        <AuthProvider>
          <Router basename="/hanvinaweb">
            <Routes>
              {/* Client Routes */}
              <Route
                path={PATH.HOME}
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
                <Route path={PATH.LIST_TOUR} element={<ListTour />} />
                <Route path={PATH.LIST_TOUR_ACTIVE} element={<ActivityList />} />
                <Route path={PATH.RESERVE} element={<Reserve />} />
                <Route path={PATH.REPORT} element={<ReportChart />} />
                <Route path={PATH.NEWS} element={<News />} />
                <Route path={PATH.NEW_DETAIL} element={<NewDetail />} />
                <Route path={PATH.CONTACT} element={<Contact />} />
                <Route path={PATH.CHAT} element={<ChatBox />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route
                  path={PATH.STEP_TWO_PROCESS}
                  element={<PaymentStepTwo />}
                />
                <Route
                  path={PATH.STEP_THREE_PROCESS}
                  element={<PaymentStepThree />}
                />
                <Route
                  path={PATH.STEP_FOR_PROCESS}
                  element={<PaymentStepFour />}
                />
                <Route
                  path={PATH.STEP_DONE}
                  element={<PaymentStepDone />}
                />
              </Route>

              {/* Login Register Routes  */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin/register" element={<Register />} />
            </Routes>
          </Router>
        </AuthProvider>
      </MobileWrapper>
    </>
  );
}

export default App;
