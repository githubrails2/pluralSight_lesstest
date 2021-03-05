import React from "react";
import { Switch, Route } from "react-router-dom";
import AboutPage from "./components/about/AboutPage";
import Header from "./components/common/Header";
import CoursesPage from "./components/courses/CoursesPage";
import ManageCoursesPage from "./components/courses/ManageCoursesPage";
import HomePage from "./components/home/HomePage";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
	return (
		<div className="container-fluid">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/courses" component={CoursesPage} />
				<Route path="/course/:slug" component={ManageCoursesPage} />
				<Route path="/course" component={ManageCoursesPage} />
				<Route component={NotFound} />
			</Switch>
			<ToastContainer autoClose={3000} hideProgressBar />
		</div>
	);
};

export default App;
