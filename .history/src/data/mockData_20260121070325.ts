export interface FlavorProfile {
    crunch: number;     // 0-100 (100 = Diamond Hard)
    sweetness: number;  // Brix scale
    nostalgia: number;  // 0-100
    particulate: number; // Artificiality
}

export interface Cereal {
    id: string;
    name: string;
    vintage: number;
    region: string;
    price: number;
    tastingNotes: string[];
    specs: {
        decayRate: number; // Seconds until soggy
        sugarContent: number; // Grams per serving
    };
    flavor: FlavorProfile;
    image: string; // Placeholder or generated
    brandColor: string;
    recommendedMilkPairing?: string; // Milk ID
}

export const CEREALS: Cereal[] = [
    {
        id: 'c1',
        name: "Captain's Reserve '97",
        vintage: 1997,
        region: "The Suggary Isles",
        price: 450.00,
        tastingNotes: [
            "Aggressive palette abrasion",
            "Notes of synthetic berry",
            "Finish of pure varying yellow dye #5"
        ],
        specs: {
            decayRate: 45,
            sugarContent: 12,
        },
        flavor: {
            crunch: 95,
            sweetness: 88,
            nostalgia: 90,
            particulate: 60
        },
        image: 'cereal-box-1.png',
        brandColor: 'var(--color-gold)',
        recommendedMilkPairing: 'm1'
    },
    {
        id: 'c2',
        name: "Count's Estate: Chocolate",
        vintage: 1982,
        region: "Transylvanian Mills",
        price: 1200.00,
        tastingNotes: [
            "Deep cocoa dust",
            "Marshmallow texture reminiscent of styrofoam packing peanuts",
            "Turns milk into a fine liqueur"
        ],
        specs: {
            decayRate: 20,
            sugarContent: 18,
        },
        flavor: {
            crunch: 60,
            sweetness: 92,
            nostalgia: 98,
            particulate: 85
        },
        image: 'cereal-box-2.png',
        brandColor: 'var(--color-merlot)',
        recommendedMilkPairing: 'm3'
    },
    {
        id: 'c3',
        name: "Loop de Fruit: Neon Edition",
        vintage: 2003,
        region: "Toucan Canopy",
        price: 325.00,
        tastingNotes: [
            "Citrus zest (artificial)",
            "Bright chemical acidity",
            "A bouquet of lemon floor polish"
        ],
        specs: {
            decayRate: 35,
            sugarContent: 15,
        },
        flavor: {
            crunch: 75,
            sweetness: 80,
            nostalgia: 70,
            particulate: 95
        },
        image: 'cereal-box-3.png',
        brandColor: 'var(--color-slime)',
        recommendedMilkPairing: 'm4'
    },
    {
        id: 'c4',
        name: "Frosted Flakes: Tony's Private Reserve",
        vintage: 1986,
        region: "Corn Plains of Indiana",
        price: 875.00,
        tastingNotes: [
            "Aggressive tiger branding",
            "Industrial sugar crystals with sharp edges",
            "Hints of motivational phrases"
        ],
        specs: {
            decayRate: 60,
            sugarContent: 20,
        },
        flavor: {
            crunch: 88,
            sweetness: 96,
            nostalgia: 95,
            particulate: 40
        },
        image: 'cereal-box-4.png',
        brandColor: 'var(--color-zap)',
        recommendedMilkPairing: 'm2'
    },
    {
        id: 'c5',
        name: "Cinnamon Toast Crunch: Millennium Edition",
        vintage: 2000,
        region: "Y2K Valley",
        price: 650.00,
        tastingNotes: [
            "Cannibalistic marketing undertones",
            "Dangerous levels of cinnamon dust",
            "Suspiciously addictive swirls"
        ],
        specs: {
            decayRate: 40,
            sugarContent: 16,
        },
        flavor: {
            crunch: 92,
            sweetness: 85,
            nostalgia: 88,
            particulate: 70
        },
        image: 'cereal-box-5.png',
        brandColor: 'var(--color-gold)',
        recommendedMilkPairing: 'm3'
    },
    {
        id: 'c6',
        name: "Lucky Charms: Leprechaun's Revenge",
        vintage: 1994,
        region: "Enchanted Marshlands",
        price: 1500.00,
        tastingNotes: [
            "Magically delicious (legally required phrase)",
            "Marshmallows with styrofoam texture",
            "Oat bits that taste like cardboard coins"
        ],
        specs: {
            decayRate: 25,
            sugarContent: 22,
        },
        flavor: {
            crunch: 45,
            sweetness: 94,
            nostalgia: 99,
            particulate: 88
        },
        image: 'cereal-box-6.png',
        brandColor: 'var(--color-berry)',
        recommendedMilkPairing: 'm4'
    }
];
