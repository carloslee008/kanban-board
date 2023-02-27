import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import Header from "./Components/Header";

const savedTasks = [
  { id: "task1", content: "Task 1" },
  { id: "task2", content: "Task 2" },
  { id: "task3", content: "Task 3" }
]

const columnList = {
  requested: {
    name: "Requested",
    items: savedTasks
  },
  toDo: {
    name: "TODO",
    items: []
  },
  inProgress: {
    name: "In Progress",
    items: []
  },
  done: {
    name: "Done",
    items: []
  }
};

function onDragEnd(result, columns, setColumns) {

  // Make sure we're moving the item
  if (!result.destination) return;
  const { source, destination } = result;

  // If dragged to another column
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
    // Else we're using the same column
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}


function App() {

  //Update the state
  const [columns, setColumns] = useState(columnList);
  return (
    <div>
      <Header />
      <div className="box">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div className="column-container" key={columnId}>
                <h2>{column.name}</h2>
                <div className="container-fluid">
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div className="column"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? "#e8ebe1" : "#c7e055"
                          }}
                        >
                        {column.items.map((task, index) => {
                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className="task"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#fbfff2"
                                        : "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                  {task.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}

                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
                
            )
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
