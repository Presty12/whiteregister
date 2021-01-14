const Discord = require('discord.js')
const datab = require('quick.db')
const ayarlar = require('../ayarlar.json')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {

if(!['798562334107762717', '798562334137778198'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)

const erkek = message.guild.roles.cache.find(r => r.id === '798562334092034076')
const erkek2 = message.guild.roles.cache.find(r => r.id === '798562334092034075')
const erkek3 = message.guild.roles.cache.find(r => r.id === '798562334092034074')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '798562334092034072')
const savelogs = message.guild.channels.cache.find(c => c.id === '799243119857238026')






const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(`Bir kullanıcı belirtmelisin.`)
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
  if(member.user.username.includes(ayarlar.tag)) { 
    member.roles.add("798562334099505203")
    } else {
      member.roles.remove("798562334099505203")
      return message.channel.send('Sunucumuz şuanda taglı alımdadır tagımızı alarak kayıt olabilrisiniz.\`.tag\` komudunu kullanarak tagımızı görebilirsiniz.')

    }

if(!args[0]) return message.channel.send('Bir kullanıcı belirtmelisin.')
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
 datab.add('case', 1)
 const gruzzramirez = await datab.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})`

let tag = '❋'
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send('Bir isim belirtmelisin.')
if(!age) return message.channel.send('Bir yaş belirtmelisin.')

datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)
let erkekdata = datab.fetch(`yetkili.${message.author.id}.erkek`)



member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkek)
member.roles.add(erkek2)
member.roles.add(erkek3)
member.roles.remove(kayıtsız)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkek)
member.roles.add(erkek2)
member.roles.add(erkek3)
member.roles.remove(kayıtsız)
  
var sayi = 1 
if(sayi === null) sayi = "0"
if(sayi === undefined) sayi = "0"
let data = datab.get(`isim.${message.guild.id}`)
let roll = datab.fetch(`roll.${message.guild.id}`)
if(!data) return message.channel.send('Kullanıcının isim geçmişi bulunmamaktadır')

let isimler = data.filter(x => x.userID === member.id).map(x => `\`${sayi++}.\` **• ${x.isim} | ${x.yas}**   **(<@&${x.role}>)**\n`).join(" ")
if(isimler === null) isimler = "Bu kullanıcı daha önce buralara uğramamış"
if(isimler === undefined) isimler = "Bu kullanıcı daha önce buralara uğramamış"

const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
${member} Kullanıcı başarıyla ${erkek} olarak kayıt edildi

Kişinin \`${sayi-1}\` isim kaydı bulundu;

${isimler}`)
.setFooter(`Üyenin daha önce kayıt olduğu isimlere .isimler @etiket bakarak kayıt işlemini gerçekleştirmeniz önerilir!`)
.setColor("RANDOM")
message.channel.send(embed)


const saveall = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
${member} adlı kullanıcı ${message.author} tarafından kayıt edildi.
Yetkilinin toplam **${alldata}** kaydı ve toplam **${erkekdata}** erkek kaydı bulunmaktadır.
Yetkili kullanıcıyı ${erkek} olarak kayıt etti.`)
.setFooter(`Kayıt saati : ${kayıtsaat}`)
.setColor("RANDOM")
savelogs.send(saveall)

  
datab.push(`isim.${message.guild.id}`, {
  userID: member.id,
  isim: name,
  yas: age,
  role: erkek.id,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.erkek @etiket/id İsim Yaş'
  }
