import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
class CoursesPage extends Component {
	state = {
		redirectToAddCoursePage: false,
	};
	componentDidMount() {
		const { loadCourses, courses, authors, loadAuthors } = this.props;
		if (courses.length === 0) {
			loadCourses().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}
		if (authors.length === 0) {
			loadAuthors().catch((error) => {
				alert("Loading authors failed" + error);
			});
		}
	}
	handleDeleteCourse = async (course) => {
		const { deleteCourse } = this.props;
		toast.success("Course deleted");
		try {
			await deleteCourse(course);
		} catch (error) {
			toast.error("Delete failed" + error.message, { autoClose: false });
		}
	};

	render() {
		return (
			<Fragment>
				{this.state.redirectToAddCoursePage && <Redirect to="/course" />}
				<h2>Courses</h2>
				{this.props.loading ? (
					<Spinner />
				) : (
					<Fragment>
						<button
							style={{ marginBottom: 20 }}
							className="btn btn-primary add-course"
							onClick={() => this.setState({ redirectToAddCoursePage: true })}
						>
							Add Course
						</button>
						<CourseList
							onDeleteClick={this.handleDeleteCourse}
							courses={this.props.courses}
						/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}
CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	authors: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	deleteCourse: PropTypes.func.isRequired,
};
const mapStatetoProps = (state) => {
	return {
		courses:
			state.authors.length === 0
				? []
				: state.courses.map((course) => {
						return {
							...course,
							authorName: state.authors.find((a) => a.id === course.authorId)
								.name,
						};

						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }),
		authors: state.authors,
		loading: state.apiCallsInProgress > 0,
	};
};
export default connect(mapStatetoProps, {
	loadCourses,
	loadAuthors,
	deleteCourse,
})(CoursesPage);
