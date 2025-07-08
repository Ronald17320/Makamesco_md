const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk5md2dhZ2QxOGl5WXpFQlQ1dloxUHIvYjhjcEh1TGlIYlBHSmlMTXltQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWG9xUnlQUngzRkl2OFVGL1Y2blpORXFCZk9KTVJJRVdXM2RtWDV5R2JVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRTBpeHZ5Qm84NS9EUGFraytQTUVTcjcwNlJES0tCcDB4WFk3TDRyUkhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNWlJvWTE1SndQOFFXaysvZHBOUGhTeTNSYU1zbjhsdDdhbStNczFaRm1NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBLM2d3RDMvbTB4dFhacEZEZFBXaWlwQ0tZUjZzNnN4eGxDajk0OVNCSDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNUMjRwNVRPZjF4QWdxTDlVQk4yRXlMak5STVRxQWxtS1hudk1Wd3RKMjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVBNcEh3bExyYmIwU3pIRFpJeUFTSTZMYlVkd3pmRXJnU0hrVHJkMEkyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWovN21qVlVIL3BURzhTMnZ3WjRiQ3JhME1BRWxDNkFId1RFRndnZlBYUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZRRGxqenN1bFVoVnozVjh4L0J0dm81Tm9GSVFNdHZMSXN1M1M2bXNxdzc1N3dzOE1tczhoVjBmVmRQVEFLeUNmNmNMRFo1Nkk1YWJsWVFvYk9wd0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJzbWQ3VnNseHBhcHdldXZtbmhlUmNpR3dXZjkvWU96cStYQXR2dTFCV3A0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxODQ2NzAyMjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzdCMkY3QkEwN0E1NTcyNzI4QjdCMEYxNURDQ0VEN0YifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTk0NTk2N30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE4NDY3MDIyOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2OEIyQUZBRkRBMTc1N0EwOUNFQjFFOTJDMkU0OEQzQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxOTQ1OTc0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4bDZNaGNXdVQxR0ZlaWZzNXNLT1BBIiwicGhvbmVJZCI6ImU5NTNjY2E1LTg1N2MtNDMzMC04NjUyLTg1OTRjZTJiNWIxYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQL29oYktXWHJ6dWQyOGJ0aitIZFRhTmxncHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUNYVXF2LzZsblVHenRGdExJemZUWHhWS1k0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFCQ0QxMjM0IiwibWUiOnsiaWQiOiIyMzQ4MTg0NjcwMjI5OjkwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTg2NzQxMjg1NzUzMDQ1OjkwQGxpZCIsIm5hbWUiOiLRgtC10YHRgtC+0LLRi9C5INCx0L7RgiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSS9xekxjREVMK2xzc01HR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiS1ZGSHNVQXBFcStreHpnaEFHY2xuN2ZVdzZOK3lYdytWWldSN2ZrVWJtZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUmFzUDNWM0lCSENHcGFrODY1Um1SeklzcEJCbHhPWnlJelE1RUR5Mm5xanUzTEcva2dTSjlWemJSeXU1elArTjh2aWd5Ump2UXF2ZTM5U0JlR3BLQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IjdQL3BKalJmcWl4Z25NVkd0TURKWUs5WGRXZGdSK0lhN1lVK1oybjJDb2w4MXdYcGZlTUEwWjhqQm05Zzh1eXhiall2V3ZGOWdxTkhicklxTTc2TEJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE4NDY3MDIyOTo5MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTbFJSN0ZBS1JLdnBNYzRJUUJuSlorMzFNT2pmc2w4UGxXVmtlMzVGRzVvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTE5NDU5MzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSEdyIn0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/sesco001/Makamesco_md',
    OWNER_NAME : process.env.OWNER_NAME || "jujutsu",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348072253266",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/sigghy.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By AZOV',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'shush',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RC",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VbAEL9r5vKA7",
    CAPTION : process.env.CAPTION || "jujutsu_MD",
    BOT : process.env.BOT_NAME || 'jujutsu_MD',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dar_Es_Salam", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
