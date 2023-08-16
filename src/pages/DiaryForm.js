import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { DotLoader } from "react-spinners";
import { createCover, createImage, createTexts } from "../api/books";
import { getMyInfo } from "../api/users";
import { useDispatch } from "react-redux";

const genres = [
  "모험",
  "성장",
  "판타지",
  "코미디",
  "우화",
  "SF",
  "추리",
  "드라마",
];

const suggestions = [
  "오늘 친구랑 가장 재밌었던 일은 뭐야?",
  "친구랑 가장 해보고 싶은 것은 뭐야?",
  "너랑 가장 친한 친구에 대해서 얘기해줘",
];

const days = ["일", "월", "화", "수", "목", "금", "토"];

const DiaryForm = () => {
  const [date, setDate] = useState(new window.Date());
  const [title, setTitle] = useState("자전거");
  const [contents, setText] = useState(
    "오늘 밤에 자전거를 탔다. 자전거는 처음 탈 때는 좀 중심잡기가 힘들었다. 그러나 재미있었다. 자전거를 잘 타서 엄마, 아빠 산책 갈 때 나도 가야겠다."
  );
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [profileImg, setProfileImg] = useState();
  const [coverUrl, setCoverUrl] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //일기 제출
  const submitDiary = async (event) => {
    event.preventDefault();
    setLoading(true);

    //폼데이터 가공
    const formData = new FormData(event.target);
    formData.delete("genre");
    formData.append("genre", genres[selectedGenre]);
    formData.delete("date");
    formData.append("date", dateToString(date));
    console.log(Object.fromEntries(formData));

    //내정보 조회
    // const userData = await getMyInfo();

    //동화 텍스트 생성
    const textsData = await createTexts(formData);

    //표지 생성
    const coverData = createCover(textsData.bookId, dispatch);
    setCoverUrl(coverData.coverUrl);

    //일러스트 여러장 생성
    textsData.texts.forEach(async (_, pageNum) => {
      let newBookImages = images;
      try {
        newBookImages[pageNum] = await createImage(
          textsData.bookId,
          pageNum,
          dispatch
        );
        setImages(newBookImages);
      } catch (err) {
        console.log("일러스트 생성 에러", pageNum);
      }
    });

    //동화 텍스트 생성되면 리다이렉션
    if (textsData) {
      navigate(`/new-book/${textsData.bookId}/detail`, {
        state: {
          // userName: userData.userName,
          // profileImg: userData.profileImg,
          title: textsData.title,
          texts: textsData.texts,
          coverUrl: coverUrl,
          images: images,
        },
      });
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return loading ? (
    <Loader>
      <DotLoader color="#78B9FF" size={100} />
      <LoaderText>동화책을 만들고 있어요!</LoaderText>
    </Loader>
  ) : error ? (
    <Error>에러가 발생했어요.</Error>
  ) : (
    <Wrapper>
      <Suggestion>오늘 가장 재밌었던 일이 뭐야?</Suggestion>
      <Form onSubmit={submitDiary}>
        <SDatePicker
          value={date}
          name="date"
          dateFormat="yyyy년 MM월 dd일"
          maxDate={new window.Date()}
          locale={ko}
          selected={date}
          onChange={(date) => setDate(date)}
        />
        {/* <Suggestion>{suggestions[Math.floor(Math.random() * 3)]}</Suggestion> */}
        <Title
          placeholder="제목"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Contents
          placeholder="일기를 써주세요."
          name="contents"
          value={contents}
          onChange={(e) => setText(e.target.value)}
        />
        <Genres>
          {genres.map((genre, index) => {
            return (
              <Label key={index}>
                <RadioButton
                  type="radio"
                  name="genre"
                  value={index}
                  onChange={(e) => setSelectedGenre(index)}
                />
                <Genre index={index} selectedGenre={selectedGenre}>
                  {genre}
                </Genre>
              </Label>
            );
          })}
        </Genres>
        <SubmitButton type="submit">다음</SubmitButton>
      </Form>
    </Wrapper>
  );
};

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  color: grey;
  font-size: 20px;
`;

const LoaderText = styled.div`
  margin-top: 40px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  padding-top: 50px;
  padding-bottom: 70px;
  box-sizing: border-box;
`;

const Suggestion = styled.div`
  flex: none;
  font-size: 50px;
  font-family: "Gaegu";
  padding: 20px 0;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 700px;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 25px;
  color: black;
  background: white;
`;

const SDatePicker = styled(DatePicker)`
  height: 40px;
  font-size: 20px;
  border-radius: 10px 10px;
  text-align: center;
  border: none;
  background: #beddff;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const Title = styled.input`
  flex: 1.5;
  border: none;
  font-size: 25px;
  padding-top: 25px;
  padding-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const Contents = styled.textarea`
  flex: 15;
  font-size: 17px;
  line-height: 25px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Genres = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const Label = styled.label``;

const RadioButton = styled.input`
  display: none;
`;

const Genre = styled.div`
  width: 48px;
  text-align: center;
  margin: 6px;
  padding: 5px 10px;
  border-radius: 50px;
  outline: 1px solid lightgrey;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  ${(props) =>
    props.index === props.selectedGenre
      ? { background: "#BEDDFF", fontWeight: "bold", outline: "none" }
      : { background: "white" }}
`;

const SubmitButton = styled.button`
  flex: 1.5;
  border: none;
  border-radius: 10px;
  background-color: #beddff;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

export default DiaryForm;
