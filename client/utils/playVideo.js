const playVideo = (videoId) => {
    if (videoId != '') {
        const player = document.getElementById('player');
        const embedUrl = new URL(`https://cdpn.io/pen/debug/oNPzxKo?v=${videoId}`);
        embedUrl.searchParams.set('autoplay', '1');

        player.src = embedUrl.href;
    }
};

export default playVideo;