// Utils
// Get track
import getRandomTrack from './utils/getRandomTrack';
// Search the song
import searchSongOnYT from './utils/searchSongOnYT';
// Play the song
import playVideo from './utils/playVideo';

// Gen variables
let lastSongPlayedID = "";
let userSelect = 'Random';

const playPrev = async (lastSongPlayedID) => {
    // If user choose it play the previous song
    playVideo(lastSongPlayedID);
};

const playNext = async (randomOrSimilar, duration, similarInfo) => {
    setTimeout(() => {
        if (randomOrSimilar == 'Random') {
            playTrack();
        } else {
            playSimilar(similarInfo);
        }
    }, duration);
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
    playNext(songInfo.durationInMS, userSelect, trackList);
}

// Basic play sound full random
const playTrack = async (genre, year) => {
    console.log('Playing a track')
    console.log(genre, year);

    // Get a track name & artist
    if (genre == "" & year == "") {
        const trackUrl = await getRandomTrack();
        return trackUrl;
    }
    else {
        // Play song filtered
    }

    // Find the corresponding song id & duration
    const songInfo = await searchSongOnYT(trackUrl);

    // Play the song
    playVideo(songInfo.videoId);

    // On duration play next song if user choose nothing go random if he choose similar go for similar
    playNext(songInfo.durationInMS, userSelect, trackUrl.trackList);
};


// Event 
console.log("yes the js is read")
document.getElementById('playTrack').addEventListener('click', playTrack);

// TODO 
// User can select Similar or random 
// User can click on next and play a next song depends on what he choose 
// User can press play prev (& do logic behind it)
// Real time management cahnge duration on pause 