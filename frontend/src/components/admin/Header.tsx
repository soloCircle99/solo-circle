import { IoIosLogOut } from "react-icons/io";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { HiDotsVertical } from "react-icons/hi";

const Header = () => {
    return (
        <header className="flex items-center justify-between border border-sky-500 border-2 h-[60px] w-full">
            <div className="flex gap-2 items-center">
                <div>
                    <img src="" alt="" className="rounded-lg" />
                </div>
                <div>
                    <span className="text-lg">SoloCircle</span>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton className="flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <span className="hidden sm:block">more options</span>
                                <span className="flex items-center justify-center sm:hidden"><HiDotsVertical /></span>
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400 hidden sm:flex" />
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="py-1">
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        Account settings
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
                <button className="flex items-center gap-1 mr-2">
                    <IoIosLogOut size={20} />
                    <span className="text-[16px] hidden sm:flex">logout</span>
                </button>
            </div>
        </header>
    )
}

export default Header
