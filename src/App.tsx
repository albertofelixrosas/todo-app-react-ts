import { DragDropContext } from 'react-beautiful-dnd';
import { type FilterTodo, type ITodo } from './types';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoHeader } from './components/TodoHeader';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { useEffect } from 'react';

const reorder = (
  list: ITodo[],
  startIndex: number,
  endIndex: number,
): ITodo[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', []);
  const [filter, setFilter] = useLocalStorage<FilterTodo>('filter', 'all');
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>(
    'dark-theme',
    false,
  );

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
    }
  }, [isDarkTheme]);

  const handleDarkTheme = (isDarkTheme: boolean): void => {
    setIsDarkTheme(isDarkTheme);
  };

  const handleCreateTodo = (value: string): void => {
    const id = crypto.randomUUID().toString();
    const newTodo: ITodo = {
      id,
      completed: false,
      value,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const handleRemoveTodo = (idToRemove: string): void => {
    const newTodos = todos.filter(todo => todo.id !== idToRemove);
    setTodos(newTodos);
  };

  const handleCompletedTodo = (
    idToUpdate: string,
    completedValue: boolean,
  ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id !== idToUpdate) {
        return todo;
      }
      return {
        ...todo,
        completed: completedValue,
      };
    });
    setTodos(newTodos);
  };

  const handleRemoveCompletedTodos = (): void => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  const handleOnChangeFilter = (newFilter: FilterTodo): void => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completeds') return todo.completed;
    if (filter === 'to complete') return !todo.completed;
    return todo;
  });

  const todosToCompleteCount = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <Header isDarkTheme={isDarkTheme} onSetDarkTheme={handleDarkTheme} />
      <DragDropContext
        onDragEnd={result => {
          const { source, destination } = result;
          if (destination == null) {
            return;
          }
          if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
          ) {
            return;
          }

          setTodos(reorder(todos, source.index, destination.index));
        }}
      >
        <TodoHeader onCreateTodo={handleCreateTodo} />
        <TodoList
          todos={filteredTodos}
          onRemoveTodo={handleRemoveTodo}
          onToggleTodo={handleCompletedTodo}
        />
        <Footer
          todosToCompleteCount={todosToCompleteCount}
          filter={filter}
          onRemoveCompletedTodos={handleRemoveCompletedTodos}
          onChangeFilter={handleOnChangeFilter}
        />
      </DragDropContext>
      <footer>
        <p>Drag and drop to reorder list</p>
      </footer>
    </>
  );
};

export default App;
