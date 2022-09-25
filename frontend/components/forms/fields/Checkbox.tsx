import { FieldError, useController, UseControllerProps } from 'react-hook-form';
import classnames from 'classnames';

interface PropTypes extends UseControllerProps, React.InputHTMLAttributes<HTMLInputElement> {
  name: string,
  defaultValue?: string,
  control: any,
  error?: FieldError,
  label?: string,
}

const Checkbox = (props: PropTypes) => {
  const {
    control, defaultValue, error, name, label,
  } = props;
  const {
    field: {
      onChange, onBlur, ref, value,
    },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <div className="mb-2">
      <label htmlFor={name}>
        <div className="relative cursor-pointer inline">
          <input
            id={name}
            type="checkbox"
            name={name}
            className="sr-only peer group"
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
          <div className="flex items-center">
            <div
              className={classnames('relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent', {
                'bg-accent': value,
                'bg-gray-200': !value,
              })}
            >
              <div
                className={classnames('absolute pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out', {
                  'translate-x-5': value,
                  'translate-x-0': !value,
                })}
              />
            </div>
            {label
              && <p className="pl-2">{label}</p>}
          </div>
        </div>
      </label>
      {error?.message
        && <p className="error-text" id={`${name}-error`}>{error?.message}</p>}
    </div>
  );
};

Checkbox.defaultProps = {
  defaultValue: false,
  error: undefined,
  label: undefined,
};

export default Checkbox;
