import React from "react";
import {FilterValuesType} from "./App";
import classes from "./TodoList.module.css";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

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

    return <div >
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton
                onClick={removeTodoList}
                size={"small"}
                color={"primary"}
            >
                <DisabledByDefaultIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todoListId)
                    }

                    return <li key={t.id} className={t.isDone ? classes.isDone : ""}>
                        <Checkbox checked={t.isDone}
                                  onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}
                                  size={"small"}
                        />
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <IconButton
                            onClick={onClickHandler}
                            size={"small"}
                            color={"primary"}
                        >
                            <DisabledByDefaultIcon/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>
            <Button

                variant={"contained"}
                sx={{mr: "2px"}}
                size={"small"}
                color={props.filter === "all" ?
                    "secondary" : "primary"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                sx={{mr: "2px"}}
                variant={"contained"}
                size={"small"}
                color={props.filter === "active" ?
                    "secondary" : "primary"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant={"contained"}
                size={"small"}
                color={props.filter === "completed" ?
                    "secondary" : "primary"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
