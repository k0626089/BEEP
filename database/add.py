head = '{\n  "songs" : {\n    '
tail = '  }\n}'

# artist, title, octave, note, sharp
def makeBlock(line, number) :
	s = line.split("-")
	
	artist = s[0]
	title = s[1]
	octave = s[2]
	note = s[3]
	sharp = s[4]
	
	if len(s) == 5 :
		return '"song-' + '{:07d}'.format(number) + '" : {\n      "artist" : "' + artist + '",\n      "note" : "' + note + '",\n      "octave" : "' + octave + '",\n      "sharp" : ' + sharp + ',\n      "title" : "' + title + '"\n    }'
	else :
		return False
	
#print(head + makeBlock("성시경,안녕 나의 사랑,2,라,1", 2) +"\n" + tail)

open('export.json', 'w').close()
lines = [line.rstrip('\n') for line in open('data.txt')]
export = open('export.json', 'w', newline='')
export.write(head)

for i in range(len(lines)) :
	if makeBlock(lines[i], i + 1) != False :
		head += makeBlock(lines[i], i + 1)
		export.write(makeBlock(lines[i], i + 1))

		if "Buzz" in lines[i]: 
			print(lines[i])
		
		if i + 1 < len(lines) :
			head += ',\n    '
			export.write(',\n    ')
		else :
			head += '\n'
			export.write('\n')
#	else :
#		print("syntax error: " + lines[i])
		
head += tail
export.write(tail)

#print(head)