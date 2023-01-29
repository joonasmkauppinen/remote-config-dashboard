import type { Project } from "@prisma/client";

import Link from "next/link";

interface ProjectCardProps extends Omit<Project, "id"> {
  href: string;
  onClick?: () => void;
}

export const ProjectCard = ({ href, name, onClick }: ProjectCardProps) => {
  return (
    <Link href={href}>
      <li
        className="h-40 flex-1 list-none rounded border border-gray-600 p-4 hover:cursor-pointer hover:bg-gray-800"
        onClick={onClick}
      >
        <h2 className="text-lg text-white">{name}</h2>
      </li>
    </Link>
  );
};
