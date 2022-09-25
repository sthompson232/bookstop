import {
  useCallback, useState, createContext, ReactNode, useMemo,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';

interface AlertContextType {
  sendAlert: Function,
}

interface Alert {
  id: string,
  type: string,
  message: string,
}

interface PropTypes {
  children: ReactNode,
}

export const AlertContext = createContext<AlertContextType>({} as AlertContextType);

const AlertContextProvider = ({ children }: PropTypes) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const sendAlert = useCallback((type: string, message: string) => {
    const alertId = uuidv4();
    setAlerts((prevState) => [...prevState, { type, message, id: alertId }]);
    setTimeout(() => {
      setAlerts((prevState) => prevState.filter((alert) => (alert.id !== alertId)));
    }, 3000);
  }, []);

  const getAlertColour = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-400 text-white';
      case 'warning': return 'bg-yellow-400';
      case 'error': return 'bg-red-400 text-white';
      default: return 'bg-green-400 text-white';
    }
  };

  const value = useMemo(() => ({ sendAlert }), [sendAlert]);

  return (
    <AlertContext.Provider value={value}>
      {alerts
        && (
          <div className="fixed z-popover w-full">
            {alerts.map((alert) => (
              <div
                className={`p-4 mb-2 sm:mx-8 sm:my-4 rounded-lg shadow-lg ${getAlertColour(alert.type)}`}
                key={alert.id}
              >
                <div className="flex justify-between items-center">
                  <p>{alert.message}</p>
                  <button
                    type="button"
                    className="cursor-pointer pl-2"
                    onClick={() => setAlerts((prevState) => (
                      prevState.filter((alertState) => (alertState.id !== alert.id))
                    ))}
                  >
                    <XMarkIcon className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
