const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r => ['798562334107762717', '798562334137778198'].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.channel.send("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")

 let kullanıcı = message.mentions.users.first()
 let emoji = "<a:770201708256690206:799199043330899978>"
    
 
if(!kullanıcı) {

let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
let kadın = db.fetch(`yetkili.${message.author.id}.kadin`);
let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
  
const sorgu1 = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL ({ dynamic: true}))
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription(`
${emoji} Toplam **${kayıtlar}** Adet Teyitin Var
${emoji} Toplam **${erkek}** Adet Erkek Teyitin Var
${emoji} Toplam **${kadın}** Adet Kadın Teyitin Var`)
.setColor('RANDOM')
 return message.channel.send(sorgu1)
};
  
if(kullanıcı) {  
let erkek1 = db.fetch(`yetkili.${kullanıcı.id}.erkek`);
let kadın1 = db.fetch(`yetkili.${kullanıcı.id}.kadin`);
let kayıtlar1 = db.fetch(`yetkili.${kullanıcı.id}.toplam`); 
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
  
const sorgu2 = new Discord.MessageEmbed()
.setThumbnail(kullanıcı.avatarURL ({ dynamic: true})) 
.setAuthor(`${kullanıcı.username}`)
.setDescription(`
${emoji} Yetkilinin Toplam **${kayıtlar1}** Adet Teyiti Var
${emoji} Yetkilinin Toplam **${erkek1}** Adet Erkek Teyiti Var
${emoji} Yetkilinin Toplam **${kadın1}** Adet Kadın Teyiti Var`)
.setColor('RANDOM')
 return message.channel.send(sorgu2)
  
};
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["teyitsay", "kayıtlar", "kayıt-kontrol"],
    permLvl: 0,
}
  
exports.help = {  
  name: "teyitsay"
}