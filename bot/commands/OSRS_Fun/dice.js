const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Simulates dice rolls from Runescape.',
			usage: '[amount:int{1,2147483647}]',
			requiredPermissions: ['EMBED_LINKS']
		});
	}

	async run(msg, [amount]) {
		const roll = Math.floor(Math.random() * 100) + 1;

		const embed = new MessageEmbed()
			.setColor(39168)
			.setThumbnail('https://i.imgur.com/sySQkSX.png')
			.setTitle('Dice Roll');

		if (!amount) {
			embed.setDescription(`You rolled [**${roll}**]() on the percentile dice.`);
		} else {
			const gp = msg.author.settings.get('GP');
			if (amount > gp) throw "You don't have enough GP.";
			if (roll >= 55) {
				embed.setDescription(`You rolled [**${roll}**]() on the percentile dice, and you won ${amount} GP!`);
				msg.author.settings.update('GP', gp + amount);
			} else {
				embed.setDescription(`You rolled [**${roll}**]() on the percentile dice, and you lost ${amount} GP.`);
				msg.author.settings.update('GP', gp - amount);
			}
		}
		return msg.send({ embed });
	}

};
