const Post = () => {
  return (
    <div className='post'>
      <div className='image'>
        <img src='images/samp.jpg' />
      </div>
      <div className='texts'>
        <h2>Shanaham Hospital Nsukka Enugu State, Nigeria</h2>
        <p className='info'>
          <a href='' className='author'>
            Younglife Ike
          </a>
          <time>2023-10-23 15:24</time>
        </p>
        <p className='summary'>
          Front-end Development and System Maintenance 2022 - 2023 LifElla Ventures, University
          Market Road, Nsukka, 1. Online store project done with JavaScript, HTML, CSS and
          bootstrap. https://lifella.com.ng/ 2. E-Commerce project with done with Reactjs, Reduxjs
          and CSS https://gifthairs.netlify.app/
        </p>
      </div>
    </div>
  )
}
export default Post
