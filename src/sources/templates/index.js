<%- usedSources.map(sourceType =>
  `import ${sourceType}Source from './${sourceType}';`
).join('\n') %>

export default function sources(uw) {
  <%= usedSources.map(sourceType => `uw.use(${sourceType}Source);`).join('\n  ') %>
}
