interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: "Knights of Cydonia",
  details: {
    author: "Muse",
    year: 2006,
  },
};

const song = "New Song";

const { song: anotherSong, songDuration: duration, details } = audioPlayer;
const { author } = details;

console.log("Song", anotherSong);
console.log("NewSong", song);
console.log("Duration", duration);
console.log("Author", audioPlayer.details.author);
console.log("Author-des", author);

const [, , trunks = "Not found"]: string[] = ["Goku", "Vegeta"];

console.error("Personaje 3:", trunks);

export {};
