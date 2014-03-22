Bildergalerie
=============

Demo-Projekt für CoffeeScript
-----------------------------

*siehe [c't](http://ct.de/) 7/2014*

Erst mal ein paar Variablen zu Pfaden und Dateinamen:

	pictureDir = 'pixel/'
	pictureSuffix = '.jpg'
	urlPrefix = 'http://www.heise.de/artikel-archiv/ct/'

### Bilddatenbank

Die Bilddatenbank in einer Art JSON-Format:

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

### Klasse "Picture"

Die Klasse `Picture` bereitet die Informationen aus der Datenbank für die Ausgabe auf und gibt ein Objekt zurück, das nur noch in die HTML-Ausgabe eingesetzt werden muss:

	class Picture

Ein mehrzeiliger regulärer Ausdruck, der Jahr, Ausgabe und Seite aus der ID extrahiert:

		regex: ///
			(^\d{4})	# Jahr
			(\d{2})		# Ausgabe
			0*		# eventuell führende Null der Seitenzahl
			(\d{1,3}$)	# Seite
		///

Erhöht die laufende Nummer des aktuellen Bildes:

		counterAdd: ->
			Picture.counter++

Die automatisch aufgerufene `constructor`-Funktion nimmt ein Objekt mit Name und ID des Bildes entgegen und ermittelt die laufende Nummer, die Bild-URL, die Quellenangabe und die URL der Quelle.

		constructor: (params) ->
			{@name, @id} = params
			@num = @counterAdd
			@pic = "#{pictureDir}#{@id}#{pictureSuffix}"
			match = "#{@id}".match @regex
			match = ('unbekannt' for [0..3]) unless match?
			@issue = "c't #{match[2]}/#{match[1]}, Seite #{match[3]}"
			@url = urlPrefix + match[1..3].join '/'

### Ausgabefunktion und Bildobjekte

Das Array mit den erzeugten Bildobjekten und die `gallery`-Funktion stecken im `window`-Objekt, damit sie auch außerhalb des kompilierten Codeblocks zugänglich sind.

	window.cs =

Das noch leere pictures-Array:

		pictures: []

Die `gallery`-Funktion löst nach dem Laden und nach dem Klick auf die Vor- und Zurück-Pfeile aus. Per Default lädt sie das erste Bild des Arrays `window.cs.pictures`.

		gallery: (picNum = 0) ->
			container = document.getElementById 'gallery'

Ermittelt die Nummern der pictures, die nach Klick auf die Pfeile zu laden sind:

			prev = if picNum < 1 then @pictures.length - 1 else picNum - 1
			next = if picNum + 1 >= @pictures.length then 0 else picNum + 1

Der HTML-Block für die Ausgabe:

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

### Start der Galerie

Wandelt die einzelnen Datenbankeinträge aus `pictures` mit Hilfe der Klasse `Picture` in Bildobjekte um:

	for pic in pictures
		window.cs.pictures.push(new Picture name: pic.name, id: pic.id)

Startet die Ausgabe:

	window.cs?.gallery 0