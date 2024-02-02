import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import { SliderCustom, Map, BoxInfo, RelativePost } from '../../components'
import icons from '../../ultils/icons'
import moment from 'moment'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import ReviewList from './ReviewList'
import WriteReview from './WriteReview'



const { CiLocationOn, TbReportMoney, RiCropLine, BsClock, CiHashtag } = icons



const DetailPost = () => {
  const dispatch = useDispatch()
  const { postId } = useParams();
  const [isExpired, setIsExpired] = useState(false)
  const [change, setChange]= useState(false)
  const navigate = useNavigate()
  const data = useSelector((state) => state.auth);
  console.log(data)

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }))

  }, [postId])
  const { posts } = useSelector(state => state.post)
  // console.log(posts)
  const formatDate = 'DD/MM/YYYY'
  const checkStatus = (datetime) => moment(datetime, formatDate).isSameOrAfter(new Date().toDateString())
  // const arrAddress = posts && posts?.address.split(',')
  const desAdress = 123

  const handleSearchPost = (categoryCode, desAdress) => {
    const titleSearch = `${posts && posts.overviewId.type} ${desAdress}`
    const query = {
      categoryCode,
      address: desAdress
    }
    console.log(query)
    navigate({
      pathname: `/${path.SEARCH}`,
      search: createSearchParams(query).toString(),

    }, { state: { titleSearch } })
  }

  return (
    <>
      {console.log("posts", posts)}
      <div className="w-full flex gap-4 py-5 relative">
        {!checkStatus(posts?.overviewId?.expire?.split(' ')[3] || posts?.overviewId?.expire) && <div className="absolute z-20 w-full h-full bg-overlay-70 text-white text-6xl flex items-start justify-center pt-10">Bài viết đã hết hạn !</div>}
        {posts?.users?.name === null ? <div className="absolute z-20 w-full h-full bg-overlay-70 text-white text-4xl text-center pt-10">Tài khoản của người đăng bài đã bị xóa ! Hãy xem bài đăng khác !</div> : ''}
        <div className="w-[100%] bg-white rounded-md shadow-md ">
          <SliderCustom images={posts?.imageId && JSON.parse(posts?.imageId[0].image)} />
          <div className='px-5'>
            <div className="text-center mt-2 mb-2"><h1 className="text-2xl font-bold text-red-600">{posts?.title}</h1></div>
            <BoxInfo user={posts?.users} postId={postId} />
            <div className="my-5 flex flex-col gap-1">

              <div className="flex gap-2">
                <span>Chuyên mục:</span>
                <span onClick={() => {
                  handleSearchPost(posts.categoryCode, desAdress)
                }}
                  className="text-blue-700 underline hover:text-orange-600 cursor-pointer font-semibold"
                >

                </span>
              </div>
              <div className="flex gap-2 items-center">
                <CiLocationOn color='blue' />
                <span>{posts?.address}</span>
              </div>
              <div className="flex gap-10 items-center">
                <div className='flex items-center gap-1 text-green-700 font-semibold text-lg'>
                  <TbReportMoney />
                  {posts?.attributeId?.price}
                </div>
                <div className='flex items-center gap-1'>
                  <RiCropLine />
                  {posts?.attributeId?.acreage}
                </div>
                <div className='flex items-center gap-1'>
                  <BsClock />
                  {posts?.attributeId?.published}
                </div>
                <div className='flex items-center gap-1'>
                  <CiHashtag />
                  {posts?.attributeId?.hashtag}
                </div>
              </div>
            </div>
            <div>
              <h2 className='text-xl font-bold mb-2'>Thông tin mô tả</h2>
              <div className='flex flex-col gap-[2px]'>
                {posts?.description && Array.isArray(JSON.parse(posts?.description)) ? JSON.parse(posts?.description)?.map((item, index) => {
                  return (
                    <span key={index}>{item}</span>
                  )
                }) : <span>{posts?.description && JSON.parse(posts?.description)}</span>}
              </div>
            </div>
            <div>
              <h2 className='text-xl font-bold my-3'>Đặc điểm tin đăng</h2>
              <table>
                <tbody>
                  <tr>
                    <td className='w-[200px] py-1'>Mã tin:</td>
                    <td>{posts?.attributeId?.hashtag}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Khu vực:</td>
                    <td>{posts?.overviewId?.area}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Loại tin rao:</td>
                    <td>{posts?.overviewId?.type}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Đối tượng:</td>
                    <td>{posts?.overviewId?.target}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Gói tin:</td>
                    <td>{posts?.overviewId?.bonus}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Ngày đăng</td>
                    <td>{posts?.overviewId?.created}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Ngày hết hạn</td>
                    <td>{posts?.overviewId?.expire}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2 className='text-xl font-bold my-3'>Thông tin liên hệ</h2>
              <table>
                <tbody>
                  <tr>
                    <td className='w-[200px] py-1'>Liên hệ:</td>
                    <td>{posts?.users?.name}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Điện thoại:</td>
                    <td>{posts?.users?.phone}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Zalo:</td>
                    <td>{posts?.users?.zalo}</td>
                  </tr>
                  <tr>
                    <td className='w-[200px] py-1'>Facebook:</td>
                    <td>{posts?.users?.fbUrl}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <WriteReview postId={postId} setChange={setChange} />
            <ReviewList postId={postId} change={change} />
            {/* <div className='flex flex-col gap-1 py-2'>
              <h2 className='text-xl font-bold mt-2'>Bản đồ</h2>
              <span className='italic'>Địa chỉ: {posts?.address}</span>
              <Map address={posts?.address} />
              <span>Bạn đang xem nội dung tin đăng: <span className="italic">{posts?.title} - Mã tin {posts?.attributes?.hashtag}</span> Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để PhòngTrọ123 có thể xử lý.</span>
            </div> */}
          </div>
        </div>
        {/* <div className="w-[35%] flex flex-col gap-4">
        <BoxInfo user={posts?.users} postId = {postId} />
        <RelativePost />
        <RelativePost newPost />
      </div> */}
      </div>

    </>
  )
}

export default DetailPost