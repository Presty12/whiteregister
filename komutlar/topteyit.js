const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, member) => {
  
if(!message.member.roles.cache.some(r => ['798562334107762717', '798562334137778198'].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))return message.channel.send("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")  
  let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}.toplam`);
let yazı = "En Fazla Kayıt Yapan İlk 10 Yetkili"
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => "\`"+(index+1)+" •\` <@"+ uye +">  Toplam **" + db.get(`yetkili.${uye.id}.toplam`) +"** Kayıta Sahip.").join(' ');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top));
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit"],
    permLevel: 0
};

exports.help = {
    name: "topteyit"
}