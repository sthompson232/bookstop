import sanitizeHtml from 'sanitize-html';
import { UserType } from '../../constants/types/accounts';

interface PropTypes {
  title: string,
  content: string,
  publishDate: string,
  user?: UserType,
}

/* eslint-disable-next-line object-curly-newline */
const BlogPost = ({ title, content, publishDate, user }: PropTypes) => {
  const renderSubtitleText = () => {
    const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(publishDate));
    const fullName = user
      ? `${user?.first_name} ${user.last_name}`
      : '';
    return (
      <small>
        {date}
        {fullName && ' - '}
        {fullName}
      </small>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="mb-24">{title}</h1>
      {renderSubtitleText()}
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
    </div>
  );
};

BlogPost.defaultProps = {
  user: undefined,
};

export default BlogPost;
