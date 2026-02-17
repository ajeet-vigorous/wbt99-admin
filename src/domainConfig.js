const balaji12Settings = {
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

const domainSettings = {
 
  "admin.rolex99.co": balaji12Settings,
  "sowner.rolex99.co": balaji12Settings,
  "sadmin.rolex99.co": balaji12Settings,
  "admin.rolex99.co": balaji12Settings,
  "madmin.rolex99.co": balaji12Settings,
  "master.rolex99.co": balaji12Settings,
  "super.rolex99.co": balaji12Settings,
  "agent.rolex99.co": balaji12Settings,
  
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



