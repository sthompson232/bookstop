import { forwardRef, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
// Local components
import Loader from './Loader';

interface PropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
}

/* eslint-disable no-unused-vars */
const Button = forwardRef(({ loading, type, ...props }: PropTypes, ref) => (
  <button
    {...props}
    type={type}
    className={props.className || classNames('btn', {
      'btn-loading': loading,
    })}
  >
    {loading
      && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center">
          <Loader fill="#fff" width={16} height={16} />
        </div>
      )}
    {props.children}
  </button>
));

Button.defaultProps = {
  loading: false,
  type: 'button',
};

export default Button;
