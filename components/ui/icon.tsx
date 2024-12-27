import React, { useMemo } from "react";
import {
  CloudUpload,
  Plus,
  Check,
  Trash2,
  X,
  Unlink,
  Heart,
  CircleX,
  TextSearch,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  TriangleAlert,
  User,
  KeyRound,
  House,
  Keyboard,
  Menu,
  ChevronDown,
  MoveRight,
  Search,
  ChevronRight,
  BadgeDollarSign,
  Minus,
  SlidersHorizontal,
  Loader,
  LogOut,
  Grip, Book,
  MessageCircle, GraduationCap
} from "lucide-react";

// import { User as UserSolid } from "lucide-solid";

import NextImg from "next/image";

export const icons = {
  plus: <Plus />,
  cloudUpload: <CloudUpload />,
  check: <Check />,
  trash: <Trash2 />,
  xMark: <X />,
  circleX: <CircleX />,
  unLink: <Unlink />,
  emptyHeart: <Heart />,
  emptyData: <TextSearch />,
  email: <Mail />,
  lock: <LockKeyhole />,
  eye: <Eye />,
  eyeOff: <EyeOff />,
  warning: <TriangleAlert />,
  user: <User />,
  key: <KeyRound />,
  house: <House />,
  keyboard: <Keyboard />,
  menu: <Menu />,
  chevronDown: <ChevronDown />,
  chevronRight: <ChevronRight />,
  moveRight: <MoveRight />,
  search: <Search />,
  dollar: <BadgeDollarSign />,
  minus: <Minus />,
  filters: <SlidersHorizontal />,
  spinner: <Loader />,
  logout: <LogOut />,
  grip: <Grip />,
  book: <Book />,
  messageCircle: <MessageCircle />,
  graduationCap: <GraduationCap />,
  google_local: "/assets/images/google-icon.svg"
} as const;

interface Props {
  name: keyof typeof icons | string;
  className?: string;
  size?: number;
  fill?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Icon = ({ name, className, size = 16, onClick, fill }: Props) => {
  const icon = useMemo(() => {
    const isIconFromProvider = name in icons && !name.includes("_local");

    if (isIconFromProvider) {
      const icon = icons[name as keyof typeof icons];
      return React.cloneElement(icon as React.ReactElement, {
        className,
        size,
        onClick,
        ...(fill && { fill })
      });
    } else {
      return (
        <NextImg
          onClick={onClick}
          src={icons[name]}
          alt={name}
          className={className}
          style={{ width: size, height: size }}
          width={size}
          height={size}
        />
      );
    }
  }, [name, className, size, onClick]);

  return <>{icon}</>;
};
export default Icon;
