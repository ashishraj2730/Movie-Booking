export const movies = [
    {
        id: 1,
        title: "Jawan",
        poster: "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg",
        year: 2023,
        rating: 4.7,
        language: "Hindi",
        genre: "Action/Thriller",
        cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
        description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society."
    },
    {
        id: 2,
        title: "Animal",
        poster: "https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg",
        year: 2023,
        rating: 4.5,
        language: "Hindi",
        genre: "Action/Drama",
        cities: ["Delhi", "Mumbai", "Pune", "Chandigarh"],
        description: "A son undergoes a remarkable transformation as the bond with his father begins to fracture, and he becomes consumed by a quest for vengeance."
    },
    {
        id: 3,
        title: "Pathaan",
        poster: "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg",
        year: 2023,
        rating: 4.6,
        language: "Hindi",
        genre: "Action/Spy",
        cities: ["Mumbai", "Delhi", "Kolkata", "Bangalore"],
        description: "An Indian agent races against a doomsday clock as a ruthless mercenary, with a bitter vendetta, mounts an apocalyptic attack against the country."
    },
    {
        id: 4,
        title: "Gadar 2",
        poster: "https://upload.wikimedia.org/wikipedia/en/6/62/Gadar_2_film_poster.jpg",
        year: 2023,
        rating: 4.2,
        language: "Hindi",
        genre: "Action/Drama",
        cities: ["Delhi", "Chandigarh", "Amritsar", "Ludhiana"],
        description: "Tara Singh returns to Pakistan to rescue his son, Charanjeet, who is imprisoned during the Indo-Pakistani War of 1971."
    },
    {
        id: 5,
        title: "12th Fail",
        poster: "https://upload.wikimedia.org/wikipedia/en/f/f2/12th_Fail_poster.jpeg",
        year: 2023,
        rating: 4.9,
        language: "Hindi",
        genre: "Biography/Drama",
        cities: ["Mumbai", "Delhi", "Pune", "Bangalore"],
        description: "Based on the true story of things Manoj Kumar Sharma, who overcame extreme poverty to become an IPS officer."
    },
    {
        id: 6,
        title: "Tiger 3",
        poster: "https://upload.wikimedia.org/wikipedia/en/6/60/Tiger_3_poster.jpg",
        year: 2023,
        rating: 4.4,
        language: "Hindi",
        genre: "Action/Thriller",
        cities: ["Mumbai", "Delhi", "Hyderabad", "Kolkata"],
        description: "Tiger and Zoya are back - to save the country and their family. This time it's personal."
    },
    {
        id: 7,
        title: "Rocky Aur Rani Kii Prem Kahaani",
        poster: "https://upload.wikimedia.org/wikipedia/en/6/65/Rocky_Aur_Rani_Kii_Prem_Kahaani_poster.jpg",
        year: 2023,
        rating: 4.6,
        language: "Hindi",
        genre: "Romance/Comedy",
        cities: ["Delhi", "Mumbai", "London", "Pune"],
        description: "Flamboyant Rocky and intellectual Rani fall in love, but their families are vastly different. To win them over, they decide to switch households."
    },
    {
        id: 8,
        title: "Dunki",
        poster: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Dunki_poster.jpg/220px-Dunki_poster.jpg",
        year: 2023,
        rating: 4.3,
        language: "Hindi",
        genre: "Comedy/Drama",
        cities: ["Mumbai", "Delhi", "Jalandhar", "London"],
        description: "Four friends from a village in Punjab share a common dream: to go to England. Their problem is that they have neither the visa nor the ticket."
    }
];

export const cinemas = [
    { id: 1, name: "PVR Icon", location: "Phoenix Palladium", city: "Mumbai" },
    { id: 2, name: "INOX", location: "R-City Mall", city: "Mumbai" },
    { id: 3, name: "PVR Directors Cut", location: "Vasant Kunj", city: "Delhi" },
    { id: 4, name: "Cinepolis", location: "DLF Avenue", city: "Delhi" },
    { id: 5, name: "PVR Cinemas", location: "Forum Mall", city: "Bangalore" },
    { id: 6, name: "AMB Cinemas", location: "Gachibowli", city: "Hyderabad" },
    { id: 7, name: "Elante Mall PVR", location: "Industrial Area", city: "Chandigarh" },
    { id: 8, name: "South City INOX", location: "South City Mall", city: "Kolkata" },
    { id: 9, name: "PVR Phoenix", location: "Viman Nagar", city: "Pune" }
];

export const showtimes = [
    "09:30 AM", "12:45 PM", "04:15 PM", "07:30 PM", "10:45 PM"
];

// Helper to get cinemas for a movie in a specific city
export const getCinemasForMovie = (movieId, city) => {
    const movie = movies.find(m => m.id === parseInt(movieId));
    if (!movie || !movie.cities.includes(city)) return [];
    return cinemas.filter(c => c.city === city);
};
