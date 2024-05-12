import { useEffect, useRef, useState } from 'react'
import { HttpRequest } from './hooks/http';
import Task from './components/Task';
import '../src/App.css'
import { useForm } from 'react-hook-form';


function App() {
  let ref = useRef(null)

  const [tasks, setTasks] = useState([])
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    request('/tasks', 'post', data)
      .then(res => {
        console.log(res);
        setTasks(tasks => [...tasks, res]);
      })
  };

  const { request } = HttpRequest()

  useEffect(() => {
    request('/tasks')
      .then(res => {
        console.log(res);
        setTasks(res)
      })
  }, [])

  return (
    <>
      <main className='max-w-[1240px] w-[95%] my-0 mx-auto'>
        <header className='mt-10 flex flex-col gap-3 items-center justify-center'>
          <h1 className='text-6xl font-bold text-center'>Todo List</h1>
        </header>


        <section className='w-full flex justify-center mt-10'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            name="addTaskForm"
            className='flex flex-col w-[300px] border justify-center gap-2'>
            <input {...register('title', { required: true })} className={`${errors.title ? '!outline-red-500 !border-red-500 p-3 bg-red-500' : 'p-3 border-black outline-black bg-black text-white rounded'}`} placeholder="Загаловок" type="text" />
            <input {...register('description', { required: true })} className={`${errors.description ? '!outline-red-500 !border-red-500 p-3 bg-red-500' : 'p-3 border-black outline-black bg-black text-white rounded'}`} placeholder="Описание" type="text" />
            <select {...register('status')} className='p-3 bg-black text-white rounded'>
              <option value="new">Не завершено</option>
              <option value="inProcess">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
            <button
              className='bg-black text-white p-3 rounded'
              type="submit"
            >Добавить</button>
          </form>
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
              />
            ))
          }
        </section>
      </main>
    </>
  )
}

export default App