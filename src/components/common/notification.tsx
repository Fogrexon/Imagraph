import { createContext, ReactNode } from "react"

interface NotificationSettings {
  type: string;
  message: string;
}

interface NotificationProps {
  dispatchNotification: (settings: NotificationSettings) => void;
}

const NotificationContext = createContext<NotificationProps>(
  {
    dispatchNotification: () => null
  }
)

interface NotificationPrividerProps {
  children: ReactNode;
}
export const NotificationProvider = ({children}: NotificationPrividerProps) => {
  const dispatchNotification = ({type, message}: NotificationSettings) => {
    // TODO 通知機構
  }

  return (
    <NotificationContext.Provider value={{dispatchNotification}}>
      <div>通知</div>
      {children}
    </NotificationContext.Provider>
  )
}