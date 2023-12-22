import { create } from 'zustand'

const useStore = create((set) => ({
    courses: [],
    addCourse: (course) => set((state) => ({ courses: [course, ...state.courses] })),
    changeStatus: (id) => set((state) => ({
        courses: state.courses.map((course) => {
            if (course.courseId === id) {
                return { ...course, completed: !course.completed }
            }
            return course
        })
    })),
    deleteCourse: (id) => set((state) => ({
        courses: state.courses.filter((course) => {
            if (course.courseId != id) {
                console.log(course);
                return course
            }
        })
    })),
    updateCourse:(id,newName)=>set((state)=>({
        courses:state.courses.map((course)=>{
            if(course.courseId===id){
                console.log(course);
                return {...course,courseName:newName}
            }
            return course
        })
    }))
}))

export default useStore