import React, { useEffect, useState } from "react";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
const ManageCoursesPage = ({
	loadCourses,
	loadAuthors,
	courses,
	authors,
	saveCourse,
	history,
	...props
}) => {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		if (courses.length === 0) {
			loadCourses().catch((err) => alert("Loading Courses failed" + err));
		} else {
			setCourse({ ...props.course });
		}
		if (authors.length === 0) {
			loadAuthors().catch((err) => alert("Loading authors failed" + err));
		}
	}, [props.course]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCourse((prevCourse) => ({
			...prevCourse,
			[name]: name === "authorId" ? parseInt(value, 10) : value,
		}));
	};
	const formIsValid = () => {
		const { title, authorId, category } = course;
		const errors = {};
		if (!course.title) return "Title is required.";
		if (!course.authorId) return "Author is required.";
		if (!course.category) return "Category is required.";

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleSave = (e) => {
		e.preventDefault();
		if (!formIsValid()) return;
		setSaving(true);
		saveCourse(course)
			.then(() => {
				toast.success("Course Saved");
				history.push("/courses");
			})
			.catch((error) => {
				setSaving(false);
				setErrors({ onSave: error.message });
			});
	};
	return authors.length === 0 || courses.length === 0 ? (
		<Spinner />
	) : (
		<CourseForm
			course={course}
			errors={errors}
			authors={authors}
			onChange={handleChange}
			onSave={handleSave}
			saving={saving}
		/>
	);
};
export function getCourseBySlug(courses, slug) {
	return courses.find((course) => course.slug === slug || null);
}
const mapStatetoProps = (state, ownProps) => {
	const slug = ownProps.match.params.slug;
	const course =
		slug && state.courses.length > 0
			? getCourseBySlug(state.courses, slug)
			: newCourse;
	return {
		course,
		courses: state.courses,
		authors: state.authors,
	};
};
ManageCoursesPage.propTypes = {
	course: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};
export default connect(mapStatetoProps, {
	loadAuthors,
	loadCourses,
	saveCourse,
})(ManageCoursesPage);
