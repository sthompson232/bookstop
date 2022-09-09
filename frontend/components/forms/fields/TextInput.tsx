import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'


interface PropTypes extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string,
	type: string,
	autoComplete: string,
	id?: string,
	placeholder?: string,
}

interface FormValues {
	[key: string]: any
}

const TextInput = (props: PropTypes) => {
	const { register, formState: { errors } }: FormValues = useFormContext()

	return (
		<div className="mb-2">
			<div className="relative my-1 rounded-md shadow-sm">
				<input
					{...props}
					className={classNames('block w-full rounded-md pr-10 focus:outline-none transition-all', {
						'text-input': !errors?.[`${props.name}`],
						'text-input-error': errors?.[`${props.name}`],
					})}
					aria-invalid="true"
					aria-describedby={`${props.name}-error`}
					{...register(props.name)}
				/>
					<div className={classNames('pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 transition-all', {
						'opacity-100': errors?.[`${props.name}`],
						'opacity-0': !errors?.[`${props.name}`]
					})}>
						<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
					</div>
			</div>
			{errors[`${props.name}`] &&
				<p className="error-text" id={`${props.name}-error`}>{errors?.[`${props.name}`].message}</p>
			}
		</div>
	)
}

export default TextInput
