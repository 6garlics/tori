import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Profile from "../common/Profile";

const MailItem = ({ bookId, coverUrl, senderName, content, onClick }) => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={onClick}>
      {/* <Content>{content}</Content> */}
      <ProfileWrapper>
        <Profile userName={senderName} preventClick={true} />
      </ProfileWrapper>
      님이 보낸 편지
      <BookCoverWrapper>
        <Cover
          src={coverUrl}
          onClick={() => navigate(`/book/${bookId}/detail`)}
          alt=""
        />
      </BookCoverWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 18px;
  margin: 10px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  &:hover {
    cursor: pointer;
  }
`;

const BookCoverWrapper = styled.div`
  margin-left: auto;
  height: 100%;
`;

const Cover = styled.img`
  height: 100%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ProfileWrapper = styled.div`
  flex: none;
`;

export default MailItem;
