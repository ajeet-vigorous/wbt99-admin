import settings from "../domainConfig";

export const userTypeInfo = [
    { "priority": 9, "userType": "owner", "shortname": "OW" },
    { "priority": 8, "userType": "subowner", "shortname": "SOW" },
    { "priority": 7, "userType": "superadmin", "shortname": "SU" },
    { "priority": 6, "userType": "admin", "shortname": "AD" },
    { "priority": 5, "userType": "subadmin", "shortname": "SUA" },
    { "priority": 4, "userType": "master", "shortname": "MA" },
    { "priority": 3, "userType": "superagent", "shortname": "SA" },
    { "priority": 2, "userType": "agent", "shortname": "A" },
    { "priority": 1, "userType": "client", "shortname": "C" },]

export const UserTypeData = {
    owner: { "userType": "owner", "priority": 9, "shortname": "OW" },
    subowner: { "userType": "subowner", "priority": 8, "shortname": "SOW" },
    superadmin: { "userType": "superadmin", "priority": 7, "shortname": "SU" },
    admin: { "userType": "admin", "priority": 6, "shortname": "AD" },
    subadmin: { "userType": "subadmin", "priority": 5, "shortname": "SUA" },
    master: { "userType": "master", "priority": 4, "shortname": "MA" },
    superagent: { "userType": "superagent", "priority": 3, "shortname": "SA" },
    agent: { "userType": "agent", "priority": 2, "shortname": "A" },
    client: { "userType": "client", "priority": 1, "shortname": "C" },
};

export const websiteName = `${settings?.websiteName}`;
export const SecoundWebsiteName = `` || '';
// export const SecoundWebsiteName = `${settings?.websiteName2}` || '';
export const encruptedDataFlag = false;




export const internationalCasino = settings?.internationalCasino;
export const matkaVisible = settings?.matkaVisible;





