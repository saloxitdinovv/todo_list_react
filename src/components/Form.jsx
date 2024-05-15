// import { useForm } from 'react-hook-form';
// import { HttpRequest } from './../hooks/http';
import { useForm } from 'react-hook-form';
import { HttpRequest } from './../hooks/http';

function Form({ setTasks, tasks }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { request } = HttpRequest();

    const onSubmit = (data) => {
        request('/tasks', 'post', data)
            .then(res => {
                console.log(res);
                setTasks([...tasks, res]);
            })
    };

    return (
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
            <button className='bg-black text-white p-3 rounded' type="submit">Добавить</button>
        </form>
    );
}

export default Form;
