import { useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'


interface PropTypes {
	children: React.ReactNode,
	setShowModal: Function,
	fullScreen?: boolean, 
}

const ModalWrapper = ({ children, setShowModal, fullScreen }: PropTypes) => {
	const modalRef = useRef<any>(null)

	useEffect(() => {
		if (fullScreen) return
		const handleClickOutside = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setShowModal(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [fullScreen, modalRef])

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-modal-backdrop">
			<div className={fullScreen ? "w-full h-full" : ""} ref={modalRef}>
				<div
					className={classNames("bg-white p-4 z-modal", {
						"w-full h-full": fullScreen,
						"rounded-lg": !fullScreen,
					})}
				>
					<div className="ml-auto w-8 h-8 cursor-pointer" onClick={() => setShowModal(false)}><XMarkIcon /></div>
						{children}
				</div>
			</div>
		</div>
	)
}

ModalWrapper.defaultProps = {
	fullScreen: false,
}


export default ModalWrapper
