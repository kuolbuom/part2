 const Course = ({course}) => {
  //here the course parameter is accessing the data from the definiion in the App component
  console.log(course)
  return(
    <div>
     <Header course={course}/>
    <Part course={course}/>
    <Total course={course}/>
    </div>
  )
 }

 const Total = ({course}) =>{
  console.log(course)
  return <h3>Total of {course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises+course.parts[3].exercises}    exercises</h3>
 }

 const Part = ({course}) => {
  //the same thing here its accesing from Course component not from predefined
  console.log(course)
  return(
    <div>
      <p>{course.parts[0].name} {course.parts[0].exercises}</p>
      <p>{course.parts[1].name} {course.parts[1].exercises}</p>
      <p>{course.parts[2].name} {course.parts[2].exercises}</p>
      <p>{course.parts[3].name} {course.parts[3].exercises}</p>
    </div>
  )
 }

 const Header = ({course}) => {
  //inside the header component, the course parameter is accessing data from the Couse component. that's why i was facing more errors when using props all accross the component. its unlike the prop which i did in part 1
  console.log(course)
return <h1>{course.name}</h1>
 }
 
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} /> 
}

export default App