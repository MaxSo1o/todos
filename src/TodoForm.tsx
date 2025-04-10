import React, { useState } from 'react';
import Arrow from '../public/arrow.svg'

interface TodoFormProps {
    onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [touchInput, setTouchInput] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    const handleInputTouch = () => {
        setTouchInput(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <img src={Arrow} alt="arrow" className={touchInput ? 'arrow active' : 'arrow'}/>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                onFocus={handleInputTouch}
                onBlur={() => setTouchInput(false)}
            />
        </form>
    );
};

export default TodoForm;