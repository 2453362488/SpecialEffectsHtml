var App = {
    config: {
        landscape: {
            width: 1356,
            height: 1080    
        },
        portrait: {
            width: 942,
            height: 1080    
        },
        resolution: {
            min: 640,
            max: 1920
        },
        ratio: {
            orientationChange: 1.256,
            gridPortraitScale: 0.864,
            publisherLandscapeScale: 0.7,
            levelCompletedScale: {
                landscape: 0.7,
                portrait: 0.9
            }
        },
        size: {
            button: 106,
            grid: 1016,
            margin: 32
        },
        hint: {
            timer: 16,
            length: [6, 8, 10, 12, 14]
        },
        level: {
            4: {
                tile: {
                    size: 254,
                    padding: 16
                },
                inner: {
                    size: 222
                },
                block: {
                    size: 190,
                    margin: 16,
                    bar: 12,
                },
                line: {
                    width: 12
                },
                margin: 0
            },
            5: {
                tile: {
                    size: 202,
                    padding: 13
                },
                inner: {
                    size: 176
                },
                block: {
                    size: 150,
                    margin: 13,
                    bar: 10,
                },
                line: {
                    width: 10
                },
                margin: 3
            },
            6: {
                tile: {
                    size: 168,
                    padding: 11
                },
                inner: {
                    size: 146
                },
                block: {
                    size: 126,
                    margin: 10,
                    bar: 8,
                },
                line: {
                    width: 8
                },
                margin: 4
            },
            7: {
                tile: {
                    size: 144,
                    padding: 10
                },
                inner: {
                    size: 124
                },
                block: {
                    size: 108,
                    margin: 8,
                    bar: 7,
                },
                line: {
                    width: 8
                },
                margin: 4
            },
            8: {
                tile: {
                    size: 126,
                    padding: 9
                },
                inner: {
                    size: 108
                },
                block: {
                    size: 94,
                    margin: 7,
                    bar: 6,
                },
                line: {
                    width: 6
                },
                margin: 4
            }   
        },
        color: [
            ['#c7dc5b', '#9fb049'],
            ['#dca05b', '#bb884d'],
            ['#d56d6d', '#c06262'],
            ['#b694c9', '#9276a1'],
            ['#3d80c2', '#3773af'],
            ['#5fd8c2', '#4cad9b'],
            ['#61d67e', '#53b66b'] 
        ]
    },
    initGame: function() {
        var viewScale = this.getViewScale();
        
        this.game = new Phaser.Game(window.innerWidth * viewScale, window.innerHeight * viewScale, Phaser.CANVAS, '', null, true);
        
        for (var key in this.state) { 
            this.game.state.add(key, this.state[key]);
        }
        
        this.game.state.start('boot');
    },
    getViewScale: function() {
        var viewScale = 1; 
        
        if (window.innerWidth < App.config.resolution.min || window.innerHeight < App.config.resolution.min) {
            viewScale = Math.max(App.config.resolution.min / window.innerWidth, App.config.resolution.min / window.innerHeight);
        }
        
        if (window.innerWidth > App.config.resolution.max || window.innerHeight > App.config.resolution.max) {
            viewScale = Math.max(App.config.resolution.max / window.innerWidth, App.config.resolution.max / window.innerHeight);
        }
        
        return viewScale;
    },
    localStorage: {
        key: 'tracekongregate',
        isSupported: false,
        init: function() {
            if (typeof localStorage !== 'object') {
                return false;
            }

            try {
                localStorage.setItem('localStorage', 1);
                localStorage.removeItem('localStorage');
            } catch (e) {
                return false;
            }
            
            this.isSupported = true;
        },
        encode: function(val) {
            return btoa(JSON.stringify(val));    
        },
        decode: function(str) {
            return JSON.parse(atob(str));    
        },
        set: function(val) {
            if (this.isSupported) {
                localStorage.setItem(this.key, this.encode(val));     
            }
        },
        get: function() {
            if (this.isSupported && this.has()) {
                return this.decode(localStorage.getItem(this.key)); 
            }
            
            return 0;
        },
        has: function() {
            if (this.isSupported) {
                return localStorage.getItem(this.key) !== null;
            }
            
            return false;
        }
    },
    audioManager: {
        ready: false,
        enabled: true,
        buttonOffset: 0,
        init: function() {
            if (this.ready === true) {
                return;
            }
            
            this.sfx = App.game.add.audioSprite('audio');
            
            for (var key in this.sfx.sounds) {
                this.sfx.sounds[key].allowMultiple = true;
            }
            
            this.ready = true;
        },
        toogleAudio: function() {
            if (this.ready === false) {
                return;
            }
            
            this.enabled = !this.enabled;
            this.buttonOffset = (this.buttonOffset === 0) ? 2 : 0;
        },
        play: function(marker) {
            if (this.ready === false || this.enabled === false) {
                return;
            }
            
            if (typeof marker === 'string') {
                var name = marker;    
            } else {
                var name = marker[Math.floor(Math.random()*marker.length)];
            }
            
            this.sfx.play(name, this.sfx.config.spritemap[name].volume);
        }
    },
    game: null,
    state: {},
    level: [
        // 0 - size: 4
        { id: 0, size: 4, grid: '0000111110010000', route: '201011121323', timer: 999999, cursor: 'route' },
        { id: 1, size: 4, grid: '0000111101110000', route: '23131222211110', timer: 999999, cursor: 'route' },
        { id: 2, size: 4, grid: '1111110111011001', route: '302021111000010203132333', timer: 0, cursor: 'hint' },
        { id: 3, size: 4, grid: '1111111111010101', route: '33231303021211010010202131', timer: 6 },
        { id: 4, size: 4, grid: '1101111111110011', route: '32332322212010000111121303' },
        { id: 5, size: 4, grid: '1111010111011111', route: '02031323333231302021110100' },
        { id: 6, size: 4, grid: '1111101111101111', route: '1000010203131222212030313233' },
        { id: 7, size: 4, grid: '1111101011110111', route: '12222333323121201000010203' },
        // 7 / 8 - size: 5
        { id: 8, size: 5, grid: '1011111101110110101101111', route: '20213141424344343323241404030212111000' },
        { id: 9, size: 5, grid: '1111111001011110111101101', route: '00101101020304142423222131414232333444' },
        { id: 10, size: 5, grid: '0101111111101111011111100', route: '03041424343323131222324241403020101101' },
        { id: 11, size: 5, grid: '1111110101101111011111101', route: '0304142423221202010010203040414232333444' },
        { id: 12, size: 5, grid: '1100111111111110110100111', route: '00011110202131324243443424232212131404' },
        { id: 13, size: 5, grid: '1111110111111001111110111', route: '443433434232221213140403020100102021313040' },
        { id: 14, size: 5, grid: '0111011011101111011011111', route: '22232414130302011110203040414232334344' },
        { id: 15, size: 5, grid: '0111111001111011111101011', route: '30201011010203041424344443333222213141' },
        { id: 16, size: 5, grid: '0111111101111110111001111', route: '1222232414040302011110202131414232334344' },
        { id: 17, size: 5, grid: '0111111011111101111100110', route: '10203031211101020304141323223242433334' },
        { id: 18, size: 5, grid: '1011111101111111111100111', route: '223242434434332324140403021211213130201000' },
        { id: 19, size: 5, grid: '0111111111111111110000111', route: '2131302010110102030414242313122232424344' },
        // 19 / 20 - size: 6
        { id: 20, size: 6, grid: '110111111111011010011110111111111001', route: '01001011121303040515142434333222213141405051524243444555' },
        { id: 21, size: 6, grid: '111110110110010111111110101011101111', route: '504030312111100001020304141323333242525354554544342425' },
        { id: 22, size: 6, grid: '011110110011011111110011111111111111', route: '3040505141312122232434444342525354554535251514040302011110' },
        { id: 23, size: 6, grid: '111010111011011111110111111101011111', route: '0010110102122221313040415152424353545545353433232425151404' },
        { id: 24, size: 6, grid: '011110111111011001111001101111111111', route: '51504030312122324252534344545545352515140403131202011110' },
        { id: 25, size: 6, grid: '010110111110101011111001110111011111', route: '4041515253434454554535252414040313122232313020101101' },
        { id: 26, size: 6, grid: '011010111111110111010111111101101111', route: '04141525243435455554535242433323131202011110202131414050' },
        { id: 27, size: 6, grid: '111110101110111011011110111111111111', route: '405051524241312120100001020304141312223233435354554544342425' },
        { id: 28, size: 6, grid: '011011111111101111111011111111111101', route: '42322223243444435352515040413130201011010212131404051525354555' },
        { id: 29, size: 6, grid: '111111111101111011101110110111011100', route: '00102030404151525343333222211101021213030405152524344445' },
        { id: 30, size: 6, grid: '111010101111111111110011111011111110', route: '1323221202010010202131304050514142525354444535342425151404' },
        { id: 31, size: 6, grid: '011111110110011110111111101101111111', route: '0504142434354555545343333242525150403031212223130302011110' },
        { id: 32, size: 6, grid: '101111111011111111100111111111111101', route: '00101121203040505141425253434434332322120203040515142425354555' },
        { id: 33, size: 6, grid: '111111110011110110011111011111110011', route: '00102021110102030405151424233334354555544443423231415150' },
        { id: 34, size: 6, grid: '111111110111111101101111111111110100', route: '030201001011212030405051414232222313140405152535454434334353' },
        { id: 35, size: 6, grid: '111111111110110111111101101101111111', route: '32425251504030312120100001111202031323334353545545352524140405' },
        // 35 / 36 - size: 7
        { id: 36, size: 7, grid: '1111111101111011101110110111011110011001111111111', route: '605051616263646566565554444342413132222120100001021213030414243435362625150506' },
        { id: 37, size: 7, grid: '0111111110110110011111110010111001111111110101111', route: '52536364545565665646453525261606050414242313030201111020303132424140505161' },
        { id: 38, size: 7, grid: '1111111011000111111111011011100111111110011111111', route: '646566564645444353636252516160504030202122323323242535362616060504030212110100' },
        { id: 39, size: 7, grid: '1011111111000111111111000110111111111011011111111', route: '606162635343424151504030202122232434445464656656464535252616060504030212111000' },
        { id: 40, size: 7, grid: '0110111111110101111110101100110111111111110110111', route: '6656464555656454443424252616060504141323334353526261515040413121221202011110' },
        { id: 41, size: 7, grid: '1111010110111111011011111111101110011001110111111', route: '0010202111010203131424233343423231304050516162636465665655544434353626161505' },
        { id: 42, size: 7, grid: '1111111100110011111110001111111100110011111111011', route: '26252434353646566665555453636261605040414243332322212010000102031314040506' },
        { id: 43, size: 7, grid: '1111111110000111111111011011111111101111010100111', route: '0010110102030405061626363525242333434445465666656454535242322221203040415161' },
        { id: 44, size: 7, grid: '1110100101111110011111111100110011111111011110111', route: '62616050404151525354646566564645443433323130201000010212132324252616151404' },
        { id: 45, size: 7, grid: '1111111101101111111110111011111111010101111110110', route: '06161505040313120201001020212232314140506061625242433323242526363545445464655556' },
        { id: 46, size: 7, grid: '1111111101110111011010111011111111110111011111101', route: '12130302010010202131414050606162525363645444434232332324140405061626363545465666' },
        { id: 47, size: 7, grid: '1111110111101101100011111111011111111001111111100', route: '0010110102121303040515162636465655453534445464636261605051414243333222213130' },
        { id: 48, size: 7, grid: '1011111111010101111011101111110111111001111111100', route: '0302122223334344342414040506162636354546565554646362616050514140303121111000' },
        { id: 49, size: 7, grid: '0011111111011101111111100111100110111111111111011', route: '343525150506162636465666655554444353636252516160504030312122232414040302121110' },
        { id: 50, size: 7, grid: '1111111100110111111111111110100111111110111101011', route: '66655556464535252616060504142434444333231303020100102021223231304050606151525363' },
        { id: 51, size: 7, grid: '1101111110101111111101010111111110011011111111111', route: '66565565645453636261605051414030201000011121223242434434242313030405061615253536' },
        { id: 52, size: 7, grid: '1111110110111111110111111110011111111011010111111', route: '1413232232333444546465665646453525261615050403020100101121203031414243536362615150' },
        { id: 53, size: 7, grid: '1110011101111111111010110101111111110111111111101', route: '34242322324243444546362616060515141312020100102021314140506061625253636454555666' },
        { id: 54, size: 7, grid: '1111111111111110010011011111111010011111111111110', route: '11120201001020304041515060616263535242323323130304141505061626363534445464655556' },
        { id: 55, size: 7, grid: '1111111110001111011101111011011111101101111111111', route: '52626364545565665646363545444333232425151606050403020100101121203031324241516160' },
        // 55 / 56 - size: 8
        { id: 56, size: 8, grid: '0011111111100101111111011101111111011111111110011001111111110100', route: '04030212111020212223334353525141313040506070717273636454443424251505060717273736354546475767666575' },
        { id: 57, size: 8, grid: '1110111110101101101111111101111011111111101011101011111111100111', route: '636454444342526272717060504041313020100001021222233334242515140405060717272636354555657576776766564647' },
        { id: 58, size: 8, grid: '1110111110101001111110111111111110001101111110010110111111111110', route: '34354544545352627273746465757666675747373626271707060504142423333222120201001020213130405051617170' },
        { id: 59, size: 8, grid: '0101111111110111101101111111101100111011111100111011101111101111', route: '5150607071726263647475767767665657474636372726251516170706050403131222233334444353524232313020101101' },
        { id: 60, size: 8, grid: '1110111110101101111101111101111111011001111111111111101101101011', route: '233343443435362625151404050607172737475767777666565554535251413121221202010010203040506061717262636474' },
        { id: 61, size: 8, grid: '0110111111111111111001110011100111101111101111111011111011111011', route: '222120101101021213140405060717161525262737475756464544343332424140506070717273746463625253545565667677' },
        { id: 62, size: 8, grid: '0111111101111001111000010111111111111111100111011011110111101111', route: '42322212110102031314040506071727373635343343444546475767777675746465555453636272717060504041312120' },
        { id: 63, size: 8, grid: '1111101011101110111011111000111111101110111111111101010101110111', route: '44342414040302010010111222212030404142525150606171727363535455657576776757564645353637272625151606' },
        { id: 64, size: 8, grid: '0111111111111101111001011100011101011111110101001001111111111110', route: '1011010203040506071727374746363525151413122221203031415150607071727363534344455565647475766667' },
        { id: 65, size: 8, grid: '1111111111111001001011111110111111111101110001011111111110111111', route: '77675747373635455565667675746463737262615141424344342425262717070605041413030201001011122232313040506070' },
        { id: 66, size: 8, grid: '1111011010011111111111101111101110001011111111101111111011111011', route: '777666656474737271706061626353525150403031322221201000010203132333344454555646473736262524141505061617' },
        { id: 67, size: 8, grid: '0111011101110101111101110111111011111011111000110111111011111100', route: '707161627273636474756566565747463626271707060515253534444342525150404131323323130302011112222120' },
        { id: 68, size: 8, grid: '1101011111011101111111011111111110001111101111011011110111111111', route: '33232232312111010010203040506070717262525363737464545565757677675747463637271707060515253545443424141303' },
        { id: 69, size: 8, grid: '1100110011111111111001111111111111001111111111111011110111101101', route: '34333222121314040515253545445453525141312111010010203040506070717262636474756555564636261617273747576777' },
        { id: 70, size: 8, grid: '1111111110111101111011111110101111011011011111011111110101100111', route: '262524344443536364545565757677675747463637271707060515140403131202010010202122323130404151526272716160' },
        { id: 71, size: 8, grid: '0111110001111111011111101101011011111111111111111101100101111111', route: '534333232221313040414252515060617172736364747576776757474656555444453536262524141312110102030405151617' },
        { id: 72, size: 8, grid: '1111111110100111111111101100101111111011111111111001111111110010', route: '010010202131304050607071727363646555545352514142434434242322120203040506071716152526363747465657676676' },
        { id: 73, size: 8, grid: '1111101011101111101110111110111101100101111111011011011111111111', route: '151404030212110100102030314151506070717262524232222324343545555453637374756566767767574737362627171606' },
        { id: 74, size: 8, grid: '1111011111010101011111011111101101111111011111011111100111101111', route: '414243444555545352516160707172626364747576776757474636372717070605152524343332222313030201001011213130' },
        { id: 75, size: 8, grid: '1111111111001101110111111011110011101111011011101111101111111111', route: '15142423333242526263737271706061514140302021111000010203040506071727262535344454647475767767665655454647' },
        { id: 76, size: 8, grid: '1110111111101101011111011101110101111111110010111001110111110111', route: '54444535343343424151506070717273636465757677675756464737271707060504141525242322120201001011213130' },
        { id: 77, size: 8, grid: '1111011111011101110111111011111111111011111101101011111111111110', route: '555646473736352526271707060515141303020100101121203040506070717262525141423233232434444353637374646575766667' },
        { id: 78, size: 8, grid: '1111111111101101110111111101111101111111110111111111100100101111', route: '2131302010000111120203041415050607172726252423333435363747464544545556576777767574646353434241515060616272' },
        { id: 79, size: 8, grid: '1111010010110111101001111111111100111011111110101001101111111111', route: '221213030201001020303132425251506070717273635343333444546474757677676656464737271716263635251505' },
        { id: 80, size: 8, grid: '0011111111100001111111111111111001100011011011111110111100111111', route: '303132333435252423222120101112020304050607172726364647575655546465666777767574737262524241516160' },
        { id: 81, size: 8, grid: '1111111110110111111110010101111111011100111111111101101111011010', route: '2212132324343343445464747363535251617170605040413121201000010203040515160607172737363545555657676676' },
        { id: 82, size: 8, grid: '1111111110110110101111111110100111111111110111111101110111110111', route: '2322324243535444342425262737474645555657677776756564637372717060615150404131302010000102121303040515160607' },
        { id: 83, size: 8, grid: '1111100110111111111111111111111110111001110110010111111100111111', route: '42323130405051616272736364747565667677675747373635344454534333232221201000010212130304142425151626271707' },
        { id: 84, size: 8, grid: '1111101011001110111111111011100111101111110011111111100111111111', route: '222324140403020100101121203040506070716151414232333444546463627273747576776757565545464737272625151606' },
        { id: 85, size: 8, grid: '0111110001111110111000100111111101110111111111111011000111111111', route: '343545464737362616150504141303020111122232334353545556576777767574736362727170605051524241312120' },
        { id: 86, size: 8, grid: '1111111111100111111011011110110111001111111111101011011111111101', route: '32313020212212111000010203040515160607172737474645352524344454535251414050607071726263737475655556666777' },
        { id: 87, size: 8, grid: '1111111110110011101111101111111111011010111011111011110111111111', route: '1303040506071716262535342423221202010010203040506070717262525141313233434454556564637374757677675756463637' },
        { id: 88, size: 8, grid: '0010111111111001101101111011111111101111101111111001110111110111', route: '4142525354443433322223131404050607172726253536374746455556576777767565646373727170605040302010111202' },
        { id: 89, size: 8, grid: '1100111111111111110111110111100111111111001101111111011111110110', route: '32312120100001111213233334241404051525261606071727374757676676756555564645444353637372717060616252424140' },
        { id: 90, size: 8, grid: '0111111111011111111111001101111011100010101011111111110101011111', route: '22213130201011010203040506071716151413233334242535364656576777767565555464747363625242414050606171' },
        { id: 91, size: 8, grid: '1111111011101111111111001001111111111011111110111011110111111111', route: '233343424140302010000111212212020304142434445453525150607071726263737464657576776757564647373635251505061617' },
        { id: 92, size: 8, grid: '1111001011011111111101111101111111011001110111110101111101111111', route: '222333343536374757677776665655657574645444435363737271615150404131302021111000010203131415252627171606' },
        { id: 93, size: 8, grid: '1111110011100110111110111101111111111111111011011110111111111010', route: '31302010000111212212020304051516262737363534242333434241405051526261607071727374646555544445464757676676' },
        { id: 94, size: 8, grid: '0110111111101011001110111111111111111011111110011011110111111111', route: '35343332313040414243445453525150607071726263737464657576776757474636372726161707060504142423221202011110' },
        { id: 95, size: 8, grid: '1111111010111110111001111111110011111111110111010111010100110111', route: '21221213140403020100102030405051616272736353545565757677675747464544434241313233343525150506162627' },
        { id: 96, size: 8, grid: '1110101110111011101111111111100111001111111111111011110111111111', route: '1312020100102030313222233334445453525141405060707172626373746465757677675756554546473727170706162625241404' },
        { id: 97, size: 8, grid: '1111111111011111110110111001101111101111111110111111110100100111', route: '454454536364657576776757564647373626271707061615050414243433231303020100101121203040506061514142526272' },
        { id: 98, size: 8, grid: '1111111110111101101111011011111111101111011110011111101100111110', route: '333242414030201000010212222313030414242515050607172737363534444546475767667675747372626364545352516160' },
        { id: 99, size: 8, grid: '1111111110111101101001011011110111101111111111101011111111111110', route: '33343525150506071727374746565545445453524232221213140403020100102030404151506070717262637374646575766667' }
        // 99
    ]
};


 


