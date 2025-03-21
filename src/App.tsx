import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// 활동 유형 옵션 추가
const activityTypes = ["말하기", "추리", "노래", "기억력", "암송", "순발력", "리액션", "몸짓", "표현"];
// 인원 옵션
const peopleOptions = ["3명 이상", "4명 이상", "5명 이상"];
// 장소 옵션
const placeOptions = ["실내", "실외", "실내/실외"];
// 연령대 옵션
const ageOptions = ["어린이", "유치", "초등", "청소년", "중등", "고등", "청년", "성인", "전 연령"];

// 데이터를 직접 JSON 객체로 포함
const gamesData = [
  {
    놀이명: "성경 인물 맞히기",
    놀이설명: "질문을 통해 성경 인물을 맞히는 게임",
    놀이상세: "성경 지식 강화, 소통 유도",
    인원: "4명 이상",
    장소: "실내",
    성별: "무관",
    나이대: "청소년~성인",
    행위: "말하기, 추리",
    특징: "교육적, 협동심 유도",
  },
  {
    놀이명: "찬양 이어부르기",
    놀이설명: "돌아가며 찬양 가사를 이어 부르기",
    놀이상세: "찬양에 대한 이해와 암기력 향상",
    인원: "3명 이상",
    장소: "실내/실외",
    성별: "무관",
    나이대: "전 연령",
    행위: "노래, 기억력",
    특징: "재미있고 감성적인 분위기 형성",
  },
  {
    놀이명: "성경 구절 릴레이",
    놀이설명: "한 사람이 구절을 말하면 다음 사람이 그 다음 구절 이어 말하기",
    놀이상세: "성경 암송 훈련, 협동심",
    인원: "4명 이상",
    장소: "실내",
    성별: "무관",
    나이대: "청소년,성인",
    행위: "암송, 순발력",
    특징: "순서 중요, 팀워크 필요",
  },
  {
    놀이명: "축복 폭탄",
    놀이설명: "공을 돌리며 '하나님의 축복'을 말하다가 랜덤 타이밍에 폭탄(예: 알람)",
    놀이상세: "서로를 축복하며 긍정적인 분위기 조성",
    인원: "5명 이상",
    장소: "실내",
    성별: "무관",
    나이대: "어린이~성인",
    행위: "말하기, 리액션",
    특징: "유쾌하고 따뜻한 분위기",
  },
  {
    놀이명: "믿음의 제스처",
    놀이설명: "한 명이 성경 이야기를 몸짓으로 표현하면 나머지가 맞히는 게임",
    놀이상세: "성경 이야기 이해, 표현력 향상",
    인원: "4명 이상",
    장소: "실내",
    성별: "무관",
    나이대: "어린이~청년",
    행위: "몸짓, 표현",
    특징: "활동적, 유쾌함",
  },
];

