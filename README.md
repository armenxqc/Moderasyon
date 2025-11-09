# Moderasyon Botu 🤖

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-9.x-blue)](https://www.npmjs.com/)
[![Discord](https://img.shields.io/discord/000000000000000000?color=7289DA&label=Discord%20Destek)](https://discord.gg/DESTEK_LINKİNİZ)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white)](https://youtube.com/kanal_linkiniz)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://instagram.com/profil_linkiniz)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://twitter.com/profil_linkiniz)

Bu Discord botu, sunucularınızda moderasyonu kolaylaştırmak için geliştirilmiştir. Kullanıcı yönetimi, mesaj denetimi ve çeşitli yönetimsel araçlar içerir.

---

## ⚡ Özellikler

### Kullanıcı yönetimi
- `kick` — Kullanıcıyı sunucudan atar  
- `ban` — Kullanıcıyı sunucudan yasaklar  
- `unban` — Kullanıcının yasağını kaldırır  
- `mute` — Kullanıcıyı susturur  
- `unmute` — Kullanıcının susturmasını kaldırır  

### Mesaj ve veri kontrolü
- `clear` — Belirtilen sayıda mesajı siler  
- `snipe` — Silinen son mesajı gösterir  
- `stats` — Kullanıcı istatistiklerini gösterir  
- `modstats` — Moderasyon istatistiklerini gösterir  

### Rol yönetimi ve sunucu ayarları
- `toplurol` — Sunucudaki herkese belirtilen rolü verir  
- `otorol` — Sunucuya giren kullanıcıya otomatik rol verir  
- Log ve karşılama sistemi  

---

## 🛠 Kurulum

1. `config.json` dosyasını oluşturun ve aşağıdaki alanları doldurun:

```json
{
  "token": "BOT_TOKENİN",
  "prefix": "BOT_PREFIXİ",
  "modRole": "YETKİLİ_ROLÜ",
  "autoRole": "SUNUCUYA_GİRENE_OTO_VERİLCEK_ROL",
  "logChannel": "LOG",
  "welcomeLeaveChannel": "GİREN_ÇIKAN_KANALI",
  "filterLogChannel": "FARKLI_LOG"
}
```

2. Gerekli Modülleri İndirin; Termnale "npm install" yazın

3. Botu başlatın: Terminale "node index.js"


📜 Komutlar
Komut	Açıklama
.kick @kullanıcı [sebep]	Kullanıcıyı sunucudan atar
.ban @kullanıcı [sebep]	Kullanıcıyı sunucudan yasaklar
.unban @kullanıcı	Kullanıcının yasağını kaldırır
.mute @kullanıcı [süre]	Kullanıcıyı susturur
.unmute @kullanıcı	Kullanıcının susturmasını kaldırır
.clear [sayı]	Belirtilen sayıda mesajı siler
.modstats	Moderasyon istatistiklerini gösterir
.snipe	Silinen son mesajı gösterir
.stats @kullanıcı	Kullanıcı istatistiklerini gösterir
.toplurol @rol	Sunucudaki herkese belirtilen rolü verir



📌 Sosyal Medya & İletişim
Discord Profilim: Discord
YouTube: Kanal Linki
Instagram: Profil Linki
