# Rossignol-POC
Proof of concept of rossingol just try to get random music (credible)

## Fonctionallity of the POC 

- Get a radmon music (Credible)
- Can do next / prev music
- filter by genre / year


## How i'm doing it ? 

1. Get list of tags (chart.gettoptags)
2. Search random tag (Random pattern)
3. Get a random track

4. For getting a new song use (track.getsimilar) and get a random song in the list

### Random patern

1. Get the list of what you want (Tag or track)
2. Get a random number of pages (between 1 and the total of pages)
3. Get a random number of the list (between 1 and 50)
4. Then use it :)

### Methods i'm using on lastfmapi (step by step)

- chart.gettoptags (for getting the list of tags)
- tag.gettoptracks (for getting the list of tracks)
- track.search
- track.getsimilar