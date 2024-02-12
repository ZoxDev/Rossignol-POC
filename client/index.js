// Utils
// Get tracklist
import getRandomTrackList from "./utils/getRandomTrackList.js";
// Get Track
import getRandomTrack from "./utils/getRandomTrack.js";
// Search track
import searchSongOnY from "./utils/searchSongOnY.js"
// Play tack
import playVideo from "./utils/playVideo.js"

// Play track random or similar
document.getElementById('playTrack').addEventListener('click', async (element) => {
    let trackInfo = {};
    let trackList = [];

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
    } else {
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
    playVideo(trackInfo.videoId)

    // On end re-play (See if yt event)
    timeOut = setTimeout(() => {
        element.click();
    }, trackInfo.duration);
});

// User select random or similar
const selectedEl = document.getElementById('select');
const btnUpdate = document.getElementById('btnUpdate');
let userChoice = 'Random';

btnUpdate.onclick = (event) => {
    event.preventDefault();
    const userChoice = selectedEl.value;
    console.log(userChoice);

    return userChoice;
}