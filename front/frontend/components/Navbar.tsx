"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar()
{
    const pathname = usePathname();

    const links = 
    [
        { href: "/", label: "Campagnes" },
        { href: "/create", label: "Nouveau campagne" },
        { href: "/stats", label: "Stats" },
    ];

    return (

        <nav className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <span className="text-lg font-semibold text-gray-900"> AdTech</span>

                <div className="flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${
                                pathname === link.href
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-900"
                            }`}
                        >
                            {link.label}
                        </Link>

                    ))}
                </div>
            </div>
        </nav>
    );
}