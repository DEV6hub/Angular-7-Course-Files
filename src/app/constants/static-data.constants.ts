import { Shirt } from '../shared/shirt';

export const COUNTRIES = ['Canada', 'USA'];

export const REGIONS = {
    Canada: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Nova Scotia',
        'Nunavut',
        'Northwest Territories',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon'
    ],
    USA: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'District of Columbia',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
        'American Samoa',
        'Guam',
        'Northern Mariana Islands',
        'Puerto Rico',
        'United States Minor Outlying Islands',
        'Virgin Islands'
    ]
};

export const GRAPHICS = [
    { name: 'crown', fileName: 'graphic1.png' },
    { name: 'smile', fileName: 'graphic2.png' },
    { name: 'wolf', fileName: 'graphic3.png' },
    { name: 'planet', fileName: 'graphic4.png' },
    { name: 'maple', fileName: 'graphic5.png' },
    { name: 'karate', fileName: 'graphic6.png' },
    { name: 'rocket', fileName: 'graphic7.png' },
    { name: 'falcon', fileName: 'graphic8.png' },
    { name: 'eagle', fileName: 'graphic9.png' },
    { name: 'heart', fileName: 'graphic10.png' },
    { name: 'earth', fileName: 'graphic11.png' },
    { name: 'afro', fileName: 'graphic12.png' },
    { name: 'skeleton', fileName: 'graphic13.png' },
    { name: 'hundred', fileName: 'graphic14.png' },
    { name: 'vader', fileName: 'graphic15.png' }
];

export const STYLES = [
    { imgName: 'MensShirt', imgDescription: 'Mens Fine Jersey Short Sleeve' },
    { imgName: 'WomensShirt', imgDescription: 'Womens Fine Jersey Short Sleeve' }
];

export const SHIRTS = [
    new Shirt(1, 'Happy Shirt', 'Womens Fine Jersey Short Sleeve', 14.99, '/assets/images/WomensShirtDesigns-3.jpg', 'F'),
    new Shirt(2, '4 Coders', 'Mens Fine Jersey Short Sleeve', 14.99, '/assets/images/MensShirtDesigns-2.jpg', 'M'),
    new Shirt(3, 'Emoji Shirt', 'Womens Fine Jersey Short Sleeve', 15.99, '/assets/images/WomensShirtDesigns-2.jpg', 'F'),
    new Shirt(4, 'Falcon on black', 'Mens Fine Jersey Short Sleeve', 19.99, '/assets/images/MensShirtDesigns-3.jpg', 'M'),
    new Shirt(5, 'Falcon on white', 'Mens Fine Jersey Short Sleeve', 19.99, '/assets/images/MensShirtDesigns-4.jpg', 'M'),
    new Shirt(6, 'Office Space', 'Womens Fine Jersey Short Sleeve', 14.99, './assets/images/WomensShirtDesigns-1.jpg', 'F'),
    new Shirt(7, 'Smile', 'Mens Fine Jersey Short Sleeve', 15.99, '/assets/images/MensShirtDesigns-1.jpg', 'M'),
    new Shirt(8, 'Dabbing Skeleton', 'Mens Fine Jersey Short Sleeve', 19.99, '/assets/images/MensShirtDesigns-5.jpg', 'M')
];

export const COLOURS = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Grey', value: '#CDCDCD' },
    { name: 'Black', value: '#444444' },
    { name: 'Blue', value: '#2674A8' },
    { name: 'Green', value: '#44A265' },
    { name: 'Yellow', value: '#F4DA70' },
    { name: 'Purple', value: '#6E5BD6' },
    { name: 'Red', value: '#A7386B' }
];

export const FONTS = [
    { name: 'Montserrat', font: '\'Montserrat\', sans-serif' },
    { name: 'Dancing Script', font: '\'Dancing Script\', cursive' },
    { name: 'Kaushan Script', font: '\'Kaushan Script\', cursive' },
    { name: 'Sacramento', font: '\'Sacramento\', cursive' },
    { name: 'Roboto', font: '\'Roboto\', sans-serif' },
    { name: 'Open Sans', font: '\'Open Sans\', sans-serif' },
    { name: 'Barcode', font: '\'Libre Barcode 39\', cursive' },
    { name: 'Orbitron', font: '\'Orbitron\', sans-serif' },
    { name: 'Lora', font: '\'Lora\', serif' },
    { name: 'Indie Flower', font: '\'Indie Flower\', cursive' },
    { name: 'Gloria Hallelujah', font: '\'Gloria Hallelujah\', cursive' },
    { name: 'Pacifico', font: '\'Pacifico\', cursive' },
    { name: 'Caveat', font: '\'Caveat\', cursive' },
    { name: 'Cookie', font: '\'Cookie\', cursive' }
];
