import { useCallback, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
import { LinkIcon } from '@heroicons/react/20/solid';
// Local components
import Loader from '../ui/Loader';
// Constants
import { IMAGES_VIEWSET_LIST_ENDPOINT } from '../../constants/urls';
import { getRestAPIHeaders } from '../../utils/headers';

interface ImageState {
  file: string,
  height: number,
  id: number,
  uploaded_on: string,
  user: number,
  width: number,
}

const ImageBrowser = () => {
  const [page, setPage] = useState(`${IMAGES_VIEWSET_LIST_ENDPOINT}?page=1`);
  const [fetching, setFetching] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [images, setImages] = useState<ImageState[] | []>([]);
  const [imageCopied, setImageCopied] = useState<number | null>();

  const fetchPage = useCallback(async (firstPage: boolean) => {
    if (!pageLoading && page && !fetching) {
      setPageLoading(true);
      const response = await fetch(page, {
        method: 'GET',
        headers: {
          ...getRestAPIHeaders(),
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return false;
      });
      if (response) {
        if (firstPage) {
          setImages(response.results);
        } else {
          setImages((prevState) => [...prevState, ...response.results]);
        }
        setPage(response.next);
      }
      setPageLoading(false);
      setFetching(false);
    }
  }, [fetching, page, pageLoading]);

  useEffect(() => {
    if (!images.length && !fetching) {
      setFetching(true);
      fetchPage(true);
    }
  }, [fetching, fetchPage, images]);

  useEffect(() => {
    if (!imageCopied) return;
    const copyTimer = setTimeout(() => {
      setImageCopied(null);
    }, 2000);
    return () => {
      clearTimeout(copyTimer);
    };
  }, [imageCopied]);

  return (
    <div className="flex flex-col-reverse relative overflow-y-auto">
      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          if (!fetching) {
            fetchPage(false);
          }
        }}
        hasMore={!!page}
        height={400}
        loader={(
          <div className="flex justify-center items-center py-3">
            <Loader width={48} height={48} />
          </div>
        )}
        endMessage={(
          <p className="text-center font-bold my-0">End of images</p>
        )}
      >
        <div className="flex flex-wrap">
          {images.length && images.map((image) => (
            <div className="relative w-1/2 2xl:w-1/3 p-1" key={image.id}>
              <img
                className={classNames('object-cover aspect-square m-0 cursor-pointer transition-all hover:brightness-90 rounded', {
                  'hover:brightness-100': imageCopied === image.id,
                })}
                onClick={() => {
                  const permissionName = 'clipboard-write' as PermissionName;
                  navigator.permissions.query({ name: permissionName }).then((result) => {
                    if (result.state === 'granted' || result.state === 'prompt') {
                      navigator.clipboard.writeText(image.file);
                      setImageCopied(image.id);
                    }
                  });
                }}
                src={image.file}
                alt={image.id.toString()}
              />
              <div className="absolute top-0 left-0 w-full h-full p-1 pointer-events-none">
                <div
                  className={classNames('flex justify-center items-center rounded text-white w-full h-full bg-black/50 transition-all duration-500', {
                    'opacity-100': imageCopied === image.id,
                    'opacity-0': imageCopied !== image.id,
                  })}
                >
                  <span>
                    <LinkIcon />
                    <p className="text-white my-0">Copied</p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ImageBrowser;
