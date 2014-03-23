pictureDir = 'pixel/'
pictureSuffix = '.jpg'
urlPrefix = 'http://www.heise.de/artikel-archiv/ct/'

pictures = [
		id: 201319172
		name: 'Telefonbau'
	,
		id: 201320132
		name: 'Browser-Feuerwerk'
	,
		id: 201321108
		name: 'Soziales privatisieren'
	,
		id: 201326182
		name: 'HTML maßgeschneidert'
	,
		id: 201326186
		name: 'Rock\'n\'Scroll'
]

class Picture

	regex: ///
		(^\d{4})	# Jahr
		(\d{2})		# Ausgabe
		0*		# eventuell führende Null der Seitenzahl
		(\d{1,3}$)	# Seite
	///

	counterAdd: ->
		Picture.counter++

	constructor: (params) ->
		{@name, @id} = params
		@num = @counterAdd
		@pic = "#{pictureDir}#{@id}#{pictureSuffix}"
		match = "#{@id}".match @regex
		match = ('unbekannt' for [0..3]) unless match?
		@issue = "c't #{match[2]}/#{match[1]}, Seite #{match[3]}"
		@url = urlPrefix + match[1..3].join '/'


window.cs =

	pictures: []

	gallery: (picNum = 0) ->
		container = document.getElementById 'gallery'

		prev = if picNum < 1 then @pictures.length - 1 else picNum - 1
		next = if picNum + 1 >= @pictures.length then 0 else picNum + 1

		container.innerHTML = """
		<figcaption>
			<h3>Bild #{picNum + 1} von #{@pictures.length}:</h3>
			<h2>#{@pictures[picNum].name}</h2>
			<small>erschienen in: <a href='#{@pictures[picNum].url}'>#{@pictures[picNum].issue}</a></small>
		</figcaption>
		<div>
			<span onclick='window.cs.gallery(#{prev})' title='Bild #{prev + 1}'>Zurück</span>
			<img src='#{@pictures[picNum].pic}' alt=\"#{@pictures[picNum].name}\"/>
			<span onclick='window.cs.gallery(#{next})' title='Bild #{next + 1}'>Weiter</span>
		</div>
		"""

for pic in pictures
	window.cs.pictures.push(new Picture name: pic.name, id: pic.id)


window.cs?.gallery 0