# Pool Monitor como app (PWA) para iPhone, iPad e Android

## O que está nesta pasta
- `index.html`: a app
- `manifest.webmanifest`: nome, cores e ícones da app
- `sw.js`: guarda a app no dispositivo para abrir sem internet (a versão é preenchida automaticamente)
- `version.json`: diz qual é a versão publicada (a app consulta-o para saber se há atualização)
- `_headers`: instruções para o Netlify não guardar cópias antigas destes ficheiros
- `icons/`: ícones

## Antes de começar (importante)
Os dados ficam guardados **no próprio dispositivo e ligados ao endereço** onde a app está publicada.
Se mudar de endereço, os dados não acompanham. Escolha o endereço definitivo antes de começar a usar e
exporte um backup antes de qualquer mudança.

## 1. Publicar online

### Netlify (recomendado)
1. Crie conta em https://app.netlify.com (grátis) e abra https://app.netlify.com/drop.
2. Arraste para lá **a pasta inteira** (não o zip).
3. Receberá um endereço do género `https://nome-aleatorio.netlify.app`. Em "Site configuration → Change site name" pode escolher um nome
   (por exemplo `pool-monitor-seunome`). Faça-o **antes** de instalar nos telemóveis.

### GitHub Pages (alternativa)
1. Crie um repositório público no GitHub e carregue todos os ficheiros da pasta (incluindo `icons`).
2. "Settings → Pages → Deploy from a branch → main / (root)".
3. O endereço fica `https://SEU-UTILIZADOR.github.io/NOME-DO-REPOSITORIO/`.

Num repositório público qualquer pessoa pode ver o código da app, mas nunca os seus dados: ficam só no seu dispositivo.

## 2. Instalar no telemóvel ou no tablet
- **iPhone / iPad:** abra o endereço no **Safari** → Partilhar → **Adicionar ao ecrã principal**.
- **Android:** abra o endereço no **Chrome** → menu ⋮ → **Instalar app** (ou "Adicionar ao ecrã principal").

Abra a app uma vez com internet. A partir daí funciona offline.

## 3. Atualizações (automáticas)
**Quem publica:** quando houver uma versão nova da app, basta voltar a arrastar a nova pasta para o Netlify
(site → "Deploys" → arrastar a pasta). Não é preciso editar nada: o `version.json` e o `sw.js` já vêm com a versão certa.

**Nos dispositivos:** a app continua offline o resto do tempo. Quando liga o interruptor **Offline** no topo (o mesmo dos preços dos
tokens), a app também pergunta ao seu site se há versão nova. Se houver, descarrega-a e mostra o aviso
**"Nova versão … pronta" → Atualizar agora**. Os dados mantêm-se.

## 4. Levar os dados do computador para o telemóvel
1. No computador: **Dados → Exportar backup** (gera um ficheiro `.json`).
2. Envie o ficheiro para o telemóvel (e-mail, AirDrop, Drive, etc.).
3. No telemóvel: **Dados → Importar backup** e escolha o ficheiro. Atenção: importar **substitui** os dados que estiverem na app.

## 5. Backups no telemóvel
**Dados → Exportar backup** abre a folha de partilha do telemóvel: escolha "Guardar em Ficheiros" (iPhone/iPad) ou o Drive (Android).
Faça-o com regularidade: no iPhone/iPad, o sistema pode apagar os dados de uma app web em certas situações.
A associação automática a um ficheiro (OneDrive) só existe no computador, em Chrome ou Edge.

## 6. Preços dos tokens e ranges (o único momento em que a app vai à internet)
O interruptor **Offline** liga-se à CoinGecko (e, nas pools com "Endereço da pool", à DexScreener) só o tempo de atualizar os preços,
verificar os ranges e procurar uma versão nova da app, e volta a desligar-se.
Os pedidos vão sempre diretos à internet, sem passar pela cache do modo offline.

## Testar no computador antes de publicar (opcional)
Na pasta, execute `python3 -m http.server 8000` e abra http://localhost:8000.
(O modo offline não funciona abrindo o `index.html` diretamente com duplo clique.)
