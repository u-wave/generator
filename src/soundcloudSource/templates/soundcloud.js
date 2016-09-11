import soundcloudSource from 'u-wave-source-soundcloud';

export default function soundcloud(uw) {
  uw.source('<%= sourceType %>', soundcloudSource, <%= JSON.stringify(options, null, 2) %>);
}
