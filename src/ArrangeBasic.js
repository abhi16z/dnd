import React from 'react';

export default function BasicDND() {
  const handleDrag = (id) => (ev) => {
  }

  const handleDragStart = (id) => (event) => {
    event.dataTransfer.setData("text/plain", id);
  }

  const handleDragEnd = (id) => (ev) => {
    ev.preventDefault();
  }

  const handleDragEnter = (id) => (ev) => {
    ev.preventDefault();
  }

  const handleDragLeave = (id) => (ev) => {
    ev.preventDefault();
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
    const data = ev.dataTransfer.getData("text/plain");
    
    const dropTarget = document.getElementById(id);
    const draggedElement = document.getElementById(data);
    
    // const eventCurrentTarget = ev.currentTarget;
    const eventTarget = ev.target;

    if (eventTarget.id === id) { // dragged somehwere in drag zone so handle it in usual way
      dropTarget.appendChild(draggedElement);
      return;
    }
    if(eventTarget.id === data) { // dragged on self so do nothing
      return;
    }
    // next line will be executed only if drop happened in the zone and on any other element inside the drop zone
    dropTarget.insertBefore(draggedElement, eventTarget);


  }



  return (
    <div>
      <div
        className="dragTarget"
        id="dragTarget2"
        onDragEnter={handleDragEnter('dragTarget2')}
        onDragLeave={handleDragLeave('dragTarget2')}
        onDragOver={handleDragOver('dragTarget2')}
        onDrop={handleDrop('dragTarget2')}
      >
        <div
          className="draggable"
          id="draggableA1"
          draggable
          onDrag={handleDrag('draggableA1')}
          onDragStart={handleDragStart('draggableA1')}
          onDragEnd={handleDragEnd('draggableA1')}
          onDragExit={handleDragExit('draggableA1')}
          onDrop={() => false}
          onDropOver={() => false}
        style={{backgroundColor: 'red'}}
        > 1 </div>
        <div
          className="draggable"
          id="draggableA2"
          draggable
          onDrag={handleDrag('draggableA2')}
          onDragStart={handleDragStart('draggableA2')}
          onDragEnd={handleDragEnd('draggableA2')}
          onDragExit={handleDragExit('draggableA2')}
          onDrop={() => false}
          onDropOver={() => false}
        style={{backgroundColor: 'green'}}
        > 2 </div>
        <div
          className="draggable"
          id="draggableA3"
          draggable
          onDrag={handleDrag('draggableA3')}
          onDragStart={handleDragStart('draggableA3')}
          onDragEnd={handleDragEnd('draggableA3')}
          onDragExit={handleDragExit('draggableA3')}
          onDrop={() => false}
          onDropOver={() => false}
        style={{backgroundColor: 'blue'}}
        > 3 </div>
      </div>
    </div>
  );
}