window.onload = function() {
    App.initGame();  

};


App.state.boot = function() {};
App.state.boot.prototype = {
    preload: function() {
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        
        this.game.renderer.renderSession.roundPixels = true;
        this.game.canvas.oncontextmenu = function(event) { 
            event.preventDefault();
        };
        
        this.input.maxPointers = 1
        
        this.load.image('logo', 'assets/logo.png');
        this.load.spritesheet('bar', 'assets/bar.png', 624, 94);
    },
    create: function() {
        this.state.start('preload');   
    }
};

App.state.preload = function() {};
App.state.preload.prototype = {
    preload: function() {
        App.localStorage.init();
        
        this.uiInit();
        
        this.load.atlasJSONHash('atlas', 'assets/atlas.png', 'assets/atlas.json');
        this.load.audioSprite('audio', ['assets/audiosprite.m4a', 'assets/audiosprite.ogg', 'assets/audiosprite.mp3'], 'assets/audiosprite.json');
    },        
    create: function() {
        this.uiAnimateOut();
    },
    
    uiInit: function() {
        this.ui = {
            scale: null,
            orientation: null,
            group: {
                name: this.add.group()   
            }
        };
        
        this.orientation = {landscape: 0, portrait: 1};
        
        this.ui.logo = this.add.sprite(0, 0, 'logo');
        this.ui.logo.anchor.setTo(0.5, 1);
        
        this.ui.bar0 = this.add.sprite(0, 0, 'bar', 0);
        this.ui.bar0.anchor.setTo(0, 0);
        
        this.ui.bar1 = this.add.sprite(0, 0, 'bar', 1);
        this.ui.bar1.anchor.setTo(0, 0);
        this.load.setPreloadSprite(this.ui.bar1, 0);
        
        this.scale.setResizeCallback(this.uiResizeCallback, this);
        this.scale.onSizeChange.add(this.uiResize, this);

        this.uiResize(); 
    },
    uiResizeCallback: function() {
        var viewScale = App.getViewScale();
        
        this.scale.setGameSize(window.innerWidth * viewScale, window.innerHeight * viewScale);
        this.scale.getParentBounds(this.scale._parentBounds);

        this.uiResize();
    },
    uiResize: function() {
        this.ui.orientation = (this.game.width / this.game.height > App.config.orientationChangeRatio) ? this.orientation.landscape : this.orientation.portrait;
        
        if (this.ui.orientation === this.orientation.landscape) {
            this.ui.scale = Math.min(this.game.width / App.config.landscape.width, this.game.height / App.config.landscape.height); 
        } else {
            this.ui.scale = Math.min(this.game.width / App.config.portrait.width, this.game.height / App.config.portrait.height); 
        }
        
        this.ui.logo.scale.setTo(this.ui.scale);
        this.ui.logo.position.setTo(this.game.width * 0.5, this.game.height * 0.5);

        this.ui.bar0.scale.setTo(this.ui.scale);
        this.ui.bar0.position.setTo((this.game.width - this.ui.bar0.width) * 0.5, this.game.height * 0.5 + (App.config.size.margin * 2) * this.ui.scale);

        this.ui.bar1.scale.setTo(this.ui.scale);
        this.ui.bar1.position.setTo(this.ui.bar0.x, this.ui.bar0.y);
    },
    uiAnimateOut: function() {
        this.add.tween(this.ui.bar0).to({ 
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, true, 400);  
        
        this.add.tween(this.ui.bar1).to({ 
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, true, 400);  
        
        this.time.events.add(1000, function() {
            //this.state.start('game', true, false, { level: 0});  
            this.state.start('menu', true, false, { fromGame: false });  
        }, this);
    }
};

App.state.menu = function() {};
App.state.menu.prototype = {
    init: function(data) {
        this.data = data; 
    },
    preload: function() {
        this.currentLevel = App.localStorage.get();
        
        App.audioManager.init();
    },
    create: function() {
        this.uiInit();  
        this.uiAnimateIn();
    },
    
    uiInit: function() {
        this.ui = {
            scale: null,
            orientation: null,
            group: {
                name: this.add.group()   
            }
        };
        
        this.orientation = {landscape: 0, portrait: 1};
        
        this.ui.buttonAudio = this.add.button(0, 0, 'atlas', this.buttonAudio, this);
        this.ui.buttonAudio.anchor.setTo(1, 0);
        this.ui.buttonAudio.setFrames(
            'button/audio/small/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/small/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/small/' + (App.audioManager.buttonOffset + 1), 
            'button/audio/small/' + (App.audioManager.buttonOffset + 0)
        );
        
        this.ui.logo = this.add.sprite(0, 0, 'logo');
        this.ui.logo.anchor.setTo(0.5, 1);
 
        this.ui.buttonPlay = this.add.button(0, 0, 'atlas', this.buttonPlay, this, 'button/play/0', 'button/play/0', 'button/play/1', 'button/play/0');
        this.ui.buttonPlay.anchor.setTo(0.5, 0.5);
        
        this.scale.setResizeCallback(this.uiResizeCallback, this);
        this.scale.onSizeChange.add(this.uiResize, this);

        this.uiResize(); 
    },
    uiResizeCallback: function() {
        var viewScale = App.getViewScale();
        
        this.scale.setGameSize(window.innerWidth * viewScale, window.innerHeight * viewScale);
        this.scale.getParentBounds(this.scale._parentBounds);

        this.uiResize();
    },
    uiResize: function() {
        this.ui.orientation = (this.game.width / this.game.height > App.config.ratio.orientationChange) ? this.orientation.landscape : this.orientation.portrait;
        
        if (this.ui.orientation === this.orientation.landscape) {
            this.ui.scale = Math.min(this.game.width / App.config.landscape.width, this.game.height / App.config.landscape.height);
            
            this.ui.buttonAudio.scale.setTo(this.ui.scale);
            this.ui.buttonAudio.position.setTo(this.game.width - this.uiByScale(App.config.size.margin), this.uiByScale(App.config.size.margin));

            this.ui.logo.scale.setTo(this.ui.scale);
            this.ui.logo.position.setTo(this.game.width * 0.5, this.game.height * 0.5 - this.uiByScale(128));

            this.ui.buttonPlay.scale.setTo(this.ui.scale);
            this.ui.buttonPlay.position.setTo(this.game.width * 0.5, this.game.height * 0.5 + this.uiByScale(128));
        } else {
            this.ui.scale = Math.min(this.game.width / App.config.portrait.width, this.game.height / App.config.portrait.height); 
            
            this.ui.buttonAudio.scale.setTo(this.ui.scale);
            this.ui.buttonAudio.position.setTo(this.game.width - this.uiByScale(App.config.size.margin), this.uiByScale(App.config.size.margin));

            this.ui.logo.scale.setTo(this.ui.scale);
            this.ui.logo.position.setTo(this.game.width * 0.5, this.game.height * 0.5 - this.uiByScale(256));

            this.ui.buttonPlay.scale.setTo(this.ui.scale);
            this.ui.buttonPlay.position.setTo(this.game.width * 0.5, this.game.height * 0.5);
        }
    },
    uiByScale: function(value) {
        return value * this.ui.scale;
    },
    uiAnimateIn: function() {
        this.inputDisable();
        
        App.audioManager.play('in');
        
        this.add.tween(this.ui.buttonAudio).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonAudio.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 200);
        
        if (this.data.fromGame === true) {
            this.add.tween(this.ui.logo).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
            this.add.tween(this.ui.logo.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 200);
        } else {
            this.add.tween(this.ui.logo).from({ y: this.game.height * 0.5 }, 500, Phaser.Easing.Back.Out, true, 200);
        }
        
        this.add.tween(this.ui.buttonPlay).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonPlay.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 200);

        this.input.onDown.add(App.audioManager.init, App.audioManager);
        
        this.time.events.add(500, function() {
            this.inputEnable();
        }, this);
    },
    uiAnimateOut: function() {
        this.inputDisable();
        
        App.audioManager.play('out');
        
        this.add.tween(this.ui.buttonAudio).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.logo).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200); 
        
        this.time.events.add(900, function() {
            this.startGame();
        }, this);
    },
    
    inputDisable: function() {  
        this.ui.buttonAudio.inputEnabled = false;
        this.ui.buttonPlay.inputEnabled = false;
    },
    inputEnable: function() { 
        this.ui.buttonAudio.inputEnabled = true;
        this.ui.buttonAudio.input.useHandCursor = true;
        
        this.ui.buttonPlay.inputEnabled = true;
        this.ui.buttonPlay.input.useHandCursor = true;
    },
    
    buttonAudio: function() {
        App.audioManager.play('click');
        
        App.audioManager.toogleAudio();
        this.ui.buttonAudio.setFrames(
            'button/audio/small/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/small/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/small/' + (App.audioManager.buttonOffset + 1), 
            'button/audio/small/' + (App.audioManager.buttonOffset + 0)
        );
    },
    buttonPlay: function() {
        App.audioManager.play('click');
        
        this.uiAnimateOut();
    },
    
    startGame: function() {
        this.state.start('game', true, false, { level: this.currentLevel });  
    }
};

