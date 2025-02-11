import React, { useState } from 'react'

const MAX_TITLE_LENGTH = 20 // Define the maximum title length

function App() {
  const [todos, setTodos] = useState([])
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [newTodoNote, setNewTodoNote] = useState('')
  const [selectedNote, setSelectedNote] = useState(null)

  const handleTitleInputChange = (event) => {
    setNewTodoTitle(event.target.value)
  }

  const handleNoteInputChange = (event) => {
    setNewTodoNote(event.target.value)
  }

  const addTodo = () => {
    if (newTodoTitle.trim() !== '') {
      setTodos([...todos, { title: newTodoTitle, note: newTodoNote, completed: false }])
      setNewTodoTitle('')
      setNewTodoNote('')
    }
  }

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, idx) => {
      if (idx === index) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index)
    setTodos(updatedTodos)
  }

  const openNoteModal = (note) => {
    setSelectedNote(note)
  }

  const closeNoteModal = () => {
    setSelectedNote(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-400 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">My Todo List</h1>
            </div>
            <div className="divide-y divide-gray-300">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={`Todo Title (Max ${MAX_TITLE_LENGTH} chars)`}
                    value={newTodoTitle}
                    onChange={handleTitleInputChange}
                    maxLength={MAX_TITLE_LENGTH}
                  />
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Internal Note"
                    value={newTodoNote}
                    onChange={handleNoteInputChange}
                    rows="3"
                  ></textarea>
                  <button
                    className="bg-gradient-to-r from-blue-400 to-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    onClick={addTodo}
                  >
                    Add Todo
                  </button>
                </div>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="mt-4">
                  {todos.map((todo, index) => (
                    <li key={index} className="py-3 flex justify-between items-center border-b border-gray-200" style={{ width: '100%' }}>
                      <div className="flex items-center" style={{ minWidth: '60%' }}>
                        <input
                          type="checkbox"
                          className="mr-3 form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                          checked={todo.completed}
                          onChange={() => toggleComplete(index)}
                        />
                        <span className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : ''} text-lg`} style={{ display: 'inline-block', width: 'auto', minWidth: '120px' }}>{todo.title}</span>
                      </div>
                      <div className="flex items-center" style={{ minWidth: '160px', justifyContent: 'flex-end' }}>
                        {todo.note && todo.note.length > 0 ? (
                          <button
                            className="flex items-center justify-center bg-green-400 hover:bg-green-500 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 text-sm h-8"
                            style={{ width: '80px', minWidth: '80px', fontFamily: 'Arial, sans-serif' }}
                            onClick={() => openNoteModal(todo.note)}
                          >
                            Read Note
                          </button>
                        ) : (
                          <div style={{ width: '80px', minWidth: '80px', marginRight: '82px' }}></div>
                        )}
                        <button
                          className="flex items-center justify-center bg-red-400 hover:bg-red-500 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm h-8"
                          style={{ width: '80px', minWidth: '80px', fontFamily: 'Arial, sans-serif' }}
                          onClick={() => deleteTodo(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedNote && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                  Note
                </h3>
                <div className="mt-3">
                  <p className="text-lg text-gray-700">
                    {selectedNote}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeNoteModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
