import { Container } from "react-bootstrap";
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
import StopWatch from "./components/StopWatch.js";
import StopWatchClass from "./components/StopWatchClass.js";
import AnotherWatch from "./components/AnotherWatch.js";
import RecordProvider from "./contexts/RecordContext.js";

function App() {
	return (
		<Container className={["d-flex", "align-items-center", "justify-content-center"]} style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<AuthProvider>
					<RecordProvider>
						<Router>
							<Switch>
								<PrivateRoute exact path="/" component={Profile} />
								<PrivateRoute path="/update-profile" component={UpdateProfile} />
								<Route path="/reset-password" component={ResetPassword} />
								<Route path="/signup" component={Signup} />
								<Route path="/login" component={Login} />
								<Route path="/login-anonymously" component={LoginAnonymously} />
								<Route path="/not-found" component={NotFound} />
								<Route path="/stop-watch" component={StopWatch} />
								<Route path="/another-watch" component={AnotherWatch} />
								<Route path="/stop-watch-class" component={StopWatchClass} />
								<Redirect to="/not-found" />
							</Switch>
						</Router>
					</RecordProvider>
				</AuthProvider>
			</div>
		</Container>
	);
}

export default App;
