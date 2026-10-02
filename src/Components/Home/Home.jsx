import axios from "axios";
import React from "react";
import PostCard from "../PostCard/PostCard";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useQuery } from "@tanstack/react-query";
import CreatePostCard from "../CreatePostCard/CreatePostCard";
import Offline from "../Offline/Offline";
import { useNetworkState } from "react-use";

export default function Home() {
  const {online} =useNetworkState()
  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      params: {
        sort:'-createdAt'
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
    select: (data) => {
      return data?.data.data.posts;
    },
    refetchInterval: 5000,
    gcTime: 10000,
    retry: 2,
  });
  if (isLoading) {
    return <Loading />;
  }
  if(!online){
  return  <Offline />;
  }
  console.log(data);
  return (
    <>
    
    <CreatePostCard/>
      {isError && <Error error={error.message} />}

      {data?.map((post) => {
        return <PostCard  key={post.id} post={post} />;
      })}
    </>
  );
}
