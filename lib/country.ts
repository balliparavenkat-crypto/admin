export function getCountryCode(country?: string, city?: string, location?: string): string {
  const text = `${country || ''} ${city || ''} ${location || ''}`.toLowerCase().trim();
  
  if (text.includes("india") || text.includes("ind") || text.includes("hydrabad") || text.includes("hyderabad") || text.includes("delhi") || text.includes("mumbai") || text.includes("bangalore") || text.includes("bengaluru") || text.includes("chennai") || text.includes("kolkata") || text.includes("pune") || text.includes("ahmedabad") || text.includes("goa")) return "in";
  if (text.includes("united states") || text.includes("usa") || text.includes("u.s.a") || text.includes("san francisco") || text.includes("new york") || text.includes("boston") || text.includes("chicago") || text.includes("los angeles") || text.includes("washington") || text.includes("seattle") || text.includes("austin") || text.includes("miami")) return "us";
  if (text.includes("japan") || text.includes("tokyo") || text.includes("osaka") || text.includes("kyoto") || text.includes("yokohama")) return "jp";
  if (text.includes("germany") || text.includes("munich") || text.includes("berlin") || text.includes("frankfurt") || text.includes("hamburg") || text.includes("cologne")) return "de";
  if (text.includes("switzerland") || text.includes("swiss") || text.includes("geneva") || text.includes("zurich") || text.includes("basel") || text.includes("lausanne")) return "ch";
  if (text.includes("singapore")) return "sg";
  if (text.includes("united kingdom") || text.includes("uk") || text.includes("london") || text.includes("manchester") || text.includes("oxford") || text.includes("cambridge") || text.includes("britain") || text.includes("england") || text.includes("scotland")) return "gb";
  if (text.includes("france") || text.includes("paris") || text.includes("lyon") || text.includes("nice") || text.includes("marseille")) return "fr";
  if (text.includes("canada") || text.includes("toronto") || text.includes("vancouver") || text.includes("montreal") || text.includes("ottawa")) return "ca";
  if (text.includes("australia") || text.includes("sydney") || text.includes("melbourne") || text.includes("brisbane") || text.includes("canberra") || text.includes("perth")) return "au";
  if (text.includes("uae") || text.includes("dubai") || text.includes("abu dhabi") || text.includes("united arab emirates") || text.includes("sharjah")) return "ae";
  if (text.includes("china") || text.includes("beijing") || text.includes("shanghai") || text.includes("shenzhen") || text.includes("guangzhou")) return "cn";
  if (text.includes("italy") || text.includes("rome") || text.includes("milan") || text.includes("venice") || text.includes("florence")) return "it";
  if (text.includes("spain") || text.includes("madrid") || text.includes("barcelona") || text.includes("valencia") || text.includes("seville")) return "es";
  if (text.includes("netherlands") || text.includes("amsterdam") || text.includes("rotterdam") || text.includes("the hague")) return "nl";
  if (text.includes("south korea") || text.includes("korea") || text.includes("seoul") || text.includes("busan")) return "kr";
  if (text.includes("brazil") || text.includes("sao paulo") || text.includes("rio") || text.includes("brasilia")) return "br";
  if (text.includes("russia") || text.includes("moscow") || text.includes("saint petersburg")) return "ru";
  if (text.includes("mexico") || text.includes("mexico city") || text.includes("cancun")) return "mx";
  if (text.includes("south africa") || text.includes("johannesburg") || text.includes("cape town")) return "za";
  if (text.includes("saudi arabia") || text.includes("riyadh") || text.includes("jeddah")) return "sa";

  if (country && country.trim().length === 2 && country.toLowerCase() !== "us") {
    return country.trim().toLowerCase();
  }

  return "us";
}
