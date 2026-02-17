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
        image: '/cereals/cereal-box-1.png',
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
        image: '/cereals/cereal-box-2.png',
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
        image: '/cereals/cereal-box-3.png',
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
        image: '/cereals/cereal-box-4.png',
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
        image: '/cereals/cereal-box-5.png',
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
        image: '/cereals/cereal-box-6.png',
        brandColor: 'var(--color-berry)',
        recommendedMilkPairing: 'm4'
    },
    {
        id: 'c7',
        name: "Cocoa Puffs: Sonny's Descent",
        vintage: 1989,
        region: "Chocolate Quarries",
        price: 780.00,
        tastingNotes: [
            "Unhinged bird mascot energy",
            "Deep chocolate void",
            "Turns milk into existential crisis"
        ],
        specs: {
            decayRate: 15,
            sugarContent: 19,
        },
        flavor: {
            crunch: 55,
            sweetness: 90,
            nostalgia: 92,
            particulate: 75
        },
        image: '/cereals/cereal-box-7.png',
        brandColor: '#8B4513',
        recommendedMilkPairing: 'm3'
    },
    {
        id: 'c8',
        name: "Trix: Silly Rabbit Reserve",
        vintage: 1991,
        region: "Fruit Shape Factory",
        price: 920.00,
        tastingNotes: [
            "Not for rabbits (legally mandated)",
            "Geometrically impossible fruit shapes",
            "Colors not found in nature"
        ],
        specs: {
            decayRate: 50,
            sugarContent: 17,
        },
        flavor: {
            crunch: 82,
            sweetness: 87,
            nostalgia: 96,
            particulate: 92
        },
        image: '/cereals/cereal-box-8.png',
        brandColor: '#FF1493',
        recommendedMilkPairing: 'm4'
    },
    {
        id: 'c9',
        name: "Honey Nut Cheerios: Bee's Last Stand",
        vintage: 1995,
        region: "Endangered Apiaries",
        price: 560.00,
        tastingNotes: [
            "Melancholic bee mascot",
            "Honey notes of corporate desperation",
            "Whole grain guilt trip"
        ],
        specs: {
            decayRate: 70,
            sugarContent: 14,
        },
        flavor: {
            crunch: 65,
            sweetness: 78,
            nostalgia: 85,
            particulate: 45
        },
        image: '/cereals/cereal-box-9.png',
        brandColor: '#FFD700',
        recommendedMilkPairing: 'm2'
    },
    {
        id: 'c10',
        name: "Grape-Nuts: The Forbidden Gravel",
        vintage: 1978,
        region: "Quarry of Despair",
        price: 2100.00,
        tastingNotes: [
            "Dental work not included",
            "Texture of artisanal pebbles",
            "Requires milk-to-cement ratio calculations"
        ],
        specs: {
            decayRate: 999,
            sugarContent: 5,
        },
        flavor: {
            crunch: 100,
            sweetness: 15,
            nostalgia: 75,
            particulate: 20
        },
        image: '/cereals/cereal-box-10.png',
        brandColor: '#8B4513',
        recommendedMilkPairing: 'm1'
    },
    {
        id: 'c11',
        name: "Reese's Puffs: Breakfast Candy Legitimized",
        vintage: 1998,
        region: "Chocolate Peanut Butter Nexus",
        price: 890.00,
        tastingNotes: [
            "Legally distinct from actual Reese's",
            "Breakfast justification for dessert",
            "Peanut butter dust cloud hazard"
        ],
        specs: {
            decayRate: 38,
            sugarContent: 21,
        },
        flavor: {
            crunch: 78,
            sweetness: 93,
            nostalgia: 91,
            particulate: 82
        },
        image: '/cereals/cereal-box-11.png',
        brandColor: '#FF8C00',
        recommendedMilkPairing: 'm3'
    },
    {
        id: 'c12',
        name: "Cookie Crisp: The Cookie Heist Collection",
        vintage: 1990,
        region: "Cookie Jar Underworld",
        price: 725.00,
        tastingNotes: [
            "Tiny cookies that aren't cookies",
            "Criminal dog mascot energy",
            "Breakfast loophole exploitation"
        ],
        specs: {
            decayRate: 42,
            sugarContent: 19,
        },
        flavor: {
            crunch: 70,
            sweetness: 89,
            nostalgia: 94,
            particulate: 78
        },
        image: '/cereals/cereal-box-12.png',
        brandColor: '#8B4513',
        recommendedMilkPairing: 'm3'
    },
    {
        id: 'c13',
        name: "Apple Jacks: The Flavor Paradox",
        vintage: 1985,
        region: "Non-Apple Orchards",
        price: 680.00,
        tastingNotes: [
            "Contains no actual apple",
            "Cinnamon masquerading as fruit",
            "Existential flavor crisis"
        ],
        specs: {
            decayRate: 55,
            sugarContent: 17,
        },
        flavor: {
            crunch: 85,
            sweetness: 82,
            nostalgia: 87,
            particulate: 65
        },
        image: '/cereals/cereal-box-13.png',
        brandColor: '#FF6347',
        recommendedMilkPairing: 'm2'
    },
    {
        id: 'c14',
        name: "Fruity Pebbles: Bedrock's Finest",
        vintage: 1993,
        region: "Prehistoric Quarry",
        price: 1050.00,
        tastingNotes: [
            "Yabba-dabba-delicious trademark infringement",
            "Turns milk into rainbow sludge",
            "Fred Flintstone's retirement fund"
        ],
        specs: {
            decayRate: 30,
            sugarContent: 20,
        },
        flavor: {
            crunch: 68,
            sweetness: 91,
            nostalgia: 97,
            particulate: 90
        },
        image: '/cereals/cereal-box-14.png',
        brandColor: '#FF1493',
        recommendedMilkPairing: 'm4'
    },
    {
        id: 'c15',
        name: "Corn Pops: The Golden Sphere Vintage",
        vintage: 1987,
        region: "Spherical Corn Fields",
        price: 595.00,
        tastingNotes: [
            "Geometrically perfect corn spheres",
            "Pops that don't actually pop",
            "Suspiciously uniform golden coating"
        ],
        specs: {
            decayRate: 48,
            sugarContent: 18,
        },
        flavor: {
            crunch: 80,
            sweetness: 86,
            nostalgia: 83,
            particulate: 55
        },
        image: '/cereals/cereal-box-15.png',
        brandColor: '#FFD700',
        recommendedMilkPairing: 'm2'
    }
];
