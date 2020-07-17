import React from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import numFormat from '@dwdarm/num-format/src/num-format';
import Skeleton from 'react-loading-skeleton';

const format = { k: 'K', m: 'M', b: 'B' }

const VideoCard = ({ video }) => (
  <article className="video-card">
    <div className="video-card-image">
      {video 
        ? <Link to={`/video/${video.id}`}>
            <figure className="image is-16by9 has-background-white-ter">
              <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title}
              />
            </figure>
            {video.contentDetails
              ? <span className="video-card-duration tag is-black">
                  {video.contentDetails.duration
                    .split(/PT|DT|P|H|M|S/)
                    .filter(e => e.length > 0)
                    .join(':')
                  }
                </span>
              : null
            }
          </Link>
         : <Skeleton style={{paddingTop:'56%'}} /> 
      }
    </div>
          
    <div className="video-card-content">
      <h3>
        {video
          ? <Link 
              className="subtitle is-6 has-text-black" to={`/video/${video.id}`}>
              <LinesEllipsis
                text={video.snippet.title}
                className="mb-2"
                maxLine='2'
                ellipsis='...'
                trimRight
                basedOn='letters'
              />
            </Link>
          : <Skeleton />
        }
      </h3>
      <>
        {video
          ? <LinesEllipsis
              className="is-size-7 has-text-grey"
              text={video.snippet.channelTitle}
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          : <Skeleton />
        }
      </>
      <>
        {video && video.statistics
          ? <LinesEllipsis
              className="is-size-7 has-text-grey"
              text={`${numFormat(video.statistics.viewCount, { format })} views`}
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          : null
        }
      </>
    </div>
          
  </article>
);

const VideoList = ({ data }) => (
  <div className="columns is-multiline">
    {(data.length > 0 ? data : Array.apply(0, Array(10))).map((e, i) => (
      <div 
        key={e ? e.id : i} 
        className="column is-one-quarter-tablet is-one-fifth-widescreen">
        <VideoCard video={e}/>
      </div>
    ))}
  </div>
);

const areEqual = (prevProps, nextProps) => {
  if (prevProps.data.length !== nextProps.data.length) {
    return false;
  }
  
  return true;
}

const MemoizedVideoList = React.memo(VideoList, areEqual);

export default MemoizedVideoList
