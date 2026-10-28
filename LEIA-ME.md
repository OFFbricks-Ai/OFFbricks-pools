# Pool Monitor como app (PWA) para iPhone e Android

## O que está nesta pasta
- `index.html` — a app (a versão 3, já com o modo offline ligado)
- `manifest.webmanifest` — nome, cores e ícones da app
- `sw.js` — guarda a app no telemóvel para abrir sem internet
- `icons/` — ícones

## Antes de começar (importante)
Os dados ficam guardados **no próprio dispositivo e ligados ao endereço** onde a app está publicada.
Se mais tarde mudar de endereço, os dados não acompanham. Por isso escolha o endereço definitivo
antes de começar a usar, e exporte um backup antes de qualquer mudança.

## 1. Publicar online (escolha uma opção)

### Opção A — Netlify Drop (a mais rápida)
1. Abra https://app.netlify.com/drop no computador.
2. Arraste para lá **a pasta inteira** (não o zip).
3. Receberá um endereço do género `https://nome-aleatorio.netlify.app`. Nas definições do site pode mudar o nome.

### Opção B — GitHub Pages (gratuito, endereço estável)
1. Crie uma conta em https://github.com e um repositório novo (por exemplo `pool-monitor`).
2. Carregue todos os ficheiros desta pasta para o repositório (botão "Add file" → "Upload files"), incluindo a pasta `icons`.
3. Em "Settings" → "Pages", escolha "Deploy from a branch", ramo `main`, pasta `/ (root)`, e guarde.
4. Ao fim de um ou dois minutos, a app fica em `https://SEU-UTILIZADOR.github.io/pool-monitor/`.

Num repositório público qualquer pessoa pode ver o código da app, mas nunca os seus dados, que ficam só no seu dispositivo.

## 2. Instalar no telemóvel
- **iPhone:** abra o endereço no **Safari** → botão Partilhar → **Adicionar ao ecrã principal**.
- **Android:** abra o endereço no **Chrome** → menu ⋮ → **Instalar app** (ou "Adicionar ao ecrã principal").

Abra a app uma vez com internet. A partir daí funciona offline.

## 3. Levar os dados do computador para o telemóvel
1. No computador: **Dados → Exportar backup** (gera um ficheiro `.json`).
2. Envie esse ficheiro para o telemóvel (e-mail, AirDrop, Drive, etc.).
3. No telemóvel: **Dados → Importar backup** e escolha o ficheiro.

Atenção: importar **substitui** os dados que estiverem na app.

## 4. Fazer backups no telemóvel
**Dados → Exportar backup** abre a folha de partilha do telemóvel. Escolha "Guardar em Ficheiros" (iPhone)
ou o Drive (Android). Faça-o com regularidade: no iPhone, o sistema pode apagar os dados de uma app web em certas situações.

A associação automática a um ficheiro (OneDrive) só existe no computador, em Chrome ou Edge. No telemóvel
a app usa o armazenamento do próprio dispositivo mais os backups.

## 5. Publicar uma versão nova
1. Substitua o `index.html` no sítio onde publicou.
2. Em `sw.js`, aumente o número na linha `const CACHE = 'pool-monitor-v1';` (v1 → v2).
3. Abra a app duas vezes: a primeira descarrega a nova versão em segundo plano, a segunda já a mostra.

## Testar no computador antes de publicar (opcional)
Na pasta, execute `python3 -m http.server 8000` e abra http://localhost:8000.
(O modo offline não funciona abrindo o `index.html` diretamente com duplo clique.)
