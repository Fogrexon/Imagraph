import React, { ReactNode } from 'react';
import { AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';

const typeValues = ['info', 'alert', 'warning'] as const
const typeStyles = {
  'info': 'bg-blue-200',
  'alert': 'bg-yellow-200',
  'warning': 'bg-red-200',
}
const typeIcons = {
  'info': <AiOutlineInfoCircle />,
  'alert': <AiOutlineWarning />,
  'warning': <AiOutlineWarning />,
}
export type AlertType = typeof typeValues[number];

export const Alert = ({children, type = 'info'}: { children: ReactNode, type?: AlertType }) => (
  <div className={`w-full flex shadow px-3 py-2 text-sm mx-0 my-1 rounded-md ${typeStyles[type]}`}>
    <div className="flex items-center flex-grow-0">{typeIcons[type]}</div><div className="flex-grow-1 mx-2">{children}</div>
  </div>
)
