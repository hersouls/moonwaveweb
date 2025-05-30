// src/data/trips.js
export const trips = [
  {
    id: 1,
    date: "2024-05-31 (토)",
    day: "1일차",
    weather: "흐림",
    schedule: [
      { time: "00:00", type: "교통", label: "출발" },
      { time: "07:30", type: "교통", label: "발권" },
      { time: "아침", type: "식사", label: "편의점" },
      { time: "08:30", type: "교통", label: "목포항 출발" },
      { time: "12:30", type: "교통", label: "제주항 도착" },
      {
        time: "13:00", type: "식사", label: "키친테왁(뿔소라 게우장밥)",
        url: "https://maps.app.goo.gl/2UMFcUbn9fmsa8cT9",
        memo: "현지 인기 해산물 식당"
      },
      {
        type: "포장", label: "천도두루치기",
        url: "https://maps.app.goo.gl/VEeH3fwkjrJmzYpe9",
        memo: "저녁 안주용 포장"
      },
      {
        type: "장소", label: "한림공원수국동산",
        url: "https://maps.app.goo.gl/wGaF3WdJNwXEFPNa9",
        addr: "제주특별자치도 제주시 한림읍"
      },
      {
        type: "장소", label: "협재해수욕장",
        url: "https://maps.app.goo.gl/Dd7V2YawxyrNr2JTA"
      },
      {
        type: "장소", label: "쌍용굴",
        url: "https://maps.app.goo.gl/8JGvBmzoJvUcDgAg9"
      },
      {
        type: "장소", label: "협재굴",
        url: "https://maps.app.goo.gl/PkqPMKPCTHSnfQ1n6"
      },
      {
        time: "17:30", type: "숙소", label: "한림별채 체크인",
        url: "https://maps.app.goo.gl/1FMiXaC9FBnAfGrs7"
      },
      {
        time: "19:00", type: "식사", label: "제주도 해녀세자매",
        url: "https://maps.app.goo.gl/5LntUu2D9MnoyfWo7"
      },
      { type: "포장", label: "천도두루치기" }
    ]
  },
  {
    id: 2,
    date: "2024-06-01 (일)",
    day: "2일차",
    weather: "흐림",
    schedule: [
      { time: "08:00", type: "식사", label: "아침" },
      { time: "08:00~09:00", type: "교통", label: "이동 (1시간)" },
      {
        time: "09:00", type: "장소", label: "(제패) 낙타트레킹",
        url: "https://maps.app.goo.gl/dVNPe16Y391SvUvc7"
      },
      {
        type: "카페", label: "(제패,카페) 포레스텔라 인 제주",
        url: "https://maps.app.goo.gl/HNxtwmKYLvNsgNVHA"
      },
      {
        time: "11:00", type: "장소", label: "(제패) 탐라승마장",
        url: "https://maps.app.goo.gl/wxuPqCKATApYtMhcA"
      },
      {
        time: "12:00", type: "식사", label: "오름나그네 점심",
        url: "https://maps.app.goo.gl/VPSDxvMCQMvBN9tH6"
      },
      {
        time: "13:00", type: "장소", label: "제주동화마을",
        url: "https://maps.app.goo.gl/UwntHNq8yFvfP3k69"
      },
      {
        time: "14:00", type: "카페", label: "(제패,카페)안도르",
        url: "https://maps.app.goo.gl/T2E1iw3uGugKxpzT6"
      },
      {
        time: "15:00", type: "장소", label: "(제패) 선녀와나무꾼",
        url: "https://maps.app.goo.gl/fHv2DQdB1wPfHeCs7"
      },
      {
        time: "16:00", type: "장소", label: "(제패) 제주라프",
        url: "https://maps.app.goo.gl/sBCYTLhvTdKqK3r26"
      },
      {
        time: "17:00", type: "카페", label: "(제패,카페)라토커피제주",
        url: "https://maps.app.goo.gl/CaKEcashwazWVvHJ7"
      },
      {
        time: "17:30", type: "장소", label: "(제패) 하리보해피월드",
        url: "https://maps.app.goo.gl/LHCJcPdiV8Xad3Kg7"
      },
      {
        time: "19:00", type: "식사", label: "돝밭 애월흑돼지 저녁",
        url: "https://maps.app.goo.gl/gcfFbhNP9b1pnDhx6"
      }
    ]
  },
    {
    id: 3,
    date: "2024-06-02 (월)",
    day: "3일차",
    weather: "오전 구름 많음 (강수 5%)",
    schedule: [
      { time: "08:00", label: "아침" },
      { time: "09:00", label: "숙소 체크아웃" },
      { time: "09:00", label: "(제패,카페) 본카페", url: "https://maps.app.goo.gl/D2MK95Qnea91LTKe7" },
      { time: "10:00", label: "(제패,카페) 시소 카이막 애월점", url: "https://maps.app.goo.gl/TWh6m8o25pUVhCQX8" },
      { time: "10:30", label: "(제패) 상가리야자숲", url: "https://maps.app.goo.gl/k312CD2pMMYNDY858" },
      { time: "11:30", label: "(제패) 제주양때목장", url: "https://maps.app.goo.gl/E7kTf593hkpQLjPWA" },
      { time: "13:00", label: "모녀의부엌 점심", url: "https://maps.app.goo.gl/McRYqpMXydyQxDoS9" },
      { time: "14:00", label: "(제패) 윈드1947", url: "https://maps.app.goo.gl/WizwA5z1jkUkAPwP7" },
      { time: "15:00", label: "(제패) 레몬뮤지엄", url: "https://maps.app.goo.gl/fVVwPc9yBwVjwUpy6" },
      { time: "16:00", label: "(제패) 상효원수목원", url: "https://maps.app.goo.gl/Hv4hEFZw5haa5odJ7" },
      { time: "16:00", label: "JW 메리어트 제주 체크인", url: "https://maps.app.goo.gl/g3B4gq2Z69dqFv6E6" },
      { time: "17:00~18:00", label: "수영장" },
      { time: "19:00", label: "신우가촌 저녁", url: "https://maps.app.goo.gl/rE4Hius5GqQUYEX1A" }
    ]
  },
  {
    id: 4,
    date: "2024-06-03 (화)",
    day: "4일차",
    weather: "오전 가벼운 비 (강수 50%)",
    schedule: [
      { time: "07:30", label: "아침" },
      { time: "09:30", label: "(제패,카페) 오알", url: "https://maps.app.goo.gl/XjPfughuCXhpPNAK9" },
      { time: "10:30", label: "(제패) 엑트몬 제주점", url: "https://maps.app.goo.gl/8kqvfNLKw1AtzZag7" },
      { time: "12:00~14:30", label: "브런치로얄 점심" },
      { time: "15:00", label: "(제패) 세리월드", url: "https://maps.app.goo.gl/8yEPKpcoajX3jhvY6" },
      { time: "18:00", label: "삼거리농원 저녁", url: "https://maps.app.goo.gl/EZiArJcffDjNSb4HA" },
      { time: "19:00", label: "산방산 탄산온천", url: "https://maps.app.goo.gl/oP9ibNeUUsXv3Ryb7" },
      { time: "20:00", label: "(제패) 루나폴", url: "https://maps.app.goo.gl/ZFtedPqdFVZWuP2u7" }
    ]
  },
   {
    id: 5,
    date: "2024-06-04 (수)",
    day: "5일차",
    weather: "맑음",
    schedule: [
      { time: "07:30", label: "조식" },
      { time: "08:30", label: "숙소 체크아웃" },
      { time: "09:00", label: "(제패) 제주제트", url: "https://maps.app.goo.gl/8kqvfNLKw1AtzZag7" },
      { time: "10:00", label: "(제패,카페) 시즈널리티", url: "https://maps.app.goo.gl/jveMUbtBznJgsUSw7" },
      { time: "11:00", label: "(제패) 퍼시픽 마리나 요트투어", url: "https://maps.app.goo.gl/g3jLxCdZdAjHkJf9A" },
      { time: "13:00", label: "고집돌우럭 중문점 점심", url: "https://maps.app.goo.gl/GXU5Jcsk7PXnef1k8" },
      { time: "14:00", label: "파더스가든", url: "https://maps.app.goo.gl/HH9qN9okpyUvzyTE9" },
      { time: "15:00", label: "(제패) 카멜리아힐", url: "https://maps.app.goo.gl/gJimpwNNANVC15RZ8" },
      { time: "16:00", label: "(제패) 무민랜드제주", url: "https://maps.app.goo.gl/Ys51VJzevdc7hiiv8" },
      { time: "17:00", label: "(제패) 점보빌리지", url: "https://maps.app.goo.gl/HfAc4hH6KyfJxeKRA" },
      { time: "18:00", label: "서광우리집식당 저녁", url: "https://maps.app.goo.gl/fbWrpdeTjHkRXG8M7" },
      { time: "19:00", label: "제주신화월드 메리어트 리조트 체크인", url: "https://maps.app.goo.gl/xJcKxwwbkGV5627W6" }
    ]
  },
  {
    id: 6,
    date: "2024-06-05 (목)",
    day: "6일차",
    weather: "대체로 맑음",
    schedule: [
      { time: "08:00", label: "조식" },
      { time: "09:00", label: "(제패) 방림원", url: "https://maps.app.goo.gl/hc9yavcniiDgMjoY7" },
      { time: "10:00", label: "(제패) 더마파크", url: "https://maps.app.goo.gl/1m1tjQFXj7sKPRKAA" },
      { time: "11:00", label: "(제패) 비체올린", url: "https://maps.app.goo.gl/q4U3cmeomoWikL9G6" },
      { time: "12:30", label: "제주돔베막국수 점심", url: "https://maps.app.goo.gl/TKPvqrA4BH4TptZHA" },
      { time: "14:00", label: "(제패) 차귀도 태양배낚시 with 돌고래", url: "https://maps.app.goo.gl/1UFJBGKaPdwbit7b8" },
      { time: "16:00", label: "(제패,카페) 미쁜제과", url: "https://maps.app.goo.gl/zQL1CccP8JguDkVa8" },
      { time: "17:00", label: "(제패) 벨진밧", url: "https://maps.app.goo.gl/FCu5AW8NN9sab2PR7" },
      { time: "18:00", label: "뚱보아저씨 저녁", url: "https://maps.app.goo.gl/eHDiLTGW2L28KJpZ8" },
      { time: "19:00", label: "(제패) 산양큰엉곶", url: "https://maps.app.goo.gl/sYd7rkRujSPXYgxx7" }
    ]
  },
  {
    id: 7,
    date: "2024-06-06 (금)",
    day: "7일차",
    weather: "맑음",
    schedule: [
      { time: "08:00", label: "조식" },
      { time: "09:00", label: "운진항 출발 / 가파도 도착" },
      { time: "11:20", label: "가파도 출발 / 운진항 도착" },
      { label: "점심" }, // 점심 장소 정보 없음
      { time: "12:20", label: "운진항 출발 / 마라도 도착" },
      { time: "14:30", label: "가파도 출발 / 운진항 도착" },
      { time: "16:00~18:00", label: "수영장" },
      { label: "저녁: 미정" }
    ]
  },
  {
    id: 8,
    date: "2024-06-07 (토)",
    day: "8일차",
    weather: "맑음",
    schedule: [
      { time: "07:30", label: "조식" },
      { time: "08:00", label: "숙소 체크아웃" },
      { time: "08:00~09:00", label: "이동 (1시간)" },
      { time: "09:00", label: "(협찬) 제주레포츠랜드", url: "https://maps.app.goo.gl/sBCYTLhvTdKqK3r26" },
      { label: "함덕해수욕장", url: "https://maps.app.goo.gl/k3Jy8aVburhumZPk8" },
      { time: "11:30", label: "함덕회춘 점심", url: "https://maps.app.goo.gl/36PGZyaPrepGqiff9" },
      { time: "12:45", label: "승선" },
      { time: "13:45", label: "제주항 출발" },
      { time: "19:00", label: "목포항 도착" },
      { label: "저녁: 포장" },
      { time: "19:00~20:30", label: "이동 (1시간 30분)" },
      { time: "20:30", label: "태평양스파 찜질방 체크인", url: "https://maps.app.goo.gl/dC1dsMggMAhXdrsv7" }
    ]
  },
  {
    id: 9,
    date: "2024-06-08 (일)",
    day: "9일차",
    weather: "맑음",
    schedule: [
      { label: "조식: 미정" },
      { time: "07:30", label: "숙소 체크아웃" },
      { time: "07:30~09:30", label: "이동 (2시간)" },
      { time: "10:00~10:50", label: "여남당항 네트어드벤처", url: "https://maps.app.goo.gl/CUPRCPpHtNjcrexv7" },
      { time: "11:00", label: "언니네해물손칼국수 점심", url: "https://maps.app.goo.gl/CLrAPjTE2Jg3tNqX9" },
      { time: "12:00~14:00", label: "이동 (2시간)" }
    ]
  }
];
