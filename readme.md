
# 🤖 Chatbot para WhatsApp com Node.js

Este projeto é um chatbot simples para atendimento automatizado no WhatsApp, utilizando a biblioteca [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js). O bot responde a comandos pré-definidos com base em menus interativos e pode realizar requisições para APIs externas.

---

## 🚀 Funcionalidades

- Exibe um **QR Code** para autenticação com o WhatsApp Web
- Atende usuários apenas dentro do horário comercial (09h às 17h)
- Responde a mensagens com base em **palavras-chave** (menus e submenus)
- Realiza **consultas a uma API externa**
- Registra logs de mensagens por usuário e por data
- Ignora mensagens enviadas por grupos

---

## 🧠 Fluxo de Menu

### Menu principal
```
menu
```

### Opções:

- `1` → Informações
  - `1.1` → Horários de atendimento
  - `1.2` → Endereço da empresa
  - `1.3` → Consulta de dados via API
- `2` → Suporte
  - `2.1` → Problemas técnicos
  - `2.2` → Reclamações
  - `2.3` → Voltar ao menu
- `3` → Atendimento humano

---

## 🛠️ Instalação e uso

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/whatsapp-bot.git
cd whatsapp-bot
```

### 2. Instalar o Node.js (se ainda não tiver)

Recomenda-se instalar a versão LTS:  
https://nodejs.org/

### 3. Instalar as dependências do projeto

Execute o comando abaixo para instalar as bibliotecas necessárias:

```bash
npm install whatsapp-web.js qrcode-terminal node-fetch
```

Ou, se preferir instalar uma a uma:

```bash
npm install whatsapp-web.js
npm install qrcode-terminal
npm install node-fetch
```

> 💡 A biblioteca `fs` (File System) é nativa do Node.js e não precisa ser instalada.

### 4. Iniciar o bot

```bash
node index.js
```

Será gerado um **QR Code no terminal**. Escaneie com o WhatsApp Web para autenticar o bot.

---

## 🗃️ Estrutura de arquivos

```
.
├── logs_YYYY-MM-DD.txt  # Arquivos de log diário
├── index.js             # Código principal do bot
├── package.json         # Dependências do projeto
```

---

## 📦 Bibliotecas utilizadas

| Biblioteca            | Função                                                   |
|------------------------|-----------------------------------------------------------|
| whatsapp-web.js       | Comunicação com a API do WhatsApp Web                     |
| qrcode-terminal       | Geração de QR Code no terminal                            |
| node-fetch            | Requisições HTTP para APIs externas                       |
| fs (nativo)           | Manipulação de arquivos (leitura e gravação de logs)      |

---

## 🔐 Observações de segurança

- Este bot armazena logs em arquivos `.txt`. Não compartilhe esses arquivos se contiverem dados sensíveis.
- O bot responde apenas a mensagens privadas por padrão.

---

## 📄 Licença

Este projeto é de uso livre para estudos e testes. Adapte conforme necessário para seu negócio ou aplicação real.

---

Desenvolvido com 💻 por Christopher Kawan
