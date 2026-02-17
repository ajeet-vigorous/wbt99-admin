const Rolex99Settings = {
  title: "Welcome To Rolex99",
  logo: "/assets/images/rolex991.png",
  favicon: "/assets/images/rolex991.png",
  SOCKET_URL: "https://api.rolex99.co/",
  apiurl: "https://api.rolex99.co/v1/",
  domainName: "Rolex99",
  sportFlag: false,
  websiteName: "Rolex99.CO",
  matkaVisible: true,
  websiteName2: "",
  socketDomain: "rolex99.co",
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

const Wicket7Settings = {
  title: "Welcome To 7Wickets",
  logo: "/assets/images/7wickets.png",
  favicon: "/assets/images/7wickets.png",
  SOCKET_URL: "https://api.7wickets.pro/",
  apiurl: "https://api.7wickets.pro/v1/",
  domainName: "7wickets",
  sportFlag: false,
  websiteName: "7wickets.Pro",
  matkaVisible: true,
  websiteName2: "",
  socketDomain: "7wickets.pro",
  "--nav-dark-bg": "#808000",
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
 
  "admin.rolex99.co": Rolex99Settings,
  "sowner.rolex99.co": Rolex99Settings,
  "sadmin.rolex99.co": Rolex99Settings,
  "admin.rolex99.co": Rolex99Settings,
  "madmin.rolex99.co": Rolex99Settings,
  "master.rolex99.co": Rolex99Settings,
  "super.rolex99.co": Rolex99Settings,
  "agent.rolex99.co": Rolex99Settings,


    "admin.7wickets.pro": Wicket7Settings,
  "sowner.7wickets.pro": Wicket7Settings,
  "sadmin.7wickets.pro": Wicket7Settings,
  "admin.7wickets.pro": Wicket7Settings,
  "madmin.7wickets.pro": Wicket7Settings,
  "master.7wickets.pro": Wicket7Settings,
  "super.7wickets.pro": Wicket7Settings,
  "agent.7wickets.pro": Wicket7Settings,
  
  "localhost:3000": Rolex99Settings,

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



