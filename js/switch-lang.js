document.addEventListener("DOMContentLoaded", function () {

    const languageToggle = document.getElementById("languageToggle");

    const indonesiaElements = document.querySelectorAll(".id");
    const englishElements = document.querySelectorAll(".en");

    let currentLanguage = "id";

    function setLanguage(language) {

        if (language === "id") {

            // Tampilkan Bahasa Indonesia
            indonesiaElements.forEach(element => {
                element.classList.remove("lang-hidden");
            });

            // Sembunyikan Bahasa Inggris
            englishElements.forEach(element => {
                element.classList.add("lang-hidden");
            });

            // Ubah tulisan tombol
            languageToggle.textContent = "IND";

            // Ubah atribut bahasa HTML
            document.documentElement.lang = "id";

            currentLanguage = "id";

        } else {

            // Sembunyikan Bahasa Indonesia
            indonesiaElements.forEach(element => {
                element.classList.add("lang-hidden");
            });

            // Tampilkan Bahasa Inggris
            englishElements.forEach(element => {
                element.classList.remove("lang-hidden");
            });

            // Ubah tulisan tombol
            languageToggle.textContent = "ENG";

            // Ubah atribut bahasa HTML
            document.documentElement.lang = "en";

            currentLanguage = "en";
        }
    }

    // Default Bahasa Indonesia
    setLanguage("id");


    // Ketika button diklik
    languageToggle.addEventListener("click", function () {

        if (currentLanguage === "id") {
            setLanguage("en");
        } else {
            setLanguage("id");
        }

    });

});