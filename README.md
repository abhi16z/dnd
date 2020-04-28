This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Drag And Drop

There are two action entities while dragging:
- Item which is being dragged
- Item where another item is being dropped

## Draggable

Draggable item fires some events which are being red by droppable items

- ondrag
- ondragstart

**Item becomes draggable only if it has two attributes**
1. draggable : which must be true
2. ondragstart: an event listener

## Drop Zone (droppable)

**Item becomes droppable only if it has following attributes**
1. ondragover: an event listener
2. ondrop: an event listener
