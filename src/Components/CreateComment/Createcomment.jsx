import { Input } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import { toast } from "react-toastify";

export default function Createcomment({ postId, queryKey }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  let formData = new FormData();
  function createComment() {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }
  let query = useQueryClient();

  const { data, isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      reset();
      toast.success("Comment Created Successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
      query.invalidateQueries({ queryKey: queryKey });
    },
    onError: () => {
      <Error />;
    },
  });

  function handleCreateComment(data) {
    if (!data.content && !data.image[0]) return;
    if (data.content) {
      formData.append("content", data.content);
    }
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    mutate();
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateComment)}>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-base bg-neutral-secondary-soft">
          <label htmlFor="uploadImage">
            <div className="p-2 text-gray-600 text-sm font-semibold rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium">
              <svg
                className="w-5 h-5  hover:text-blue-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                />
              </svg>
            </div>
          </label>
          <input {...register("image")} id="uploadImage" type="file" hidden />
          <Input
            {...register("content")}
            aria-label="comment"
            className="w-full"
            placeholder="Enter Your Comment"
          />

          <button
          disabled={isPending}
            type="submit"
            className="inline-flex justify-center p-2 text-gray-600 text-sm font-semibold rounded-full cursor-pointer hover:text-blue-600"
          >
            {isPending ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 animate-spin "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"
                />
              </svg>
            )}

            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
}
