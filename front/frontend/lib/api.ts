
const API_URL = "http://localhost:5000";

export async function getCampaigns (filters?: {
    status?: string;
    advertiser?: string;
    country?: string;
}){
    const params = new URLSearchParams();

    if (filters?.status)
        params.append("status", filters.status);
    if (filters?.advertiser)
        params.append ("advertiser", filters.advertiser);
    if (filters?.country)
        params.append("country", filters.country);

    const res = await fetch(`${API_URL}/campaigns?${params.toString()}`);

    if (!res.ok)
        throw new Error ("Error lors de la recuperation des campagnes");
    return res.json();
}

export async function createCampaign( data: {
    name: string;
    advertiser: string;
    startDate: string;
    endDate:  string;
    budget: number;
    targetCountries: string[];
}) {
    const res = await fetch(`${API_URL}/campaigns`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok)
        throw new Error ("Error lors de la creation de la campagne");
    return res.json();
}

export async function getStats()
{
    const res = await fetch (`${API_URL}/stats`);
    if (!res.ok)
        throw new Error("Erreur lors de la recuperation des stats");
    return res.json();
}