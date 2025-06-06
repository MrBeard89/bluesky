<div align="center">
<a>
      <img src="https://i.ibb.co/993XF7sw/Ke-pernyo-foto-2025-03-12-11-30-58.png" alt="Project Banner" width="550px"/>
</a>
  <h3 align="center">Bluesky Időjárás app</h3>

</div>

## <a name="tech-stack">⚙️ Tech Stack</a>

- React
- React Context API - Client state management
- Localstorage
- Material UI
- React Router
- MUI - Emotion
- React Query /Tanstack/ - Server state management
- React Icons könyvtár
- Sass - Scss
- Vite

## <a name="features">🔋 Főbb tulajdonságok</a>

👉 **Mobile first szemlélet**: Mobil nézettől a monitor méretekig.

👉 **Reszponzív design**: Minden képernyőn jól kinéző design.

👉 **3 képernyős setup**: Home, Városok, Beállítások menüpontok.

👉 **Városok alapján keresés**: 2. képernyőn input mezőbe beirt városnév szerinti keresés.

👉 **Automata GEO lokáció**: Az app elindulásnál megkérdezi a usert hogy engedélyezi e hogy hozzáférjen a GEO adatokhoz.

👉 **Beállítások menüpont**: Itt betudjuk állítani a nyelvet, illetve azt, hogy celsius vagy fahrenheitben szeretnénk-e a hőmérsékletett megjeleniteni.

👉 **Város kártyák elmentése**: A már keresett városok mentése listaként localStorageal.

👉 **Aktuális idő**: Aktuális idő kijelzése.

👉 **Város szerinti időjárás adatok megjelenitése**: 2. képernyőn kártyára kattintva , adott város adatok betöltése API ból az 1. képernyőn.

👉 **Időjárás adatok**: Mai időjárás 3 óránként, Részletek(szélsebesség,pártartalom,tengerszint magasság,valós érzet), 5napos előrejelzés.

👉 **Nappali/Éjszakai ikonok**: Napszaknak megfelelő ikonok.

👉 **Beállitások szerinti újrahivás + render**: Beállitások utáni azonnali újrahivás + render a háttérben, react query használatával.

👉 **Automata újrahivás**: Ha a cachelt adat elavultá válik, újrahívás történik(React query). 5 min.

## <a name="toughts">📝 Telepítés</a>

👉 **Megtekintés github pages linken keresztül** vagy,

👉 <a href="https://mrbeard89.github.io/bluesky/">https://mrbeard89.github.io/bluesky/</a>

👉 Repo fejléc jobb oldalán, Code gomb megnyomása.

👉 Felugró ablak alján "Download Zip" gomb megnyomása.

👉 A letöltött tömörített fájlt csomagoljuk ki.

👉 A kicsomagolás után a főkönyvtár mappáját(amiben src stb található), töltsük be VScodeal.

👉 Konzolban "npm i" majd Enter.

👉 Indításhoz pedig konzolba írjuk be hogy "npm run dev".

👉 Böngészőbe átírányit a VScode, majd láthatjuk az appot.

      👉 UI:Github pagesben a NotFound componens nem működik, lokálisan igen.React Router bugos
