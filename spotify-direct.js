function quoteAllKeys(node) {
  if (Array.isArray(node)) return node.map(quoteAllKeys);
  if (node !== null && typeof node === "object") {
    const out = {};
    for (const k of Object.keys(node)) {
      out[JSON.stringify(k)] = quoteAllKeys(node[k]);
    }
    return out;
  }
  return node;
}

function main(config) {
  const directRules = [
    "DOMAIN-KEYWORD,kuaishou,DIRECT",
    "DOMAIN-SUFFIX,spotify.com,DIRECT",
    "DOMAIN-SUFFIX,spotifycdn.com,DIRECT",
    "DOMAIN-SUFFIX,scdn.co,DIRECT",
    "DOMAIN-SUFFIX,spotifycdn.net,DIRECT"
  ];

  if (!Array.isArray(config.rules)) {
    config.rules = [];
  }

  const directRuleSet = new Set(directRules);
  config.rules = directRules.concat(
    config.rules.filter(rule => !directRuleSet.has(rule))
  );

  // Clash Mi workaround: preserve YAML keys that require quoting
  // when the JS override result is serialized back to YAML.
  return quoteAllKeys(config);
}
