import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import {StrictModeDroppable} from './StrictModeDroppable';

const finalSpaceCharacters = [
  {
    id: 'gray',
    name: 'Gary Goodspeed'
  },
  {
    id: 'cato',
    name: 'Little Cato'
  },
  {
    id: 'ajw',
    name: 'AJW'
  },
]

function App() {

  const [characters, setCharacters] = useState(finalSpaceCharacters);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext>
          <StrictModeDroppable droppableId='characters'>
            {(provided)=>(
            <ul className="characters" 
            {...provided.droppableProps}
            ref = {provided.innerRef}
            >
              {
                characters.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) =>(
                    <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                      <p>
                        {name}
                      </p>
                    </li>)}
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
            </ul>)}
          </StrictModeDroppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
