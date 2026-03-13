import { Request, Response } from "express";
import Campaign from "../models/Campaing";

export const serveAd = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country } = req.body;

    if (!country) {
      res.status(400).json({ message: "Le champ 'country' est obligatoire" });
      return;
    }

    const now = new Date();

    const campaign = await Campaign.findOne({
      status: "active",
      startDate: { $lte: now },
      endDate: { $gte: now },
      targetCountries: { $in: [country.toUpperCase()] },
    });


    if (!campaign) {
      res.status(404).json({ message: "Aucune campagne trouvée pour ce pays" });
      return;
    }

    if (campaign.impressionsServed >= campaign.budget) {
      res.status(404).json({ message: "Budget épuisé pour cette campagne" });
      return;
    }

    campaign.impressionsServed += 1;
    await campaign.save();

    res.status(200).json(campaign);

  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    res.status(500).json({ message: "Erreur serveur", error: message });
  }
};

// GET /stats
export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await Campaign.find();

    const totalCampaigns = campaigns.length;

    const activeCampaigns = campaigns.filter(
      (c) => c.status === "active"
    ).length;

    const totalImpressions = campaigns.reduce(
      (sum, c) => sum + c.impressionsServed,
      0
    );

    const impressionsByAdvertiser: Record<string, number> = {};
    for (const c of campaigns) {
      impressionsByAdvertiser[c.advertiser] =
        (impressionsByAdvertiser[c.advertiser] ?? 0) + c.impressionsServed;
    }

    let topAdvertiser = null;
    let maxImpressions = 0;
    for (const [name, impressions] of Object.entries(impressionsByAdvertiser)) {
      if (impressions > maxImpressions) {
        maxImpressions = impressions;
        topAdvertiser = name;
      }
    }

    res.status(200).json({
      totalCampaigns,
      activeCampaigns,
      totalImpressions,
      topAdvertiser,
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    res.status(500).json({ message: "Erreur serveur", error: message });
  }
};