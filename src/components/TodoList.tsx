import { type ITodo } from '../types';
import { TodoItem } from './TodoItem';

import { Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  todos: ITodo[];
  onRemoveTodo: (id: string) => void;
  onToggleTodo: (id: string, completed: boolean) => void;
}

export const TodoList: React.FC<Props> = props => {
  const todos = props.todos;
  const onRemoveTodo = props.onRemoveTodo;
  const onToggleTodo = props.onToggleTodo;
  return (
    <Droppable droppableId='todos'>
      {droppableProvided => (
        <ul
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className='todos all'
        >
          {todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {draggableProvided => (
                <TodoItem
                  draggableProvided={draggableProvided}
                  key={todo.id}
                  onRemoveTodo={onRemoveTodo}
                  onToggleTodo={onToggleTodo}
                  todo={todo}
                />
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
