const Header1 = (props) => {
  console.log(props)
  return <h2>{props.courses[0].name}</h2>
}

const Header2 = (props) => {
  console.log(props)
  return(
    <div>
     <h2>{props.courses[1].name}</h2>
    </div>
  )
}

const Course = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.courses[0].parts[0].name} {props.courses[0].parts[0].exercises}</p>
      <p>{props.courses[0].parts[1].name} {props.courses[0].parts[1].exercises}</p>
      <p>{props.courses[0].parts[2].name} {props.courses[0].parts[2].exercises}</p>
      <p>{props.courses[0].parts[3].name} {props.courses[0].parts[3].exercises}</p>
    </div>
  )
}

const Course2 = (props) => {
  console.log(props)
  return(
    <div>
     <p>{props.courses[1].parts[0].name} {props.courses[1].parts[0].exercises}</p>
     <p>{props.courses[1].parts[1].name} {props.courses[1].parts[1].exercises}</p>
    </div>
  )
}

const Total1 = (props) => {
  const totalExerc1 = props.courses[0].parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return <h4><p>Total of {totalExerc1} exercises</p></h4>
}

const Total2 = (props) => {
  const totalExerc2 = props.courses[1].parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return <h4><p>Total of {totalExerc2} exercises</p></h4>
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
    
      <Header1 courses={courses}/>
      <Course courses={courses}/>
      <Total1 courses={courses}/>
      <Header2 courses={courses}/>
      <Course2 courses={courses}/>
      <Total2 courses={courses}/>
    </div>
  )  
}

export default App