App.state.game = function() {};
App.state.game.prototype = {
    init: function(data) {
        this.levelInit(data);  
    },
    preload: function() {
        this.orientation = { landscape: 0, portrait: 1 };
        this.direction = { right: 0, left: 1, down: 2, up: 3, none: 4 };
        
        this.inputEnabled = false;
        this.levelCompleted = false;
    },
    create: function() {
        this.uiInit();
    },
    
    uiInit: function() {
        this.ui = {
            scale: null,
            orientation: null,
            group: {
                name: this.add.group()   
            }
        };
        
        this.ui.grid = this.gridInit();
        
        this.ui.canvas = this.canvasInit();
        this.canvasDraw();
        
        this.ui.buttonHome = this.add.button(0, 0, 'atlas', this.buttonHome, this, 'button/home/0', 'button/home/0', 'button/home/1', 'button/home/0');
        
        this.ui.buttonAudio = this.add.button(0, 0, 'atlas', this.buttonAudio, this);
        this.ui.buttonAudio.setFrames(
            'button/audio/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/' + (App.audioManager.buttonOffset + 1), 
            'button/audio/' + (App.audioManager.buttonOffset + 0)
        );
        
        this.ui.buttonUndo = this.add.button(0, 0, 'atlas', this.buttonUndo, this);
        this.buttonUndoSetFrames();
        
        this.ui.buttonHint = this.add.button(0, 0, 'atlas', this.buttonHint, this);
        this.buttonHintSetFrames();
        
        this.ui.buttonContinue = this.add.button(0, 0, 'atlas', this.buttonContinue, this, 'button/continue/0', 'button/continue/0', 'button/continue/1', 'button/continue/0');
        this.ui.buttonContinue.anchor.setTo(0.5, 0);
        this.ui.buttonContinue.alpha = 0;
        this.ui.buttonContinue.inputEnabled = false;
        this.ui.buttonContinue.data.tween = null;
        
        this.tutorialInit();
        
        this.scale.setResizeCallback(this.uiResizeCallback, this);
        this.scale.onSizeChange.add(this.uiResize, this);

        this.uiResize(); 
        this.uiAnimateIn();
    },
    uiResizeCallback: function() {
        var viewScale = App.getViewScale();
        
        this.scale.setGameSize(window.innerWidth * viewScale, window.innerHeight * viewScale);
        this.scale.getParentBounds(this.scale._parentBounds);

        this.uiResize();
    },
    uiResize: function() {
        this.ui.orientation = (this.game.width / this.game.height > App.config.ratio.orientationChange) ? this.orientation.landscape : this.orientation.portrait;
        
        if (this.ui.orientation === this.orientation.landscape) {
            this.ui.scale = Math.min(this.game.width / App.config.landscape.width, this.game.height / App.config.landscape.height); 
            
            var buttonSpace = ((this.game.width - (App.config.size.grid * this.ui.scale)) * 0.5) - this.uiByScale(App.config.size.margin * 2);
            var buttonScale = Math.min(1, buttonSpace / App.config.size.button);
            var levelCompletedScale = (this.levelCompleted === true) ? App.config.ratio.levelCompletedScale.landscape : 1;
            
            this.ui.grid.position.setTo(this.game.width * 0.5, this.uiByScale(App.config.size.margin));
            this.ui.grid.scale.setTo(this.ui.scale * levelCompletedScale);
            
            this.ui.canvas.scale.setTo(this.ui.scale * levelCompletedScale);
            this.ui.canvas.position.setTo(this.game.width * 0.5, this.uiByScale(App.config.size.margin));
            
            this.ui.buttonHome.scale.setTo(buttonScale);
            this.ui.buttonHome.position.setTo(this.uiByScale(App.config.size.margin), this.game.height - this.uiByScale(App.config.size.margin));
            this.ui.buttonHome.anchor.setTo(0, 1);
            
            this.ui.buttonAudio.scale.setTo(buttonScale);
            this.ui.buttonAudio.position.setTo(this.uiByScale(App.config.size.margin), this.game.height - this.uiByScale(App.config.size.margin * 2) - App.config.size.button * buttonScale);
            this.ui.buttonAudio.anchor.setTo(0, 1);
            
            this.ui.buttonHint.scale.setTo(buttonScale);
            this.ui.buttonHint.position.setTo(this.game.width - this.uiByScale(App.config.size.margin), this.game.height - this.uiByScale(App.config.size.margin));
            this.ui.buttonHint.anchor.setTo(1, 1);
            
            this.ui.buttonUndo.scale.setTo(buttonScale);
            this.ui.buttonUndo.position.setTo(this.game.width - this.uiByScale(App.config.size.margin), this.game.height - this.uiByScale(App.config.size.margin * 2) - App.config.size.button * buttonScale);
            this.ui.buttonUndo.anchor.setTo(1, 1);
            
            this.ui.buttonContinue.scale.setTo(buttonScale);
            this.ui.buttonContinue.position.setTo(this.game.width * 0.5, this.uiByScale(App.config.size.margin * 4) + (App.config.size.grid * this.ui.scale * App.config.ratio.levelCompletedScale.landscape));
        } else {
            this.ui.scale = Math.min(this.game.width / App.config.portrait.width, this.game.height / App.config.portrait.height); 
            
            var gridScale = this.ui.scale * App.config.ratio.gridPortraitScale;
            var buttonSpace = this.game.height - (App.config.size.grid * gridScale) - this.uiByScale(App.config.size.margin * 3);
            var buttonScale = Math.min(1, buttonSpace / App.config.size.button);
            var buttonMargin = (this.game.width - (App.config.size.grid * gridScale)) * 0.5;
            var gridMarginY = (this.game.height - (App.config.size.button * buttonScale) - this.uiByScale(App.config.size.margin) - (App.config.size.grid * gridScale)) * 0.5;
            var levelCompletedScale = (this.levelCompleted === true) ? App.config.ratio.levelCompletedScale.portrait : 1;
            
            this.ui.grid.scale.setTo(gridScale * levelCompletedScale);
            this.ui.grid.position.setTo(this.game.width * 0.5, gridMarginY);
            
            this.ui.canvas.scale.setTo(gridScale * levelCompletedScale);
            this.ui.canvas.position.setTo(this.game.width * 0.5, gridMarginY);
            
            this.ui.buttonHome.scale.setTo(buttonScale);
            this.ui.buttonHome.position.setTo(buttonMargin, this.game.height - this.uiByScale(App.config.size.margin));
            this.ui.buttonHome.anchor.setTo(0, 1);
            
            this.ui.buttonAudio.scale.setTo(buttonScale);
            this.ui.buttonAudio.position.setTo(buttonMargin + App.config.size.button * buttonScale + this.uiByScale(App.config.size.margin), this.game.height - this.uiByScale(App.config.size.margin));
            this.ui.buttonAudio.anchor.setTo(0, 1);
            
            this.ui.buttonHint.scale.setTo(buttonScale);
            this.ui.buttonHint.position.setTo(this.game.width - buttonMargin, this.game.height - this.uiByScale(App.config.size.margin));
            this.ui.buttonHint.anchor.setTo(1, 1);
            
            this.ui.buttonUndo.scale.setTo(buttonScale);
            this.ui.buttonUndo.position.setTo(this.game.width - buttonMargin - App.config.size.button * buttonScale - this.uiByScale(App.config.size.margin), this.game.height - this.uiByScale(App.config.size.margin));
            this.ui.buttonUndo.anchor.setTo(1, 1);
            
            this.ui.buttonContinue.scale.setTo(buttonScale);
            this.ui.buttonContinue.position.setTo(this.game.width * 0.5, gridMarginY + (App.config.size.grid * gridScale));
        }
        
        this.tutorialRestart();
    },
    uiByScale: function(value) {
        return value * this.ui.scale;
    },
    uiAnimateIn: function() {
        this.inputDisable();
        
        App.audioManager.play('in');
        
        this.add.tween(this.ui.grid).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        
        this.add.tween(this.ui.canvas).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        
        this.add.tween(this.ui.buttonHome).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 300);
        this.add.tween(this.ui.buttonHome.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 300);
        
        this.add.tween(this.ui.buttonAudio).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonAudio.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 300);
        
        this.add.tween(this.ui.buttonHint).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonHint.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 300);
        
        this.add.tween(this.ui.buttonUndo).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonUndo.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 300);
       
        this.tutorialStart();
        
        this.time.events.add(500, function() {
            this.inputEnable(); 
        }, this);
    },
    uiAnimateHome: function() {
        this.inputDisable();
        
        App.audioManager.play('out');
        
        this.tutorialComplete();
        
        this.add.tween(this.ui.buttonHome).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonAudio).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonHint).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonUndo).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.grid).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.canvas).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        
        this.time.events.add(900, function() {
            this.gameBackToMenu();
        }, this);   
    },
    uiAnimateLevelCompleted: function() {
        this.inputDisable();
        
        this.tutorialComplete();
        
        this.routeAnimate();
        
        this.time.events.add(200, function() {
            App.audioManager.play('complete');
        }, this);
        
        this.time.events.add(400, function() {
            this.hintHide();
        }, this);
        
        // buttons
        this.add.tween(this.ui.buttonHome).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true, 400);
        this.add.tween(this.ui.buttonAudio).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true, 400);
        this.add.tween(this.ui.buttonHint).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true, 400);
        this.add.tween(this.ui.buttonUndo).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true, 400);
        
        
        // grid and canvas
        var scaleTo = (this.ui.orientation === this.orientation.landscape) ? this.ui.scale * App.config.ratio.levelCompletedScale.landscape : this.ui.scale * App.config.ratio.gridPortraitScale * App.config.ratio.levelCompletedScale.portrait;

        var tween = this.add.tween(this.ui.grid.scale).to({ x: scaleTo, y: scaleTo }, 1000, Phaser.Easing.Cubic.Out, true, 700);
        tween.onComplete.add(function(sprite, tween) {
            this.ui.grid.scale.setTo((this.ui.orientation === this.orientation.landscape) ? this.ui.scale * App.config.ratio.levelCompletedScale.landscape : this.ui.scale * App.config.ratio.gridPortraitScale * App.config.ratio.levelCompletedScale.portrait);   
        }, this);
        
        var tween = this.add.tween(this.ui.canvas.scale).to({ x: scaleTo, y: scaleTo }, 1000, Phaser.Easing.Cubic.Out, true, 700);
        tween.onComplete.add(function(sprite, tween) {
            this.ui.canvas.scale.setTo((this.ui.orientation === this.orientation.landscape) ? this.ui.scale * App.config.ratio.levelCompletedScale.landscape : this.ui.scale * App.config.ratio.gridPortraitScale * App.config.ratio.levelCompletedScale.portrait);   
        }, this);
        
        
        // continue button
        this.add.tween(this.ui.buttonContinue).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 1200);
        var tween = this.add.tween(this.ui.buttonContinue.scale).to({ x: 1.05, y: 1.05 }, 250, Phaser.Easing.Quadratic.InOut, true, 1900 + this.route.length * 100).yoyo(true);   
        tween.onStart.add(function(sprite, tween) {   
            App.audioManager.play('continue');
        }, this);
        this.add.tween(this.ui.buttonContinue.scale).from({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.Out, true, 1200);
        
        
        this.time.events.add(1500, function() {
            this.ui.buttonContinue.inputEnabled = true;
            this.ui.buttonContinue.input.useHandCursor = true;
        }, this);
    },
    
    inputDisable: function() {
        this.inputEnabled = false;   
        
        this.ui.buttonHome.inputEnabled = false;
        this.ui.buttonAudio.inputEnabled = false;
        this.ui.buttonHint.inputEnabled = false;
        this.ui.buttonUndo.inputEnabled = false;
    },
    inputEnable: function() {
        this.inputEnabled = true;   
        
        this.ui.buttonHome.inputEnabled = true;
        this.ui.buttonHome.input.useHandCursor = true;
        
        this.ui.buttonAudio.inputEnabled = true;
        this.ui.buttonAudio.input.useHandCursor = true;
        
        this.ui.buttonHint.inputEnabled = true;
        this.ui.buttonHint.input.useHandCursor = true;
        
        this.ui.buttonUndo.inputEnabled = true;
        this.ui.buttonUndo.input.useHandCursor = true;
    },
    
    buttonHome: function() {
        App.audioManager.play('click');  
        
        this.uiAnimateHome();  
    },
    buttonAudio: function() {
        App.audioManager.play('click');  
        
        App.audioManager.toogleAudio();
        this.ui.buttonAudio.setFrames(
            'button/audio/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/' + (App.audioManager.buttonOffset + 0), 
            'button/audio/' + (App.audioManager.buttonOffset + 1), 
            'button/audio/' + (App.audioManager.buttonOffset + 0)
        );       
    },
    buttonUndo: function() {
        if (this.route.length <= 1) {
            return;
        }
        
        App.audioManager.play('click');  
        
        this.routeReset();
        this.canvasDraw();
        this.buttonUndoSetFrames();
    },
    buttonUndoSetFrames: function() {
        if (this.route.length > 1) {
            this.ui.buttonUndo.setFrames('button/undo/0', 'button/undo/0', 'button/undo/1', 'button/undo/0');    
        } else {
            this.ui.buttonUndo.setFrames('button/undo/2', 'button/undo/2', 'button/undo/2', 'button/undo/2');    
        }    
    },
    buttonHint: function() {
        if (this.hint.ready === false) {
            return;
        }
        
        App.audioManager.play('click');
        
        this.hintShow();
    },
    buttonHintSetFrames: function() {
        if (this.hint.ready === true) {
            this.ui.buttonHint.setFrames('button/hint/0', 'button/hint/0', 'button/hint/1', 'button/hint/0');    
        } else {
            this.ui.buttonHint.setFrames('button/hint/2', 'button/hint/2', 'button/hint/2', 'button/hint/2');    
        }    
    },
    buttonContinue: function() {
        App.audioManager.play('click');  
        App.audioManager.play('out');
                
        this.ui.buttonContinue.inputEnabled = false;
        
        this.add.tween(this.ui.grid).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
        this.add.tween(this.ui.canvas).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        this.add.tween(this.ui.buttonContinue).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 200);
        
        this.time.events.add(1200, function() {
            this.gamePlayNextLevel();
        }, this); 
    },
    
    levelInit: function(data) {
        this.level = this.levelSetLevelData(data.level);
        
        this.routeInit();
        this.hintInit();
    },  
    levelSetLevelData: function(id) {
        var id = id % App.level.length;
        var data = App.level[id];
        // console.log("level:"+App.level.length);
        var level = {};
        level.id = data.id;
        level.color = data.id % App.config.color.length;
        level.size = data.size;
        level.grid = this.levelMakeGrid(data.size, data.grid);
        level.route = this.levelMakeRoute(data.route);
        level.timer = (data.hasOwnProperty('timer')) ? data.timer : false;
        level.cursor = (data.hasOwnProperty('cursor')) ? data.cursor : false;
        
        return level;
    },
    levelGetMap: function() {
        var array = [];
        
        for (var y = 0; y < this.level.size; y++) {
            array[y] = [];
            for (var x = 0; x < this.level.size; x++) {
                array[y][x] = this.level.grid[y][x];
            }    
        } 
        
        for (var i = 0; i < this.route.length - 1; i++) {
            array[this.route[i][0]][this.route[i][1]] = 0;
        }
        
        return array;
    },
    levelMakeGrid: function(size, string) {
        var grid = [];
        
        for (var i = 0; i < string.length; i += size) {
            var array = [];
            
            for (var j = 0; j < size; j++) {
                array.push(parseInt(string.charAt(i+j)));    
            }
            
            grid.push(array)
        }
        
        return grid;
    },
    levelMakeRoute: function(string) {
        var route = [];
        
        for (var i = 0; i < string.length; i += 2) {
            route.push([parseInt(string.charAt(i)), parseInt(string.charAt(i+1))])
        }
        
        return route;
    },
    
    tutorialInit: function() {
        if (this.level.cursor !== false) {
            this.tutorialSetCursor(this.level.cursor);  
        } else {
            this.cursor = false;    
        }
    },
    tutorialSetCursor: function(type) {
        this.cursor = this.add.sprite(0, 0, 'atlas', 'hand/0');
        this.cursor.anchor.setTo(0.34, 0.24);
        this.cursor.data.type = type;    
        this.cursor.data.scale = (type === 'route') ? 1 : 0.8;
        this.cursor.data.completed = false;    
        this.cursor.data.tween = [];
    },
    tutorialResetCursor: function() {
        var position = (this.cursor.data.type === 'route') ? this.tutorialGetPositionByCoords(this.level.route[0]) : this.tutorialGetPositionByHint();
        
        this.cursor.x = position.x;
        this.cursor.y = position.y; 
        
        this.cursor.scale.setTo(this.ui.scale * this.cursor.data.scale);
        this.cursor.frameName = 'hand/0';
        this.cursor.alpha = 0;
    },
    tutorialGetPositionByCoords: function(coords) {
        var gridConfig = App.config.level[this.level.size];
        var scale = this.ui.scale * ((this.ui.orientation === this.orientation.landscape) ? 1 : App.config.ratio.gridPortraitScale);

        return {
            x: this.ui.canvas.left + (coords[1] * gridConfig.tile.size + gridConfig.tile.size * 0.5) * scale,
            y: this.ui.canvas.top + (coords[0] * gridConfig.tile.size + gridConfig.tile.size * 0.5) * scale
        };
    },
    tutorialGetPositionByHint: function() {
        return {
            x: this.ui.buttonHint.x - 200,
            y: this.ui.buttonHint.y - 250
        };    
    },
    tutorialAnimateCursor: function() {
        if (this.cursor.data.type === 'route') {
            
            // alpha in
            var tween = this.add.tween(this.cursor).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 1000);
            
            this.cursor.data.tween.push(tween);
            
            
            // scale down
            var tween = this.add.tween(this.cursor.scale).to({
                x: this.ui.scale * (this.cursor.data.scale - 0.2),
                y: this.ui.scale * (this.cursor.data.scale - 0.2)
            }, 400, Phaser.Easing.Quadratic.InOut, false, 500);
            
            tween.onComplete.add(function() {
                this.cursor.frameName = 'hand/1';        
            }, this);
            
            this.cursor.data.tween.push(tween);
            this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);
            
            
            // route
            for (var i = 1; i < this.level.route.length; i++) {
                var position = this.tutorialGetPositionByCoords(this.level.route[i]);
                
                var tween = this.add.tween(this.cursor).to({
                    x: position.x, 
                    y: position.y,
                }, 600, Phaser.Easing.Quadratic.InOut, false, 200);
                
                this.cursor.data.tween.push(tween);
                this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);                
            }
            
            
            // scale up + frame 0
            var tween = this.add.tween(this.cursor.scale).to({
                x: this.ui.scale * this.cursor.data.scale,
                y: this.ui.scale * this.cursor.data.scale
            }, 400, Phaser.Easing.Quadratic.InOut, false, 200);
            
            tween.onStart.add(function() {
                this.cursor.frameName = 'hand/0';        
            }, this);
            
            this.cursor.data.tween.push(tween);
            this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);
            
            
            // alpha out + restart
            var tween = this.add.tween(this.cursor).to({
                alpha: 0
            }, 500, Phaser.Easing.Linear.None, false, 200);
            
            tween.onComplete.add(function() {
                this.tutorialRestart();     
            }, this);
            
            this.cursor.data.tween.push(tween);
            this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);
            
        }
        
        if (this.cursor.data.type === 'hint') {
            
            // alpha in
            var tween = this.add.tween(this.cursor).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 1000);
            
            this.cursor.data.tween.push(tween);    
            
            
            // move over hint
            var tween = this.add.tween(this.cursor).to({
                x: this.ui.buttonHint.x - 50,
                y: this.ui.buttonHint.y - 50
            }, 1000, Phaser.Easing.Quadratic.InOut, false, 500);
            
            this.cursor.data.tween.push(tween);  
            this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);
            
            
            // scale down
            var tween = this.add.tween(this.cursor.scale).to({
                x: this.ui.scale * (this.cursor.data.scale - 0.1),
                y: this.ui.scale * (this.cursor.data.scale - 0.1)
            }, 300, Phaser.Easing.Quadratic.InOut, false, 250);

            tween.onComplete.add(function() {
                this.cursor.frameName = 'hand/2';  
                this.ui.buttonHint.setFrames('button/hint/1', 'button/hint/1', 'button/hint/1', 'button/hint/1');
            }, this);

            this.cursor.data.tween.push(tween);
            this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);


            // scale up
            var tween = this.add.tween(this.cursor.scale).to({
                x: this.ui.scale * this.cursor.data.scale,
                y: this.ui.scale * this.cursor.data.scale
            }, 300, Phaser.Easing.Quadratic.InOut, false, 250);

            tween.onStart.add(function() {
                this.cursor.frameName = 'hand/0';  
                this.ui.buttonHint.setFrames('button/hint/0', 'button/hint/0', 'button/hint/1', 'button/hint/0');
            }, this);

            this.cursor.data.tween.push(tween);
            this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);    
            
            
            // alpha out + restart
            var tween = this.add.tween(this.cursor).to({
                alpha: 0
            }, 500, Phaser.Easing.Linear.None, false, 200);
            
            tween.onComplete.add(function() {
                this.tutorialRestart();     
            }, this);
            
            this.cursor.data.tween.push(tween);
            this.cursor.data.tween[this.cursor.data.tween.length-2].chain(this.cursor.data.tween[this.cursor.data.tween.length-1]);
            
        }     
    },
    tutorialStart: function() {
        if (this.cursor === false) {
            return;
        }   
                
        this.tutorialResetCursor();
        this.tutorialAnimateCursor();
    },
    tutorialStop: function() {
        if (this.cursor === false) {
            return;
        } 
      
        for (var i = this.cursor.data.tween.length - 1; i >= 0; i--) {
            this.cursor.data.tween[i].stop();
            this.cursor.data.tween.pop();
        }
    },
    tutorialRestart: function() {
        if (this.cursor === false || this.cursor.data.completed === true) {
            return;
        } 
        
        this.tutorialStop();
        this.tutorialStart();
    },
    tutorialComplete: function() {
        if (this.cursor === false) {
            return;
        }  
        
        this.cursor.data.completed = true;
        
        this.tutorialStop();
        
        this.add.tween(this.cursor).to({
            alpha: 0
        }, 400, Phaser.Easing.Linear.None, true);
    },
    
    gridInit: function() {
        var gridConfig = App.config.level[this.level.size];
        
        var grid = this.add.group();
        grid.data = {
            tile: [],
            hover: [],
            sprite: this.gridMakeSprites()
        };
        
        for (var y = 0; y < this.level.size; y++) {
            grid.data.tile[y] = [];
            grid.data.hover[y] = [];
            
            for (var x = 0; x < this.level.size; x++) {
                if (this.level.grid[y][x] === 0) {
                    grid.data.tile[y][x] = false;
                    grid.data.hover[y][x] = false;
                    continue;
                }
                
                var position = {
                    x: x * gridConfig.tile.size + gridConfig.tile.padding + gridConfig.margin,
                    y: y * gridConfig.tile.size + gridConfig.tile.padding + gridConfig.margin
                };
                    
                var tile = this.add.tileSprite(position.x - App.config.size.grid * 0.5, position.y, gridConfig.inner.size, gridConfig.inner.size, grid.data.sprite[0]);
                tile.alpha = 0.1;
                tile.data.position = { x: x, y: y };
                tile.data.hint = false;
                tile.inputEnabled = true;
                tile.events.onInputDown.add(this.gridInputDown, this);
                tile.events.onInputOver.add(this.gridInputOver, this);
                
                grid.data.tile[y][x] = tile;
                grid.add(tile);  
                
                
                var hover = this.add.tileSprite(position.x - App.config.size.grid * 0.5 + gridConfig.inner.size * 0.5, position.y + gridConfig.inner.size * 0.5, gridConfig.inner.size, gridConfig.inner.size, grid.data.sprite[1]);
                hover.data.position = { x: x, y: y };
                hover.anchor.setTo(0.5);
                hover.scale.setTo(0.8);
                hover.alpha = 0;
                
                grid.data.hover[y][x] = hover;
                grid.add(hover); 
                              
            }    
        }
        
        return grid;
    },
    gridMakeSprites: function() {
        var array = [];
        
        var sprite = this.add.bitmapData(64, 64);
        sprite.rect(0, 0, 64, 64, '#000000');
        array.push(sprite);
        
        var sprite = this.add.bitmapData(64, 64);
        sprite.rect(0, 0, 64, 64, '#ffffff');
        array.push(sprite);
        
        return array;
    },
    gridGetDirection: function(from, to) {
        if (from[0] === to[0]) {
            if (from[1] < to[1]) {
                return this.direction.right;
            } else {
                return this.direction.left;
            }    
        } else {
            if (from[0] < to[0]) {
                return this.direction.down; 
            } else {
                return this.direction.up;
            }    
        }
    },
    gridInputDown: function(sprite, pointer) {
        if (this.inputEnabled === false) {
            return;
        }
        
        this.routeUpdate(sprite.data.position);
    },
    gridInputOver: function(sprite, pointer) {
        if (this.inputEnabled === false || pointer.isDown === false) {
            return;
        }   
        
        this.routeUpdate(sprite.data.position);
    },
    gridBlinkEmptyTiles: function() {
        if (this.level.id >= 4) {
            return;
        }
        
        var tiles = this.gridGetEmptyTiles();
        
        for (var i = 0; i < tiles.length; i++) {
            var sprite = this.ui.grid.data.hover[tiles[i][0]][tiles[i][1]];
            sprite.scale.setTo(0.8);
            sprite.alpha = 0;
            
            // scale
            this.add.tween(sprite.scale).to({
                x: 1.1, y: 1.1
            }, 400, Phaser.Easing.Linear.None, true, 250);
            
            // alpha
            var tween0 = this.add.tween(sprite).to({
                alpha: 0.2
            }, 200, Phaser.Easing.Linear.None, false, 250);
            
            var tween1 = this.add.tween(sprite).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, false);
            
            tween0.chain(tween1);
            tween0.start();    
        }
        
        this.time.events.add(250, function() {
            App.audioManager.play('route0');
        }, this);
    },    
    gridGetEmptyTiles: function() {
        var array = [];
        
        for (var y = 0; y < this.level.size; y++) {
            for (var x = 0; x < this.level.size; x++) {
                
                if (this.ui.grid.data.tile[y][x] === false) {
                    continue;
                }
                
                var position = [y, x];
                
                if (this.routeContains(position) === false) {
                    array.push(position);    
                }
                
            }
        }
        
        return array;   
    },
    
    canvasInit: function() {
        var bmd = this.add.bitmapData(App.config.size.grid, App.config.size.grid);
        
        var canvas = this.add.sprite(0, 0, bmd);
        canvas.anchor.setTo(0.5, 0);
        canvas.data.bmd = bmd;
        canvas.data.tile = this.tileInit();
        canvas.data.hint = this.tileInitHint();
        
        return canvas;
    },
    canvasDraw: function() {
        var gridConfig = App.config.level[this.level.size];
        
        this.ui.canvas.data.bmd.clear();
        
        // draw hints
        for (var i = 0; i < this.hint.length; i++) {
            var pos = this.level.route[i];
            
            if (this.ui.grid.data.tile[pos[0]][pos[1]].data.hint === false) {
                break;
            }   
            
            var from = (i > 0) ? this.gridGetDirection(this.level.route[i], this.level.route[i-1]) : this.direction.none;
            var to = (i < this.hint.length - 1 && this.ui.grid.data.tile[this.level.route[i+1][0]][this.level.route[i+1][1]].data.hint === true) ? this.gridGetDirection(this.level.route[i], this.level.route[i+1]) : this.direction.none;
            
            var frame = this.tileHintSelectFrame(from, to);
            var alpha = 0.15;
            
            this.ui.canvas.data.bmd.copy(
                this.ui.canvas.data.hint[frame], 
                null, null, null, null, 
                pos[1] * gridConfig.tile.size + gridConfig.margin, 
                pos[0] * gridConfig.tile.size + gridConfig.margin, 
                null, null, null, null, null, null, null, 
                alpha, 
                null, null);
        }
        
        // draw tiles
        for (var i = 0; i < this.route.length; i++) {
            var pos = this.route[i];
            
            var from = (i > 0) ? this.gridGetDirection(this.route[i], this.route[i-1]) : this.direction.none;
            var to = (i < this.route.length - 1) ? this.gridGetDirection(this.route[i], this.route[i+1]) : this.direction.none;
            
            var frame = this.tileSelectFrame(from, to);
            
            this.ui.canvas.data.bmd.draw(
                this.ui.canvas.data.tile[frame], 
                pos[1] * gridConfig.tile.size + gridConfig.margin, 
                pos[0] * gridConfig.tile.size + gridConfig.margin
            );    
        }  
    },
    
    tileInit: function() {
        var gridConfig = App.config.level[this.level.size];
        
        var color = App.config.color[this.level.color];
        var margin = gridConfig.block.margin;
        var padding = gridConfig.tile.padding;
        var tileSize = gridConfig.tile.size;
        var blockSize = gridConfig.block.size;
        var barSize = gridConfig.block.bar;
        var linewidth = gridConfig.line.width;
        
        var line = [];
        for (var i = 0; i < 5; i++) {
            var sprite = this.make.sprite(0, 0, 'atlas', 'line/' + this.level.size+ '/' + i);
            sprite.alpha = 0.8;
            
            line.push(sprite);
        }
        
        var array = [];
        
        // tile 0
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize, 
            blockSize, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            tileSize - (margin + padding + barSize), 
            blockSize, 
            barSize, 
            color[1]
        );
        line[0].anchor.setTo(0.5);
        line[0].angle = 0;
        tile.draw(line[0], tileSize * 0.5, tileSize * 0.5);
        array.push(tile);
        
        
        // tile 1
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            0, 
            padding + margin, 
            tileSize, 
            blockSize, 
            color[0]
        );
        tile.rect(
            0, 
            tileSize - (margin + padding + barSize), 
            tileSize, 
            barSize, 
            color[1]
        );
        line[1].anchor.setTo(0.5, 0);
        line[1].angle = 90;
        tile.draw(line[1], tileSize, tileSize * 0.5);
        array.push(tile);
        
        
        // tile 2
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            tileSize, 
            color[0]
        );
        line[1].anchor.setTo(0.5, 0.5);
        line[1].angle = 0;
        tile.draw(line[1], tileSize * 0.5, tileSize * 0.5);
        array.push(tile);
        
        
        // tile 3
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            blockSize + padding + margin, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            tileSize - (margin + padding + barSize), 
            blockSize, 
            barSize, 
            color[1]
        );
        line[2].anchor.setTo(0.5, 0);
        line[2].angle = 0;
        tile.draw(line[2], tileSize * 0.5, 0);
        array.push(tile);
        
        
        // tile 4
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            tileSize - (margin + padding + barSize), 
            blockSize + padding + margin, 
            barSize, 
            color[1]
        );
        line[2].anchor.setTo(0.5, 0);
        line[2].angle = 90;
        tile.draw(line[2], tileSize, tileSize * 0.5);
        array.push(tile);
        
        
        // tile 5
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize,
            blockSize + padding + margin, 
            color[0]
        );
        line[2].anchor.setTo(0.5, 0);
        line[2].angle = 180;
        tile.draw(line[2], tileSize * 0.5, tileSize);
        array.push(tile);
        
        
        // tile 6
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            0, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            0, 
            tileSize - (margin + padding + barSize), 
            blockSize + padding + margin, 
            barSize, 
            color[1]
        );
        line[2].anchor.setTo(0.5, 0);
        line[2].angle = 270;
        tile.draw(line[2], 0, tileSize * 0.5);
        array.push(tile);
        
        
        // tile 7
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            blockSize + padding + margin, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            tileSize - (margin + padding + barSize), 
            blockSize, 
            barSize, 
            color[1]
        );
        line[3].anchor.setTo(0.5, 0);
        line[3].angle = 0;
        tile.draw(line[3], tileSize * 0.5, 0);
        array.push(tile);
        
        
        // tile 8
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            tileSize - (margin + padding + barSize), 
            blockSize + padding + margin, 
            barSize, 
            color[1]
        );
        line[3].anchor.setTo(0.5, 0);
        line[3].angle = 90;
        tile.draw(line[3], tileSize, tileSize * 0.5);
        array.push(tile);
        
        
        // tile 9
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize,
            blockSize + padding + margin, 
            color[0]
        );
        line[3].anchor.setTo(0.5, 0);
        line[3].angle = 180;
        tile.draw(line[3], tileSize * 0.5, tileSize);
        array.push(tile);
        
        
        // tile 10
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            0, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            0, 
            tileSize - (margin + padding + barSize), 
            blockSize + padding + margin, 
            barSize, 
            color[1]
        );
        line[3].anchor.setTo(0.5, 0);
        line[3].angle = 270;
        tile.draw(line[3], 0, tileSize * 0.5);
        array.push(tile);
        
  
        // tile 11
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            blockSize + padding + margin, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            tileSize - (margin + padding + barSize), 
            blockSize + padding + margin, 
            barSize, 
            color[1]
        );
        line[4].anchor.setTo(1, 0);
        line[4].angle = 0;
        tile.draw(line[4], tileSize, 0);
        array.push(tile);
        
        
        // tile 12
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize,
            blockSize + padding + margin, 
            color[0]
        );
        tile.rect(
            padding + margin + blockSize, 
            tileSize - (margin + padding + barSize), 
            padding + margin, 
            barSize, 
            color[1]
        );
        line[4].anchor.setTo(1, 0);
        line[4].angle = 90;
        tile.draw(line[4], tileSize, tileSize);
        array.push(tile);
        
        
        // tile 13
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize,
            blockSize + padding + margin, 
            color[0]
        );
        tile.rect(
            0, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            0, 
            tileSize - (margin + padding + barSize), 
            padding + margin, 
            barSize, 
            color[1]
        );
        line[4].anchor.setTo(1, 0);
        line[4].angle = 180;
        tile.draw(line[4], 0, tileSize);
        array.push(tile);
        
        
        // tile 14
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            blockSize + padding + margin, 
            color[0]
        );
        tile.rect(
            0, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color[0]
        );
        tile.rect(
            0, 
            tileSize - (margin + padding + barSize), 
            blockSize + padding + margin, 
            barSize, 
            color[1]
        );
        line[4].anchor.setTo(1, 0);
        line[4].angle = 270;
        tile.draw(line[4], 0, 0);
        array.push(tile);
        
        
        return array;
    },
    tileSelectFrame: function(from, to) {
        
        if (from === this.direction.none) {
            
            if (to === this.direction.none) {
                return 0;    
            }
            
            if (to === this.direction.left) {
                return 6;     
            }
            
            if (to === this.direction.right) {
                return 4;     
            }
            
            if (to === this.direction.down) {
                return 5;     
            }
            
            if (to === this.direction.up) {
                return 3;     
            }
            
        }
        
        
        if (from === this.direction.left) {
            
            if (to === this.direction.none) {
                return 10;     
            }
            
            if (to === this.direction.left) {
                // not possible   
            }
            
            if (to === this.direction.right) {
                return 1;    
            }
            
            if (to === this.direction.down) {
                return 13;    
            }
            
            if (to === this.direction.up) {
                return 14;     
            }
            
        }
        
        
        if (from === this.direction.right) {
            
            if (to === this.direction.none) {
                return 8;      
            }
            
            if (to === this.direction.left) {
                return 1;      
            }
            
            if (to === this.direction.right) {
                // not possible      
            }
            
            if (to === this.direction.down) {
                return 12;      
            }
            
            if (to === this.direction.up) {
                return 11;      
            }
            
        }
        
        
        if (from === this.direction.up) {
            
            if (to === this.direction.none) {
                return 7;      
            }
            
            if (to === this.direction.left) {
                return 14;      
            }
            
            if (to === this.direction.right) {
                return 11;      
            }
            
            if (to === this.direction.down) {
                return 2;      
            }
            
            if (to === this.direction.up) {
                // not possible    
            }
            
        }
        
        
        if (from === this.direction.down) {
            
            if (to === this.direction.none) {
                return 9;      
            }
            
            if (to === this.direction.left) {
                return 13;      
            }
            
            if (to === this.direction.right) {
                return 12;      
            }
            
            if (to === this.direction.down) {
                // not possible     
            }
            
            if (to === this.direction.up) {
                return 2;      
            }
            
        }
        
    },
    tileInitHint: function() {
        var gridConfig = App.config.level[this.level.size];
        
        var color = '#ffffff';
        var margin = gridConfig.block.margin;
        var padding = gridConfig.tile.padding;
        var tileSize = gridConfig.tile.size;
        var blockSize = gridConfig.block.size;
        
        var array = [];
        
        // 0 - tile 1
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            0, 
            padding + margin, 
            tileSize, 
            blockSize, 
            color
        );
        array.push(tile);
        
        // 1 - tile 2
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            tileSize, 
            color
        );
        array.push(tile);  
        
        
        
        // 2 - tile 3
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            blockSize + padding + margin, 
            color
        );
        array.push(tile);
        
        // 3 - tile 4
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color
        );
        array.push(tile);
        
        // 4 - tile 5
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize,
            blockSize + padding + margin, 
            color
        );
        array.push(tile);
        
        // 5 - tile 6
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            0, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color
        );
        array.push(tile);
        
        
  
        // 6 - tile 11
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            blockSize + padding + margin, 
            color
        );
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color
        );
        array.push(tile);
        
        // 7 - tile 12
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color
        );
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize,
            blockSize + padding + margin, 
            color
        );
        array.push(tile);
        
        // 8 - tile 13
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            padding + margin, 
            blockSize,
            blockSize + padding + margin, 
            color
        );
        tile.rect(
            0, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color
        );
        array.push(tile);
        
        // 9 - tile 14
        var tile = this.add.bitmapData(tileSize, tileSize);
        tile.rect(
            padding + margin, 
            0, 
            blockSize, 
            blockSize + padding + margin, 
            color
        );
        tile.rect(
            0, 
            padding + margin, 
            blockSize + padding + margin, 
            blockSize, 
            color
        );
        array.push(tile);
        
        
        return array;
    },
    tileHintSelectFrame: function(from, to) {
        
        if (from === this.direction.none) {
            
            if (to === this.direction.none) {
                // not possible     
            }
            
            if (to === this.direction.left) {
                return 5;     
            }
            
            if (to === this.direction.right) {
                return 3;     
            }
            
            if (to === this.direction.down) {
                return 4;     
            }
            
            if (to === this.direction.up) {
                return 2;     
            }
            
        }
        
        
        if (from === this.direction.left) {
            
            if (to === this.direction.none) {
                return 5;     
            }
            
            if (to === this.direction.left) {
                // not possible   
            }
            
            if (to === this.direction.right) {
                return 0;    
            }
            
            if (to === this.direction.down) {
                return 8;    
            }
            
            if (to === this.direction.up) {
                return 9;     
            }
            
        }
        
        
        if (from === this.direction.right) {
            
            if (to === this.direction.none) {
                return 3;      
            }
            
            if (to === this.direction.left) {
                return 0;      
            }
            
            if (to === this.direction.right) {
                // not possible      
            }
            
            if (to === this.direction.down) {
                return 7;      
            }
            
            if (to === this.direction.up) {
                return 6;      
            }
            
        }
        
        
        if (from === this.direction.up) {
            
            if (to === this.direction.none) {
                return 2;      
            }
            
            if (to === this.direction.left) {
                return 9;      
            }
            
            if (to === this.direction.right) {
                return 6;      
            }
            
            if (to === this.direction.down) {
                return 1;      
            }
            
            if (to === this.direction.up) {
                // not possible    
            }
            
        }
        
        
        if (from === this.direction.down) {
            
            if (to === this.direction.none) {
                return 4;      
            }
            
            if (to === this.direction.left) {
                return 8;      
            }
            
            if (to === this.direction.right) {
                return 7;      
            }
            
            if (to === this.direction.down) {
                // not possible     
            }
            
            if (to === this.direction.up) {
                return 1;      
            }
            
        }
        
    },
    
    routeInit: function() {
        this.routeReset();
    },
    routeReset: function() {
        this.route = [];
        this.route.push(this.level.route[0]);
    },
    routeContains(position) {
        for (var i = 0; i < this.route.length; i++) {
            if (this.route[i][0] === position[0] && this.route[i][1] === position[1]) {
                return true;
            }
        }
        
        return false;
    },
    routeUpdate: function(coords) {
        var position = [coords.y, coords.x];
        
        if (this.route[this.route.length-1][0] === position[0] && 
            this.route[this.route.length-1][1] === position[1]) {
            return;
        }
        
        if (this.routeContains(position)) {
            this.routeClear(position);
        } else {
            this.routeAdd(position);
        }
        
        this.canvasDraw();
        this.buttonUndoSetFrames();
        this.gameCheckWin();
    },
    routeClear: function(position) {
         App.audioManager.play(['grid0', 'grid1', 'grid2', 'grid3', 'grid4']);
        
        for (var i = this.route.length - 1; i >= 0; i--) {
            if (position[1] === this.route[i][1] && position[0] === this.route[i][0]) {
                return;
            }
            
            this.route.pop();
        }
    },
    routeAdd: function(endPos) {
        var startPos = this.route[this.route.length - 1];
        
        var path = this.pathFind(this.levelGetMap(), startPos, endPos);
        
        if (path.length === 0) {
            return;
        }
        
        App.audioManager.play(['grid0', 'grid1', 'grid2', 'grid3', 'grid4']);
        
        for (var i = 0; i < path.length; i++) {
            this.route.push(path[i])
        }
    },
    routeAnimate: function() {        
        for (var i = 0; i < this.route.length; i++) {
            var pos = { x: this.route[i][1], y: this.route[i][0] };
            
            var sprite = this.ui.grid.data.hover[pos.y][pos.x];
            sprite.scale.setTo(0.8);
            sprite.alpha = 0;
            
            // scale
            this.add.tween(sprite.scale).to({
                x: 1.1, y: 1.1
            }, 400, Phaser.Easing.Linear.None, true, 1500 + i * 100);
            
            // alpha
            var tween0 = this.add.tween(sprite).to({
                alpha: 0.5
            }, 200, Phaser.Easing.Linear.None, false, 1500 + i * 100);
            
            tween0.onStart.add(function(sprite, tween) {
                App.audioManager.play(['route0', 'route1', 'route2', 'route3', 'route4']);
            }, this);
            
            var tween1 = this.add.tween(sprite).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, false);
            
            tween0.chain(tween1);
            tween0.start();
        }
    },
    
    hintInit: function() {
        this.hint = {
            length: 0,
            timer: 0,
            ready: false
        };
        
        this.hintSetTimer();
        this.hintStartTimer();
    },
    hintShow: function() {
        this.tutorialComplete();
        this.hintIncrease();        
        this.hintDisable();
        this.hintAnimate();
    },
    hintHide: function() {
        for (var y = 0; y < this.level.size; y++) {
            for (var x = 0; x < this.level.size; x++) {
                
                if (this.level.grid[y][x] === 0) {
                    continue;
                }
                
                this.ui.grid.data.tile[y][x].data.hint = false;    
            }
        }
        
        this.canvasDraw();
    },
    hintIncrease: function() {
        this.hint.length += App.config.hint.length[this.level.size-4];
        this.hint.length = Math.min(this.hint.length, this.level.route.length);    
    },
    hintAnimate: function() {    
        this.routeReset();
        this.canvasDraw();
        this.buttonUndoSetFrames();
        
        for (var i = 0; i < this.hint.length; i++) {
            var pos = { x: this.level.route[i][1], y: this.level.route[i][0] };
            
            var sprite = this.ui.grid.data.hover[pos.y][pos.x];
            sprite.scale.setTo(0.8);
            sprite.alpha = 0;     
            
            // scale
            this.add.tween(sprite.scale).to({
                x: 1.1, y: 1.1
            }, 400, Phaser.Easing.Linear.None, true, 250 + i * 100);
            
            // alpha
            var tween0 = this.add.tween(sprite).to({
                alpha: 0.25
            }, 200, Phaser.Easing.Linear.None, false, 250 + i * 100);
            
            tween0.onStart.add(function(sprite, tween) {
                App.audioManager.play(['route0', 'route1', 'route2', 'route3', 'route4']);
            }, this);
            
            tween0.onComplete.add(function(sprite, tween) {
                var pos = sprite.data.position;
                this.ui.grid.data.tile[pos.y][pos.x].data.hint = true;
                this.canvasDraw();
            }, this);
            
            var tween1 = this.add.tween(sprite).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, false);
            
            tween0.chain(tween1);
            tween0.start();
        }
    },
    hintSetTimer: function() {
        if (this.level.timer !== false) {
            this.hint.timer = this.level.timer;   
        } else {
            this.hint.timer = App.config.hint.timer;    
        }
    },
    hintStartTimer: function() {
        this.time.events.add(this.hint.timer * 1000, this.hintEnable, this);   
        this.hintResetTimer();
    },
    hintResetTimer: function() {
        this.hint.timer = App.config.hint.timer;    
    },
    hintEnable: function() {
        if (this.levelCompleted === true) {
            return;
        }
        
        this.hint.ready = true;
        this.buttonHintSetFrames();
    },
    hintDisable: function() {
        this.hint.ready = false;
        this.buttonHintSetFrames();   
        this.hintStartTimer();
    },
    
    pathFind: function(map, start, end) {
        var	mypathStart = this.pathNode(null, {x: start[0], y: start[1]});
        var mypathEnd = this.pathNode(null, {x: end[0], y: end[1]});  
        
        var aStar = new Array(this.level.size * this.level.size);
        var open = [mypathStart];
        var closed = [];
        var result = [];
        var myNeighbours;
        var myNode;
        var myPath;
        var length, max, min, i, j;
        
        while (length = open.length) {
            max = this.level.size * this.level.size;
            min = -1;
            
            for (i = 0; i < length; i++) {
                if(open[i].f < max) {
                    max = open[i].f;
                    min = i;
                }
            }
        
            myNode = open.splice(min, 1)[0];
            
            if (myNode.value === mypathEnd.value) {
                myPath = closed[closed.push(myNode) - 1];
                
                do {
                    result.push([myPath.x, myPath.y]);
                } while (myPath = myPath.parent);
                
                aStar = closed = open = [];
                
                result.pop();
                result.reverse();
            } else {
                myNeighbours = this.pathGetNeighbours(map, myNode.x, myNode.y);
                
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = this.pathNode(myNode, myNeighbours[i]);
                    
                    if (!aStar[myPath.value]) {
                        myPath.g = myNode.g + this.pathDistance(myNeighbours[i], myNode);
                        myPath.f = myPath.g + this.pathDistance(myNeighbours[i], mypathEnd);
                        
                        open.push(myPath);
                        aStar[myPath.value] = true;
                    }
                }
                
                closed.push(myNode);
            }
        }
    
        return result;
    },
    pathNode: function(parent, point) {
        var node = {
            parent: parent,
            value: point.x + (point.y * this.level.size),
            x: point.x,
            y: point.y,
            f: 0,
            g: 0
        };  
        
        return node;
    },
    pathDistance: function(point, goal) {
        return Math.abs(point.x - goal.x) + Math.abs(point.y - goal.y);    
    },
    pathGetNeighbours: function(map, x, y) {
        var	up = y - 1;
        var down = y + 1;
        var right = x + 1;
        var left = x - 1;

        var result = [];
        
        if (up > -1 && this.pathEmptySpace(map, x, up)) {
            result.push({x: x, y: up});    
        }

        if (down < this.level.size && this.pathEmptySpace(map, x, down)) {
            result.push({x: x, y: down});    
        }
        
        if (right < this.level.size && this.pathEmptySpace(map, right, y)) {
            result.push({x: right, y: y});    
        }
        
        if (left > -1 && this.pathEmptySpace(map, left, y)) {
            result.push({x: left, y: y});    
        }
        
        return result;    
    },
    pathEmptySpace: function(map, x, y) {
        return ((map[x] != null) && (map[x][y] != null) && (map[x][y] === 1));        
    },
    
    gameBackToMenu: function() {
        this.gameDestroyBitmaps();
        this.state.start('menu', true, false, { fromGame: true });     
    },
    gameCheckWin: function() { 
        if (this.route[this.route.length-1][0] !== this.level.route[this.level.route.length-1][0] || 
            this.route[this.route.length-1][1] !== this.level.route[this.level.route.length-1][1]) {
            return;
        }
        
        if (this.route.length === this.level.route.length) {
            this.gameFinishLevel();    
        } else {
            this.gridBlinkEmptyTiles(); 
        } 
    },
    gameFinishLevel: function() {
        this.levelCompleted = true;
        
        App.localStorage.set((this.level.id < App.level.length-1) ? this.level.id+1 : 0);
        
        // kongregate.stats.submit('completedLevels', (this.level.id+1));

        // gtag('event', 'levelCompleted', {
        //   'value': this.level.id,
        // });
        
        this.uiAnimateLevelCompleted();
    },
    gamePlayNextLevel: function() {
        if (this.level.id < App.level.length-1) {
            this.gameDestroyBitmaps();
            this.state.start('game', true, false, { level: this.level.id + 1});   
        } else {
            this.gameBackToMenu();            
        }  
    },
    gameDestroyBitmaps: function() {
        this.ui.canvas.data.bmd.destroy();
        
        for (var i = 0; i < this.ui.canvas.data.tile.length; i++) {
            this.ui.canvas.data.tile[i].destroy();    
        }
        
        for (var i = 0; i < this.ui.canvas.data.hint.length; i++) {
            this.ui.canvas.data.tile[i].destroy();    
        }
        
        for (var i = 0; i < this.ui.grid.data.sprite.length; i++) {
            this.ui.grid.data.sprite[i].destroy();
        }
    }
};