import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import classNames from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
// Local components
import Button from '../../../components/ui/Button';
// Hooks
import { useBlogPost } from '../../../swr/hooks';
// Context
import { AlertContext } from '../../../components/alerts/AlertContextProvider';
// Constants
import {
  PORTAL_BLOG_DELETE_ENDPOINT, PORTAL_BLOG_EDIT_URL, PORTAL_BLOG_NEW_URL, PORTAL_BLOG_LIST_ENDPOINT,
} from '../../../constants/urls';
import Loader from '../../../components/ui/Loader';
import { getRestAPIHeaders } from '../../../utils/headers';
import { GENERIC_ERROR_MESSAGE } from '../../../constants/error-messages';
import { BlogPostType } from '../../../constants/types/blog';
// Utils
import { getBlogPostStatusText } from '../../../utils/blog';

const PortalBlogPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, mutate } = useBlogPost(`${PORTAL_BLOG_LIST_ENDPOINT}?page=${currentPage}`);
  const { sendAlert } = useContext(AlertContext);

  const deletePost = async (post: BlogPostType) => {
    const blogPostId = post.id;
    if (blogPostId) {
      const result = await fetch(`${PORTAL_BLOG_DELETE_ENDPOINT.replace('$(id)', blogPostId.toString())}/`, {
        method: 'DELETE',
        headers: {
          ...getRestAPIHeaders(),
        },
      });
      if (result.ok) {
        sendAlert('success', `Post deleted - ${post.title}`);
        mutate();
      } else {
        sendAlert('error', GENERIC_ERROR_MESSAGE);
      }
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < data.total_pages; i += 1) {
      if (Math.abs((i + 1) - currentPage) < 5) {
        pageNumbers.push(
          <button
            type="button"
            key={i}
            className={classNames('inline text-sm font-medium p-3 rounded transition-all', {
              'bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 cursor-pointer': currentPage !== i + 1,
              'bg-dark-green text-white': currentPage === i + 1,
            })}
            onClick={() => {
              if (currentPage !== i + 1) {
                setCurrentPage(i + 1);
              }
            }}
          >
            {i + 1}
          </button>,
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="container">
      <div className="flex justify-end">
        <Link href={PORTAL_BLOG_NEW_URL} passHref>
          <Button className="btn-secondary">
            New Post
          </Button>
        </Link>
      </div>
      {isLoading
        ? (
          <div className="flex justify-center items-center">
            <Loader width={48} height={48} />
          </div>
        ) : (
          <>
            <div className="rounded-lg shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        Status
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-6 text-left text-sm font-semibold text-gray-900 sm:pl-6 transition-all"
                    >
                      <div className="flex justify-end items-center">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data && data.results.map((post: BlogPostType, index: number) => {
                    if (post.id && post.status) {
                      return (
                        <tr
                          key={post.id}
                          className={classNames('border-y border-gray-100', {
                            'bg-gray-50': index % 2 !== 0,
                            'bg-white': index % 2 === 0,
                          })}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {post.title}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {getBlogPostStatusText(post.status)}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link href={PORTAL_BLOG_EDIT_URL.replace('$(id)', post.id.toString())} passHref>
                              <span className="link-text">
                                Edit
                              </span>
                            </Link>
                            <span className="text-dark-green"> | </span>
                            <button
                              className="link-text"
                              onClick={() => deletePost(post)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return undefined;
                  })}
                </tbody>
              </table>
            </div>

            <nav className="px-4 flex items-center justify-center sm:justify-between sm:px-0">
              <div className="hidden sm:flex w-0 flex-1">
                {currentPage > 1
                  && (
                    <button
                      onClick={() => {
                        setCurrentPage((prevState) => prevState - 1);
                      }}
                      className="bg-gray-50 hover:bg-gray-100 p-3 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 rounded transition-all"
                    >
                      <ArrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Previous
                    </button>
                  )}
              </div>
              {data.total_pages > 1
                && (
                  <div className="space-x-2">
                    {renderPageNumbers()}
                  </div>
                )}
              <div className="hidden sm:flex w-0 flex-1 justify-end">
                {currentPage < data.total_pages
                  && (
                    <button
                      onClick={() => {
                        setCurrentPage((prevState) => prevState + 1);
                      }}
                      className="bg-gray-50 hover:bg-gray-100 p-3 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 rounded transition-all"
                    >
                      Next
                      <ArrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                  )}
              </div>
            </nav>
          </>
        )}
    </div>
  );
};

export default PortalBlogPage;
