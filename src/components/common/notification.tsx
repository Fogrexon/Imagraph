import { createContext, ReactNode, useState } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai";

interface NotificationSettings {
  type: NotificationType;
  message: string;
}

interface NotificationProps {
  dispatchNotification: (settings: NotificationSettings) => Promise<void>;
}

const NotificationContext = createContext<NotificationProps>(
  {
    dispatchNotification: async () => {},
  }
)

interface NotificationPrividerProps {
  children: ReactNode;
}

const notificationTypeList = ['alert', 'info', 'error'] as const;
type NotificationType = (typeof notificationTypeList)[number];

const notificationStyles = {
  alert: ['bg-yellow-100', 'border-yellow-500', 'text-yellow-900'],
  info: ['bg-blue-100', 'border-blue-500', 'text-blue-900'],
  error: ['bg-green-100', 'border-green-500', 'text-green-900'],
}
// notification component
const Notification = ({children, className, type}: {children: ReactNode, className: string, type: NotificationType}) => {
  if (!notificationTypeList.includes(type)) return <></>;
  const style = notificationStyles[type];

  return (
    <div className={`${className} z-50 w-full fixed transition-transform`}>
      <div className={`mx-auto my-5 w-90 z-50 max-w-lg w-full ${style[0]} border-t-4 ${style[1]} rounded-b ${style[2]} px-4 py-3 shadow-md`} role="alert">
        <div className="flex">
          <div className="mx-3 my-auto"><AiOutlineInfoCircle /></div>
          <div className="">
            <p className="font-bold">{children}</p>
          </div>
        </div>
      </div>
    </div>
  );

}

// wait used in async funciton
const wait = (time: number) => new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  })

export const NotificationProvider = ({children}: NotificationPrividerProps) => {
  const [message, setMessage] = useState('テストメッセージ');
  const [type, setType] = useState<NotificationType>('info');
  const [notificationClass, setNotificationClass] = useState('-translate-y-52');
  let messageId = -1;

  const dispatchNotification = async ({type: settingType, message: settingMessage}: NotificationSettings) => {
    setMessage(settingMessage);
    setType(settingType);
    const thisMessageId = Date.now();
    messageId = thisMessageId;
    
    setNotificationClass('translate-y-0');
    
    await wait(150 + 3000);
    if (messageId !== thisMessageId) return;
    setNotificationClass('-translate-y-52');
    await wait(150);
  }

  return (
    <NotificationContext.Provider value={{dispatchNotification}}>
      <Notification className={notificationClass} type={type}>{message}</Notification>
      {children}
    </NotificationContext.Provider>
  )
}