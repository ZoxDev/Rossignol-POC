// Utils
// Get track
import getRandomTrack from './utils/getRandomTrackList.js';
// Search the song
import searchSongOnYT from './utils/searchSongOnYT.js';
// Play the song
import playVideo from './utils/playVideo.js';

const playPrev = (lastSongPlayedID) => {
    // If user choose it play the previous song
    playVideo(lastSongPlayedID);
};

const playNext = (randomOrSimilar, similarInfo) => {
    if (randomOrSimilar == 'Random') {
        playTrack();
    } else {
        playSimilar(similarInfo);
    }
}

// Play similar song function
const playSimilar = async (trackList) => {
    console.log(`Play similar track`);
    // Get a random index at the page 
    const randomTrackIndex = Math.floor(Math.random() * trackList.tracks.track.length);

    // Track info for the search
    const track = {
        trackName: trackList.tracks.track[randomTrackIndex].name,
        trackArtist: trackList.tracks.track[randomTrackIndex].artist.name
    }

    // Find the corresponding song id & duration
    const songInfo = await searchSongOnYT(track);

    // Play the song
    playVideo(songInfo.videoId);

    // On duration play next song if user choose nothing go random if he choose similar go for similar
    timeOut = setTimeout(() => {
        playNext(userSelect, trackList);
    }, songInfo.durationInMS);

    return timeOut;
}

// Event 
// Play track
document.getElementById('playTrack').addEventListener('click', async () => {
    const track = await getRandomTrack();

    // Find the corresponding song id & duration
    const songInfo = await searchSongOnYT(track);

    // Store id for last song played

    // Play the songclearTimeout(currentTimeout);
    playVideo(songInfo.videoId);

    // On end re-play (See if yt event)
    timeOut = setTimeout(() => {
        playNext(userSelect, trackList);
    }, songInfo.durationInMS);
});

// Select random or similar
const selectedEl = document.getElementById('select');
const btnUpdate = document.getElementById('btnUpdate');

btnUpdate.onclick = (event) => {
    event.preventDefault();
    userSelect = selectedEl.value;
    console.log(userSelect);
}