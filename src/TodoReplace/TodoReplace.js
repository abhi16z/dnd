import React, { useState } from 'react';
import TodoContext from './todos.context';
import './todoReplace.css';

import * as STATUS from './status.constants';
import Views from './Views';

const defaultData = {
  [STATUS.TODO.value]: [
    {
      id: 1,
      description: 'todo 1',
      value: STATUS.TODO.value
    },
    {
      id: 2,
      description: 'todo 2',
      value: STATUS.TODO.value
    }
  ],
  [STATUS.BLOCKED.value]: [
    {
      id: 3,
      description: 'todo 3',
      value: STATUS.BLOCKED.value
    },
    {
      id: 4,
      description: 'todo 4',
      value: STATUS.BLOCKED.value
    }
  ],
  [STATUS.IN_PROGRESS.value]: [
    {
      id: 5,
      description: 'todo 5',
      value: STATUS.IN_PROGRESS.value
    },
    {
      id: 6,
      description: 'todo 6',
      value: STATUS.IN_PROGRESS.value
    }
  ],
  [STATUS.IN_REVIEW.value]: [
    {
      id: 7,
      description: 'todo 7',
      value: STATUS.IN_REVIEW.value
    },
    {
      id: 8,
      description: 'todo 8',
      value: STATUS.IN_REVIEW.value
    }
  ],
  [STATUS.DONE.value]: [
    {
      id: 9,
      description: 'todo 9',
      value: STATUS.DONE.value
    },
    {
      id: 10,
      description: 'todo 10',
      value: STATUS.DONE.value
    }
  ]
};

export default function TodoReplace() {
  const [todoList, setTodoList] = useState(defaultData);
  const [isAddActive, toggleActive] = useState(false);

  const handleAddNew = () => {

  };

  /////////////////////////////////////////////////////////////////////////////
  const updateTodo = ({todoItem, draggedTo}) => {
    const oldStatusValue = todoItem.value;
    const newStatusValue = draggedTo;
    
    const itemsInOldStatus = todoList[oldStatusValue].filter(item => item.id !== todoItem.id);
    const itemsInDraggedStatus = todoList[newStatusValue];
    itemsInDraggedStatus.push({
      ...todoItem,
      value: newStatusValue
    });

    setTodoList({
      ...todoList,
      [oldStatusValue]: itemsInOldStatus,
      [newStatusValue]: itemsInDraggedStatus
    });
  };

  const handleDragOver = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (statusValue) => (ev) => {
    ev.preventDefault();
    const todoItem = JSON.parse(ev.dataTransfer.getData('text/plain'));
    updateTodo({todoItem, draggedTo: statusValue});
  };

  return (
    <TodoContext.Provider value={{ todoList, updateTodo }}>
      <div style={{ height: window.innerHeight + 500 }}>
        <div className="header">
          TO DO App
        </div>
        <div className="view-container">
          <Views
            header="Backlog"
            handleDrop={handleDrop(STATUS.BLOCKED.value)}
            className="blocked-view-container"
            handleDragOver={handleDragOver}
            todoItems={todoList[STATUS.BLOCKED.value]}
          />
          <Views
            header="To Do"
            handleDrop={handleDrop(STATUS.TODO.value)}
            className="todo-view-container"
            handleDragOver={handleDragOver}
            todoItems={todoList[STATUS.TODO.value]}
            showAdd
            isAddActive={isAddActive}
            toggleActive={toggleActive}
          />
          <Views
            header="In Progress"
            handleDrop={handleDrop(STATUS.IN_PROGRESS.value)}
            className="inprogress-view-container"
            handleDragOver={handleDragOver}
            todoItems={todoList[STATUS.IN_PROGRESS.value]}
          />
          <Views
            header="In Review"
            handleDrop={handleDrop(STATUS.IN_REVIEW.value)}
            className="inreview-view-container"
            handleDragOver={handleDragOver}
            todoItems={todoList[STATUS.IN_REVIEW.value]}
          />
          <Views
            header="Done"
            handleDrop={handleDrop(STATUS.DONE.value)}
            className="done-view-container"
            handleDragOver={handleDragOver}
            todoItems={todoList[STATUS.DONE.value]}
          />
        </div>
      </div>
    </TodoContext.Provider>
  );
}
