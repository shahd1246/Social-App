import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function DeleteAlert({ postId, isSinglePost, commentId, isComment, onClose }) {
  const navigate = useNavigate();
  const query = useQueryClient();
  function deletePost() {
    console.log("postId:", postId);
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  function deleteComment() {
    console.log({
      postId,
      commentId,
      isComment,
    });

    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  console.log(commentId);
  const { mutate: CommentMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Comment deleted successfully",
        icon: "success",
      });
      query.invalidateQueries({ queryKey: ["getAllComments"] });
      query.invalidateQueries({ queryKey: ["getUserPosts"] });
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong !",
      });
    },
  });
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "post deleted successfully",
        icon: "success",
      });
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      query.invalidateQueries({ queryKey: ["getUserPosts"] });
      if (isSinglePost) {
        navigate("/home");
      }
      onClose()
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
       onClose();
    },
  });

  useEffect(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        {
          isComment ? CommentMutate() : mutate();
        }
      }
      if (!result.isConfirmed) {
        onClose();
      }
    });
  }, []);
  return null;
}
