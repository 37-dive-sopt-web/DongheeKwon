interface HeaderProps {
  title: string;
  rightComponent: React.ReactNode;
}

export default function Header({ title, rightComponent }: HeaderProps) {
  return (
    <nav className="flex p-[2rem] rounded-[1rem] justify-between items-center bg-gray-300">
      <p className="heading-sb-20">{title}</p>
      {rightComponent}
    </nav>
  );
}
