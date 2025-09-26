import React, { useState, useRef } from 'react';

function TodoListWidget() {
  // Use our injected storage hooks - these will automatically re-render when storage changes
  const [todoItems, setTodoItems] = useStorage('todo-items', []);
  const [newTodoText, setNewTodoText] = useStorage('new-todo-text', '');
  const inputRef = useRef(null);
  
  // Add new todo item
  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodoItems([...todoItems, newTodo]);
      setNewTodoText('');
      inputRef.current?.focus();
    }
  };
  
  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodoItems(todoItems.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo item
  const deleteTodo = (id) => {
    setTodoItems(todoItems.filter(todo => todo.id !== id));
  };
  
  // Clear completed todos
  const clearCompleted = () => {
    if (confirm('Clear all completed todos?')) {
      setTodoItems(todoItems.filter(todo => !todo.completed));
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  // Auto-focus on mount
  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);
  
  const completedCount = todoItems.filter(todo => todo.completed).length;
  const totalCount = todoItems.length;
  
  return (
    <div style={{
      margin: 0,
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#374151'
        }}>
          ✅ Todo List
        </div>
        <div style={{
          marginLeft: 'auto',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          {completedCount}/{totalCount}
        </div>
      </div>
      
      {/* Add new todo input */}
      <div style={{
        display: 'flex',
        marginBottom: '12px',
        gap: '8px'
      }}>
        <input
          ref={inputRef}
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            background: 'white'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            background: '#3b82f6',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Add
        </button>
      </div>
      
      {/* Todo list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        maxHeight: '150px'
      }}>
        {todoItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '14px',
            padding: '20px'
          }}>
            No todos yet. Add one above!
          </div>
        ) : (
          todoItems.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #f3f4f6'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{
                  marginRight: '8px',
                  cursor: 'pointer'
                }}
              />
              <span style={{
                flex: 1,
                fontSize: '14px',
                color: todo.completed ? '#9ca3af' : '#374151',
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: '4px 8px',
                  border: 'none',
                  borderRadius: '4px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* Clear completed button */}
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          style={{
            marginTop: '12px',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            background: '#f3f4f6',
            color: '#6b7280',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Clear Completed ({completedCount})
        </button>
      )}
    </div>
  );
}

// Export the widget component - the injection script will handle rendering
export default TodoListWidget;