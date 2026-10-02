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

  // Remove duplicates, then prepend our DIRECT rules ahead of subscription rules.
  const directRuleSet = new Set(directRules);
  config.rules = directRules.concat(
    config.rules.filter(rule => !directRuleSet.has(rule))
  );

  return config;
}
