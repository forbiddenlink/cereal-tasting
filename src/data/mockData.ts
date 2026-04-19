export interface FlavorProfile {
    crunch: number;     // 0-100 (100 = Diamond Hard)
    sweetness: number;  // Brix scale
    nostalgia: number;  // 0-100
    particulate: number; // Artificiality
}

export interface Review {
    author: string;
    rating: number;
    text: string;
    date: string;
    verified: boolean;
}

export interface Cereal {
    id: string;
    name: string;
    vintage: number;
    region: string;
    price: number;
    tastingNotes: string[];
    reviews: Review[];
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
            "Opens with aggressive palate abrasion — like a sommelier slapping you awake",
            "Mid-palate reveals synthetic berry notes last seen in a Dimetapp fever dream",
            "Finish of pure yellow dye #5, lingering like a regret you'd repeat"
        ],
        reviews: [
            { author: "Rear Admiral B. Crunch (ret.)", rating: 5, text: "Finally, someone treats my life's work with the respect it deserves. I didn't cut the roof of 40 million mouths for nothing.", date: "2024-03-15", verified: true },
            { author: "Dr. Helena Masticata", rating: 4, text: "Served this at my dental conference. Standing ovation. Three emergency fillings. Worth it.", date: "2024-06-22", verified: true },
            { author: "Anonymous Buyer", rating: 5, text: "I remortgaged my house for this. My wife left. The crunch stays. 10/10.", date: "2025-01-08", verified: false },
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
            "Opens with deep cocoa dust that coats the nasal passages like a Willy Wonka workplace hazard",
            "Marshmallows with the structural integrity of styrofoam — and honestly, similar flavor notes",
            "Transforms ordinary milk into a chocolatey liqueur that your dentist would classify as a war crime"
        ],
        reviews: [
            { author: "Count von Count, Esq.", rating: 5, text: "One! One magnificent cereal! Ah ah ah! Two! Two boxes purchased! Ah ah ah! I may have a problem.", date: "2024-10-31", verified: true },
            { author: "TherapistFinder2024", rating: 4, text: "My client has been aging a box since 1997. I've told her this is 'concerning.' She says I don't understand terroir.", date: "2024-08-14", verified: false },
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
            "Opens with citrus zest so artificial it triggers a Geneva Convention debate",
            "Bright chemical acidity — like licking a glow stick, but in a good way",
            "The finish is pure Froot Loop milk: a flavor scientists have tried and failed to patent since 1963"
        ],
        reviews: [
            { author: "Sam the Toucan (ghostwriter)", rating: 5, text: "Follow my nose? I followed it straight to bankruptcy buying these at auction. No regrets. My beak is tingling.", date: "2024-05-03", verified: true },
            { author: "Color Theory PhD", rating: 4, text: "Each loop is a different color yet they all taste identical. I wrote my entire dissertation on this paradox. My committee wept.", date: "2024-11-19", verified: true },
            { author: "BreakfastMaximalist", rating: 5, text: "I eat these dry in business meetings to assert dominance. Three promotions this year.", date: "2025-02-14", verified: false },
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
            "Opens with aggressive tiger branding energy — the kind that screams 'THEY'RE GRRRREAT' at your soul",
            "Sugar crystals with industrial-grade edges that double as a palate exfoliant",
            "The finish carries hints of motivational poster energy and unbridled 80s optimism"
        ],
        reviews: [
            { author: "Tony T. (verified mascot)", rating: 5, text: "They're GRRREAT! (I am contractually obligated to say this, but I also mean it. These are my actual children.)", date: "2024-04-20", verified: true },
            { author: "Frosted_Flake_Sommelier", rating: 5, text: "I once served these blind to a Michelin-starred chef. He cried. Said it reminded him of before culinary school ruined breakfast.", date: "2024-12-01", verified: true },
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
            "The mascots eat each other and we're all just... fine with it? Cannibalistic marketing at its finest.",
            "Cinnamon dust levels that OSHA would classify as a workplace inhalation hazard",
            "Swirls so addictive the FDA sent a letter. It was delicious. We ate it."
        ],
        reviews: [
            { author: "Dr. Freud (posthumous)", rating: 5, text: "The mascots devour each other alive because they taste so good. I could not have invented a more perfect metaphor for desire.", date: "2024-09-15", verified: false },
            { author: "CinnamonSurvival2024", rating: 4, text: "I inhaled the cinnamon dust wrong and saw God. She was eating Cinnamon Toast Crunch. 4 stars because of the ER bill.", date: "2024-07-30", verified: true },
            { author: "Y2KPrepper_Rick", rating: 5, text: "Stockpiled 200 boxes for the millennium bug. Bug never came. Still eating through them. Best mistake of my life.", date: "2025-01-01", verified: true },
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
            "'Magically delicious' — a phrase the leprechaun is legally required to say, even at gunpoint",
            "Marshmallows with the mouthfeel of a pool noodle that went to finishing school",
            "The oat bits exist only to give parents plausible deniability. 'It has whole grains, Karen.'"
        ],
        reviews: [
            { author: "Lucky (under duress)", rating: 3, text: "They're always after me Lucky Charms. ALWAYS. I haven't slept since 1964. Please. Someone help me.", date: "2024-03-17", verified: true },
            { author: "MarshmallowPurist_99", rating: 5, text: "I pick out all the oat pieces and feed them to birds. The marshmallows are the art. The oats are the frame. I don't eat frames.", date: "2024-08-05", verified: true },
            { author: "Prof. Emeritus Breakfast", rating: 5, text: "Served these at my retirement dinner at Harvard. The Dean called it 'inappropriate.' He had three bowls.", date: "2025-03-22", verified: false },
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
            "Sonny's eyes contain a madness that no amount of cocoa can satiate. We relate.",
            "The chocolate void stares back — and it tastes like a Hershey's factory having a panic attack",
            "Transforms milk into something your therapist would describe as 'an avoidance mechanism'"
        ],
        reviews: [
            { author: "Sonny the Bird (parole hearing)", rating: 5, text: "I'm CUCKOO for—sorry, my lawyer says I can't say the phrase anymore. Let's just say I have strong feelings.", date: "2024-06-15", verified: true },
            { author: "MidnightSnacker_Anon", rating: 5, text: "3am, standing in kitchen, eating dry Cocoa Puffs in the dark. My roommate walked in. We don't make eye contact anymore.", date: "2024-11-03", verified: true },
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
            "'Silly rabbit, Trix are for kids' — the most successful age-based discrimination campaign in marketing history",
            "Each piece is a geometrically impossible fruit shape that Euclid himself would weep over",
            "Contains colors not found in nature, space, or any known dimension of reality"
        ],
        reviews: [
            { author: "The Rabbit (anonymous)", rating: 1, text: "Decades. DECADES I have tried. They won't let me have even one. This is a hate crime and I will be consulting my attorney.", date: "2024-04-01", verified: false },
            { author: "90sKid_Forever", rating: 5, text: "They changed the shapes from fruits to spheres in 2006 and I've never emotionally recovered. This vintage brings me peace.", date: "2024-09-20", verified: true },
            { author: "Art Critic Monthly", rating: 5, text: "Each bowl is a Rothko in miniature — fields of impossible color, suspended in whole milk, provoking questions about what 'fruit' even means.", date: "2025-01-15", verified: true },
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
            "Buzz the Bee radiates a melancholy that suggests he knows about colony collapse but keeps smiling anyway",
            "Honey notes wrapped in corporate desperation — like a wellness retreat run by a hedge fund",
            "The 'whole grain' marketing is a guilt trip so effective your mother would take notes"
        ],
        reviews: [
            { author: "Buzz (exit interview)", rating: 4, text: "I've given my whole life to this brand. My wings are tired. But the honey? The honey is eternal.", date: "2024-05-20", verified: true },
            { author: "HealthyBreakfastLiar", rating: 5, text: "I tell myself these are healthy because 'honey' and 'whole grain' are in the name. My doctor knows. We both pretend.", date: "2024-10-10", verified: true },
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
            "Dental work not included in the $2,100 price tag — budget another $4,000 for crowns",
            "Texture of artisanal river pebbles, hand-selected by monks who've taken a vow of crunch",
            "The milk-to-cement ratio must be calculated to 3 decimal places or structural failure occurs"
        ],
        reviews: [
            { author: "Geologist Monthly", rating: 5, text: "Finally, a cereal that respects the mineral hardness scale. Mohs rating: 6. Somewhere between feldspar and your will to chew.", date: "2024-02-28", verified: true },
            { author: "DivorceLawyer_Steve", rating: 5, text: "I served Grape-Nuts at my client's divorce proceedings. Her ex cried. She got the house. I got a $2,100 cereal bill. Everyone won.", date: "2024-07-14", verified: true },
            { author: "Masochist_Breakfast", rating: 5, text: "My jaw is stronger now. I can crack walnuts with my molars. My dentist retired early. Thank you, Grape-Nuts.", date: "2025-03-01", verified: false },
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
            "Legally distinct from actual Reese's cups, yet spiritually identical — the breakfast loophole lawyers dreamed of",
            "Finally legitimized eating candy for breakfast. The Geneva Breakfast Convention was signed for this.",
            "The peanut butter dust cloud created upon opening constitutes an OSHA-reportable event"
        ],
        reviews: [
            { author: "Nutritionist_In_Exile", rating: 5, text: "My sommelier certification was revoked after I paired this with chocolate milk. Worth every consequence.", date: "2024-04-12", verified: true },
            { author: "BreakfastPhilosopher", rating: 5, text: "If cereal is acceptable breakfast but candy isn't, and this is both, then either everything is permitted or nothing is. Kierkegaard wept.", date: "2024-11-28", verified: true },
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
            "Tiny cookies that aren't technically cookies — the legal gray area that keeps General Mills' lawyers employed",
            "The burglar dog mascot radiates criminal energy that no rebrand can contain",
            "The original breakfast loophole: 'Mom, it's CEREAL' (narrator: it was cookies)"
        ],
        reviews: [
            { author: "Cookie Monster (guest review)", rating: 5, text: "Me thought these were cookies. They not cookies. But me eat for breakfast with no judgement? THIS IS BEST DAY OF ME LIFE.", date: "2024-08-22", verified: false },
            { author: "ParentingFail_2024", rating: 4, text: "Told my kid this counts as breakfast. She told her teacher. Teacher called me. Worth the parent-teacher conference.", date: "2024-12-05", verified: true },
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
            "Contains no actual apple. The FDA has questions. Marketing has a PowerPoint. Neither side is winning.",
            "Cinnamon masquerading as fruit — the longest-running identity crisis in breakfast history",
            "The flavor profile is an existential riddle: What fruit is this? No one knows. No one has ever known."
        ],
        reviews: [
            { author: "Apple Farmers Union", rating: 1, text: "This product has done more damage to apple's reputation than Snow White's stepmother. We are considering legal action. Again.", date: "2024-06-01", verified: true },
            { author: "PhilosophyMajor_Debt", rating: 5, text: "If Apple Jacks don't taste like apples, do apples taste like Apple Jacks? I've been in this epistemological spiral for 3 days.", date: "2024-10-18", verified: true },
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
            "Yabba-dabba-delicious — a phrase that skirts trademark law with the confidence of a cartoon caveman",
            "Transforms milk into a rainbow sludge that doubles as tie-dye if you spill it on your shirt",
            "Fred Flintstone's retirement fund, now appreciating faster than Bedrock real estate"
        ],
        reviews: [
            { author: "Barney Rubble (under oath)", rating: 5, text: "Fred never shares. 65 million years of friendship and not ONE bowl. I'm taking this to small claims court in Bedrock.", date: "2024-03-30", verified: false },
            { author: "RainbowMilkChaser", rating: 5, text: "The cereal-milk ratio is irrelevant. I'm here for the psychedelic milk aftermath. It's my meditation.", date: "2024-09-09", verified: true },
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
            "Each sphere is geometrically perfect — nature creates nothing this round. This is hubris, and it's delicious.",
            "Called 'Pops' despite never popping. The false advertising is part of the charm. Like calling a Chihuahua a guard dog.",
            "The golden coating is suspiciously uniform, as if each piece was individually gilded by tiny factory elves"
        ],
        reviews: [
            { author: "Conspiracy_Carl", rating: 5, text: "Why are they called POPS if they don't POP? What are they hiding? I've started a podcast about this. 47 episodes so far.", date: "2024-05-17", verified: true },
            { author: "Sphere Enthusiast Monthly", rating: 4, text: "As a professional sphere evaluator, I give these a 9.3/10 on roundness. Deduction for occasional ovoid specimens.", date: "2024-12-20", verified: true },
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
