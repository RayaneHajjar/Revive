import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { HiTag, HiViewList } from 'react-icons/hi';
import { MdTitle, MdDelete, MdCheckBox, MdCancel } from 'react-icons/md';
import { FaCalendar } from 'react-icons/fa';

import Modal from '../../shared/components/layouts/Modal';
import Editable from '../../shared/components/forms/Editable';

const CardInfo = (props) => {
    const colors = ['#594622', '#A68C5D', '#BF7960', '#735F5D']

    const [selectedColor, setSelectedColor] = useState('#594622');
    const [values, setValues] = useState({
        ...props.card,
    });

    const updateTitle = (value) => {
        setValues({ ...values, title: value });
    };

    const updateDescription = (value) => {
        setValues({ ...values, description: value });
    };

    const addLabel = (label) => {
        const index = values.labels.findIndex(
            (item) => item.title === label.title
        );
        if (index > -1) return;

        setSelectedColor('');
        setValues({
            ...values,
            labels: [...values.labels, label],
        });
    };

    const removeLabel = (label) => {
        const tempLabels = values.labels.filter(
            (item) => item.title !== label.title
        );

        setValues({
            ...values,
            labels: tempLabels,
        });
    };

    const updateDate = (date) => {
        if (!date) return;

        setValues({
            ...values,
            date,
        });
    };

    const addTask = (value) => {
        const task = {
          id: Date.now() + Math.random() * 2,
          completed: false,
          title: value,
        };
        setValues({
          ...values,
          tasks: [...values.tasks, task],
        });
    };

    const removeTask = (id) => {
        const tasks = [...values.tasks];

        const tempTasks = tasks.filter((item) => item.id !== id);
        setValues({
            ...values,
            tasks: tempTasks,
        });
    };

    const updateTask = (id, value) => {
        const tasks = [...values.tasks];

        const index = tasks.findIndex((item) => item.id === id);
        if (index < 0) return;

        tasks[index].completed = value;

        setValues({
            ...values,
            tasks,
        });
    };

    const calculatePercent = () => {
        if (!values.tasks?.length) return 0;
        const completed = values.tasks?.filter(
            (item) => item.completed
        )?.length;
        return (completed / values.tasks?.length) * 100;
    };

    useEffect(() => {
        if (props.updateCard)
            props.updateCard(props.boardId, values.id, values);
    }, [values, props.boardId]);

    return (
        <Modal show onClose={props.onClose}>
            <div className='p-7 flex flex-col gap-7 h-fit'>
                <div className='w-full flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <MdTitle className='h-4 w-4 fill-brown' />
                        <p className='font-bold text-xl'>Title</p>
                    </div>
                    <Editable
                        defaultValue={values.title}
                        text={values.title}
                        placeholder='Enter Title'
                        displayClass='w-fit'
                        onSubmit={updateTitle}
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <HiViewList className='h-4 w-4 fill-brown' />
                        <p className='font-bold text-xl'>Description</p>
                    </div>
                    <Editable
                        defaultValue={values.description}
                        text={values.description || 'Add a Description'}
                        placeholder='Enter description'
                        displayClass='w-fit'
                        onSubmit={updateDescription}
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <FaCalendar className='h-3 w-3 fill-brown' />
                        <p className='font-bold text-xl'>Date</p>
                    </div>
                    <input
                        type='date'
                        defaultValue={moment(values.date,'YYYY-MM-DD').format('MM-DD-YYYY')}
                        min={new Date().toISOString().substring(0, 10)}
                        onChange={(event) => updateDate(event.target.value)}
                        className='w-fit border-2 border-gray-200 rounded-sm outline-none text-base p-2'
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <HiTag className='h-4 w-4 fill-brown' />
                        <p className='font-bold text-xl'>Labels</p>
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        {values.labels?.map((item, index) => (
                            <label
                                key={index}
                                style={{backgroundColor:item.color}}
                                className={`flex items-center gap-2 py-1 px-2 rounded-xl text-xs text-white`}
                            >
                                {item.title}
                                <MdCancel
                                    className='h-3 w-3 cursor-pointer fill-white'
                                    onClick={() => removeLabel(item)}
                                />
                            </label>
                        ))}
                    </div>
                    <ul className='flex gap-3 list-none'>
                        {colors.map((item, index) => (
                            <li
                                key={index}
                                style={{backgroundColor: item}}
                                className={`w-5 h-5 rounded-full cursor-pointer ${
                                    selectedColor === item
                                        ? 'shadow-md shadow-yellow-400'
                                        : ''
                                }`}
                                onClick={() => setSelectedColor(item)}
                            />
                        ))}
                    </ul>
                    <Editable
                        text='+ Add Label'
                        placeholder='Enter label text'
                        displayClass='w-fit'
                        onSubmit={(value) =>
                            addLabel({ color: selectedColor, title: value })
                        }
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <MdCheckBox className='h-4 w-4 fill-brown' />
                        <p className='font-bold text-xl'>Tasks</p>
                    </div>
                    <div className='w-full rounded-lg h-2 border border-solid border-brown'>
                        <div
                            className='h-full rounded-lg bg-green w-0 transition duration-200'
                            style={{
                                width: `${calculatePercent()}%`
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        {values.tasks?.map((item) => (
                            <div
                                key={item.id}
                                className='flex gap-2 items-center'
                            >
                                <input
                                    type='checkbox'
                                    className='h-4 w-4 outline-none cursor-pointer accent-green border-gray-300'
                                    defaultChecked={item.completed}
                                    onChange={(event) =>
                                        updateTask(
                                            item.id,
                                            event.target.checked
                                        )
                                    }
                                />
                                <p className={`flex-1 text-brown ${item.completed ? 'line-through' : ''}`}>
                                    {item.title}
                                </p>
                                <MdDelete className='h-4 w-4 cursor-pointer fill-brown' onClick={() => removeTask(item.id)} />
                            </div>
                        ))}
                    </div>
                    <Editable
                        text={'+ Add Task'}
                        placeholder='Enter task'
                        displayClass='w-fit'
                        onSubmit={addTask}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default CardInfo;
