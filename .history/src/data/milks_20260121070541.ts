export interface Milk {
    id: string;
    name: string;
    type: 'dairy' | 'plant' | 'experimental';
    flavorNotes: string; // Renamed from tastingNotes
    fatContent: string;  // e.g. "3.5%", "Vintage Fat"
    viscosity: string;   // e.g. "Silky", "Thick", "Watery"
    bestPairedWith: string[]; // Cereal IDs
}

export const MILKS: Milk[] = [
    {
        id: 'm1',
        name: "Artisanal Whole (Grass-Fed)",
        type: 'dairy',
        flavorNotes: "Rich, creamy velvety mouthfeel. The classic canvas.",
        fatContent: "4.0%",
        viscosity: "Velvety",
        bestPairedWith: ['c1', 'c2', 'c4']
    },
    {
        id: 'm2',
        name: "Oat Noir (Barista Blend)",
        type: 'plant',
        flavorNotes: "Earthy undertones that ground the sugar spikes.",
        fatContent: "2.5%",
        viscosity: "Creamy",
        bestPairedWith: ['c1', 'c3', 'c5']
    },
    {
        id: 'm3',
        name: "Macadamia Silk",
        type: 'plant',
        flavorNotes: "Nutty, buttery finish. Luxury in liquid form.",
        fatContent: "3.0%",
        viscosity: "Silky",
        bestPairedWith: ['c2', 'c5']
    },
    {
        id: 'm4',
        name: "Strawberry 2% (Vintage)",
        type: 'experimental',
        flavorNotes: "Double sweetness. For the brave or the foolish.",
        fatContent: "2.0%",
        viscosity: "Thin",
        bestPairedWith: ['c3', 'c6']
    },
    {
        id: 'm5',
        name: "Chocolate Milk (The Forbidden Pairing)",
        type: 'experimental',
        flavorNotes: "Chocolate on chocolate. An abomination or genius? You decide.",
        fatContent: "2.5%",
        viscosity: "Thick",
        bestPairedWith: ['c2', 'c5']
    },
    {
        id: 'm6',
        name: "Lactose-Free Skim (The Sadness)",
        type: 'dairy',
        flavorNotes: "Like drinking water with regret. But hey, no stomach issues!",
        fatContent: "0.1%",
        viscosity: "Watery",
        bestPairedWith: ['c4']
    }
];
