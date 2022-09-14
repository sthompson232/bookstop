import { FieldError, useController, UseControllerProps } from 'react-hook-form'
import classNames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'


interface PropTypes extends UseControllerProps, React.InputHTMLAttributes<HTMLInputElement> {
	name: string,
	defaultValue?: string,
	control?: any,
	error?: FieldError,
}

const TextInput = (props: PropTypes) => {
	const { name, control, defaultValue, error } = props
	const { field: { onChange, onBlur, ref } } = useController({
		name,
		control,
		defaultValue
	});

	return (
		<div className="mb-2">
			<div className="relative my-1 rounded-md shadow-sm">
				<input
					{...props}
					className={classNames('block w-full rounded-md pr-10 focus:outline-none transition-all', {
						'text-input': !error,
						'text-input-error': error,
					})}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					aria-invalid="true"
					aria-describedby={`${name}-error`}
				/>
					<div className={classNames('pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 transition-all', {
						'opacity-100': error,
						'opacity-0': !error
					})}>
						<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
					</div>
			</div>
			{error?.message &&
				<p className="error-text" id={`${name}-error`}>{error?.message}</p>
			}
		</div>
	)
}

export default TextInput
