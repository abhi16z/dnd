import React from 'react';

export default function TodoView(props) {
  const { header, className, handleDragOver, handleDrop, todoItems, showAdd, isAddActive, toggleActive } = props;

  const onDragStart = (todoItem) => (ev) => {
    const dataTransfer = ev.dataTransfer;
    dataTransfer.setData('text/plain', JSON.stringify(todoItem));
  };

  return (
    <div className={className} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="status-header">{header}</div>
      <div>
        {todoItems.map((todoItem) => {
          return (
            <div className="todo-cards" draggable onDragStart={onDragStart(todoItem)} key={todoItem.id}>
              {todoItem.description}
            </div>
          );
        })}
      </div>
      {showAdd && !isAddActive && <button className="add-button" onClick={() => toggleActive(true)}>Add New</button>}
      {showAdd && isAddActive && (
        <div className="add-input-container">
          <textarea />
          <div className="add-input-button-container">
            <button className="cancel-button" onClick={() => toggleActive(true)}>Cancel</button>
            <button className="add-input-button" onClick={() => toggleActive(true)}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}