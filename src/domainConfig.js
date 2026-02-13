const balaji12Settings = {
  title: "Welcome To WBT99",
  logo: "/assets/images/wbt99.png",
  favicon: "/assets/images/wbt99.png",
  SOCKET_URL: "https://api.wbt99.pro/",
  apiurl: "https://api.wbt99.pro/v1/",
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
  oldDataFlag: true,
  isMatchOddsFlag: false,
  isBookmakerFlag: true,
  isTossFlag: true,
  isTiedFlag: false,
  tvFlag: true,
  oldDataLink: 'https://oldadmin.antpro99.pro/signin'
}

const domainSettings = {
 
  "admin.wbt99.pro": balaji12Settings,
  "sowner.wbt99.pro": balaji12Settings,
  "sadmin.wbt99.pro": balaji12Settings,
  "admin.wbt99.pro": balaji12Settings,
  "madmin.wbt99.pro": balaji12Settings,
  "master.wbt99.pro": balaji12Settings,
  "super.wbt99.pro": balaji12Settings,
  "agent.wbt99.pro": balaji12Settings,
  
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



