import React, { useEffect, useRef, useState } from "react";
import { Button, Item } from "../../components";
import { getPostsLimit, getPostLike } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";
import Search2 from "./Search2";

const List = ({ categoryCode, postId }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [listPosts, setListPosts] = useState([])
  const { postLike } = useSelector((state) => state.post);
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation()
  const listRef = useRef();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(0);
  useEffect(() => {

    dispatch(getPostLike());
  }, []);
  console.log(posts)
  useEffect(() => {
    if (location.pathname === "/phong-tro") {
      setListPosts(posts?.filter(item => item?.categoryCode === "code123"))
    }
    else if (location.pathname === "/share-phong") {
      setListPosts(posts?.filter(item => item?.categoryCode === "code 1234"))
    }
    else {
      setListPosts(posts)
    }
  }, [location.pathname])
  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    if (postId) {
      searchParamsObject.id = postId;
    }

    if (sort === 1) searchParamsObject.order = ["star", "DESC"];
    dispatch(getPostsLimit({ ...searchParamsObject, limit: 5 }));
    console.log(searchParamsObject);
  }, [searchParams, categoryCode, sort]);
  // console.log(searchParamsObject)

  return (
    <div ref={listRef} className="w-full p-2 bg-white rounded-md shadow-md flex gap-4">
      {location.pathname === "/tim-kiem" &&
        <Search2 />
      }
      <div style={{ flex: 1 }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold">
            {postId ? "Tin đã lưu" : "Danh sách tin đăng"}
          </span>
          {!postId && (
            <span className="text-xs italic">
              Cập nhật: {moment(new Date()).format("DD/MM/YYYY")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span>Sắp xếp:</span>
          <span
            onClick={() => setSort(0)}
            className={`bg-gray-200 py-1 px-2 rounded-md cursor-pointer hover:underline ${sort === 0 && "font-bold"
              }`}
          >
            Mới nhất
          </span>
          <span
            onClick={() => setSort(1)}
            className={`bg-gray-200 py-1 px-2 rounded-md cursor-pointer hover:underline ${sort === 1 && "font-bold"
              }`}
          >
            Nổi bật
          </span>
        </div>
        <div className="mt-3 flex flex-wrap">
          {listPosts?.length > 0 ? (
            listPosts
              ?.filter((post) => post.status === "checked")
              ?.map((item) => {
              console.log(item?.imageId ? JSON.parse(item?.imageId[0].image) : "")

                return (
                  <Item
                    key={item?._id}
                    address={item?.address}
                    attributes={item?.attributeId}
                    overviews={item?.overviewId}
                    description={JSON.parse(item?.description)}
                    images={item?.imageId ? JSON.parse(item?.imageId[0].image): []}
                    star={+item?.star}
                    title={item?.title}
                    user={item?.userId}
                    id={item?._id}
                    postLike={postLike}
                  />
                );
              })
          ) : (
            <span className="italic">Không có bài đăng !</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
