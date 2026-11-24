# Nasazení chatbotu

## Render (backend)

1. V Renderu vytvoř nový **Blueprint** z tohoto repozitáře. Render načte `render.yaml` a vytvoří webovou službu `vdf-games-support-api`.
2. V nastavení služby doplň proměnné prostředí:
   - `OPENAI_API_KEY`: tvůj API klíč. Vlož ho pouze do Renderu, nikdy do souborů webu ani do GitHubu.
   - `ALLOWED_ORIGINS`: přesný původ GitHub Pages webu, například `https://uzivatel.github.io` (bez cesty za doménou). Pro vlastní doménu použij její `https://` adresu. Více adres odděl čárkou.
   - `OPENAI_MODEL` je přednastavený na `gpt-4o-mini`; změň ho, pokud pro svůj API klíč používáš jiný dostupný model.
3. V Renderu ověř, že služba po nasazení odpovídá na `/health`. Pole `documentation` musí být `true`.

Služba očekává `POST /chat` s JSON tělem `{"message":"..."}` a vrací odpověď v poli `reply`.

## GitHub Pages (frontend)

Stránka se nasazuje jako statický web z kořene repozitáře. Frontend volá
`https://vdf-games-support-api.onrender.com/chat`; pokud Render službě přidělí
jinou adresu, uprav `BACKEND_URL` v `script.js` na její adresu zakončenou `/chat`
a změnu nahraj na GitHub. Backend musí zároveň povolit původ GitHub Pages v
`ALLOWED_ORIGINS`.

## Dokumentace odpovědí

Backend načítá firemní FAQ a pokyny ze souboru `docs/podpora.md`. Ve zdrojích
projektu při přípravě nasazení tento soubor chyběl a složka `docs` byla prázdná.
Před nasazením do něj doplň schválené otázky a odpovědi. Bez něj endpoint vrátí
chybu místo toho, aby si chatbot firemní pravidla vymýšlel.
