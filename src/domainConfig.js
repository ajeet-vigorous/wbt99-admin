const balaji12Settings = {
  title: "Welcome To WBT99",
  logo: "/assets/images/wbt99.png",
  favicon: "/assets/images/wbt99.png",
  SOCKET_URL: "https://api.lion99.pro/",
  apiurl: "https://api.lion99.pro/v1/",
  domainName: "WBT99",
  sportFlag: false,
  websiteName: "WBT99.COM",
  matkaVisible: true,
  websiteName2: "",
  socketDomain: "wbt99.com",
  "--nav-dark-bg": "#1571CD",
  "--nav-dark-text-color": "#fff",
  "--white-color": "#fff",
  noFancyMatchDetails: false,
  internationalCasino: false,
  virtuleGame: false,
  oldDataFlag: false,
  isMatchOddsFlag: true,
  isBookmakerFlag: true,
  isTossFlag: true,
  isTiedFlag: true,
  tvFlag: true,
  oldDataLink: 'https://oldadmin.antpro99.pro/signin'
}

const domainSettings = {
 
  "admin.balaji12.com": balaji12Settings,
  "sowner.balaji99.com": balaji12Settings,
  "sadmin.balaji99.com": balaji12Settings,
  "admin.balaji99.com": balaji12Settings,
  "madmin.balaji99.com": balaji12Settings,
  "master.balaji99.com": balaji12Settings,
  "super.balaji99.com": balaji12Settings,
  "agent.balaji99.com": balaji12Settings,
  
  "localhost:3000": balaji12Settings,

};


const currentDomain = window.location.host;
const settings = domainSettings[currentDomain] || domainSettings["localhost:3000"];
Object.entries(settings).forEach(([key, value]) => {
  if (key.startsWith("--")) {
    document.documentElement.style.setProperty(key, value);
  }
});
export default settings;



if (settings.favicon) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = settings.favicon;
}

if (settings?.domainName === 'WBT99') {
  document.title = settings?.title
}



if (settings.favicon) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = settings.favicon;
}



