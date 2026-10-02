import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export default function PostDetails() {
  let { id } = useParams();

  function getSinglePost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getSinglePost,
    select: (data) => {
      return data?.data.data.post;
    },
  });

  
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }
  return (
    <div>
      <PostCard post={data} isSinglePost={true} />
    </div>
  );
}
