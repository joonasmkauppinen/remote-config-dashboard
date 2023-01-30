import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export interface ProfileMenuProps {
  profileImageSrc?: string | null;
}

export const ProfileMenu = ({ profileImageSrc }: ProfileMenuProps) => {
  return (
    <Menu as="li">
      <Menu.Button>
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-400">
          {profileImageSrc && (
            <Image
              src={profileImageSrc}
              width={40}
              height={40}
              alt="Profile image."
            />
          )}
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" absolute right-0 z-10 mt-2 flex w-56 origin-top-right flex-col justify-items-stretch overflow-hidden rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {() => (
              <button className=" p-3 text-left text-white hover:bg-slate-600">
                Settings <span className="text-xs text-gray-400">(TODO)</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {() => (
              <button
                className=" p-3 text-left text-white hover:bg-slate-600"
                onClick={() => void signOut()}
              >
                Sign Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
