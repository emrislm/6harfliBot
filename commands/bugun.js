const fetch = require('node-fetch');

module.exports = {
    name: 'bugun',
    description: 'bugunku korona tablosu',
    async execute(message, args, Discord) {
        let url = "https://api.covid19api.com/total/country/turkey";
        let response = await fetch(url);
        let json = await response.json();

        json.forEach(element => {
            //last element
            if(json[json.length-1] === element) {
                let todaysEl = element;
                let yesterdaysEl = json[json.length-2];

                let Confirmed = todaysEl.Confirmed - yesterdaysEl.Confirmed;
                let Deaths = todaysEl.Deaths - yesterdaysEl.Deaths;
                let Recovered = todaysEl.Recovered - yesterdaysEl.Recovered;
                let Active = todaysEl.Active - yesterdaysEl.Active;

                const todaysInfoEmbed = new Discord.MessageEmbed()
                    .setColor('#8d5453')
                    .setTitle('Türkiye Günlük Korona Tablosu')
                    .addFields(
                        {name: 'Toplam Vaka Sayisi', value: todaysEl.Confirmed, inline: true},
                        {name: 'Toplam Hasta Sayisi', value: todaysEl.Active, inline: true},
                        {name: 'Toplam Vefat Sayisi', value: todaysEl.Deaths, inline: true},
                        {name: 'Toplam Iyilesen Sayisi', value: todaysEl.Recovered},
                        { name: '\u200B', value: '\u200B' },
                    )
                    .addFields(
                        {name: 'Vaka Sayisi', value: Confirmed, inline: true},
                        {name: 'Hasta Sayisi', value: Active, inline: true},
                        {name: 'Vefat Sayisi', value: Deaths, inline: true},
                        {name: 'Iyilesen Sayisi', value: Recovered}
                    );

                message.channel.send(todaysInfoEmbed);
            }
        });

    }
}