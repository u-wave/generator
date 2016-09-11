export const banner = `
 _   _  __        __
(_) (_) \\ \\      / /_ ___   _____
 \\ \\ \\ \\ \\ \\ /\\ / / _\` \\ \\ / / _ \\
  \\ \\_\\ \\ \\ V  V / (_| |\\ V /  __/
   \\__,_/  \\_/\\_/ \\__,_| \\_/ \\___|

Welcome to the üWave installer! This program will guide you through the üWave
setup process.

First we'll configure the databases that your new üWave instance will use, and
then we'll create an admin account. We'll also have to configure some media
sources so your users can actually find songs to play. Finally, we'll optionally
set üWave up to start automatically when your server (re)boots.
`;

export const mongodbHelp = `
The primary database used by üWave is MongoDB. Below, enter your MongoDB URI.
The MongoDB URI format looks like this:

  mongodb://host:port/database

For example:

  mongodb://localhost:27017/uwave (the default)
  mongodb://localhost/my_own_database
  mongodb://1.2.3.4:5678/remote_database

If you didn't set up MongoDB with custom configuration, or if you're not sure,
use the default.
`;

export const redisHelp = `
üWave also uses Redis to keep track of short-term information like the online
users or the current waitlist. Below, enter your Redis URI. The format looks
like this:

  redis://host:port

For example:

  redis://localhost:6379 (the default)
  redis://1.2.3.4:5679

If you didn't set up Redis with custom configuration, or if you're not sure, use
the default.
`;

export const sourcesHelp = `
To find songs to play on üWave, we need to have access to media sources.
Currently this installer supports three sources out of the box, but you can add
more later if you wish!

Additional media sources can be found on NPM under the keyword "u-wave-source":
  https://www.npmjs.com/browse/keyword/u-wave-source

But for now, let's get on with Dailymotion, YouTube and SoundCloud. To use
YouTube or SoundCloud, you'll need to obtain an API key first. If you don't have
API keys yet, check out the üWave documentation for a quick walkthrough:
  https://github.com/u-wave/u-wave-core/wiki/Configuring-Media-Sources
`;

export const noMediaSourcesConfigured = `
No media sources were configured! Your users will not be able to search for
songs to play until you configure a media source.
`;
