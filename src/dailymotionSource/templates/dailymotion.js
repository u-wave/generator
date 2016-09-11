import dailymotionSource from 'u-wave-source-dailymotion';

export default function dailymotion(uw) {
  uw.source('<%= sourceType %>', dailymotionSource, {});
}
