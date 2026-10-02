import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../PostCard/PostCard";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Gear } from "@gravity-ui/icons";
import { Button, Dropdown, Label } from "@heroui/react";
import {  useNavigate } from "react-router-dom";

export default function Profile() {
  const { userData } = useContext(AuthContext);
 const navigate= useNavigate()

  console.log(userData);

  function getUserPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userData.id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
    select: (data) => {
      return data?.data.data.posts;
    },
    enabled: !!userData?.id,
  });
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error error={error.message} />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-4">
      <div className=" w-full md:w-3/4 lg:w-1/2  mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Cover Image */}
          <div
            className="h-44 sm:h-48 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ")',
            }}
          >
            <div className="w-full h-full bg-black/10" />
          </div>

          {/* Profile Content */}
          <div className="px-5 relative sm:px-7 pb-7">
            {/* Profile Picture */}
            <div className="relative  flex justify-center">
              <img
                className="w-32 h-32 -mt-16 absolute sm:w-36 sm:h-36 rounded-full border-[5px] border-white shadow-lg object-cover bg-gray-100"
                src={userData?.photo}
                alt="Profile Picture"
              />
            </div>
            <div className="right-6 top-4  absolute">
              <Dropdown>
                <Button aria-label="Menu" variant="secondary">
                  <Gear />
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item
                      id="new-file"
                      onClick={() => {
                        navigate("/ChangePassword");
                      }}
                      textValue="New file"
                    >
                      <Label>Change Password</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>

            {/* User Info */}
            <div className="text-center mt-20">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData?.name}
              </h2>

              {/* User Details */}
              <div className="flex flex-col items-center gap-2 mt-3">
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-calendar text-blue-500 text-sm"></i>
                  <span className="text-sm text-gray-500">Joined at</span>
                  <span className="text-sm font-medium text-gray-700">
                    {userData?.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-cake-candles text-pink-500 text-sm"></i>
                  <span className="text-sm text-gray-500">Date of birth</span>
                  <span className="text-sm font-medium text-gray-700">
                    {userData?.dateOfBirth}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center mt-6">
              <div className="flex divide-x divide-gray-200 border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="text-center px-7 sm:px-9 py-3">
                  <p className="font-bold text-lg text-gray-900">
                    {userData?.followersCount}
                  </p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>

                <div className="text-center px-7 sm:px-9 py-3">
                  <p className="font-bold text-lg text-gray-900">
                    {userData?.followingCount}
                  </p>
                  <p className="text-xs text-gray-500">Following</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3 max-w-sm mx-auto">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm">
                Follow
              </button>

              <button className="flex-1 bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-xl transition-all duration-200">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
      {data?.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}
