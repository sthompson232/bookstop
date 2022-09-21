
interface PropTypes {
	title: string,
	content: string,
}


const BlogPost = ({ title, content }: PropTypes) => (
	<div>
		{console.log(title, content)}
		<h1>{title}</h1>
		<div>{content}</div>
	</div>
)


export default BlogPost