const App = () => {
  const [games, setGames] = useState(gamesData);
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    filterGames();
  }, [searchTerm, selectedPeople, selectedPlaces, selectedAges, selectedActivities]);

  const filterGames = () => {
    let filtered = games;

    // 검색어로 필터링
    if (searchTerm) {
      filtered = filtered.filter(
        (game) => game.놀이명.toLowerCase().includes(searchTerm.toLowerCase()) || game.놀이설명.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 인원으로 필터링
    if (selectedPeople.length > 0) {
      filtered = filtered.filter((game) => selectedPeople.some((people) => game.인원 === people));
    }

    // 장소로 필터링
    if (selectedPlaces.length > 0) {
      filtered = filtered.filter((game) => selectedPlaces.some((place) => game.장소 === place || game.장소.includes(place)));
    }

    // 연령대로 필터링
    if (selectedAges.length > 0) {
      filtered = filtered.filter((game) => {
        const ageRange = game.나이대.split("~").map((age) => age.trim());
        return selectedAges.some(
          (age) =>
            game.나이대.includes(age) || game.나이대.includes("전 연령") || (ageRange.length > 1 && ageRangeIncludes(ageRange[0], ageRange[1], age)),
        );
      });
    }

    // 활동 유형으로 필터링
    if (selectedActivities.length > 0) {
      filtered = filtered.filter((game) => {
        const activities = game.행위.split(",").map((act) => act.trim());
        return selectedActivities.some((activity) => activities.includes(activity));
      });
    }

    setFilteredGames(filtered);
  };

  // 연령대 범위에 포함되는지 확인하는 함수
  const ageRangeIncludes = (start, end, age) => {
    const ageOrder = ["어린이", "유치", "초등", "청소년", "중등", "고등", "청년", "성인"];
    const startIdx = ageOrder.indexOf(start);
    const endIdx = ageOrder.indexOf(end);
    const ageIdx = ageOrder.indexOf(age);

    return startIdx <= ageIdx && ageIdx <= endIdx;
  };

  const togglePeopleFilter = (people) => {
    if (selectedPeople.includes(people)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== people));
    } else {
      setSelectedPeople([...selectedPeople, people]);
    }
  };

  const togglePlaceFilter = (place) => {
    if (selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const toggleAgeFilter = (age) => {
    if (selectedAges.includes(age)) {
      setSelectedAges(selectedAges.filter((a) => a !== age));
    } else {
      setSelectedAges([...selectedAges, age]);
    }
  };

  const toggleActivityFilter = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPeople([]);
    setSelectedPlaces([]);
    setSelectedAges([]);
    setSelectedActivities([]);
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">교회 놀이 찾기</h1>
        <p className="text-lg text-gray-600">다양한 교회 활동 놀이를 검색하고 찾아보세요</p>
      </div>

      <div className="mb-6 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="놀이명이나 설명으로 검색"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="people">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="people">인원</TabsTrigger>
            <TabsTrigger value="place">장소</TabsTrigger>
            <TabsTrigger value="age">연령대</TabsTrigger>
            <TabsTrigger value="activity">활동 유형</TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="flex flex-wrap gap-2">
            {peopleOptions.map((people) => (
              <Badge
                key={people}
                variant={selectedPeople.includes(people) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => togglePeopleFilter(people)}
              >
                {people}
              </Badge>
            ))}
          </TabsContent>

          <TabsContent value="place" className="flex flex-wrap gap-2">
            {placeOptions.map((place) => (
              <Badge
                key={place}
                variant={selectedPlaces.includes(place) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => togglePlaceFilter(place)}
              >
                {place}
              </Badge>
            ))}
          </TabsContent>

          <TabsContent value="age" className="flex flex-wrap gap-2">
            {ageOptions.map((age) => (
              <Badge
                key={age}
                variant={selectedAges.includes(age) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleAgeFilter(age)}
              >
                {age}
              </Badge>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="flex flex-wrap gap-2">
            {activityTypes.map((activity) => (
              <Badge
                key={activity}
                variant={selectedActivities.includes(activity) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleActivityFilter(activity)}
              >
                {activity}
              </Badge>
            ))}
          </TabsContent>
        </Tabs>

        {(selectedPeople.length > 0 || selectedPlaces.length > 0 || selectedAges.length > 0 || selectedActivities.length > 0) && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">적용된 필터:</span>
              <Button
                variant="outline"
                size="xs"
                onClick={clearFilters}
                className="text-xs h-7 px-2 bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
              >
                필터 초기화
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPeople.map((people) => (
                <Badge key={people} variant="secondary">
                  {people}
                </Badge>
              ))}
              {selectedPlaces.map((place) => (
                <Badge key={place} variant="secondary">
                  {place}
                </Badge>
              ))}
              {selectedAges.map((age) => (
                <Badge key={age} variant="secondary">
                  {age}
                </Badge>
              ))}
              {selectedActivities.map((activity) => (
                <Badge key={activity} variant="secondary">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{game.놀이명}</CardTitle>
                <CardDescription>{game.놀이설명}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-500 mb-4">{game.놀이상세}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">인원:</span> {game.인원}
                  </div>
                  <div>
                    <span className="font-semibold">장소:</span> {game.장소}
                  </div>
                  <div>
                    <span className="font-semibold">대상:</span> {game.나이대}
                  </div>
                  <div>
                    <span className="font-semibold">성별:</span> {game.성별}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                {game.행위.split(",").map((act, i) => (
                  <Badge key={i} variant="secondary">
                    {act.trim()}
                  </Badge>
                ))}
                <Badge variant="outline">{game.특징}</Badge>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">검색 결과가 없습니다. 다른 검색어나 필터를 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
