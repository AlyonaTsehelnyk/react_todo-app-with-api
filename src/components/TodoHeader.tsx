import classNames from 'classnames';
import React from 'react';
import { useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  addTodo: (newTodoTitle: string) => void;
  titleField: React.RefObject<HTMLInputElement>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onToggleAll: () => void;
  todos: Todo[];
}

export const TodoHeader: React.FC<Props> = ({
  titleField,
  title,
  setTitle,
  addTodo,
  onToggleAll,
  todos,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(title);
  };

  const everyCompletedTodo = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: everyCompletedTodo,
        })}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
      />

      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleField}
          value={title}
          onChange={event => setTitle(event.target.value.trimStart())}
        />
      </form>
    </header>
  );
};
