// Get a track list of 5k tracks totally random
const getRandomTrackList = async () => {
    const API_KEY_FM = '373666dcd889ddc937f6babdabf6c513';

    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${API_KEY_FM}&format=json`).then(res => res.json())

    const totalPages = response.tags['@attr'].totalPages;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    const randomTag = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${API_KEY_FM}&format=json&page=${randomPage}`).then(res => res.json())
    const randomTagIndex = Math.floor(Math.random() * randomTag.tags.tag.length);
    const tagName = randomTag.tags.tag[randomTagIndex].name;

    // Get a track name from the tag
    const API_URL = 'http://ws.audioscrobbler.com/2.0/';

    const allPages = [1, 2, 3, 4, 5].map((page) => {
        const searchParams = new URLSearchParams();
        searchParams.set("method", `tag.gettoptracks`);
        searchParams.set("tag", tagName);
        searchParams.set("api_key", API_KEY_FM);
        searchParams.set("format", `json`);
        searchParams.set("limit", `1000`);
        searchParams.set("page", page);
        return fetch(`${API_URL}${searchParams}`).then(res => res.json)
    });

    const tracksArrays = await Promise.all(allPages);

    tracksArrays.reduce((acc, current) => ({ ...acc, ...current }));

    return tracksArrays;
};

export default getRandomTrackList;