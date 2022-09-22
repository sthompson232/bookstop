
interface PropTypes {
	title: string,
	content: string,
	publishDate: string,
}


const BlogPost = ({ title, content, publishDate }: PropTypes) => (
	<div className="max-w-5xl mx-auto">
		<h1 className="mb-24">{title}</h1>
		<small>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(publishDate))}</small>
		<div dangerouslySetInnerHTML={{ __html: content }}></div>
	</div>
)


export default BlogPost
