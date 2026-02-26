import Header1 from "./components/Header1"
import Header2 from "./components/Header2"
import Content from "./components/Content"
import Content2 from "./components/Content2"
import Total from "./components/Total"
import Total2 from "./components/Total2"


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
      <Content courses={courses}/>
      <Total courses={courses}/>
      <Header2 courses={courses}/>
      <Content2 courses={courses}/>
      <Total2 courses={courses}/>
    </div>
  )  
}

export default App