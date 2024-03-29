import React from "react";
import { styled } from "styled-components";
import CommentItem from "./CommentItem";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { getCommentList } from "./../../api/reply";
import CommentInput from "./CommentInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const CommentList = ({ bookId, setShowComments }) => {
  const [comments, setComments] = useState([]);
  const refresh = useSelector((state) => state.user.refresh);

  //댓글 리스트 조회
  useEffect(() => {
    async function fetchCommentList() {
      const data = await getCommentList(bookId);
      setComments(data);
    }
    fetchCommentList();
  }, [bookId, refresh]);

  return (
    <Root>
      <Header>
        댓글 {comments && comments.length}개
        <CloseBtn onClick={() => setShowComments((prev) => !prev)}>
          <IoClose size={23} color="black" />
        </CloseBtn>
      </Header>
      <List>
        {comments &&
          comments
            .filter((comment) => comment.grpl === 0)
            .map((comment, index) => (
              <CommentItem
                key={index}
                userName={comment.rwriter.userName}
                profileImg={comment.rwriter.profileImg}
                content={comment.content}
                replyId={comment.replyId}
              />
            ))}
      </List>
      <CommentInput bookId={bookId} />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  margin-left: auto;
  padding: 20px;
  box-sizing: border-box;
  color: black;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.7vw;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const List = styled.div`
  overflow: scroll;
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const CloseBtn = styled.button`
  margin-left: auto;
  padding: 3px;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default CommentList;
