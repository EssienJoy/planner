import { HiOutlineHome, HiCalendarDays } from "react-icons/hi2";
import { HiOutlineLogin } from "react-icons/hi";
import { MdAutoDelete } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { FaToggleOff } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

export const url = [
    {
        icon: HiOutlineHome,
        text: "Home",
        href: "/",
    },
    {
        icon: HiCalendarDays,
        text: "Plans",
        href: "/plans",
    },

];

export
    const settingsUrl = [
        {
            text: "Dashboard",
            url: "/",
            icon: RxDashboard,
        },
        {
            text: "Profile",
            url: "/settings/user",
            icon: MdManageAccounts,
        },
        // {
        //     text: "Plans",
        //     url: "#",
        //     icon: GoTasklist,
        // },
        {
            text: "Notifications",
            url: "#",
            icon: IoMdNotificationsOutline,
        },
        {
            text: "Appearance",
            url: "#",
            icon: FaToggleOff,
        },
        {
            text: "User Control",
            url: "#",
            icon: MdAutoDelete,
        },
    ];