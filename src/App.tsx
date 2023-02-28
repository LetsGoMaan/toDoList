import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}


function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Whiskey", isDone: true},
            {id: v1(), title: "Coca-cola", isDone: true},
            {id: v1(), title: "Ice", isDone: false},
        ],
    })

    const changeTodoListFilter =(value: FilterValuesType, todoListId: string) => {
        const updatedTodoLists = todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el)
        setTodoLists(updatedTodoLists)
    }
    const changeTodoListTitle =(title: string, todoListId: string) => {
        const updatedTodoLists = todoLists.map(el => el.id === todoListId ? {...el, title: title} : el)
        setTodoLists(updatedTodoLists)
    }
    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists = todoLists.filter(el => el.id !== todoListId)
        setTodoLists(updatedTodoLists)
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodo: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const removeTask = (id: string, todoListId: string) => {
        // const taskForUpdate = tasks[todoListId]
        // const updatedTasks = taskForUpdate.filter(task => task.id !== id)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

        /// тоже самое что и внизу

        ///
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
    }
    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        const taskForUpdate = tasks[todoListId]
        const updatedTasks = [...taskForUpdate, newTask]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)
        /// тоже самое
        // setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
    }
    const changeTaskStatus = (taskID: string, eventStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskID ? {...el, isDone: eventStatus} : el)
        })
        const taskForUpdate = tasks[todoListId]
        const updatedTasks = taskForUpdate.map(el => el.id === taskID ? {...el, isDone: eventStatus} : el)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks

        setTasks(copyTasks)

        // setTasks(tasks.map(el => el.id === taskID
        //     ? {...el, isDone: eventStatus} : el))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskID ? {...el, title: title} : el)
        })
        const taskForUpdate = tasks[todoListId]
        const updatedTasks = taskForUpdate.map(el => el.id === taskID ? {...el, title: title} : el)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks

        setTasks(copyTasks)
    }

    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }


    const todoListComponents = todoLists.length
        ? todoLists.map(el => {
            const tasksForTodolist = getFilteredTasksForRender(tasks[el.id], el.filter)
            return (
                <Grid item>
                <Paper
                variant={"outlined"}
                sx={{p: "15px"}}
                >
                    <Todolist
                        filter={el.filter}
                        todoListId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
                </Grid>

            );
        })
        : <span>Create your first todoList</span>

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size = "large"
                        edge = "start"
                        color = "inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    )
}

export default App;
