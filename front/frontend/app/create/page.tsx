"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCampaign } from "@/lib/api";

const COUNTRIES = [
    {code: "FR", label: "France"},
    {code: "ES", label: "Espagne"},
    {code: "US", label: "Etats-Unis"},
    {code: "DE", label: "Allemagne"},
];

export default function CreatePage()
{
    const router = useRouter();

    const [name, setName]               = useState("");
    const [advertiser, setAdvertiser]   = useState("");
    const [startDate, setStartDate]     = useState("");
    const [endDate, setEndDate]         = useState("");
    const [budget, setBudget]           = useState("");
    const [countries, setCountries]     = useState<string[]>([]);

    const [loading, setLoading]         = useState(false);
    const [errors, setErrors]           = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState("");

    const toggleCountry = (code: string) => {
    setCountries((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code) 
        : [...prev, code]                 
    );
  };
 
 
  const validate = () => {
    const newErrors: Record<string, string> = {};
 
    if (!name.trim())       newErrors.name       = "Le nom est obligatoire";
    if (!advertiser.trim()) newErrors.advertiser  = "L'annonceur est obligatoire";
    if (!startDate)         newErrors.startDate   = "La date de début est obligatoire";
    if (!endDate)           newErrors.endDate     = "La date de fin est obligatoire";
    if (!budget || Number(budget) <= 0)
                            newErrors.budget      = "Le budget doit être supérieur à 0";
    if (countries.length === 0)
                            newErrors.countries   = "Sélectionne au moins un pays";
 
   
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      newErrors.endDate = "La date de fin doit être après la date de début";
    }
 
    setErrors(newErrors);
   
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setServerError("");
 
   
    if (!validate()) return;
 
    setLoading(true);
    try {
      await createCampaign({
        name,
        advertiser,
        startDate,
        endDate,
        budget: Number(budget),
        targetCountries: countries,
      });
      router.push("/");
    } catch {
      setServerError("Une erreur est survenue. Vérifie que le serveur tourne.");
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold">Créer une campagne</h1>
 
      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6">
 
        
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nom de la campagne
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: Summer Campaign"
            className="text-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
 
        
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Annonceur
          </label>
          <input
            type="text"
            value={advertiser}
            onChange={(e) => setAdvertiser(e.target.value)}
            placeholder="ex: Nike"
            className=" text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.advertiser && <p className="mt-1 text-xs text-red-500">{errors.advertiser}</p>}
        </div>
 
       
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Date de début
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className= " text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Date de fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
          </div>
        </div>
 
       
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="ex: 10000"
            min="1"
            className="text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget}</p>}
        </div>
 
      
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Pays cibles
          </label>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((country) => {
              const selected = countries.includes(country.code);
              return (
                <button
                  key={country.code}
                  type="button" // important : évite de soumettre le formulaire
                  onClick={() => toggleCountry(country.code)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {country.label}
                </button>
              );
            })}
          </div>
          {errors.countries && <p className="mt-1 text-xs text-red-500">{errors.countries}</p>}
        </div>
 
      
        {serverError && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {serverError}
          </p>
        )}
 
      
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Création en cours..." : "Créer la campagne"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
        </div>
 
      </form>
    </div>

  );
}