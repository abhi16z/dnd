import React from 'react';
import './basic.css';

export default function BasicDND() {
  const handleDrag = (id) => (ev) => {
  }

  const handleDragStart = (id) => (event) => {


    console.log('%c handleDragStart', 'color: red', id, event.target.id);
    // event.dataTransfer.dropEffect = "link";
    event.dataTransfer.setData("text/plain", id);
    // const ele = document.getElementById(id);
    // ele.remove();
  }

  const handleDragEnd = (id) => (ev) => {
    ev.preventDefault();

    console.log('%c handleDragEnd', 'color: red', id, ev.target.id);
  }

  const handleDragEnter = (id) => (ev) => {
    ev.preventDefault();

    console.log('%c handleDragEnter', 'color: blue', id, ev.target.id);
  }

  const handleDragLeave = (id) => (ev) => {
    ev.preventDefault();

    console.log('%c handleDragLeave', 'color: blue', id, ev.target.id);
  }

  const handleDragExit = (id) => (ev) => {
    ev.preventDefault();

    console.log('handleDragExit', id, ev.target.id);
  }

  const handleDragOver = (id) => (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  }

  const handleDrop = (id) => (ev) => {
    console.log('%c handleDrop new', 'color: blue', id, ev.target.id);
    const data = ev.dataTransfer.getData("text/plain");

    const dropTarget = document.getElementById(id);
    const dragTarget = document.getElementById(data);

    dropTarget.appendChild(dragTarget);
  }



  return (
    <div style={{display: 'flex'}}>
      <div
        className="draggable"
        id="draggable1"
        draggable
        onDrag={handleDrag('draggable1')}
        onDragStart={handleDragStart('draggable1')}
        onDragEnd={handleDragEnd('draggable1')}
        onDragExit={handleDragExit('draggable1')}
      > 1 </div>
      <div
        className="draggable"
        id="draggable2"
        draggable
        onDrag={handleDrag('draggable2')}
        onDragStart={handleDragStart('draggable2')}
        onDragEnd={handleDragEnd('draggable2')}
        onDragExit={handleDragExit('draggable2')}
      > 2 </div>
      <div
        className="draggable"
        id="draggable3"
        draggable
        onDrag={handleDrag('draggable3')}
        onDragStart={handleDragStart('draggable3')}
        onDragEnd={handleDragEnd('draggable3')}
        onDragExit={handleDragExit('draggable3')}
      > 3 </div>
      <div
        className="dragTarget"
        id="dragTarget1"
        onDragEnter={handleDragEnter('dragTarget1')}
        onDragLeave={handleDragLeave('dragTarget1')}
        onDragOver={handleDragOver('dragTarget1')}
        onDrop={handleDrop('dragTarget1')}
      ></div>
    </div>
  );
}