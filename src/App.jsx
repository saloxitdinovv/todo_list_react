import { useEffect, useRef, useState } from 'react'
import { HttpRequest } from './hooks/http';
import Task from './components/Task';
import '../src/App.css'
import Form from './components/Form';


function App() {
  const [tasks, setTasks] = useState([])
  const [update, setUpdate] = useState([])
  const { request } = HttpRequest()

  useEffect(() => {
    request('/tasks')
      .then(res => {
        console.log(res);
        setTasks(res)
      })
  }, [update])

  return (
    <>
      <main className='max-w-[1240px] w-[95%] my-0 mx-auto'>
        <header className='mt-10 flex flex-col gap-3 items-center justify-center'>
          <h1 className='text-6xl font-bold text-center'>Todo List</h1>
        </header>


        <section className='w-full flex justify-center mt-10'>
          <Form setTasks={setTasks} tasks={tasks} />
        </section>

        <section className='mt-10 flex flex-wrap gap-3 gap-y-8'>
          {
            tasks.map((item, idx) => (
              <Task
                name={item.title}
                desc={item.description}
                status={item.status}
                id={item.id}
                key={idx}
                update={update}
                setUpdate={setUpdate}
              />
            ))
          }
        </section>
      </main>
    </>
  )
}

export default App