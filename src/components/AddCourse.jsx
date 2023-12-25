import React, { useState } from 'react'
import useStore from '../stores/VariableStore'
import '../styles/addCourse.css'

const AddCourse = () => {
    const [eidtId, setEditId] = useState(null)
    const [course, setCourse] = useState('')
    const { courses, addCourse, changeStatus, deleteCourse, updateCourse } = useStore((state) => ({ courses: state.courses, addCourse: state.addCourse, changeStatus: state.changeStatus, deleteCourse: state.deleteCourse, updateCourse: state.updateCourse }))

    const handleSubmitcourse = () => {
        if (!course) return 'enter course'

        if (eidtId != null) {
            //console.log(eidtId);
            updateCourse(eidtId, course)
            setEditId(null)
            setCourse('')
        }
        else {
            addCourse({ "courseId": Math.floor(Math.random() * 10000000), "courseName": course, "completed": false })
            setCourse('')
        }
    }

    const handleCompleted = (id) => {

        changeStatus(id)
    }

    const handleDelete = (id) => {
        deleteCourse(id)
    }

    const handleEdit = (id, courseName) => {
        setCourse(courseName)
        setEditId(id)
    }

    const courseList = courses.filter((course) => {
        if (course.courseId != eidtId) {
            return course
        }
    })
    return (
        <div className='body'>
            <input className='add-course' type='text' value={course} onChange={(e) => { setCourse(e.target.value) }} ></input>
            <button className='add-course-button' type='button' onClick={handleSubmitcourse}>{(eidtId) ? "Update Course" : "AddCourse"}</button>
            <div className='courses'>
                <ul className='course-list'>
                    {courseList && courseList.map((course, index) => {
                        //console.log("inside",courseList);
                        return <li key={course.courseId || index}>
                            <div className='list'>
                                <input className='course-status-checkbox' type='checkbox' checked={(course.completed)} onChange={() => { handleCompleted(course.courseId) }}></input>
                                <span className='course-name'>{course.courseName}</span>
                                {/* <span className='course-status'>{course.completed ? 'Completed' : 'Not Completed'}</span> */}
                                <button className='delete-course-button' onClick={() => handleDelete(course.courseId)}>Delete Course</button>
                                <button className='edit-course-button' onClick={() => handleEdit(course.courseId, course.courseName)} >Edit</button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AddCourse