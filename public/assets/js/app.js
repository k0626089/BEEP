// initial values
var page_item = 15, current_key = '';

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

//function format(str, max) {
//  	str = str.toString();
//  	return str.length < max ? pad("0" + str, max) : str;
//}

function getBlocks() {
    "use strict";
    var i = 0, ref = firebase.database().ref('songs');
    ref.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var octave = childSnapshot.val().octave,
                note = childSnapshot.val().note,
                title = childSnapshot.val().title,
                artist = childSnapshot.val().artist,
                sharp = childSnapshot.val().sharp;

            addBlock(octave, note, title, artist, sharp);
            i += 1;

            if (i >= page_item) { return true; }
        });
    });
}

function eraseBlocks() {
    "use strict";
    var blocklist = document.getElementById("blocklist");
    while (blocklist.firstChild) {
        blocklist.removeChild(blocklist.firstChild);
    }
}

function searchBlocks() {
    "use strict";
    eraseBlocks();
    
    var i = 0, ref = firebase.database().ref('songs'),
        keyword = document.getElementById('searchbar').value;
        
    ref.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key,
			
				octave = childSnapshot.val().octave,
                note = childSnapshot.val().note,
                title = childSnapshot.val().title,
                artist = childSnapshot.val().artist,
                sharp = childSnapshot.val().sharp,
				view = childSnapshot.val().view_count;

            var t = title.toUpperCase().replace(/\s/g, ''),
                a = artist.toUpperCase().replace(/\s/g, ''),
                k = keyword.toUpperCase().replace(/\s/g, ''),
                o = octave.toString(),
                s1 = a.concat(o, "옥", note, o, "옥타브", note),
                s2 = t.concat(o, "옥", note, o, "옥타브", note),
                s3 = a.concat(t, o, "옥", note, o, "옥타브", note),
                s4 = t.concat(a, o, "옥", note, o, "옥타브", note),
                s5 = o.concat("옥", note, a, o, "옥타브", note, a),
                s6 = o.concat("옥", note, t, o, "옥타브", note, t),
                s7 = o.concat("옥", note, a, t, o, "옥타브", note, a, t),
                s8 = o.concat("옥", note, t, a, o, "옥타브", note, t, a),
                s9 = o.concat("옥", a, o, "옥타브", a),
                s10 = o.concat("옥", t, o, "옥타브", t),
                s11 = o.concat("옥", a, t, o, "옥타브", a, t),
                s12 = o.concat("옥", t, a, o, "옥타브", t, a);
            
            if (i >= page_item) { return true; }
            else {
                if (s1.includes(k) || s2.includes(k)
                    || s3.includes(k) || s4.includes(k)
                    || s5.includes(k) || s6.includes(k)
                    || s7.includes(k) || s8.includes(k)
                    || s9.includes(k) || s10.includes(k)
                    || s11.includes(k) || s12.includes(k)) {
                    
                    addBlock(octave, note, title, artist, sharp);
//					firebase.database().ref().child('/songs/' + key + '/view_count').set(view + 1);
                    i += 1;
                } 
            }
        });
    });
}

function more() {
	"use strict";
	eraseBlocks();
	page_item += 10;
	searchBlocks();
}

//function upView_count() {
//    "use strict";
//    var i = 0, ref = firebase.database().ref('songs'),
//        keyword = document.getElementById('searchbar').value;
//        
//    ref.on('value', function (snapshot) {
//        snapshot.forEach(function (childSnapshot) {
//			var key = childSnapshot.key,
//				view = childSnapshot.val().view_count;
//
//			firebase.database().ref().child('/songs/' + key + '/view_count').set(view + 1);
//		});
//	} 
//}
