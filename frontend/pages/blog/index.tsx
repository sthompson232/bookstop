import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
// Constants
import { BLOG_DETAIL_URL, BLOG_LIST_ENDPOINT } from '../../constants/urls';
import { BlogPostType } from '../../constants/types/blog';
// Utils
import { getUnauthorizedRestAPIHeaders } from '../../utils/headers';

interface Response {
  results: BlogPostType[],
  next: string | undefined,
  previous: string | undefined,
  count: number,
  total_pages: number,
}

interface PropTypes {
  response: Response,
}

const BlogPage: NextPage<PropTypes> = ({ response }: PropTypes) => (
  <>
    <Head>
      <title>Home | Blog</title>
      <meta name="description" content="Bookstop blog page" />
    </Head>
    <div className="container">
      <h1>Blog page</h1>
      {response.results && response.results.map((post) => {
        const blogPostId = post.id;
        if (blogPostId) {
          return (
            <div className="shadow rounded-lg p-3 my-3" key={blogPostId}>
              <Link href={`${BLOG_DETAIL_URL.replace('$(id)', blogPostId.toString()).replace('$(slug)', post.title)}`} passHref>
                {post.title}
              </Link>
            </div>
          );
        }
        return undefined;
      })}
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  let url = BLOG_LIST_ENDPOINT;

  if (context.query?.page) {
    url = `${BLOG_LIST_ENDPOINT}?page=${context.query.page}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...getUnauthorizedRestAPIHeaders(),
    },
  }).then((res) => res.json());
  return {
    props: {
      response,
    },
  };
};

export default BlogPage;
