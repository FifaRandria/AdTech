"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/lib/api";

type stats = {
    totalCampaigns: number;
    activeCampaigns: number;
    totalImpressions: number;
    topAdvertiser: string | null;
};

export default function StatsPage()
{
    const [stats, setStats] = useState<stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getStats()
            .then(setStats)
            .catch(() => setError("Impossible de charger les stats"))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <p className="text-gray-500"> Chargement...</p>;
    if (error)
        return <p className="text-red-500">{error}</p>;
    if (!stats)
        return null;

    return (
        <div>
        <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
    
        {/* 4 cartes de stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    
            <StatCard
            label="Campagnes totales"
            value={stats.totalCampaigns}
            />
            <StatCard
            label="Campagnes actives"
            value={stats.activeCampaigns}
            highlight
            />
            <StatCard
            label="Impressions totales"
            value={stats.totalImpressions.toLocaleString()}
            />
            <StatCard
            label="Top annonceur"
            value={stats.topAdvertiser ?? "—"}
            />
    
        </div>
        </div>
    );
    }
    

function StatCard({
    label,
    value,
    highlight = false,
    }: {
    label: string;
    value: string | number;
    highlight?: boolean;
    }) {
    return (
        <div className={`rounded-lg border p-5 bg-white ${
        highlight ? "border-blue-200" : "border-gray-200"
        }`}>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {label}
        </p>
        <p className={`mt-2 text-2xl font-semibold ${
            highlight ? "text-blue-600" : "text-gray-900"
        }`}>
            {value}
        </p>
        </div>
    )
}