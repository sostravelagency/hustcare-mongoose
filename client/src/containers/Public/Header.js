import React, { useCallback, useEffect, useState } from "react";
import logo from "../../assets/logo.PNG";
import { Button, User } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";

const {
  AiOutlinePlusCircle,
  GrLogout,
  IoIosLogOut,
  BiChevronDown,
  BsChevronDoubleDown,
} = icons;
const notActive = "hover:bg-secondary2 h-full flex items-center py-2 px-4 ";
const active =
  "hover:bg-secondary2 h-full flex items-center bg-secondary2 py-2 px-4";

const Header = () => {
  const { categories } = useSelector((state) => state.app);
  // console.log(categories);
  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);
  const formatVietnameseToString = (keyword) => {
    return keyword
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("-");
  };
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full flex justify-center" style={{backgroundColor: "rgb(255, 189, 189)"}}>
      <div className="w-3/4">
        <div className="flex items-center justify-between w-full">
          <Link to="/">
            {/* <img
              src={logo}
              alt="logo"
              className="w-[240px] h-[70px] object-contain"
            /> */}
            Hustcare
          </Link>
          <div className="flex items-center gap-1">
            {!isLoggedIn && (
              <div className="flex items-center gap-1">
                <small className="">Hustcare xin chào !</small>
                <Button
                  text={"Đăng nhập"}
                  textColor="text-white"
                  bgColor="bg-[#3961fb]"
                  onClick={() => {
                    goLogin(false);
                  }}
                />
                <Button
                  text={"Đăng Ký"}
                  textColor="text-white"
                  bgColor="bg-[#3961fb]"
                  onClick={() => {
                    goLogin(true);
                  }}
                />
              </div>
            )}
            {isLoggedIn && (
              <div className="relative flex items-center gap-1">
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  Trang chủ
                </NavLink>
                {categories.length > 0 &&
                  categories.map((item) => {
                    return (
                      <div
                        key={item.code}
                        className="flex items-center justify-center h-full "
                      >
                        <NavLink
                          to={`/${formatVietnameseToString(item.value)}`}
                          className={({ isActive }) => (isActive ? active : notActive)}
                        >
                          {item.value}
                        </NavLink>
                      </div>
                    );
                  })}
                <User />
                <Button
                  text={"Quản lý tài khoản"}
                  textColor="text-white"
                  bgColor="bg-[#3961fb]"
                  onClick={() => setIsShowMenu((prev) => !prev)}
                  IcAfter={BsChevronDoubleDown}
                />
                {isShowMenu && (
                  <div className="absolute right-0 z-50 flex flex-col gap-2 p-4 bg-white border rounded-md shadow-md min-w-200 top-full">
                    {userData?.roleCode === "R1"
                      ? menuManage.map((item) => {
                        return (
                          <Link
                            key={item.id}
                            to={item?.path}
                            className="flex items-center gap-2 p-1 text-blue-700 border-b hover:text-orange-500 "
                          >
                            {item?.icon}
                            {item.text}
                          </Link>
                        );
                      })
                      : menuManage
                        .filter((item) => item.id !== 3 && item.id !== 4)
                        .map((item) => {
                          return (
                            <Link
                              key={item.id}
                              to={item?.path}
                              className="flex items-center gap-2 p-1 text-blue-700 border-b hover:text-orange-500 "
                            >
                              {item?.icon}
                              {item.text}
                            </Link>
                          );
                        })}
                    <span
                      className="flex items-center gap-2 p-1 italic text-blue-700 border-b cursor-pointer hover:text-orange-500"
                      onClick={() => {
                        dispatch(actions.logout());
                        setIsShowMenu(false);
                      }}
                    >
                      <IoIosLogOut color="#f73859" />
                      Đăng xuất
                    </span>
                  </div>
                )}
              </div>
            )}

            <Link to="/he-thong/tao-moi-bai-dang">
              <Button
                text={"Đăng tin mới"}
                textColor="text-white"
                bgColor="bg-[#f73859]"
                IcAfter={AiOutlinePlusCircle}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
