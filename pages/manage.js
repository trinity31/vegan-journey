import Container from "@/components/container";
import React from "react"; //importing React library

const ManagePage = () => {
  const onClick = async (from, to) => {
    const data = { from, to };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/translate", options);
    const resultData = await response.json();
    //console.log(data);
  };

  return (
    <Container>
      <div
        class="flex justify-center items-center flex-row  "
        onClick={() => onClick("ko", "en")}
      >
        <p class="text-lg ph-16">
          <a
            href="https://www.notion.so/4296853271454a8091407f1116c057ed?v=1ce044920ad1431ea931a6829e7b3e34"
            class="text-blue-500"
          >
            이 한국어로 된 Vegan Journey 데이터베이스
          </a>
          항목 중 Translate 이 체크된 항목들에 대해 타이틀,요약,페이지 본문을
          영어로 번역해서 아래의{" "}
          <a
            href="https://www.notion.so/51f6c7717fcf4e5e81c1069dcb2ac01f?v=c0602407991d4e908abe82a6c5cd034e"
            class="text-blue-500"
          >
            영어 Vegan Journey 테이블
          </a>
          에 새 항목을 생성합니다. 이미 번역된 항목이 있는 경우 새로 생성됩니다.
        </p>
        <button class="bg-pink-400 rounded-lg py-4 px-8 text-white text-xl block focus:outline-none focus:ring-pink-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95 transition-all duration-100 ease-in-out">
          Translate
        </button>
      </div>
      <div
        class="flex justify-center items-center flex-row  "
        onClick={() => onClick("en", "ko")}
      >
        <p class="text-lg ph-16">
          <a
            href="https://www.notion.so/51f6c7717fcf4e5e81c1069dcb2ac01f?v=c0602407991d4e908abe82a6c5cd034e"
            class="text-blue-500"
          >
            이 영어로 된 Vegan Journey 데이터베이스
          </a>
          항목 중 Translate 이 체크된 항목들에 대해 타이틀,요약,페이지 본문을
          한국어로 번역해서 아래의{" "}
          <a
            href="https://www.notion.so/4296853271454a8091407f1116c057ed?v=1ce044920ad1431ea931a6829e7b3e34"
            class="text-blue-500"
          >
            영어 Vegan Journey 테이블
          </a>
          에 새 항목을 생성합니다. 이미 번역된 항목이 있는 경우 새로 생성됩니다.
        </p>
        <button class="bg-pink-400 rounded-lg py-4 px-8 text-white text-xl block focus:outline-none focus:ring-pink-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95 transition-all duration-100 ease-in-out">
          Translate
        </button>
      </div>
    </Container>
  );
};

export default ManagePage;
