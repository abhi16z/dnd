import React, { useState, useEffect } from 'react';
import TodoContext from './todos.context';
import './todoReplace.css';

import * as STATUS from './status.constants';
import Views from './Views';

import { getDataFromLocalStorage, saveDataInLocalStorage } from './localStorage.utils';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const defaultData = {
  [STATUS.TODO.value]: [],
  [STATUS.BLOCKED.value]: [],
  [STATUS.IN_PROGRESS.value]: [],
  [STATUS.IN_REVIEW.value]: [],
  [STATUS.DONE.value]: []
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function TodoReplace() {
  const [todoList, setTodoList] = useState(defaultData);
  const [isAddActive, toggleActive] = useState(false);
  const [newDesc, setNewDesc] = useState('');

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const data = getDataFromLocalStorage() || {}; // if null then default {}
    const keys = Object.keys(data);
    if (keys.includes(STATUS.BLOCKED.value) && keys.includes(STATUS.TODO.value) && keys.includes(STATUS.IN_PROGRESS.value) && keys.includes(STATUS.IN_REVIEW.value) && keys.includes(STATUS.DONE.value)) {
      setTodoList(data);
    }
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleAddNew = () => {
    const newTodo = {
      id: (new Date()).getTime(),
      description: newDesc,
      value: STATUS.TODO.value
    };

    const tempTodoList = {
      ...todoList
    };

    tempTodoList[STATUS.TODO.value].push(newTodo);

    setTodoList(tempTodoList);
    setNewDesc('');
    toggleActive(false);
    saveDataInLocalStorage(tempTodoList);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const updateTodo = ({ todoItem, draggedTo }) => {
    const oldStatusValue = todoItem.value;
    const newStatusValue = draggedTo;

    const itemsInOldStatus = todoList[oldStatusValue].filter(item => item.id !== todoItem.id);
    const itemsInDraggedStatus = todoList[newStatusValue];
    itemsInDraggedStatus.push({
      ...todoItem,
      value: newStatusValue
    });

    const tempTodoLost = {
      ...todoList,
      [oldStatusValue]: itemsInOldStatus,
      [newStatusValue]: itemsInDraggedStatus
    };

    setTodoList(tempTodoLost);
    saveDataInLocalStorage(tempTodoLost);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleDragOver = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (statusValue) => (ev) => {
    ev.preventDefault();
    const todoItem = JSON.parse(ev.dataTransfer.getData('text/plain'));
    updateTodo({ todoItem, draggedTo: statusValue });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <TodoContext.Provider value={{ todoList, updateTodo }}>
      <div style={{ height: window.innerHeight + 500 }}>
        <div className="header">
          TASK LIST
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
            newDesc={newDesc}
            setNewDesc={setNewDesc}
            handleAddNew={handleAddNew}
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
