import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {     ////// AT - это сокращение от Action Type
    type: "REMOVE-TODOLIST"
    payload: {
        todoListId: string
    }
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
    }
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {
        title: string
        todoListId: string
    }
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        todoListId: string
        filter: FilterValuesType
    }
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(el => el.id !== action.payload.todoListId)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodo: TodoListType = {
                id: newTodoListId,
                title: action.payload.title,
                filter: 'all'
            }
            return [...todoLists, newTodo]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
           return todoLists.map(el => el.id === action.payload.todoListId ? {...el, filter: action.payload.filter} : el)
        default:
            return todoLists
    }
}


///// Создаем Action Creator - функции по созданию ACTION


export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todoListId: id
        }
    }
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title
        }
    }
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title: title,
            todoListId: id
        }
    }
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todoListId: id,
            filter: filter
        }
    }
}