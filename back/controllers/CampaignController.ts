import { Request, Response } from "express";

import Campaing from "../models/Campaing";

interface CreateCampaignBody
{
    name: string;
    advertiser: string;
    startDate: string;
    endDate: string;
    budget: number;
    targetCountries?: string[];
}

export const createCampaign = async (req: Request<{}, {}, CreateCampaignBody>, res: Response):
Promise<void> => 
{
    try {
        const {name, advertiser, startDate, endDate, budget, targetCountries} = req.body;

        if (!name || !advertiser || !startDate || !endDate || !budget)
        {
            res.status(400).json({
                message: "Champs obligatoires manquants: name, advertiser, startDate, endDate, budget",

            });
            return;
        }

        if (new Date(endDate) <= new Date(startDate))
        {
            res.status(400).json({message: "enDate doit etre apres startDate"});
            return;
        }

        const campaign = new Campaing ({
            name,
            advertiser,
            startDate,
            endDate,
            budget,
            targetCountries: targetCountries ?? [],

        });
        const savedCampaign = await campaign.save();

        res.status(201).json(savedCampaign);
    } catch (error)
    {
        if (error instanceof Error && error.name === "ValidationError")
        {
            res.status(400).json({message:error.message});
            return;
        }
        const message = error instanceof Error ? error.message : "Erreur inconnue";
        res.status(500).json({message: "Erreur serveur", erreur: message});
    }


};




interface GetCampaignsQuerry {
    status?: string;
    advertiser?: string;
    country?: string;
}

export const getCampaigns = async (req: Request<{}, {}, {}, GetCampaignsQuerry>, res: Response):
Promise<void> => {

    try{
        const {status, advertiser, country} = req.query;

        const filter: Record<string, unknown> = {};

        if (status)
            filter.status = status;
        if (advertiser)
            filter.advertiser = {$regex: advertiser, $options: "i"};
        if (country)
            filter.targetCountries = { $in: [country.toUpperCase()] };

        const campaigns = await Campaing.find (filter).sort({createdAt: -1});

        res.status(200).json(campaigns);
    
    }catch (error)
    {
        const message = error instanceof Error ? error.message: "Erreur inconnue";
        res.status(500).json({message:"Erreur serveur", error: message});
    }
};