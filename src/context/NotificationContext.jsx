import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const showNotification = useCallback((message, type = 'info', ttl = 3500) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setNotifications((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => {
      removeNotification(id);
    }, ttl);
  }, [removeNotification]);

  const value = useMemo(
    () => ({ notifications, showNotification, removeNotification }),
    [notifications, showNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {notifications.map((note) => (
          <div key={note.id} className={`toast-item toast-${note.type}`}>
            <span>{note.message}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => removeNotification(note.id)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
