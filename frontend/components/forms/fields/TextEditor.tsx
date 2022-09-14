import { Fragment, useState, useEffect } from 'react'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { useController, UseControllerProps, FieldError } from 'react-hook-form'
// Constants
import { FETCH_TINY_API_KEY_ENDPOINT } from '../../../constants/urls'
import { getRestAPIHeaders } from '../../../utils/headers'


interface PropTypes extends IAllProps, UseControllerProps {
	name: string,
	defaultValue?: string,
	error?: FieldError,
	control?: any
}

const TextEditor = (props: PropTypes) => {
	const [apiKey, setApiKey] = useState('')
	const [fetchingApiKey, setFetchingApiKey] = useState(false);
	const [fetchError, setFetchError] = useState(false);
	const { name, control, defaultValue, error } = props
	const { field: { onChange, onBlur, value, ref } } = useController({
		name,
		control,
		rules: { required: true },
		defaultValue
	});

	useEffect(() => {
		if (!apiKey && !fetchingApiKey) {
			setFetchingApiKey(true)
			fetchApiKey()
		}
	}, [apiKey])

	const fetchApiKey = async () => {
		const result = await fetch(FETCH_TINY_API_KEY_ENDPOINT, {
			method: 'GET',
			headers: {
				...getRestAPIHeaders()
			},
		}).then(res => {
			if (res.ok) {
				return res.json()
			}
			return false
		})
		if (result) {
			setApiKey(result.key)
		} else {
			setFetchError(true)
		}
		setFetchingApiKey(false)
	}

	return apiKey
		? (
			<Fragment>
				<Editor
					apiKey={apiKey}
					disabled={fetchError}
					ref={ref}
					id="tinymce-editor"
					// plugins=""
					// toolbar=""
					tagName={name}
					onEditorChange={onChange}
					onBlur={onBlur}
					value={value}
					{...props}
				/>
			{error?.message &&
				<p className="error-text" id={`${name}-error`}>{error?.message}</p>
			}
			</Fragment>
		) : (
			<h2>Loading...</h2>
		)
}


export default TextEditor
