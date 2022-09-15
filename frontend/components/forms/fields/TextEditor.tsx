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
					init={{
						menubar: 'edit insert format tools table',
						menu: {
							file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
							edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
							view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
							insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
							format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
							tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount | preview | fullscreen' },
							table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
							help: { title: 'Help', items: 'help' }
						},
						toolbar_mode: 'wrap',
					}}
					plugins="preview wordcount autolink emoticons fullscreen image link lists media table"
					toolbar="undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | media image link | fullscreen"
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
