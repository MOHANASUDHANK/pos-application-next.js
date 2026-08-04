"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sideBar">
            <div className="logo-section">
                <Image
                    src="/icons/logo.png"
                    alt="POS"
                    width={60}
                    height={60}
                />
                <h3>POS Cafe</h3>
            </div>
            <nav>
                <Link href="/billing" className={pathname === "/billing" ? "menu-item active" : "menu-item"}>
                    <Image
                        src="/icons/logo.png"
                        alt="Billing"
                        width={22}
                        height={22}
                    />
                    <span>Billing</span>
                </Link>
                <Link href="/inventory" className={pathname === "/inventory" ? "menu-item active" : "menu-item"}>
                    <Image
                        src="/icons/logo.png"
                        alt="Billing"
                        width={22}
                        height={22}
                    />
                    <span>Inventory</span>
                </Link>
                <Link href="/item-request" className={pathname === "/item-request" ? "menu-item active" : "menu-item"}>
                    <Image
                        src="/icons/logo.png"
                        alt="Billing"
                        width={22}
                        height={22}
                    />
                    <span>Item Request</span>
                </Link>
                <Link href="/sales-report" className={pathname === "/sales-report" ? "menu-item active" : "menu-item"}>
                    <Image
                        src="/icons/logo.png"
                        alt="Billing"
                        width={22}
                        height={22}
                    />
                    <span>Sales Report</span>
                </Link>
                
            </nav>
            <div className="profile">
                <div className="avatar">A</div>
                <div>
                    <h4>Admin</h4>
                    <p>Administrator</p>
                </div>
            </div>
        </aside>
    ) 
}