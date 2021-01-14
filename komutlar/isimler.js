const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
module.exports.run = async (client, message, users, args) => {

    if(!message.member.roles.cache.some(r => ['798562334107762717', '798562334137778198'].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.channel.send("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")
//------------------------------------------------KAYITLAR-----------------------------------------------\\  

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);
var sayi = 1 
let data = db.get(`isim.${message.guild.id}`)
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed()
    .setColor("RANDOM") 
    .setThumbnail(user.user.avatarURL ({ dynamic: true}))      
    .setDescription(`
    ${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`)
    .setColor("RANDOM"))
let isimler = data.filter(x => x.userID === isim.id).map(x => `\`${sayi++}.\`  ** • ${x.isim} | ${x.yas}** **(<@&${x.role}>)**\n`).join(" ")
if(isimler === null) isimler = "Kullanıcının isim geçmişi bulunmamaktadır"
if(isimler === undefined) isimler = "Kullanıcının isim geçmişi bulunmamaktadır"
//------------------------------------------------KAYITLAR-----------------------------------------------\\      


const embed = new MessageEmbed()
.setColor("RANDOM")
        .setThumbnail(user.user.avatarURL ({ dynamic: true}))     
    .setAuthor(`
Kullanıcının ${sayi-1} adet isim kaydı bulundu;`) 
    .setDescription(`${isimler}`)
    .setColor("RANDOM")
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler', 'eski-isim'],
  permLevel: 0,
}

exports.help = {
      name: "isimler"
  
}