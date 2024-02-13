const getRandomTrack = (tracksArray) => {

    const randomTrackIndex = Math.floor(Math.random() * tracksArray.length);

    // Track info for the search
    const track = {
        trackName : tracksArray[randomTrackIndex].name,
        trackArtist : tracksArray[randomTrackIndex].artist.name
    };
    
    return track;
}


export default getRandomTrack;