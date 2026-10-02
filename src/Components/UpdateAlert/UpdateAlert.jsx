import { Button, Input, Modal, TextArea } from "@heroui/react";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import axios from "axios";

export default function UpdateAlert({
  post,
  postId,
  isOpen,
  setisOpen,
  isComment,
  commentId,
  comment,
}) {
  const { userData } = useContext(AuthContext);

  const image = useRef(null);
  const body = useRef(null);
  const content = useRef(null);

  const [uploadedImg, setUploadedImg] = useState(null);
  const [oldImage, setOldImage] = useState(
    isComment ? comment?.image : post?.image,
  );

  const query = useQueryClient();

  function handleImgPreview(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    // تحرير رابط المعاينة السابق لو موجود
    if (uploadedImg) {
      URL.revokeObjectURL(uploadedImg);
    }

    const source = URL.createObjectURL(file);
    setUploadedImg(source);
  }

  function closeImg() {
    if (uploadedImg) {
      URL.revokeObjectURL(uploadedImg);
    }

    setUploadedImg(null);
    setOldImage(null);

    if (image.current) {
      image.current.value = "";
    }
  }

  function prepareData() {
    const formData = new FormData();

    if (body.current?.value.trim()) {
      formData.append("body", body.current.value);
    }

    if (image.current?.files?.[0]) {
      formData.append("image", image.current.files[0]);
    }

    return formData;
  }

  function prepareComment() {
    const formData = new FormData();

    if (content.current?.value.trim()) {
      formData.append("content", content.current.value);
    }

    if (image.current?.files?.[0]) {
      formData.append("image", image.current.files[0]);
    }

    return formData;
  }

  function updatePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      prepareData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  function updateComment() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      prepareComment(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const { isPending: isPendingComment, mutate: handelUpdateComment } =
    useMutation({
      mutationFn: updateComment,

      onSuccess: () => {
        if (content.current) {
          content.current.value = "";
        }

        if (image.current) {
          image.current.value = "";
        }

        toast.success("Comment Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
        });

        query.invalidateQueries({ queryKey: ["getAllPosts"] });
        query.invalidateQueries({ queryKey: ["getUserPosts"] });
        query.invalidateQueries({
          queryKey: ["getSinglePost", postId],
        });
        query.invalidateQueries({ queryKey: ["getAllComments"] });

        if (uploadedImg) {
          URL.revokeObjectURL(uploadedImg);
        }

        setUploadedImg(null);
        setOldImage(null);
        setisOpen(false);
      },

      onError: () => {
        toast.error(
          "You can not update comment right now, please try again later",
          {
            position: "top-right",
            autoClose: 3000,
          },
        );
      },
    });

  const { isPending, mutate: handelUpdatePost } = useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      if (body.current) {
        body.current.value = "";
      }

      if (image.current) {
        image.current.value = "";
      }

      toast.success("Post Updated Successfully", {
        position: "top-right",
        autoClose: 2000,
      });

      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      query.invalidateQueries({ queryKey: ["getUserPosts"] });
      query.invalidateQueries({
        queryKey: ["getSinglePost", postId],
      });

      if (uploadedImg) {
        URL.revokeObjectURL(uploadedImg);
      }

      setUploadedImg(null);
      setisOpen(false);
    },

    onError: () => {
      toast.error("You can not update post right now, please try again later", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const isUpdating = isPending || isPendingComment;

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={setisOpen}>
        <Modal.Backdrop>
          <Modal.Container size="cover">
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>
                  {isComment ? "Update Comment" : "Update Post"}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <div className="flex items-end gap-5">
                  <TextArea
                    ref={isComment ? content : body}
                    aria-label="Quick project update"
                    className="h-50 w-full"
                    defaultValue={isComment ? comment?.content : post?.body}
                  />

                  <label htmlFor="uploadImg">
                    <svg
                      className="w-5 h-5 hover:text-blue-600 cursor-pointer"
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
                        d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-1.5-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                      />
                    </svg>
                  </label>

                  <Input
                    ref={image}
                    onChange={handleImgPreview}
                    type="file"
                    hidden
                    id="uploadImg"
                    accept="image/*"
                  />
                </div>

                {(uploadedImg || oldImage) && (
                  <div className="relative w-fit">
                    <img
                      className="my-6 object-cover max-w-full max-h-80"
                      src={uploadedImg || oldImage}
                      alt="Preview"
                    />

                    <button
                      type="button"
                      onClick={closeImg}
                      className="size-6 hover:text-red-600 m-2 absolute top-0 right-0"
                      aria-label="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5m11.25 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setisOpen(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => {
                    if (isComment) {
                      handelUpdateComment();
                    } else {
                      handelUpdatePost();
                    }
                  }}
                >
                  {isUpdating ? <Loading /> : "Update"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
