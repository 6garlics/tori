import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import endingPage from "../../assets/endingPage.svg";
import "../../fonts/font.css";

const Page = ({ page, index, show }) => {
  const container = useRef();
  const [fontSize, setFontSize] = useState();

  // 삽화 크기에 따라 폰트 크기 변경
  useEffect(() => {
    const observer = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setFontSize(Math.floor(width * 0.04));
      }
    });
    observer.observe(container.current);
  }, []);

  return (
    <Container $show={show} ref={container}>
      <Image src={page ? page.imgUrl : endingPage} loading="lazy" />
      {page && (
        <Text
          $textPos={page.x ? { x: page.x, y: page.y } : { x: 0, y: 0 }}
          $fontSize={fontSize}
        >
          {page.text}
        </Text>
      )}
      {page && <PageNum>{index}</PageNum>}
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 50%;
  aspect-ratio: 1 / 1;
  height: ${({ $show }) => !$show && "0px"};
  border-radius: 1vw;
  overflow: hidden;
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 10px 10px 60px 0px rgba(0, 0, 0, 0.15);
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  display: block;
  vertical-align: top;
`;

const Text = styled.div.attrs((props) => ({
  style: {
    top: props.$textPos.y + "%",
    left: props.$textPos.x + "%",
    fontSize: props.$fontSize + "px",
  },
}))`
  position: absolute;
  box-sizing: border-box;
  max-height: 100%;
  width: 50%;
  padding: 1vw;
  font-family: "SKYBORI";
  /* line-height: 1.8vw; */
  letter-spacing: 0.05vw;
  word-break: keep-all;
  z-index: 1;
  /* 배경 그림자 */
  &::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5vw;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.4);
    z-index: -1;
  }
`;

const PageNum = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 10px;
  font-size: 1.5vw;
`;
