// Utils
// Get track
import getRandomTrack from './utils/getRandomTrack.js';
// Search the song
import searchSongOnYT from './utils/searchSongOnYT.js';
// Play the song
import playVideo from './utils/playVideo.js';

// Gen variables
let lastSongPlayedID = "";
let userSelect = 'Random';

const playPrev = (lastSongPlayedID) => {
    // If user choose it play the previous song
    playVideo(lastSongPlayedID);
};

const playNext = (randomOrSimilar, similarInfo) => {
    console.log(randomOrSimilar, similarInfo);
    if (randomOrSimilar == 'Random') {
        console.log('Play next random song');
        playTrack();
    } else {
        console.log(`Play next similar song`);
        playSimilar(similarInfo);
    }
}

// Play similar song function
const playSimilar = async (trackList) => {
    // Get a random index at the page 
    const randomTrackIndex = Math.floor(Math.random() * trackList.tracks.track.length);

    // Track info for the search
    const trackUrl = {
        trackName: trackList.tracks.track[randomTrackIndex].name,
        trackArtist: trackList.tracks.track[randomTrackIndex].artist.name
    }

    // Find the corresponding song id & duration
    const songInfo = await searchSongOnYT(trackUrl);

    // Play the song
    playVideo(songInfo.videoId);

    // On duration play next song if user choose nothing go random if he choose similar go for similar
    setTimeout(() => {
        playNext(userSelect, trackList);
    }, songInfo.durationInMS);
}

// Basic play sound full random
const playTrack = async (genre, year) => {
    const trackUrl = await getRandomTrack();

    // Find the corresponding song id & duration
    const songInfo = await searchSongOnYT(trackUrl);

    // Play the song
    playVideo(songInfo.videoId);

    // On duration play next song if user choose nothing go random if he choose similar go for similar
    console.log(`Time before next song ${songInfo.durationInMS}`);
    setTimeout(() => {
        playNext(userSelect);
    }, songInfo.durationInMS);
};


// Event 
// 
document.getElementById('playTrack').addEventListener('click', playTrack);


// TODO 
// User can select Similar or random 
// User can click on next and play a next song depends on what he choose 
// User can press play prev (& do logic behind it)
// Real time management cahnge duration on pause 

// To fix : 
// When you wait for next song it's worked but if you click play song btn after a song is played the next song gonna came faster (Try to log to see what happen)


// Questions ?
// - Why can't use module on local so you have to dl live-server