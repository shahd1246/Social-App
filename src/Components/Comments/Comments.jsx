import React, { useContext } from "react";
import Dropdown from "../DropdownComponent/DropdownComponent";
import { AuthContext } from "../../Context/AuthContext";
import DropdownComponent from "../DropdownComponent/DropdownComponent";


export default function Comments({comment ,postId}) {
  const { userData } = useContext(AuthContext);
 console.log(comment)
  return (
    <div>
      <div className="">
        {comment && (
          <div className="border rounded-xl border-neutral-400 p-3 my-3">
            {" "}
            <header className="flex justify-between items-center ">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={comment.commentCreator.photo}
                  alt={comment.commentCreator.name}
                  className="h-8 w-8 rounded-full"
                />

                <div>
                  <p className="font-semibold">{comment.commentCreator.name}</p>
                  <p className="text-xs text-gray-500">{comment.createdAt}</p>
                </div>
              </div>
              <div>
                {userData?._id === comment?.commentCreator?._id && (
                  <DropdownComponent
                    isComment={true}
                    commentId={comment?._id}
                    postId={postId}
                    comment={comment}

                  />
                )}
              </div>
            </header>
            <div className="break-all">
              {comment.content && <p className="mb-3">{comment.content}</p>}
              {comment.image && <img className="mb-3" src={comment.image} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
