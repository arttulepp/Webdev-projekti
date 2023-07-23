# Webdev-projekti
Kesällä 2020 tehdyn webdev-kurssin lopputyö, päämääränä oli tehdä web-sovellus joka hyödyntää jotain olemassa olevaa API:a. Omassa projektissa käytin http://open-notify.org/ sivuston tarjoamaa API:a, joka näyttää tämän hetkisen sijainnin kansainväliselle avaruusasemalle. Kyseinen API ei valitettavasti näytä kuin tämänhetkisen sijainnin avaruusasemalle, niin jouduin tekemään oman API:n joka otti avaruusaseman sijainnin talteen 30sec välein, ja tallensi tämän datan .json tiedostoon. Näin pystyin omalla web-sovelluksellani näyttämään avaruusaseman sijainnit viimeisen vuorokauden ajalta.
Web-sovellukseen käytin nodea sekä expressiä, API-pyyntöihin käytin ajaxia.

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/311f7d61-405b-47f6-8808-05e8b7ca7a79)

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/bc4cc242-e4b3-433e-ab70-0ae45069287c)

ISSloggingFinal kansio sisältää oman API:n koodin, tätä pyöritin googlen tarjoamilla servereillä webdev-kurssin ajan
ISSlivetrackerFinal sisältää itse web-sovelluksen koodin.

Lisäksi web-sovelluksella pystyi hakemaan sijaintitietoa ja näyttämään milloin avaruusasema menee tietyn sijainnin ylitse. Vasiten tein vielä jälkikäteen 3d-version samasta sovelluksesta. Nämä ominaisuudet ei enää toimineet jostain syystä, todennäköisesti näiden API-credentiaalit vanhentuneet.

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/21bf3648-b59a-4857-b378-9d13ed168e47)

![image](https://github.com/arttulepp/Webdev-projekti/assets/140317200/6b4a4fcb-d1ab-403c-a491-929b8de215ac)
