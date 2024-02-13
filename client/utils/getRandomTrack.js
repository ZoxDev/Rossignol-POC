const getRandomTrack = (tracksArray) => {
    const randomTrackIndex = Math.floor(Math.random() * tracksArray.length);

    console.log(tracksArray.tracks.track[randomTrackIndex])
    // Track info for the search
    return track = {
        trackName : tracksArray.tracks.track[randomTrackIndex].name,
        trackArtist : tracksArray.tracks.track[randomTrackIndex].artist.name
    };
}


export default getRandomTrack;