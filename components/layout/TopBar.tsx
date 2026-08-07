"use client";

import { usePathname } from "next/navigation"
import DateTimeCard from "../ui/DateTimeCard";
export default function TopBar() {
 const pathname = usePathname();
 const title = pathname.split("/")[1]?.replace(/-/g," ").replace(/\b\w/g, (c) => c.toUpperCase()) ||"Dashboard";
    return (
        <div className="topbar">
            <div className="topbar-title">
                {title}
            </div>
            <div className="topbar-date-time">
                <DateTimeCard />
            </div>
        </div>
    )
}