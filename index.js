const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const fetch = require('node-fetch');

// Inicialização do cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
});

// Funções utilitárias
function registrarLog(usuario, mensagem) {
    const dataHoje = new Date().toISOString().split('T')[0];
    const log = `[${new Date().toLocaleString()}] ${usuario}: ${mensagem}\n`;
    fs.appendFileSync(`logs_${dataHoje}.txt`, log);
}

function dentroDoHorario() {
    const hora = new Date().getHours();
    return hora >= 9 && hora < 17;
}

// Rotas de mensagens
const rotas = {
    'menu': {
        resposta: 'Olá! Como posso ajudar? Responda com um número:\n1. Informações\n2. Suporte\n3. Atendimento'
    },
    '1': {
        resposta: '📄 Informações disponíveis:\n1.1. Horários de atendimento\n1.2. Endereço da empresa\n1.3. Consultar dados via API'
    },
    '1.1': {
        resposta: 'Nosso atendimento é de Segunda a Sexta, das 08h às 18h.'
    },
    '1.2': {
        resposta: 'Estamos localizados na Av. Exemplo, 123 - São Paulo, SP.'
    },
    '1.3': {
        async respostaFunc(message) {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
                const data = await res.json();
                await message.reply(`📡 Dados recebidos da API:\nNome: ${data.name}\nEmail: ${data.email}`);
            } catch (err) {
                await message.reply('❌ Erro ao consultar a API. Tente novamente mais tarde.');
            }
        }
    },
    '2': {
        resposta: 'Você escolheu Suporte. Escolha uma opção:\n2.1. Problemas técnicos\n2.2. Reclamações\n2.3. Voltar ao menu'
    },
    '2.1': {
        resposta: 'Nos informe qual problema está enfrentando, e entraremos em contato!'
    },
    '2.2': {
        resposta: 'Sua reclamação será encaminhada ao nosso setor responsável.'
    },
    '2.3': {
        resposta: 'Voltando ao menu principal...\nDigite: menu'
    },
    '3': {
        resposta: 'Um atendente será direcionado para falar com você em breve!'
    }
};

// Eventos do bot
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code com o WhatsApp Web.');
});

client.on('ready', () => {
    console.log('🤖 Bot está pronto para responder!');
});

// Mensagens recebidas
client.on('message', async message => {
    if (message.isGroupMsg) return; // Não responde em grupos

    const texto = message.body.toLowerCase().trim();
    const nomeUsuario = message._data.notifyName || 'Usuário';
    registrarLog(nomeUsuario, texto);

    // Fora do horário de atendimento
    if (!dentroDoHorario()) {
        await message.reply('⏰ Não estamos funcionando no momento. Horário de atendimento: 09h às 17h.');
        return;
    }

    // Verificar se a mensagem é "menu" e responder
    if (texto === 'menu') {
        await message.reply(rotas['menu'].resposta);
    } else if (texto === '1') {
        await message.reply(rotas['1'].resposta);
    } else if (texto === '1.1') {
        await message.reply(rotas['1.1'].resposta);
    } else if (texto === '1.2') {
        await message.reply(rotas['1.2'].resposta);
    } else if (texto === '1.3') {
        await rotas['1.3'].respostaFunc(message);
    } else if (texto === '2') {
        await message.reply(rotas['2'].resposta);
    } else if (texto === '2.1') {
        await message.reply(rotas['2.1'].resposta);
    } else if (texto === '2.2') {
        await message.reply(rotas['2.2'].resposta);
    } else if (texto === '2.3') {
        await message.reply(rotas['2.3'].resposta);
    } else if (texto === '3') {
        await message.reply(rotas['3'].resposta);
    } 
});

// Inicia o bot
client.initialize();
