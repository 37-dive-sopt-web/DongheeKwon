import { Button, Input } from "@components/index";
import { useSearch } from "@pages/my-page/hooks/use-search";

export default function SearchUser() {
  const { userId, handleSearch, handleSearchClick, profile } = useSearch();

  return (
    <div className="flex flex-col gap-[3rem]">
      <div className="flex flex-col gap-[1.5rem]">
        <h2 className="flex justify-between heading-sb-20 text-grayscale-900">
          <span>검색</span>
        </h2>
        <Input
          type="number"
          value={userId?.toString() ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="숫자만 입력해주세요."
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </div>
      <div className="flex flex-col gap-[1.5rem]">
        <h2 className="flex justify-between heading-sb-20 text-grayscale-900">
          검색 결과
        </h2>
        {profile ? (
          <div className="flex flex-col gap-[1.5rem]">
            <div className="flex justify-between body-size-14 text-grayscale-900">
              <span>이름</span>
              <span>{profile?.name}</span>
            </div>
            <div className="flex justify-between body-size-14 text-grayscale-900">
              <span>이메일</span>
              <span>{profile?.email}</span>
            </div>
            <div className="flex justify-between body-size-14 text-grayscale-900">
              <span>나이</span>
              <span>{profile?.age}</span>
            </div>
          </div>
        ) : (
          <div className="body-size-14 text-primary-900">응 없어</div>
        )}
      </div>
    </div>
  );
}
