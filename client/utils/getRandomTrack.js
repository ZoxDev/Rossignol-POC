const getRandomTrack = (tracksArray) => {
    const randomTrackIndex = Math.floor(Math.random() * tracksArray.length);

    // Track info for the search
    return track = {
        trackName : tracksArray[randomTrackIndex].name,
        trackArtist : tracksArray[randomTrackIndex].artist.name
    };
}

export default getRandomTrack;