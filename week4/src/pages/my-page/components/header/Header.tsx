import { Button } from "@components/index";
import { MENUS } from "@pages/my-page/components/constants/menus";
import { cn } from "@utils/cn";

interface HeaderProps {
  name: string;
  selectedMenu: string;
  onSelectMenu: (_key: string) => void;
}
export default function Header({
  name,
  selectedMenu,
  onSelectMenu,
}: HeaderProps) {
  const buttonClassName =
    "bg-primary-100 text-primary-900 hover:bg-primary-100 hover:underline";

  return (
    <header className="flex justify-between items-center bg-primary-100 p-[2rem]">
      <div className="flex flex-col gap-[1rem]">
        <h1 className="heading-sb-30">마이페이지</h1>
        <p className="body-size-14">안녕하세요 {name}님.</p>
      </div>
      <div className="flex gap-[2rem]">
        {MENUS.map(({ key, value }) => (
          <Button
            key={key}
            className={cn(
              buttonClassName,
              selectedMenu === key && "text-white body-size-16"
            )}
            onClick={() => onSelectMenu(key)}
          >
            {value}
          </Button>
        ))}
      </div>
    </header>
  );
}
