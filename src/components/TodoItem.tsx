import { type ITodo } from '../types';
import { type DraggableProvided } from 'react-beautiful-dnd';

interface Props {
  todo: ITodo;
  onRemoveTodo: (id: string) => void;
  onToggleTodo: (id: string, completed: boolean) => void;
  draggableProvided: DraggableProvided;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onRemoveTodo,
  onToggleTodo,
  draggableProvided,
}) => {
  return (
    <li
      {...draggableProvided.draggableProps}
      ref={draggableProvided.innerRef}
      {...draggableProvided.dragHandleProps}
      className='card'
    >
      <div className='cb-container'>
        <input
          className='cb-input'
          type='checkbox'
          onChange={event => {
            onToggleTodo(todo.id, event.target.checked);
          }}
          checked={todo.completed}
        />
        <span className='check'></span>
      </div>
      <p className='item'>{todo.value}</p>
      <button
        className='clear'
        type='button'
        onClick={() => {
          onRemoveTodo(todo.id);
        }}
      >
        <img src='/assets/icons/icon-cross.svg' alt='Clear it' />
      </button>
    </li>
  );
};
