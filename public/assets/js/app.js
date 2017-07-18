// var type: str, str, str, str, int
function addBlock(octave, note, title, artist, sharp) {
    "use strict";
    var outer_div = document.createElement("div"),
        octave_div = document.createElement("div"),
        main_div = document.createElement("div"),
        
        title_p = document.createElement("p"),
        artist_p = document.createElement("p"),
        sharp_p = document.createElement("p"),
        
        sharpnode = document.createTextNode("#"),
        octnode = document.createTextNode(note),
        titlenode = document.createTextNode(title),
        artistnode = document.createTextNode(artist),
        
        oct_class = "circle oct_".concat(octave),
        
        br = document.createElement("br");
    
    octave_div.appendChild(octnode);
    
    sharp_p.appendChild(sharpnode);
    title_p.appendChild(titlenode);
    artist_p.appendChild(artistnode);
    
    if (sharp) { octave_div.appendChild(sharp_p); }
    main_div.appendChild(title_p);
    main_div.appendChild(artist_p);
        
    octave_div.className = oct_class;
    sharp_p.className = "sharp";
    title_p.className = "title";
    artist_p.className = "artist";
    
    outer_div.appendChild(octave_div);
    outer_div.appendChild(main_div);
    outer_div.appendChild(br);
    document.getElementById("blocklist").appendChild(outer_div);
}

function getBlocks(count) {
    "use strict";
    var i = 0,
        ref = firebase.database().ref('songs');
    ref.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var octave = childSnapshot.val().octave,
                note = childSnapshot.val().note,
                title = childSnapshot.val().title,
                artist = childSnapshot.val().artist,
                sharp = childSnapshot.val().sharp;

            addBlock(octave, note, title, artist, sharp);
            i += 1;

            if (i >= count) { return true; }
        });
    });
}
/*
function getBlocks(count) {
    "use strict";
    var i = 0, BreakException = {},
        ref = firebase.database().ref('songs');
    ref.on('value', function (snapshot) {

        for (i = 0; i < 15; i = i + 1) {
            var octave = snapshot[i].val().octave,
                note = snapshot[i].val().note,
                title = snapshot[i].val().title,
                artist = snapshot[i].val().artist,
                sharp = snapshot[i].val().sharp;
            
            addBlock(octave, note, title, artist, sharp);
        }
        
    });
}
*/
function eraseBlocks() {
    "use strict";
    var blocklist = document.getElementById("blocklist");
    while (blocklist.firstChild) {
        blocklist.removeChild(blocklist.firstChild);
    }
}

function searchBlocks(count) {
    "use strict";
    eraseBlocks();
    
    var i = 0, ref = firebase.database().ref('songs'),
        keyword = document.getElementById('searchbar').value;
        
    ref.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var octave = childSnapshot.val().octave,
                note = childSnapshot.val().note,
                title = childSnapshot.val().title,
                artist = childSnapshot.val().artist,
                sharp = childSnapshot.val().sharp;

            var t = title.toUpperCase().replace(/\s/g, ''),
                a = artist.toUpperCase().replace(/\s/g, ''),
                k = keyword.toUpperCase().replace(/\s/g, ''),
                o = octave.toString(),
                on = a.concat(o, "옥", note, o, "옥타브", note);
            
            if (i >= count) { return true; }
            else {
                if (t.includes(k)) {
                    addBlock(octave, note, title, artist, sharp);
                } else if (on.includes(k)){
                    addBlock(octave, note, title, artist, sharp);
                }
            }
            i += 1;
        });
    });
}
