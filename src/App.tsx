import React, { useState, useEffect } from 'react';
import { Todo, FilterType } from './types';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter.tsx';
import './App.css';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [filter, setFilter] = useState<FilterType>('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const editTodo = (id: string, newText: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    }

    return (
        <>
            <div className="container">
                <h1>todos</h1>
                <div className="todo-app">
                    <TodoForm onAdd={addTodo} />
                    <TodoList
                        todos={todos}
                        filter={filter}
                        onToggle={toggleTodo}
                        onEdit={editTodo}
                        onDelete={deleteTodo}
                    />
                    <TodoFooter
                        currentFilter={filter}
                        onFilterChange={setFilter}
                        clearCompleted={clearCompleted}
                        todos={todos}/>
                </div>
                <div className="back-lists1"></div>
                <div className="back-lists2"></div>
            </div>
        </>
    );
};

export default App;