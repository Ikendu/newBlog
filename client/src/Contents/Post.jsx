import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const Post = ({ title, summary, content, cover, createdAt }) => {
  return (
    <div className='post'>
      <div className='image'>
        <img src={cover} />
      </div>
      <div className='texts'>
        <h2>{title}</h2>
        <p className='info'>
          <a href='' className='author'>
            Younglife Ike
          </a>
          {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
          <ReactTimeAgo date={createdAt} locale='en-US' />
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  )
}
export default Post
