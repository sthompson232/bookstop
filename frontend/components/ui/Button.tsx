import { forwardRef, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
// Local components
import Loader from './Loader';

interface PropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const Button = forwardRef(({ loading, type, ...props }: PropTypes, ref) => (
  <button
    {...props}
    type={type}
    className={props.className || 'btn'}
    disabled={props.disabled || loading}
  >
    <div>
      <span
        className={classNames('', {
          'invisible': loading,
        })}
      >
        {props.children}
      </span>
      {loading &&
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader fill="#fff" width={16} height={16} />
        </div>
      }
</div>
  </button>
));

Button.defaultProps = {
  loading: false,
  type: 'button',
};

export default Button;
