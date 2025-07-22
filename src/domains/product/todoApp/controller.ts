import {Request, Response, NextFunction} from 'express';
import { todoSchemaExport, todoMatchUserSchemaExport } from './model.js';
const todo = todoSchemaExport;


const home = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const todos = await todo.find();
        res.json(todos);
    } catch (e) {
        console.log(e);
    }
}
const getAllTodos = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let todos = await todo.find();

        if(todos) res.json(todos);

    } catch (error) {
        console.log(error);
    }
}


const todoMatchUser = todoMatchUserSchemaExport;

const addTodoUI = (req:Request, res:Response, next:NextFunction) => {
    try {

        res.json(new todo({
            todoTitle: "",
            todoSummary: "",
            todoContent: "",
            todoList: []
        }));

    } catch (error) {
        console.log(error);
        
    }
}

export {
    home,
    getAllTodos,
    addTodoUI
}