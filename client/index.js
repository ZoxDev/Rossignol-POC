// Utils
// Get tracklist
import getRandomTrackList from "./utils/getRandomTrackList.js";
// Get Track
import getRandomTrack from "./utils/getRandomTrack.js";
// Search track
import searchSongOnY from "./utils/searchSongOnYT.js"
// Play tack
import playVideo from "./utils/playVideo.js"

// genVar
let trackInfo = {};
let trackList = [];
let userChoice = 'Random';
let timeout = null;

// Play track random or similar
const playTrackElement = document.getElementById('playTrack');
playTrackElement.addEventListener('click', async () => {
    // Clear prev tiemout
    clearTimeout(timeout);
    if (userChoice == 'Random') {
        // Get a random track list
        const randomTrackList = await getRandomTrackList();
        trackList = randomTrackList;
        // Get a random track inside the track list
        const randomTrack = getRandomTrack(trackList);
        // Search the track on youtube
        const getTrackInfo = await searchSongOnY(randomTrack);
        trackInfo = {
            videoId: getTrackInfo.videoId,
            duration: getTrackInfo.durationInMS
        }
    } else if (userChoice == 'Similar') {
        // Get a random track inside the track list (Similar to last one)
        const randomTrack = getRandomTrack(trackList);
        // Search the track on youtube
        const getTrackInfo = await searchSongOnY(randomTrack);
        trackInfo = {
            videoId: getTrackInfo.videoId,
            duration: getTrackInfo.durationInMS
        }
    }

    // Finally play the track
    playVideo(trackInfo.videoId);

    // On end re-play (See if yt event)
    // With react do hook useClock that get event (Pause play)
    timeout = setTimeout(() => {
        playTrackElement.click();
    }, trackInfo.duration);
});

// User select random or similar
const selectedEl = document.getElementById('select');
const btnUpdate = document.getElementById('btnUpdate');

btnUpdate.onclick = (event) => {
    event.preventDefault();
    userChoice = selectedEl.value;;

    return userChoice;
}

// Next song btn
document.getElementById('next').addEventListener("click", () => {
    playTrackElement.click();
});