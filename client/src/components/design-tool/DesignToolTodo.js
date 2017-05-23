import React from 'react'

import Interactive from 'components/Interactable'

import './design-tool-styles/DesignToolTodo.css';

const draggableOptions = {
  onmove: event => {
    const target = event.target
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    
    // translate the element
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'
    
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
}

  const getTextDecoration = function(index, isCompleteArray) {
    return isCompleteArray[index] ? { textDecoration: "line-through"} : {};
  }

export default function DesignToolTodo() {
  return (
    <Interactive draggable draggableOptions={draggableOptions}>
      <div className="todo">
        <h2>Modules To Add</h2>
          <ul>
            <li style={getTextDecoration(0, [true])}>USB Standard-A Jack</li>
            <li>MicroSD Card</li>
            <li>HDMI Connector</li>
            <li>Tactile Switch</li>
            <li>LED</li>
          </ul>
        <span>Exit Tutorial</span>
      </div>
    </Interactive>
  );
}