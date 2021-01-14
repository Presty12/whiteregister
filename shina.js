const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms')
const { parseZone } = require("moment");
const datab = require('quick.db');//
//

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "shina 💚 White" }, status: "online" });
  let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});
var prefix = ayarlar.prefix;//
//

const log = message => {//
    console.log(`${message}`);//
};
client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);



client.on("guildMemberAdd", member => {
  member.roles.add('798562334092034072'); 
});


client.on("guildMemberAdd", member => {
  member.setNickname('❋ İsim | Yaş'); 
});

client.emoji = function(x) {
    return client.emojis.cache.get(client.emojiler[x]);
  };
  const emoji = global.emoji;
  
  const sayiEmojiler = {
    0: "<a:0_:799270824934244372>",
    1: "<a:1_:799270824897020006>",
    2: "<a:2_:799270825651863593>",
    3: "<a:3_:799270827203231746>",
    4: "<a:4_:799270828067127337>",
    5: "<a:5_:799270827312807946>",
    6: "<a:6_:799270828759580692>",
    7: "<a:7_:799270828302532628>",
    8: "<a:8_:799270829267222528>",
    9: "<a:9_:799270829338263552>"
  };
  
  client.emojiSayi = function(sayi) {
    var yeniMetin = "";
    var arr = Array.from(sayi);
    for (var x = 0; x < arr.length; x++) {
      yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
    }
    return yeniMetin;
  };


client.on("guildMemberAdd", member=> {
    let sunucu = client.guilds.cache.get(ayarlar.sunucuID);
    let logKanal = sunucu.channels.cache.get(ayarlar.kayitKanal);
    let kayitSorumlusu = sunucu.roles.cache.get(ayarlar.kayitSorumlusu);
  let emoji2 = "<a:hype:799272844508266556>";

let memberGün = moment(member.user.createdAt).format("DD");
let memberTarih = moment(member.user.createdAt).format("YYYY");
let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık"); 

    if (member.user.bot) {
        member.roles.add(ayarlar.botRolü);
    }else{
        let durum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7
              if (logKanal) logKanal.send(new Discord.MessageEmbed().setDescription(`
${member} **aramıza katıldı, seninle birlikte toplam ${client.emoji(member.guild.memberCount)} kişiye ulaştık!**
**Sunucumuza kayıt olmak için tagımızı alıp ses teyit odalarından birine geçmen yeterlidir. Seninle ${kayitSorumlusu} ve
rolüne sahip yetkililer ilgilenecektir. Kayıt olduğunuzda kuralları okumuş sayılırsınız ve ona göre işlem yapılır.**
**Tagımız :** \`❋\` 
              
Hesap bilgilerin;
${emoji2} Hesap ID : \`${member.id}\`
${emoji2} Hesabın açılış tarihi : \`${memberGün} ${memberAylar} ${memberTarih}\`           
${emoji2} Hesap **${durum ? "şüpheli <a:carpi:799272258115469353>" : "güvenli <a:onay:799272257284997121>"}**`))
.setImage(`https://i.hizliresim.com/uwgNTI.gif`)
.setcolor('RANDOM')
.setFooter('shina 🤍 White')
.setTimestamp()

             
        

};


client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '❋'
  const sunucu = '798562334053367828'
  const kanal = '798562336201768975'
  const rol = '798562334099505203'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`${newUser} Adlı Kullanıcı Tagımızı \`(${tag})\` Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda Tagımızı \`(${tag})\` Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`${newUser} Adlı Kullanıcı Tagımızı \`(${tag})\` Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda Tagımızı \`(${tag})\` Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});}); 
 







Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };

  client.on('message', msg => {
    if (msg.content === prefix + 'tag') {
      msg.channel.send('❋');
    }
  });
  

  client.on('message', msg => {
    if (msg.content === prefix + '.tag') {
      msg.channel.send('❋');
    }
  });



  client.on('ready', async () => {
    let time = '40m'
    setInterval(() => {
    let guildID = '798562334053367828'
    let guild = client.guilds.cache.get(guildID);
    if(!guild) return console.log('Sunucu bulunamadı.');
    let channelID = '798562334145642555'
    let channel = guild.channels.cache.get(channelID);
    if(!channel) return console.log('Kanal bulunamadı.');
    const messages = [`<@&798562334092034072> The Sunrise ses kanallarına giriş sağlayarak kaydınızı yaptırabilirsiniz. İyi eğlenceler <:meuw:797729959607009320>`];
    return channel.send(`${messages}`);}, require('ms')(time));});