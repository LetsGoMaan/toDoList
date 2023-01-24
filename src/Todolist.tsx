import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './TodoList.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, eventStatus: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [buttonName, setButtonName] = useState <FilterValuesType>('all')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {props.changeFilter("all")
    setButtonName('all')
    };
    const onActiveClickHandler = () => {props.changeFilter("active")
        setButtonName('active')};
    const onCompletedClickHandler = () => {props.changeFilter("completed")
        setButtonName('completed')};

    const changeStatusHandler = (tID: string, eventValue: boolean) => {
        props.changeStatus(tID, eventValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? styles.error : ''}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(event)=>changeStatusHandler(t.id, event.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={buttonName === 'all' ?
                styles.activeFilter : ''}>All</button>
            <button onClick={onActiveClickHandler} className={buttonName === 'active' ?
                styles.activeFilter : ''}>Active</button>
            <button onClick={onCompletedClickHandler} className={buttonName === 'completed' ?
                styles.activeFilter : ''}>Completed</button>
        </div>
    </div>
}
