import React from "react";
import { styled } from "styled-components";
import { DotLoader } from "react-spinners";

const Page = ({ page, pageNum }) => {
  page && console.log(page.text);
  return (
    <Container>
      <Image src={page && page.imgUrl} />
      {page && (
        <Text $textPos={page.x ? { x: page.x, y: page.y } : { x: 0, y: 0 }}>
          {page.text}
        </Text>
      )}
      {page && <PageNum>{pageNum}</PageNum>}
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 50%;
  height: 0px;
  padding-bottom: 50%;
  border-radius: 10px;
  border: 1px solid grey;
  overflow: hidden;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  display: block;
  vertical-align: top;
`;

const Text = styled.div.attrs((props) => ({
  style: {
    top: props.$textPos.y + "px",
    left: props.$textPos.x + "px",
  },
}))`
  position: absolute;
  box-sizing: border-box;
  max-height: 100%;
  width: 50%;
  padding: 1.5vw;
  font-size: 1.2vw;
  word-break: keep-all;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 30px 25px rgba(0, 0, 0, 0.2);
  border-radius: 5em;
`;

const PageNum = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 10px;
  font-size: 1.5vw;
`;

const Button = styled.button`
  position: absolute;
  width: 70%;
  height: 100%;
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Loader = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
