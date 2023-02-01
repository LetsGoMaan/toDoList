import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './TodoList.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    filter: FilterValuesType
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, eventStatus: boolean, todoListId: string) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)


    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.todoListId);
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

    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }

    const onAllClickHandler = () => {
        props.changeTodoListFilter("all", props.todoListId)
    };
    const onActiveClickHandler = () => {
        props.changeTodoListFilter("active", props.todoListId)
    }
    const onCompletedClickHandler = () => {
        props.changeTodoListFilter("completed", props.todoListId)
       };

    const changeStatusHandler = (tID: string, eventValue: boolean) => {
        props.changeTaskStatus(tID, eventValue, props.todoListId)
    }

    return <div>
        <h3>
            {props.title}
            <button onClick={removeTodoList}>X</button>
        </h3>
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

                    const onClickHandler = () => props.removeTask(t.id, props. todoListId)

                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(event)=>changeStatusHandler(t.id, event.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === 'all' ?
                styles.activeFilter : ''}>All</button>
            <button onClick={onActiveClickHandler} className={props.filter === 'active' ?
                styles.activeFilter : ''}>Active</button>
            <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ?
                styles.activeFilter : ''}>Completed</button>
        </div>
    </div>
}
