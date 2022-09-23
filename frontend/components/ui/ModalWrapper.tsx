import { useEffect, useRef, ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

interface PropTypes {
  children: ReactNode,
  setShowModal: Function,
  fullScreen?: boolean,
}

const ModalWrapper = ({ children, setShowModal, fullScreen }: PropTypes) => {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    if (fullScreen) return;
    const handleClickOutside = (e: Event) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [fullScreen, modalRef, setShowModal]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-modal-backdrop">
      <div className={fullScreen ? 'w-full h-full' : ''} ref={modalRef}>
        <div
          className={classNames('bg-white p-4 z-modal', {
            'w-full h-full': fullScreen,
            'rounded-lg': !fullScreen,
          })}
        >
          <XMarkIcon
            onClick={() => setShowModal(false)}
            className="ml-auto w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-800 transition-all rounded-full hover:bg-gray-200"
          />
          {children}
        </div>
      </div>
    </div>
  );
};

ModalWrapper.defaultProps = {
  fullScreen: false,
};

export default ModalWrapper;
