// context/NotificationContext.js
import { ReactNode, createContext, useState, useContext } from 'react';
import { Notification } from '@/types/notification';

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
    markAsRead: (id: number) => void;
  }

// Create the Notification Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Custom Hook to use Notification Context
export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
  };

  interface NotificationProviderProps {
    children: ReactNode;
  }
  
  export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
  
    const addNotification = (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    };
  
    const markAsRead = (id: number) => {
      setNotifications((prev) =>
        prev.map((notif) => (Number(notif._id) === id ? { ...notif, read: true } : notif))
      );
    };
  
    return (
      <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
        {children}
      </NotificationContext.Provider>
    );
  };