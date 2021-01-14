const { MessageEmbed } = require("discord.js");
const ayar = require("../ayarlar.json");
exports.run =  async (client, message, args) => {
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM");
    let olumlu = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM");
    let olumsuz = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM");
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription('Bu komutu kullanmak için gerekli izinlere sahip değilsin.')).then(x => x.delete({timeout: 10000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    let gruntar = args[0];
    if (!gruntar || !member) return message.channel.send(olumsuz.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${ayar.prefix || ""}rol lovers @üye\``).setFooter(`.rol bilgi | kullanarak bilgi alabilirsiniz.`)).then(x => x.delete({timeout: 12000}));

    if (gruntar === "bilgi" || gruntar === "info") {
        message.channel.send(embed.setDescription(`
        ${ayar.prefix || ""}rol soruncözücü @üye \`>\` Belirtilen üyeye **Sorun Çözücü** rolü verir/alır.
        ${ayar.prefix || ""}rol lovers @üye \`>\` Belirtilen üyeye **Lovers** rolü verir/alır.
         `))
        return;
    }

    
    if (gruntar === "soruncözücü") {
        let sorunCözücüRol = message.guild.roles.cache.get(ayar.sorunCözücüRol);
        if (!member.manageable) return message.channel.send(olumsuz.setDescription(`Bu üye üzerinde işlem gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
         if (sorunCözücüRol && !member.roles.cache.has(ayar.sorunCözücüRol)) {
             member.roles.add(sorunCözücüRol)
             message.channel.send(olumlu.setDescription(`${member} adlı üyeye başarılı bir şekilde ${sorunCözücüRol} rolü verdim.`))
             message.react("✅");
         }
        if (sorunCözücüRol && member.roles.cache.has(ayar.sorunCözücüRol)) {
            member.roles.remove(sorunCözücüRol)
            message.channel.send(olumlu.setDescription(`${member} adlı üyeden başarılı bir şekilde ${sorunCözücüRol} rolünü aldım.`))
            message.react("✅")
         }
        if (!sorunCözücüRol) {
             message.channel.send(olumsuz.setDescription(`Sorun Çözücü rolü bulunamadı.`))
             message.react("❎")
         }
    }

    if (gruntar === "lovers") {
        let loversRol = message.guild.roles.cache.get(ayar.loversRol);
        if (!member.manageable) return message.channel.send(olumsuz.setDescription(`Bu üye üzerinde işlem gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
         if (loversRol && !member.roles.cache.has(ayar.loversRol)) {
             member.roles.add(loversRol)
             message.channel.send(olumlu.setDescription(`${member} adlı üyeye başarılı bir şekilde ${loversRol} rolü verdim.`))
             message.react("✅");
         }
        if (loversRol && member.roles.cache.has(ayar.loversRol)) {
            member.roles.remove(loversRol)
            message.channel.send(olumlu.setDescription(`${member} adlı üyeden başarılı bir şekilde ${loversRol} rolünü aldım.`))
            message.react("✅")
         }
         if (!loversRol) {
             message.channel.send(olumsuz.setDescription(`Lovers rolü bulunamadı.`))
             message.react("❎")
         }
    }

};



exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rol', 'r'],
    permLevel: 0
  }

  exports.help = {
     name: "rol",
    usage: "r vip/muzisyen/vokal/terapist/soruncözücü/lovers @üye",
    description: "Belirtilen üyeye belirttiğiniz rolleri verirsiniz."
  }
