# Webdev-projekti
Kesällä 2020 tehdyn webdev-kurssin lopputyö, päämääränä oli tehdä web-sovellus joka hyödyntää jotain olemassa olevaa API:a. Omassa projektissa käytin http://open-notify.org/ sivuston tarjoamaa API:a, joka näyttää tämän hetkisen sijainnin kansainväliselle avaruusasemalle. Kyseinen API ei valitettavasti näytä kuin tämänhetkisen sijainnin avaruusasemalle, niin jouduin tekemään oman API:n joka otti avaruusaseman sijainnin talteen 30sec välein, ja tallensi tämän datan .json tiedostoon. Näin pystyin omalla web-sovelluksellani näyttämään avaruusaseman sijainnit viimeisen vuorokauden ajalta.
Web-sovellukseen käytin nodea sekä expressiä, API-pyyntöihin käytin ajaxia.

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/3eea75af-f8a9-4502-8b63-a6a50063ead5)

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/f28d7c49-e7e5-4b57-8396-70ae49a0e7d3)

ISSloggingFinal kansio sisältää oman API:n koodin, tätä pyöritin googlen tarjoamilla servereillä webdev-kurssin ajan
ISSlivetrackerFinal sisältää itse web-sovelluksen koodin.

Lisäksi web-sovelluksella pystyi hakemaan sijaintitietoa ja näyttämään milloin avaruusasema menee tietyn sijainnin ylitse. Vasiten tein vielä jälkikäteen 3d-version samasta sovelluksesta. Nämä ominaisuudet ei enää toimineet jostain syystä, todennäköisesti näiden API-credentiaalit vanhentuneet.

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/1e508c96-b7b5-42c4-bd02-b05e3f3a1100)

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/7d4cd4d5-17bc-4345-a2da-1efef5767d99)
