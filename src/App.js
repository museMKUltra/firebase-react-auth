import { Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ResetPassword from "./components/ResetPassword.js";
import PrivateRoute from "./components/PrivateRoute.js";
import UpdateProfile from "./components/UpdateProfile.js";
import NotFound from "./components/NotFound.js";
import LoginAnonymously from "./components/LoginAnonymously.js";
import StopWatchContainer from "./components/StopWatchContainer.js";
import RecordProvider from "./contexts/RecordContext.js";
import ScoreBoard from "./components/ScoreBoard.js";

function App() {
	return (
		<Container className={["d-flex", "align-items-center", "justify-content-center"]} style={{ minHeight: "100vh" }}>
			<Router>
				<RecordProvider>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path="/" component={Profile} />
							<PrivateRoute path="/update-profile" component={UpdateProfile} />
							<Route path="/reset-password" component={ResetPassword} />
							<Route path="/signup" component={Signup} />
							<Route path="/login" component={Login} />
							<Route path="/login-anonymously" component={LoginAnonymously} />
							<Route path="/stop-watch" component={StopWatchContainer} />
							<Route path="/score-board" component={ScoreBoard} />
							<Route path="/not-found" component={NotFound} />
							<Redirect to="/not-found" />
						</Switch>
					</AuthProvider>
				</RecordProvider>
			</Router>
		</Container>
	);
}

export default App;
