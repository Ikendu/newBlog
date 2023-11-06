//import { formatISO9075 } from 'date-fns'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Link } from 'react-router-dom'

import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  return (
    <div className='post'>
      <div className='image'>
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover} />
        </Link>
      </div>

      <div className='texts'>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <a className='author'>{author?.name}</a>
          {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
          <ReactTimeAgo date={createdAt} locale='en-US' />
        </p>
        <Link to={`/post/${_id}`}>
          <p className='summary'>{summary}</p>
        </Link>
      </div>
    </div>
  )
}
export default Post
