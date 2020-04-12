import React from 'react';

export default function TodoView(props) {
  const { header, className, handleDragOver, handleDrop, todoItems, showAdd, isAddActive, toggleActive, newDesc, setNewDesc, handleAddNew } = props;

  const onDragStart = (todoItem) => (ev) => {
    const dataTransfer = ev.dataTransfer;
    dataTransfer.setData('text/plain', JSON.stringify(todoItem));
  };

  const onCancel = () => {
    setNewDesc('')
    toggleActive(false);
  };

  return (
    <div className={className} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="status-header" >{header}</div>
      <div>
        {todoItems.map((todoItem) => {
          return (
            <div className="todo-cards" draggable onDragStart={onDragStart(todoItem)} key={todoItem.id}>
              {todoItem.description}
            </div>
          );
        })}
      </div>
      {showAdd && !isAddActive && <button className="primary-button" onClick={() => toggleActive(true)}>Add New</button>}
      {showAdd && isAddActive && (
        <div className="add-input-container">
          <textarea value={newDesc} onChange={ev => setNewDesc(ev.target.value)} autoFocus />
          <div className="add-input-button-container">
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
            <button className="add-input-button" onClick={handleAddNew}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}