# Salve o Mangue — multiplayer V2

O Worker V2 foi publicado separadamente. A página do jogo continua no Worker estático preexistente `salve-o-mangue`; o Service Binding `SITE_ASSETS` encaminha o site para a origem da API, evitando duplicar o HTML grande ou alterar o Worker antigo.

**Jogar:** https://salve-mangue-multiplayer-v2.mentesmecannicas.workers.dev

## Build e deploy hospedados
O computador do usuário não precisa de Node.js. O build pode rodar no ambiente hospedado do Cloudflare Workers Builds, usando Node.js do próprio ambiente. Configure o Worker com o repositório `mentesmecannicas/salve-o-mangue`, branch `main`, build command `npm run build` e deploy command `npm run deploy`.

O código do Worker é mantido no arquivo comprimido `src/worker.js.gz.b64` para evitar um commit de dezenas de kilobytes como texto codificado; o script `scripts/prepare-worker.mjs` restaura `src/worker.js` automaticamente antes de dev/build/test/check.

## Arquitetura
- Worker `salve-mangue-multiplayer-v2` para API e WebSockets.
- Durable Object SQLite independente `MangueRoomV2` por código de sala.
- Service Binding `SITE_ASSETS` para `salve-o-mangue`, mantendo front-end e API na mesma origem.
- Salas privadas por código, até 40 jogadores, sem contas, login, listagem pública ou estado global.
- Tickets de entrada únicos, host token temporário e chat isolado por sala.
- Progresso de relíquias compartilhado dentro da sala; fase 16 exige três relíquias.

Não apagar ou substituir os Workers antigos `salve-o-mangue` e `salve-mangue-multiplayer`.
