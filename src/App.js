import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import {StrictModeDroppable} from './StrictModeDroppable';

const finalSpaceCharacters = [
  {
    id: 'gary',
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

  const handleEnd =(result)=>{
    console.log(result);
    //result 매개변수에는 source 및 destination 와 같은 드래그 이벤트가 포함되어 있다.

    if(!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
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
