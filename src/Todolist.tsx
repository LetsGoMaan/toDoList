import React from 'react';
import {FilterValuesType} from './App';
import classes from './TodoList.module.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export function Todolist(props: PropsType) {

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

    const addTask = (title: string) => props.addTask(title, props.todoListId)

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <button onClick={removeTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todoListId)
                    }

                    return <li key={t.id} className={t.isDone ? classes.isDone : ''}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === 'all' ?
                classes.activeFilter : ''}>All
            </button>
            <button onClick={onActiveClickHandler} className={props.filter === 'active' ?
                classes.activeFilter : ''}>Active
            </button>
            <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ?
                classes.activeFilter : ''}>Completed
            </button>
        </div>
    </div>
}
