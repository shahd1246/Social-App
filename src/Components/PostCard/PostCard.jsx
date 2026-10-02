import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comments from "../Comments/Comments";
import Createcomment from "../CreateComment/Createcomment";
import Dropdown from "../DropdownComponent/DropdownComponent";
import { AuthContext } from "../../Context/AuthContext";
import DropdownComponent from "../DropdownComponent/DropdownComponent";

export default function PostCard({ post, isSinglePost = false }) {
  const query = useQueryClient();
  const { userData } = useContext(AuthContext);
  

  function getAllComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${post.id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: 1,
          limit: 10,
        },
      },
    );
  }
  const { data } = useQuery({
    queryKey: ["getAllComments"],
    queryFn: getAllComments,
    select: (data) => {
      return data?.data.data.comments;
    },
    enabled: isSinglePost,
  });
console.log(data?.data);
  function getLikedPosts() {
    //سايبه لل داتا مكان بس هي لسه مش معايا
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const { data: likedData, mutate } = useMutation({
    mutationFn: getLikedPosts,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      query.invalidateQueries({ queryKey: ["getUserPosts"] });
      query.invalidateQueries({ queryKey: ["getSinglePost", post.id] });
    },
  });
 
  return (
    <div>
      <div className="bg-white p-4 my-5  w-full md:w-3/4 lg:w-1/2  mx-auto rounded-xl shadow">
        {post.user && (
          <header className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="h-10 w-10 rounded-full"
              />

              <div>
                <p className="font-semibold">{post.user.name}</p>
                <p className="text-xs text-gray-500">{post.createdAt}</p>
              </div>
            </div>
            <div>
              {userData?._id === post.user._id && (
                <DropdownComponent post={post} postId={post.id} isSinglePost={isSinglePost} />
              )}
            </div>
          </header>
        )}

        <div className="w-full">
          {post.body && <p className="mb-3 break-all ">{post.body}</p>}

          {post.image && (
            <img
              src={post.image}
              alt={post.body}
              className="rounded max-h-96 w-full object-cover mb-3"
            />
          )}
        </div>

        <div className="flex justify-between text-gray-600 text-sm font-semibold">
          <button
            onClick={mutate}
            className={`flex items-center ${likedData?.data.data.liked ? "text-blue-600" : ""} space-x-1`}
          >
            {post.likesCount > 0 && <span> {post.likesCount}</span>}
            <i className="fas cursor-pointer  fa-thumbs-up " />
          </button>
          <Link to={`/postDetails/${post.id}`}>
            <button className="flex items-center space-x-1">
              {post.commentsCount > 0 && <span> {post.commentsCount}</span>}
              <i className="fas fa-comment" />
            </button>
          </Link>
          <button className="flex items-center space-x-1">
            {post.sharesCount > 0 && <span> {post.sharesCount}</span>}
            <i className="fas fa-share" />
          </button>
        </div>
        <Createcomment
          postId={post.id}
          queryKey={isSinglePost ? ["getAllComments"] : ["getAllPosts"]}
        />
        {isSinglePost == false && post.topComment && (
          <Comments data={data} comment={post.topComment} postId={post.id}/>
        )}

        {isSinglePost &&
          data?.map((comment) => {
            return (
              <Comments key={comment._id} comment={comment} postId={post.id} />
            );
          })}
      </div>
    </div>
  );
}
