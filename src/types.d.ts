interface ITodo {
  id: string;
  value: string;
  completed: boolean;
}

export type FilterTodo = 'all' | 'completeds' | 'to complete';
