document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('playFNF');
    const placeholderImage = '../Assets/images/placeholder.png';
    const modalDialog = document.querySelector('#modPlayerModal .modal-dialog');
    const modGrid = document.querySelector('.mod-grid');
    const toggleFullscreenButton = document.getElementById('toggle-fullscreen');

    const settings = {
        bgColor: { element: document.getElementById('bg-color-picker'), key: 'bgColor', apply: (value) => document.body.style.backgroundColor = value },
        gridGap: { element: document.getElementById('grid-gap-slider'), key: 'gridGap', apply: (value) => modGrid.style.gap = `${value}px` }
    };

    const loadSettings = () => {
        Object.values(settings).forEach(({ element, key, apply }) => {
            const savedValue = localStorage.getItem(key);
            if (savedValue) {
                element.value = savedValue;
                apply(savedValue);
            }
        });
    };

    const saveSettings = () => {
        Object.values(settings).forEach(({ element, key, apply }) => {
            const value = element.value;
            localStorage.setItem(key, value);
            apply(value);
        });
        bootstrap.Modal.getInstance(document.getElementById('customizationModal')).hide();
    };

    const updateSliderLabels = () => {
        document.getElementById('grid-gap-value').textContent = settings.gridGap.element.value;
    };

    Object.values(settings).forEach(({ element }) => {
        element.addEventListener('input', updateSliderLabels);
    });

    document.getElementById('save-customization').addEventListener('click', saveSettings);

    // Complete JSON object containing all mod data
    const mods = [
        { name: "B3 remixed", href: "https://run3.io/popgame/fnf/fnf-ke131-b3-remix-opt/", img: "../Assets/images/B3_remixed_preview.png" },
        { name: "Beat Street", href: "https://fnf.run3.io/beatstreet-remix/3/", img: "../Assets/images/Beatsteet_preview.png" },
        { name: "Bob", href: "https://fnf.run3.io/bob/1/?d3d", img: "../Assets/images/Bob_preview.png" },
        { name: "Brightside", href: "https://fnf.run3.io/brightside/3/", img: "../Assets/images/Brightside_preview.png" },
        { name: "C-sides", href: "https://run3.io/popgame/fnf/csides131-kbhgames/", img: "../Assets/images/C-sides_preview.png" },
        { name: "CG5", href: "https://run3.io/popgame/fnf/fnf-131-cg5/", img: "../Assets/images/CG5_preview.png" },
        { name: "Corruption", href: "https://fnf.run3.io/siivagunner-corruption-pack/1/", img: "../Assets/images/Corruption_preview.png" },
        { name: "Da Games", href: "https://v6p9d9t4.ssl.hwcdn.net/html/3786446/da%20games%20mod/index.html", img: "../Assets/images/DaGames_preview.png" },
        { name: "Everywhere At The End Of Funk", href: "https://fnf.run3.io/end-of-funk/1/", img: "../Assets/images/EverywhereAtTheEndOfFunk_preview.png" },
        { name: "Flipside", href: "https://fnf.run3.io/flipside", img: "../Assets/images/Flipside_preview.png" },
        { name: "Holonight Funkin", href: "https://v6p9d9t4.ssl.hwcdn.net/html/3658396/Holonight%20Funkin/index.html", img: "../Assets/images/Holonight_Funkin_preview.png" },
        { name: "Minus", href: "https://fnf.run3.io/minus/1/?updateeee", img: "../Assets/images/Minus_preview.png" },
        { name: "Monika", href: "https://fnf.run3.io/monika/5/https://fnf.run3.io/brightside/3/", img: "../Assets/images/Monika_preview.png" },
        { name: "Neo", href: "https://run3.io/popgame/fnf/fnf-ke131-neo-opt/", img: "../Assets/images/Neo_preview.png" },
        { name: "pumkinpie", href: "https://fnf.run3.io/pumpkin-pie/2/", img: "../Assets/images/pumkinpie_preview.png" },
        { name: "Refresh", href: "https://gamasexual.com/c/f/g/friday-night-funkin-refresh-mod/", img: "../Assets/images/Refresh_preview.png" },
        { name: "Roses-Criminal mod", href: "https://fnf.run3.io/michael-jackson/1/?d44", img: "../Assets/images/Roses-Criminal_mod_preview.png" },
        { name: "Salty's Sunday Night", href: "https://run3.io/fnf/saltys-sunday-night/3/", img: "../Assets/images/Salty's_Sunday_Night_preview.png" },
        { name: "StarCatcher", href: "https://run3.io/popgame/fnf/fnf-ke141-starcatcher/", img: "../Assets/images/StarCatcher_preview.png" },
        { name: "Touhou", href: "https://run3.io/popgame/fnf/fnf-ke131-touhou/", img: "../Assets/images/Touhou_preview.png" },
        { name: "Tricky", href: "https://fnf.run3.io/tricky/1/", img: "../Assets/images/Tricky_preview.png" },
        { name: "Tricky Beat Streets", href: "https://run3.io/popgame/fnf/tricky-beatstreet131-kbhgames5/", img: "../Assets/images/Tricky_Beat_Streets_preview.png" },
        { name: "High Effort Ugh 2.0", href: "https://run3.io/popgame/fnf/fnf-ke131-vs-tankman-ugh-v2/", img: "../Assets/images/High_Effort_Ugh_2.0_preview.png" },
        { name: "Friday Night Vibin'", href: "https://fnf2.kdata1.com/vibin-utau/1/", img: "../Assets/images/Friday_Night_Vibin_preview.png" },
        { name: "Matt 2.0", href: "https://run3.io/popgame/fnf/mattwii-2/?ddd", img: "../Assets/images/Matt_2.0_preview.png" },
        { name: "X Event", href: "https://fnf.run3.io/xmod/2/", img: "../Assets/images/X_Event_preview.png" },
        { name: "Another Friday Night", href: "https://fnf.run3.io/another/1/", img: "../Assets/images/Another_Friday_Night_preview.png" },
        { name: "Deep Sea Date", href: "https://run3.io/popgame/fnf/deep-sea-kbhgames/", img: "../Assets/images/Deep_Sea_Date_preview.png" },
        { name: "Golf with carol ft. Hatsune Miku", href: "https://fnf2.kdata1.com/golf-minigame-ft-miku/2/", img: "../Assets/images/Golf_with_carol_ft_Hatsune_Miku_preview.png" },
        { name: "H3llBeats", href: "https://run3.io/popgame/fnf/hellbeat131-kbhgames1/", img: "../Assets/images/H3llBeats_preview.png" },
        { name: "Gacha Life mod", href: "https://fnf.run3.io/gacha/1/", img: "../Assets/images/Gacha_Life_mod_preview.png" },
        { name: "Boyfriend's Circulation", href: "https://fnf.run3.io/circulation/2/", img: "../Assets/images/Boyfriend's_Circulation_preview.png" },
        { name: "Bad Apple", href: "https://fnf.run3.io/bad-apple/1/", img: "../Assets/images/Bad_Apple_preview.png" },
        { name: "FNF but bad", href: "https://run3.io/popgame/fnf/fnf-ke131-but-bad/", img: "../Assets/images/FNF_but_bad_preview.png" },
        { name: "VS. Annie", href: "https://run3.io/popgame/fnf/fnf-ke141-vs-annie1/", img: "../Assets/images/VS_Annie_preview.png" },
        { name: "VS. Tabi Ex Boyfriend", href: "https://www.play-games.com/iframe/27265.html", img: "../Assets/images/VSTabi_preview.png" },
        { name: "VS. Ex Girlfriend", href: "https://fnf.kdata1.com/ex-gf/1/", img: "../Assets/images/VSEx_Girlfriend_preview.png" },
        { name: "VS. Chara Boy", href: "https://fnf.run3.io/chara-boy/1/", img: "../Assets/images/VSCharaboy_preview.png" },
        { name: "VS. Cye", href: "https://v6p9d9t4.ssl.hwcdn.net/html/3787450/bin/index.html", img: "../Assets/images/VSCye_preview.png" },
        { name: "VS. Garcello", href: "https://fnf.run3.io/garcello/3/", img: "../Assets/images/VSGarcello_preview.png" },
        { name: "VS. Girlfriend", href: "https://fnf.kdata1.com/gf/1/", img: "../Assets/images/VSGirlfriend_preview.png" },
        { name: "VS. Hex", href: "https://fnf.run3.io/hex/1/?1", img: "../Assets/images/VSHex_preview.png" },
        { name: "VS. Impostor", href: "https://fnf.run3.io/imposter/3/", img: "../Assets/images/VSImpostor_preview.png" },
        { name: "VS. K.K. slider", href: "https://fnf.run3.io/kk-slider/1/", img: "../Assets/images/VSKKslider_preview.png" },
        { name: "VS. KAPI", href: "https://run3.io/fnf/kapi/1/", img: "../Assets/images/VSKAPI_preview.png" },
        { name: "VS. Liz", href: "https://v6p9d9t4.ssl.hwcdn.net/html/3667746/liz/index.html", img: "../Assets/images/VSLiz_preview.png" },
        { name: "VS. Miku", href: "/vsmiku", img: "../Assets/images/VSMiku_preview.png" },
        { name: "VS. Myra", href: "https://fnf.run3.io/myra/1/", img: "../Assets/images/VSMyra_preview.png" },
        { name: "VS. Sans", href: "https://fnf.run3.io/sans/5/", img: "../Assets/images/VSSans_preview.png" },
        { name: "VS. Static", href: "https://fnf2.kdata1.com/static/1/", img: "../Assets/images/VS_Static_preview.png" },
        { name: "VS. Tord", href: "https://fnf.run3.io/tord/5/?ds", img: "../Assets/images/VS_Tord_preview.png" },
        { name: "VS. Whitty", href: "https://fnf.run3.io/whitty/v1/", img: "../Assets/images/VS_Whitty_preview.png" },
        { name: "VS. Zardy", href: "https://sd592g.github.io/df8ia1s/zardy/", img: "../Assets/images/VS_Zardy_preview.png" }
    ];

    // Function to create mod items dynamically
    const createModItems = () => {
        mods.forEach(mod => {
            const modItem = document.createElement('div');
            modItem.classList.add('mod-item');
            modItem.setAttribute('data-href', mod.href);

            const img = document.createElement('img');
            img.classList.add('mod-preview');
            img.src = mod.img;
            img.alt = `${mod.name} preview`;
            img.onerror = () => img.src = placeholderImage;

            const title = document.createElement('h3');
            title.textContent = mod.name;

            modItem.appendChild(img);
            modItem.appendChild(title);
            modGrid.appendChild(modItem);

            // Add click event to open modal
            modItem.addEventListener('click', () => {
                iframe.src = mod.href;
                new bootstrap.Modal(document.getElementById('modPlayerModal')).show();
            });
        });
    };

    // Toggle full-screen mode
    toggleFullscreenButton.addEventListener('click', () => {
        if (modalDialog.classList.contains('fullscreen-modal')) {
            modalDialog.classList.remove('fullscreen-modal');
            toggleFullscreenButton.textContent = 'Full Screen';
        } else {
            modalDialog.classList.add('fullscreen-modal');
            toggleFullscreenButton.textContent = 'Exit Full Screen';
        }
    });

    // Clear iframe when modal is closed
    document.getElementById('modPlayerModal').addEventListener('hidden.bs.modal', () => iframe.src = '');

    // Generate mod items
    createModItems();
    loadSettings();
    updateSliderLabels();
});
