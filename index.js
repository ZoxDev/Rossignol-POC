const API_KEY_FM = '373666dcd889ddc937f6babdabf6c513';
const API_KEY_YT = 'AIzaSyA8KvJB1dYgnh6ROpYW8YNwLVq-aNEwfsw';

// Get a list of all the tags and get a random one
// http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=YOUR_API_KEY&format=json
const getRandomTrack = async () => {
    // Looking for how much pages
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${API_KEY_FM}&format=json`).then(res => res.json())

    // Get a random page of tag
    const totalPages = response.tags['@attr'].totalPages;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    // Go on a page and get random tag
    const randomTag = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${API_KEY_FM}&format=json&page=${randomPage}`).then(res => res.json())
    const randomTagIndex = Math.floor(Math.random() * randomTag.tags.tag.length);
    const tagName = randomTag.tags.tag[randomTagIndex].name;

    // Get a track name from the tag
    // 5 pages of 1000 tracks cause lastfm can't do pagination
    // http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=disco&api_key=YOUR_API_KEY&format=json
    const trackList1 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tagName}&api_key=${API_KEY_FM}&format=json&limit=1000`).then(res => res.json())
    const trackList2 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tagName}&api_key=${API_KEY_FM}&format=json&limit=1000&page=2`).then(res => res.json())
    const trackList3 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tagName}&api_key=${API_KEY_FM}&format=json&limit=1000&page=3`).then(res => res.json())
    const trackList4 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tagName}&api_key=${API_KEY_FM}&format=json&limit=1000&page=4`).then(res => res.json())
    const trackList5 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tagName}&api_key=${API_KEY_FM}&format=json&limit=1000&page=5`).then(res => res.json())

    // Add them
    const trackList = {
        tracks: {
            track: [
                ...trackList1.tracks.track,
                ...trackList2.tracks.track,
                ...trackList3.tracks.track,
                ...trackList4.tracks.track,
                ...trackList5.tracks.track
            ]
        }
    }

    // Get a random index at the page 
    const randomTrackIndex = Math.floor(Math.random() * trackList.tracks.track.length);

    // Track info for the search
    const trackName = trackList.tracks.track[randomTrackIndex].name;
    const trackArtist = trackList.tracks.track[randomTrackIndex].artist.name;

    return {trackName, trackArtist};
};

const playNext = async () => {
    // Get a similar song and play (also random)
    // http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=cher&track=believe&api_key=YOUR_API_KEY&format=json
    
}

const playPrev = async () => {
    // Get the last song

}

const playRandomTrack = async () => {
    const trackUrl = await getRandomTrack();

    // Search on youtube
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${trackUrl.trackName} ${trackUrl.trackArtist}&key=${API_KEY_YT}`)
        .then(res => res.json())
        .then(data => {
            const videoId = data.items[0].id.videoId;
            playVideo(videoId);
            console.log('https://www.youtube.com/embed/'+videoId);
        })

    // Play the video
    const playVideo = (videoId) => {
        const player = document.getElementById('player');
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    
}