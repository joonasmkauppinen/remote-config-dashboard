import Link from "next/link";

export interface BreadcrumbProps {
  href: string;
  isLast?: boolean;
  title: string;
}

export const Breadcrumb = ({ href, isLast, title }: BreadcrumbProps) => {
  return (
    <li className="flex items-center text-white">
      <Link href={href} className="capitalize">
        {title}
      </Link>
      {!isLast && <span className="mx-5 select-none text-gray-500">/</span>}
    </li>
  );
};
