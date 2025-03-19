import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [anecdoteKey, setAnecdoteKey] = useState(0)
  const [list, setList] = useState([0,0,0,0,0,0,0,0])
  const [bestQuote, setQuote] = useState(0)
  const increaseGood = () => setGood(good+1)
  const increaseNeutral = () => setNeutral(neutral+1)
  const increaseBad = () => setBad(bad+1)

  const newAnecdoteKey = () => {
    let newKey
    do{
      newKey = Math.floor(Math.random()*8)
    } while (newKey === anecdoteKey)
    setAnecdoteKey(newKey)
  }

  const newBestQuote = (copyList) => {
    const maxValue = Math.max(...copyList)
    console.log(copyList)
    console.log("max", maxValue)

    const index = copyList.indexOf(maxValue)
    console.log("index",index)
    setQuote(index)
  }
  
  const vote = () => {
    const copy = [...list]
    copy[anecdoteKey] += 1
    setList(copy)
    newBestQuote(copy)
  }
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" action={increaseGood}/>
      <Button text="neutral" action={increaseNeutral}/>
      <Button text="bad" action={increaseBad}/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} anecdoteKey={anecdoteKey} votes={list[anecdoteKey]}/>
      <Button text = "vote" action={vote}/>
      <Button text = "new anecdote" action={newAnecdoteKey}/>
      <h1>Anecdote with the most votes</h1>
      <Anecdote anecdotes={anecdotes} anecdoteKey={bestQuote} votes={list[bestQuote]}/>

    </div>
  )
}

const Anecdote = ({anecdotes, anecdoteKey, votes}) => {
  return(
    <div>
      <p>{anecdotes[anecdoteKey]}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({text,action}) => {
  return(
    <div style={{display:"inline-block",padding:"1px"}}>
      <button onClick={action}>
        {text}
      </button>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  if (good+neutral+bad === 0)  {
    return(
      <p>no feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value ={good}/>
      <StatisticLine text="neutral" value ={neutral}/>
      <StatisticLine text="bad" value ={bad}/>
      <StatisticLine text="all" value ={good+neutral+bad}/>
      <StatisticLine text="average" value ={(good-bad)/(good+neutral+bad)}/>
      <StatisticLine text="positive" value ={(good/(good+neutral+bad))*100+" %"}/>
      </tbody>
    </table>
  )
}
export default App