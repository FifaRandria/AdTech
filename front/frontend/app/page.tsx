"use client";

import { useEffect, useState } from "react";
import { getCampaigns } from "@/lib/api";


type Campaign = {
  _id: string;
  name: string;
  advertiser: string;
  status: "active" | "paused" | "ended";
  impressionsServed: number;
  budget:number;
  startDate: string;
  endDate: string;
};

const statusStyle = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  ended: "bg-gray-100 text-gray-600",
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCampaigns()
      .then (setCampaigns)
      .catch(() => setError ("Impossible de charger les campagnes, verifie le serveur"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500"> Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Campagnes</h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-500">Aucune campagne pour l'instant.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Annonceur</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Impressions</th>
                <th className="px-4 py-3 text-right">Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.advertiser}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyle[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {c.impressionsServed.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {c.budget.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
}
