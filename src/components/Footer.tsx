import { type FilterTodo } from '../types';

interface Props {
  onRemoveCompletedTodos: () => void;
  onChangeFilter: (newFilter: FilterTodo) => void;
  filter: FilterTodo;
  todosToCompleteCount: number;
}

export const Footer: React.FC<Props> = ({
  filter,
  todosToCompleteCount,
  onChangeFilter,
  onRemoveCompletedTodos,
}) => {
  return (
    <div className='card stat'>
      <p className='corner'>
        <span id='items-left'>{todosToCompleteCount}</span>{' '}
        {todosToCompleteCount !== 1 ? 'pending tasks' : 'pending task'}
      </p>
      <div className='filter'>
        <button
          onClick={() => {
            onChangeFilter('all');
          }}
          className={filter === 'all' ? 'on' : ''}
        >
          All
        </button>
        <button
          onClick={() => {
            onChangeFilter('to complete');
          }}
          className={filter === 'to complete' ? 'on' : ''}
        >
          Active
        </button>
        <button
          onClick={() => {
            onChangeFilter('completeds');
          }}
          className={filter === 'completeds' ? 'on' : ''}
        >
          Completed
        </button>
      </div>
      <div className='corner'>
        <button
          id='clear-completed'
          onClick={() => {
            onRemoveCompletedTodos();
          }}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};
