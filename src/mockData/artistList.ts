export type ArtistItemProps = {
    name: string;
    photo: string;
    tags: string[];
    fanBase: FanBase;
    numberOfEvents: number;
  };

export interface FanBase {
    spotify: string;
    youtube: string;
    tiktok: string;
  }

export const MockArtists = [
    {name: 'Princess Cheeto', location: 'Brooklyn, NY', profilePhoto: "/mockUsers/princess-cheeto.webp",  profileDetails: {
        aboutMe: "I am Princess Cheeto. I am a cat. I sings real goods."
    },
    tags: ['Pop', 'Singer/Songwriter', 'Solo'], fanBase: {spotify: '100k', youtube: '40k', tiktok: '1m'}, numberOfEvents: 9},

    {name: 'DJ Pancakes', location: 'London, UK', profilePhoto: '/mockUsers/DJPancakes.png', profileDetails: {
        aboutMe: "You spin records, I spin pancakes. Whatever that means."
    }, tags: ['EDM', 'Techno', 'Solo'], fanBase: {spotify: '9k', youtube: '11.1k', tiktok: '4.3k'}, numberOfEvents: 64},

    {name: 'The Man Bun Orchestra', location: 'San Francisco, CA', profilePhoto: '/mockUsers/ManBunOrchestra.png', profileDetails: {
        aboutMe: "Just a squad of hipster bros with a totally normal bond, founded by frontman Axel 'The Weave' Windwood.' Known for their unparalleled musical prowess and a stage presence that screams 'artisan cheese platter.'"
    }, tags: ['Classical', 'Group'], fanBase: {spotify: '20.3k', youtube: '12.3k', tiktok: '19k'}, numberOfEvents: 145},

    {name: 'Bathtub Joe', location: 'San Francisco, CA', profilePhoto: '/mockUsers/BathtubJoe.png', profileDetails: {
        aboutMe: "The legend himself. Will play anywhere, as long as the venue allows a bathtub onstage."
    }, tags: ['Acoustic', 'Folk', 'Solo', 'Country'], fanBase: {spotify: '642', youtube: '195', tiktok: '23'},numberOfEvents: 11},

    {name: 'Britney Pears', location: 'Glasgow, UK', profilePhoto: '/mockUsers/singer.png', profileDetails: {
        aboutMe: "Like pop sensation Britney Spears, but with more pears."
    }, tags: ['Pop', 'Solo'], fanBase: {spotify: '5.6k', youtube: '1k', tiktok: '3.2k'}, numberOfEvents: 78}
]

