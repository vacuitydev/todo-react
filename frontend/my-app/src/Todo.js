import {useState, useEffect} from 'react';

function Todo() {
  const [todos, setTodos] = useState(undefined)
  const [loading, setLoading] = useState(true)
  async function getTodos(){
    const result = await fetch(process.env.SERVER+ '/todo',{
      method:"GET"
    })
    const converted = result.json()
    setTodos(converted)
  }
  useEffect(
    ()=>{
      setLoading(true)
      async ()=>{
        await getTodos();
        setLoading(false)
      }
    },[]
  ) 
  return (
    <>
      {/* {loading&& "Loading"} */}
      {todos|| "Loading"}
    </>
  );
}

export default Todo;
