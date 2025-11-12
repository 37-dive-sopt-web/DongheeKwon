import Header from "@pages/my-page/components/header/Header";
import { useMenu } from "@pages/my-page/hooks/use-menu";
import { SearchUser, Profile } from "@pages/my-page/@section";
import { useSearchParams } from "react-router-dom";
import { useGetProfile } from "./apis/get-profile";
import { getUserId } from "@utils/auth";

export default function MyPage() {
  const [searchParams] = useSearchParams();
  const userIdFromParams = searchParams.get("userId");
  const userIdFromStorage = getUserId();
  const userId = userIdFromParams ?? userIdFromStorage?.toString() ?? null;
  const { selectedMenu, handleSelectMenu } = useMenu(Number(userId));
  const { data: profile } = useGetProfile(Number(userId));
  return (
    <div>
      <Header
        name={profile?.name ?? ""}
        selectedMenu={selectedMenu}
        onSelectMenu={handleSelectMenu}
      />
      <main className="mx-auto max-w-[60rem] w-full mt-[10rem]">
        {selectedMenu === "INFO" && (
          <Profile
            userId={Number(userId)}
            username={profile?.username ?? ""}
            name={profile?.name ?? ""}
            email={profile?.email ?? ""}
            age={profile?.age ?? 0}
          />
        )}
        {selectedMenu === "MEMBERSHIP" && <SearchUser />}
      </main>
    </div>
  );
}
