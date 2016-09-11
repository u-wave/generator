import youtubeSource from 'u-wave-source-youtube';

export default function youtube(uw) {
  uw.source('<%= sourceType %>', youtubeSource, <%= JSON.stringify(options, null, 2) %>);
}
