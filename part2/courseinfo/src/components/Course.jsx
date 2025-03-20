const Course = ({course}) => {
    const total = course.parts.reduce((total,part) => total+part.exercises,0)
    return (
    <div>
      <h2>{course.name}</h2>
          {course.parts.map(part => 
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          )}
        <p>total {total}</p>
    </div>
    )
  }

  export default Course