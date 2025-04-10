import React from 'react';
import { FilterType } from './types';

interface TodoFilterProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    clearCompleted: () => void;
    todos: { id: string; text: string; completed: boolean }[];
}

const TodoFooter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange, clearCompleted, todos }) => {
    const filters: FilterType[] = ['all', 'active', 'completed'];

    const ActiveTodos = todos.filter(todo => !todo.completed).length;

    return (
        <>
            <div className="todo-footer">
                <span>{ActiveTodos} items left</span>

                <div className="filters">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={currentFilter === filter ? 'active' : ''}
                            onClick={() => onFilterChange(filter)}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
                <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
            </div>
        </>
    );
};

export default TodoFooter;