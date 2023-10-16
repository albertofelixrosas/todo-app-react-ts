import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  onCreateTodo: (value: string) => void;
}

export const TodoHeader: React.FC<Props> = props => {
  const onCreateTodo = props.onCreateTodo;
  const [value, setValue] = useLocalStorage<string>('todo-title', '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onCreateTodo(value);
    setValue('');
  };

  return (
    <div className='card add'>
      <div className='cb-container'>
        <button id='add-btn'>+</button>
      </div>
      <form className='txt-container' onSubmit={handleSubmit}>
        <label htmlFor='addt'>Create todo</label>
        <input
          type='text'
          className='txt-input'
          placeholder='Create a new todo...'
          spellCheck='false'
          autoComplete='off'
          id='addt'
          onChange={event => {
            const newValue = event.target.value;
            setValue(newValue);
          }}
          value={value}
        />
      </form>
    </div>
  );
};
