import { useState, createContext, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon'

interface AlertContext {
	sendAlert: Function,
}

export const AlertContext = createContext<AlertContext>({} as AlertContext)

interface Alert {
	id: string,
	type: string,
	message: string,
}

interface PropTypes {
	children: ReactNode
}

const AlertContextProvider = ({ children }: PropTypes) => {
	const [alerts, setAlerts] = useState<Alert[]>([])
	const sendAlert = (type: string, message: string) => {
		const alertId = uuidv4()
		setAlerts(prevState => [...prevState, { type, message, id: alertId }])
		setTimeout(() => {
			setAlerts(prevState => prevState.filter(alert => (alert.id !== alertId)))
		}, 3000)
	}
	
	const getAlertColour = (type: string) => {
		switch (type) {
			case 'success': return 'bg-green-400 text-white'
			case 'warning': return 'bg-yellow-400'
			case 'error': return 'bg-red-400 text-white'
			default: return 'bg-green-400 text-white'
		}
	}

	return (
		<AlertContext.Provider value={{ sendAlert }}>
			{alerts && 
				<div className="fixed z-popover w-full">
					{alerts.map(alert => (
						<div
							className={`p-4 mb-2 sm:mx-8 sm:my-4 rounded-lg shadow-lg ${getAlertColour(alert.type)}`}
							key={alert.id}
						>
							<div className="flex justify-between items-center">
								<p>{alert.message}</p>
								<div
									className="cursor-pointer pl-2"
									onClick={() => setAlerts(prevState => prevState.filter(alertState => (alertState.id !== alert.id)))}
								>
									<XMarkIcon className="w-8 h-8" />
								</div>
							</div>
						</div>
					))}
				</div>
			}
			{children}
		</AlertContext.Provider>
	)
}


export default AlertContextProvider
