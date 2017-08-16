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

function getBlocks() {
    "use strict";
    eraseBlocks();
    var i = 0, ref = firebase.database().ref('songs');
	
    ref.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var octave = childSnapshot.val().octave,
                note = childSnapshot.val().note,
                title = childSnapshot.val().title,
                artist = childSnapshot.val().artist,
                sharp = childSnapshot.val().sharp;
            
            if (i >= page_item) { 
				remove_image();
				more_button();
				return true;
			} else {
				addBlock(octave, note, title, artist, sharp);
            	i += 1;
			}
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
            
            var k_artist = artist.split("(")[0],
                e_artist = artist.split("(")[1];
                e_artist = artist.split(")")[0];

            var t = title.toUpperCase().replace(/\s|\.|,/g, ''),
                ka = k_artist.toUpperCase().replace(/\s/g, ''),
                ea = e_artist.toUpperCase().replace(/\s/g, ''),
                k = keyword.toUpperCase().replace(/\s/g, ''),
                o = octave.toString(),
                s1 = ka.concat(o, "옥", note, o, "옥타브", note),
                s2 = ea.concat(o, "옥", note, o, "옥타브", note),
                s3 = t.concat(o, "옥", note, o, "옥타브", note),
                s4 = ka.concat(t, o, "옥", note, o, "옥타브", note),
                s5 = ea.concat(t, o, "옥", note, o, "옥타브", note),
                s6 = t.concat(ka, o, "옥", note, o, "옥타브", note),
                s7 = t.concat(ea, o, "옥", note, o, "옥타브", note),
                s8 = o.concat("옥", note, ka, o, "옥타브", note, ka),
                s9 = o.concat("옥", note, ea, o, "옥타브", note, ea),
                s10 = o.concat("옥", note, t, o, "옥타브", note, t),
                s11 = o.concat("옥", note, ka, t, o, "옥타브", note, ka, t),
                s12 = o.concat("옥", note, ea, t, o, "옥타브", note, ea, t),
                s13 = o.concat("옥", note, t, ka, o, "옥타브", note, t, ka),
                s14 = o.concat("옥", note, t, ea, o, "옥타브", note, t, ea),
                s15 = o.concat("옥", ka, o, "옥타브", ka),
                s16 = o.concat("옥", ea, o, "옥타브", ea),
                s17 = o.concat("옥", t, o, "옥타브", t),
                s18 = o.concat("옥", ka, t, o, "옥타브", ka, t),
                s19 = o.concat("옥", ea, t, o, "옥타브", ea, t),
                s20 = o.concat("옥", t, ka, o, "옥타브", t, ka),
                s21 = o.concat("옥", t, ea, o, "옥타브", t, ea);
            
            if (i >= page_item) { 
//				more_button();
				return true;
			} else {
                if (s1.includes(k) || s2.includes(k)
                    || s3.includes(k) || s4.includes(k)
                    || s5.includes(k) || s6.includes(k)
                    || s7.includes(k) || s8.includes(k)
                    || s9.includes(k) || s10.includes(k)
                    || s11.includes(k) || s12.includes(k)
                    || s13.includes(k) || s14.includes(k)
                    || s15.includes(k) || s16.includes(k)
                    || s17.includes(k) || s18.includes(k)
                    || s19.includes(k) || s20.includes(k)
                    || s21.includes(k)) {
                    
                    addBlock(octave, note, title, artist, sharp);
//					firebase.database().ref().child('/songs/' + key + '/view_count').set(view + 1);
                    i += 1;
                } 
            }
        });
    });
}

function more_button() {
	var outer_div = document.createElement("div"),
		more = document.createElement("img");

	outer_div.className = "more-button";
	outer_div.setAttribute("id", "more-button");
	outer_div.setAttribute("onclick", "more()");
    
	more.setAttribute("alt", "Mountain View");
	more.setAttribute("style", "height: 10;");
	more.setAttribute("src", "assets/image/more4.png");

	outer_div.appendChild(more);
	document.getElementById("more").appendChild(outer_div);
}

function more() {
	"use strict";
	page_item += 10;
	eraseBlocks();
	searchBlocks();
}

function search() {
	"use strict";
	page_item = 15;
	eraseBlocks();
	searchBlocks();
}

function remove_image() {
	if(document.getElementById('loading').style.display != 'none') {
		document.getElementById('loading').style.display = 'none';
	}
}

function open_menu() {
    document.getElementById("side-menu").style.width = "250px";
}

function close_menu() {
    document.getElementById("side-menu").style.width = "0";
}