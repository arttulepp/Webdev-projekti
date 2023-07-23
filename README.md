# Webdev-projekti
Kesällä 2020 tehdyn webdev-kurssin lopputyö, päämääränä oli tehdä web-sovellus joka hyödyntää jotain olemassa olevaa API:a. Omassa projektissa käytin http://open-notify.org/ sivuston tarjoamaa API:a, joka näyttää tämän hetkisen sijainnin kansainväliselle avaruusasemalle. Kyseinen API ei valitettavasti näytä kuin tämänhetkisen sijainnin avaruusasemalle, niin jouduin tekemään oman API:n joka otti avaruusaseman sijainnin talteen 30sec välein, ja tallensi tämän datan .json tiedostoon. Näin pystyin omalla web-sovelluksellani näyttämään avaruusaseman sijainnit viimeisen vuorokauden ajalta.
Web-sovellukseen käytin nodea sekä expressiä, API-pyyntöihin käytin ajaxia.

![Näyttökuva 2023-07-23 145413](https://github.com/arttulepp/Webdev-projekti/assets/140317200/ae65deb3-f294-4cd3-bd0d-5797ef8beef6)

![Näyttökuva 2023-07-23 145542](https://github.com/arttulepp/Webdev-projekti/assets/140317200/6cde5034-f4d6-4069-8451-ad26a77c0643)

ISSloggingFinal kansio sisältää oman API:n koodin, tätä pyöritin googlen tarjoamilla servereillä webdev-kurssin ajan
ISSlivetrackerFinal sisältää itse web-sovelluksen koodin.

Lisäksi web-sovelluksella pystyi hakemaan sijaintitietoa ja näyttämään milloin avaruusasema menee tietyn sijainnin ylitse. Vasiten tein vielä jälkikäteen 3d-version samasta sovelluksesta. Nämä ominaisuudet ei enää toimineet jostain syystä, todennäköisesti näiden API-credentiaalit vanhentuneet.

![Näyttökuva 2023-07-23 150536](https://github.com/arttulepp/Webdev-projekti/assets/140317200/69c30639-957e-47c1-a009-8e47d1c0696f)

![Näyttökuva 2023-07-23 150610](https://github.com/arttulepp/Webdev-projekti/assets/140317200/9607e32f-57f6-4c17-a68f-f443d40cce63)
