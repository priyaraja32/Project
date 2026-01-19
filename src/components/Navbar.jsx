// // import { Link, NavLink } from "react-router-dom";
// // import { Bell } from "lucide-react";

// // export default function Navbar({
// //   infoText,
// //   infoLinkText,
// //   infoLink,
// //   actionText,
// //   actionLink,
// // }) {
// //   return (
// //     <nav className="w-full flex items-center justify-between px-8 lg:px-12 py-5 bg-white/80 backdrop-blur border-b border-gray-100">

// //       {/* LOGO */}
// //       <Link to="/" className="flex items-center gap-2">
// //         <img
// //           src="/skill.png"
// //           alt="SkillSwap Logo"
// //           className="h-10 w-10 object-contain"
// //         />

// //         <span
// //           className="
// //             text-xl lg:text-2xl font-extrabold
// //             bg-gradient-to-r from-indigo-600 to-purple-600
// //             bg-clip-text text-transparent
// //             tracking-tight
// //           "
// //         >
// //           SkillSwap
// //         </span>
// //       </Link>

// //       {/* CENTER NAV LINKS */}
// //       <div className="hidden md:flex items-center gap-8 text-sm font-medium">
// //         <NavItem to="/" label="Home" />
// //         <NavItem to="/dashboard" label="Discovery" />
// //         <NavItem to="/my-skills" label="My Skills" />
// //         <NavItem to="/messages" label="Messages" />
// //         <NavItem to="/community" label="Community" />
// //       </div>

// //       {/* RIGHT SIDE */}
// //       <div className="flex items-center gap-4">

// //         {infoText && (
// //           <p className="text-sm text-gray-500 hidden lg:block">
// //             {infoText}{" "}
// //             <Link
// //               to={infoLink}
// //               className="font-semibold text-indigo-600 hover:text-indigo-700"
// //             >
// //               {infoLinkText}
// //             </Link>
// //           </p>
// //         )}

// //         <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
// //           <Bell size={20} className="text-gray-700" />
// //           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
// //         </button>

// //         {actionText && (
// //           <Link
// //             to={actionLink}
// //             className="
// //               px-6 py-2.5 rounded-full text-sm font-semibold text-white
// //               bg-gradient-to-r from-indigo-600 to-purple-600
// //               hover:from-indigo-700 hover:to-purple-700
// //               shadow-md hover:shadow-lg
// //               active:scale-95
// //               transition-all duration-200
// //             "
// //           >
// //             {actionText}
// //           </Link>
// //         )}

// //         <div className="w-9 h-9 rounded-full bg-orange-300 flex items-center justify-center font-semibold text-white">
// //           A
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// // function NavItem({ to, label }) {
// //   return (
// //     <NavLink
// //       to={to}
// //       className={({ isActive }) =>
// //         isActive
// //           ? "text-indigo-600 font-semibold"
// //           : "text-gray-600 hover:text-indigo-600 transition"
// //       }
// //     >
// //       {label}
// //     </NavLink>
// //   );
// // }

// import { Link, NavLink } from "react-router-dom";
// import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
// import { useState } from "react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="
//       sticky top-0 z-50
//       w-full h-[72px]
//       flex items-center justify-between
//       px-6 lg:px-12
//       bg-white/80 backdrop-blur
//       border-b border-gray-200
//     ">
//       {/* LOGO */}
//       <Link to="/" className="flex items-center gap-2">
//         <img
//           src="/skill.png"
//           alt="SkillSwap Logo"
//           className="h-9 w-9 object-contain"
//         />
//         <span className="
//           text-xl lg:text-2xl font-extrabold
//           bg-gradient-to-r from-indigo-600 to-purple-600
//           bg-clip-text text-transparent
//         ">
//           SkillSwap
//         </span>
//       </Link>

