interface AudioPlayer {
  audioVolume: number;
  soundDuration: number;
  song: string;
  details: Details;
}
interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  soundDuration: 36,
  song: "Missing",
  details: {
    author: "Edual",
    year: 2023
  }
};

console.log(audioPlayer);
const {song: anotherSong,soundDuration: anotherSongDuration, details} = audioPlayer;
const {author} = details;

console.log('Song: '+anotherSong);
console.log('Duration: '+anotherSongDuration);
console.log('Author: '+author);

const dbz: string[] = ['Goku' , 'Vegeta', 'Trunks'];

const [, , trunks='Not found'] = dbz;
console.log('Personaje 3: ', trunks);


export {};
