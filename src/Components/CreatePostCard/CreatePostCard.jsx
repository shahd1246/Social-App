import { Avatar, Input, TextArea } from "@heroui/react";
import { Button, Modal } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreatePostCard() {

  const {userData} = useContext(AuthContext)
  let image = useRef(null);
  let body = useRef(null);
  let navigate =useNavigate()

  let [uplaodedImg, setUplaodedImg] = useState(null);

  let query = useQueryClient(null);
  function handleImgPreview(e) {
    let source = URL.createObjectURL(e.target.files[0]);
    setUplaodedImg(source);
  }
  function colseImg() {
    setUplaodedImg(null);
    image.current.value = null;
  }

  function prepareData() {
    let formData = new FormData();
    if (body == null && image == null) return;
    if (body.current.value) {
      formData.append("body", body.current.value);
    }
    if (image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    return formData;
  }

  function createPost() {
    return axios.post(
      "https://route-posts.routemisr.com/posts",
      prepareData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }
  const { data, isPending, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (body.current) {
        body.current.value = null;
      }
      if (image.current) {
        image.current.value = null;
      }
      toast.success("Post Created Successfully", {
        position: "top-right",
        autoClose: 2000,
      });
      query.invalidateQueries({
        queryKey: ["getAllPosts"],
        refetchType: "all",
      });
      setUplaodedImg(null);
    },
    onError: () => {
      toast.error("You can not post right now ,please try again later ", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  return (
    <div className="bg-gray-100 p-4 my-5 w-full md:w-3/4 lg:w-1/2  mx-auto rounded shadow">
      <div className="flex gap-5 items-center">
        <Avatar onClick={()=>{navigate("/profile")}}>
          <Avatar.Image
            alt={userData?.name}
            src={userData?.photo}
          />
        </Avatar>

        <Modal>
          <Button className="w-full p-0" variant="secondary">
            <TextArea
              readOnly
              className="w-full"
              placeholder="What is in your mind.."
            />
          </Button>
          <Modal.Backdrop>
            <Modal.Container size="cover">
              <Modal.Dialog>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Create Post</Modal.Heading>
                </Modal.Header>

                <Modal.Body>
                  <div className="flex items-end gap-5">
                    <TextArea
                      ref={body}
                      aria-label="Quick project update"
                      className="h-50 w-full"
                      placeholder="What is in your mind...."
                    />
                    <label htmlFor="uploadImg">
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
                    </label>
                    <Input
                      ref={image}
                      onChange={handleImgPreview}
                      type="file"
                      hidden
                      id="uploadImg"
                    />
                  </div>
                  {uplaodedImg && (
                    <>
                      <div className="relative w-fit">
                        <img className="my-6 ob" src={uplaodedImg} alt="" />
                        <svg
                          onClick={colseImg}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6 hover:text-red-600 m-2 absolute top-0 right-0"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>
                  <Button onClick={mutate} slot="close">
                    {isPending ? <Loading /> : "Add Post"}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </div>
  );
}
