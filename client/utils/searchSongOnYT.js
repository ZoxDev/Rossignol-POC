const searchSongOnYT = async(trackUrl) => {
    // Search with the back-end do
    const searchForVideo = await fetch(`http://localhost:3030/getVideo/?artist=${trackUrl.trackArtist}&title=${trackUrl.trackName}`).then((res) => res.json());
    
    console.log(searchForVideo.results);

    const videoId = searchForVideo.results[0].id;
    const durationInMS = searchForVideo.results[0].duration.seconds * 1000;

    return {videoId, durationInMS};
}

export default searchSongOnYT;