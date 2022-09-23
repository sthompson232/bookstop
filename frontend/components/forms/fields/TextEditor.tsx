import { Fragment, useState, useEffect, useRef } from 'react'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { useController, UseControllerProps, FieldError } from 'react-hook-form'
// Local components
import Loader from '../../ui/Loader'
// Constants
import { FETCH_TINY_API_KEY_ENDPOINT, UPLOAD_TINYMCE_IMAGE_ENDPOINT } from '../../../constants/urls'
// Utils
import { getRestAPIHeaders } from '../../../utils/headers'
import { getCookie } from '../../../utils/cookies'


interface PropTypes extends IAllProps, UseControllerProps {
	name: string,
	defaultValue?: string,
	error?: FieldError,
	control?: any
}

const TextEditor = (props: PropTypes) => {
	const [apiKey, setApiKey] = useState('')
	const tinyMCERef = useRef<any>()
	const [fetchingApiKey, setFetchingApiKey] = useState(false);
	const [fetchError, setFetchError] = useState(false);
	const { name, control, error } = props
	const { field: { onChange, onBlur, value, ref } } = useController({
		name,
		control,
		rules: { required: true },
	});

	useEffect(() => {
		if (!apiKey && !fetchingApiKey) {
			setFetchingApiKey(true)
			fetchApiKey()
		}
	}, [apiKey])

	useEffect(() => {
		if (error) {
			tinyMCERef.current.notificationManager.open({
				text: error.message,
				type: 'warning',
				timeout: 2000,
			})
		}
	}, [error])

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
			<Editor
				apiKey={apiKey}
				disabled={fetchError}
				ref={ref}
				id="tinymce-editor"
				init={{
					height: '100%',
					images_file_types: 'jpeg,jpg,jif,jfif,png,gif,webp',
					images_upload_url: UPLOAD_TINYMCE_IMAGE_ENDPOINT,
					images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
						const token = 'Token ' + getCookie('token')
						const xhr = new XMLHttpRequest();
						xhr.open('POST', UPLOAD_TINYMCE_IMAGE_ENDPOINT, true)
						xhr.setRequestHeader('Authorization', token)

						xhr.upload.onprogress = (e) => {
							progress(Math.round(e.loaded / e.total * 100))
						};

						xhr.onload = () => {
							if (xhr.status === 403) {
								reject({ message: 'HTTP Error: ' + xhr.status, remove: true })
								return
							}
							if (xhr.status < 200 || xhr.status >= 300) {
								reject('HTTP Error: ' + xhr.status)
								return
							}
							const json = JSON.parse(xhr.responseText);
							if (!json || typeof json.location != 'string') {
								reject('Invalid JSON: ' + xhr.responseText)
								return
							}
							resolve(json.location);
						};

						xhr.onerror = () => {
							reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
						}

						const formData = new FormData()
						formData.append('file', blobInfo.blob(), blobInfo.filename())
						xhr.send(formData)
					}),
					// file_picker_callback: file_picker_callback,
					file_picker_types: 'image',
					menubar: 'insert format tools table',
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
				onInit={(e, editor) => tinyMCERef.current = editor}
				onEditorChange={onChange}
				onBlur={onBlur}
				value={value}
				{...props}
			/>
		) : (
			<div className="h-full flex justify-center items-center">
				<Loader width={48} height={48} />
			</div>
		)
}


export default TextEditor
