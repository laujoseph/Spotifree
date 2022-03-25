# Spotifree
React Web App that allows playback of tracks via Spotify's API with displayed lyrics.

Packages:
Spotify-web-playback - allows the playback of songs fetched from Spotify,
react-fade-in - fade in animation for components when rendered,
react-modal - allows simple modal creation

Libraries: 
Spotify-web-api-node - Main API where core data of tracks are drawn from,
Express - Web server framework used,
Lyrics-finder - API for lyrics,
cors
body-parser

Current features of the Spotifree Web App:
1. Search tracks via searchbar and playback tracks on click.
2. Once track has been selected, lyrics will be displayed.
3. Top 20 recently played tracks will be displayed on the right side-bar.
4. User profile displayed on the left, click for more info.

To utilise Spotifree's features, users must provide their own Spotify clientID and clientSecret (obtained via spotify web dev dashboard). The link below shows the authentication process required to access the different scopes available from the spotify API.

The authentication code flow can be viewed here: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

Once the authentication was set up (which consumed most of my time) at the start, I could move on to utilizing the spotify web api's functions.

Spotify-web-api-node has numerous functions that can be found here: https://github.com/thelinmichael/spotify-web-api-node

Possible future updates:
Create a main dashboard, viewing more information about the user such as user's playlist, recommended tracks. 