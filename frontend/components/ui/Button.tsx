import classNames from 'classnames'
// Local components
import Loader from './Loader'


interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
}


const Button = ({ loading, ...props }: PropTypes) => (
	<button
		{...props}
		type={props.type || 'button'}
		className={props.className || classNames('btn', {
			'btn-loading': loading,
		})}
	>
		{loading &&
		<div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center">
			<Loader fill="#fff" width={16} height={16} />
		</div>
		}
		{props.children}
	</button>
)

export default Button
