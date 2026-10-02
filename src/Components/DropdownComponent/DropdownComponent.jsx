import React, { useState } from "react";
import {
  Bars,
  PencilToSquare,
  TrashBin,
  EllipsisVertical,
} from "@gravity-ui/icons";
import { Button, Dropdown, Label } from "@heroui/react";
import DeleteAlert from "../DeleteAlert/DeleteAlert";
import UpdateAlert from "../UpdateAlert/UpdateAlert";

export default function DropdownComponent({
  postId,
  post,
  isSinglePost,
  comment,
  commentId,
  isComment = false,
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  function openUpdateAlert() {
    setShowUpdateAlert(true);
  }

  function closeUpdateAlert() {
    setShowUpdateAlert(false);
  }

  function openDeleteAlert() {
    setShowDeleteAlert(true);
  }

  function closeDeleteAlert() {
    setShowDeleteAlert(false);
  }

  return (
    <div>
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          {isComment ? <EllipsisVertical /> : <Bars />}
        </Button>

        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={openUpdateAlert}
              id="update"
              textValue="Update"
            >
              <PencilToSquare className="size-4 shrink-0 text-muted" />
              <Label>
                {isComment ? "Update Comment" : "Update Post"}
              </Label>
            </Dropdown.Item>

            <Dropdown.Item
              onClick={openDeleteAlert}
              id="delete"
              textValue="Delete"
              variant="danger"
            >
              <TrashBin className="size-4 shrink-0 text-danger" />
              <Label>
                {isComment ? "Delete Comment" : "Delete Post"}
              </Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {showDeleteAlert && (
        <DeleteAlert
          postId={postId}
          isSinglePost={isSinglePost}
          commentId={commentId}
          isComment={isComment}
          onClose={closeDeleteAlert}
        />
      )}

      {showUpdateAlert && (
        <UpdateAlert
          postId={postId}
          isOpen={showUpdateAlert}
          setisOpen={(open) => {
            if (!open) {
              closeUpdateAlert();
            }
          }}
          isComment={isComment}
          comment={comment}
          post={post}
          commentId={commentId}
        />
      )}
    </div>
  );
}