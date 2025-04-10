import React from 'react';
import { Todo, FilterType } from './types';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    filter: FilterType;
    onToggle: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, filter, onToggle, onEdit, onDelete }) => {
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <ul className="todo-list">
            {filteredTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default TodoList;