import React, { useState } from 'react';
import { Todo } from './types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [todoFocus, setTodoFocus] = useState(false);

    const handleFocus = () => {
        setTodoFocus(true);
    };

    const handleEdit = () => {
        if (editText.trim()) {
            onEdit(todo.id, editText);
            setIsEditing(false);
        }
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`} onMouseEnter={handleFocus} onMouseLeave={() => setTodoFocus(false)}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleEdit}
                        onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
                        autoFocus
                    />
                    <button onClick={handleEdit}>Save</button>
                </>
            ) : (
                <>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                        className="checkbox-todos"
                    />
                    <span onDoubleClick={() => setIsEditing(true)}>{todo.text}</span>
                    {todoFocus ? (<button onClick={() => onDelete(todo.id)}>Delete</button>) : ''}
                </>
            )}
        </li>
    );
};

export default TodoItem;