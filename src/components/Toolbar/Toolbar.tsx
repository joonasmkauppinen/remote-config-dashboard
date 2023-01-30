import { useRouter } from "next/router";
import { ProfileMenu, type ProfileMenuProps } from "../ProfileMenu/ProfileMenu";
import { Breadcrumb } from "./Breadcrumb";

export const Toolbar = ({ profileImageSrc }: ProfileMenuProps) => {
  const router = useRouter();

  const pathWithoutQuery = router.asPath.split("?")[0] || "";
  const breadcrumbs = pathWithoutQuery
    .split("/")
    .map((item) => decodeURI(item))
    .filter(Boolean);

  const hrefs = breadcrumbs.map((_, index) =>
    breadcrumbs
      .slice(0, index + 1)
      .map((item) => "/" + encodeURI(item))
      .join("")
  );
  console.log({ hrefs });

  return (
    <header className="sticky top-0 border-b border-gray-700 bg-gray-900">
      <nav className="flex px-6 py-2">
        <ul className="flex flex-1 justify-between">
          <span className="inline-flex">
            {breadcrumbs.map((breadcrumb, index) => (
              <Breadcrumb
                href={hrefs[index]}
                title={breadcrumb}
                key={`breadcrumb-${index}`}
                isLast={index + 1 === breadcrumbs.length}
              />
            ))}
          </span>
          <ProfileMenu profileImageSrc={profileImageSrc} />
        </ul>
      </nav>
    </header>
  );
};
