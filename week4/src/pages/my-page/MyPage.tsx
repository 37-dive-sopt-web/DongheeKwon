import Header from "@pages/my-page/components/header/Header";
import { MOCKUP } from "@pages/my-page/mockup";
import { useMenu } from "@pages/my-page/hooks/use-menu";
import { SearchUser, Profile } from "@pages/my-page/@section";

export default function MyPage() {
  const { selectedMenu, handleSelectMenu } = useMenu();

  return (
    <div>
      <Header
        name={MOCKUP.name}
        selectedMenu={selectedMenu}
        onSelectMenu={handleSelectMenu}
      />
      <main className="mx-auto max-w-[60rem] w-full mt-[10rem]">
        {selectedMenu === "INFO" && (
          <Profile
            username={MOCKUP.username}
            name={MOCKUP.name}
            email={MOCKUP.email}
            age={MOCKUP.age}
          />
        )}
        {selectedMenu === "MEMBERSHIP" && <SearchUser />}
      </main>
    </div>
  );
}