//       {/* CENTER NAV */}
//       <div className="hidden md:flex items-center gap-8 text-sm font-medium">
//         <NavItem to="/" label="Home" />
//         <NavItem to="/dashboard" label="Discovery" />
//         <NavItem to="/my-skills" label="My Skills" />
//         <NavItem to="/messages" label="Messages" />
//         <NavItem to="/community" label="Community" />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-4 relative">
//         {/* Notification */}
//         <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
//           <Bell size={20} className="text-gray-700" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
//         </button>

//         {/* PROFILE */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="
//             flex items-center gap-2
//             px-2 py-1.5
//             rounded-full
//             hover:bg-gray-100
//             transition
//           "
//         >
//           <div className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center text-white font-semibold">
//             A
//           </div>
//           <ChevronDown size={16} className="text-gray-500" />
//         </button>

//         {/* DROPDOWN */}
//         {open && (
//           <div className="
//             absolute right-0 top-14
//             w-48
//             bg-white
//             border border-gray-200
//             rounded-xl
//             shadow-lg
//             overflow-hidden
//           ">
//             <DropdownItem icon={<User size={16} />} label="Profile" to="/profile" />
//             <DropdownItem icon={<Settings size={16} />} label="Settings" to="/settings" />
//             <div className="h-px bg-gray-100" />
//             <DropdownItem
//               icon={<LogOut size={16} />}
//               label="Logout"
//               to="/login"
//               danger
//             />
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// /* NAV ITEM */
// function NavItem({ to, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         isActive
//           ? "text-indigo-600 font-semibold"
//           : "text-gray-600 hover:text-indigo-600 transition"
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// /* DROPDOWN ITEM */
// function DropdownItem({ icon, label, to, danger }) {
//   return (
//     <Link
//       to={to}
//       className={`
//         flex items-center gap-3 px-4 py-2.5 text-sm
//         ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"}
//         transition
//       `}
//     >
//       {icon}
//       {label}
//     </Link>
//   );
// }

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="
        sticky top-0 z-50
        w-full h-[72px]
        flex items-center justify-between
        px-6 lg:px-12
        bg-white/80 backdrop-blur
        border-b border-gray-100
      "
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/skill.png"
          alt="SkillSwap Logo"
          className="h-9 w-9 object-contain"
        />
        <span
          className="
            text-xl lg:text-2xl font-extrabold
            bg-gradient-to-r from-indigo-600 to-purple-600
            bg-clip-text text-transparent
          "
        >
          SkillSwap
        </span>
      </Link>

      {/* CENTER NAV */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <NavItem to="/" label="Home" />
        <NavItem to="/dashboard" label="Discovery" />
        <NavItem to="/my-skills" label="My Skills" />
        <NavItem to="/messages" label="Messages" />
        <NavItem to="/community" label="Community" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* PROFILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="
            flex items-center gap-2
            px-2 py-1.5
            rounded-full
            hover:bg-gray-100
            transition
          "
        >
          <div className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center text-white font-semibold">
            P
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div
            className="
              absolute right-0 top-14
              w-52
              bg-white
              border border-gray-100
              rounded-xl
              shadow-lg
              overflow-hidden
            "
          >
            <DropdownItem
              icon={<User size={16} />}
              label="My Profile"
              onClick={() => navigate("/profile")}
            />
            <DropdownItem
              icon={<Settings size={16} />}
              label="Settings"
              onClick={() => navigate("/settings")}
            />

            <div className="h-px bg-gray-100 my-1" />

            <DropdownItem
              icon={<LogOut size={16} />}
              label="Logout"
              danger
              onClick={() => navigate("/login")}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

/* ---------- NAV ITEM ---------- */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-indigo-600 font-semibold"
          : "text-gray-600 hover:text-indigo-600 transition"
      }
    >
      {label}
    </NavLink>
  );
}

/* ---------- DROPDOWN ITEM ---------- */
function DropdownItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
        ${
          danger
            ? "text-red-500 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-50"
        }
        transition
      `}
    >
      {icon}
      {label}
    </button>
  );
}

