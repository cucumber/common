package gherkin

// Builtin dialects for af (Afrikaans), am (Armenian), an (Aragonese), ar (Arabic), ast (Asturian), az (Azerbaijani), bg (Bulgarian), bm (Malay), bs (Bosnian), ca (Catalan), cs (Czech), cy-GB (Welsh), da (Danish), de (German), el (Greek), em (Emoji), en (English), en-Scouse (Scouse), en-au (Australian), en-lol (LOLCAT), en-old (Old English), en-pirate (Pirate), eo (Esperanto), es (Spanish), et (Estonian), fa (Persian), fi (Finnish), fr (French), ga (Irish), gj (Gujarati), gl (Galician), he (Hebrew), hi (Hindi), hr (Croatian), ht (Creole), hu (Hungarian), id (Indonesian), is (Icelandic), it (Italian), ja (Japanese), jv (Javanese), ka (Georgian), kn (Kannada), ko (Korean), lt (Lithuanian), lu (Luxemburgish), lv (Latvian), mk-Cyrl (Macedonian), mk-Latn (Macedonian (Latin)), mn (Mongolian), nl (Dutch), no (Norwegian), pa (Panjabi), pl (Polish), pt (Portuguese), ro (Romanian), ru (Russian), sk (Slovak), sl (Slovenian), sr-Cyrl (Serbian), sr-Latn (Serbian (Latin)), sv (Swedish), ta (Tamil), th (Thai), tl (Telugu), tlh (Klingon), tr (Turkish), tt (Tatar), uk (Ukrainian), ur (Urdu), uz (Uzbek), vi (Vietnamese), zh-CN (Chinese simplified), zh-TW (Chinese traditional)
func GherkinDialectsBuildin() GherkinDialectProvider {
	return buildinDialects
}

const (
	feature         = "feature"
	rule            = "rule"
	background      = "background"
	scenario        = "scenario"
	scenarioOutline = "scenarioOutline"
	examples        = "examples"
	given           = "given"
	when            = "when"
	then            = "then"
	and             = "and"
	but             = "but"
)

var buildinDialects = gherkinDialectMap{
	"af": &GherkinDialect{
		"af", "Afrikaans", "Afrikaans", map[string][]string{
			feature: {
				"Funksie",
				"Besigheid Behoefte",
				"Vermoë",
			},
			rule: {
				"Rule",
			},
			background: {
				"Agtergrond",
			},
			scenario: {
				"Voorbeeld",
				"Situasie",
			},
			scenarioOutline: {
				"Situasie Uiteensetting",
			},
			examples: {
				"Voorbeelde",
			},
			given: {
				"* ",
				"Gegewe ",
			},
			when: {
				"* ",
				"Wanneer ",
			},
			then: {
				"* ",
				"Dan ",
			},
			and: {
				"* ",
				"En ",
			},
			but: {
				"* ",
				"Maar ",
			},
		},
	},
	"am": &GherkinDialect{
		"am", "Armenian", "հայերեն", map[string][]string{
			feature: {
				"Ֆունկցիոնալություն",
				"Հատկություն",
			},
			rule: {
				"Rule",
			},
			background: {
				"Կոնտեքստ",
			},
			scenario: {
				"Օրինակ",
				"Սցենար",
			},
			scenarioOutline: {
				"Սցենարի կառուցվացքը",
			},
			examples: {
				"Օրինակներ",
			},
			given: {
				"* ",
				"Դիցուք ",
			},
			when: {
				"* ",
				"Եթե ",
				"Երբ ",
			},
			then: {
				"* ",
				"Ապա ",
			},
			and: {
				"* ",
				"Եվ ",
			},
			but: {
				"* ",
				"Բայց ",
			},
		},
	},
	"an": &GherkinDialect{
		"an", "Aragonese", "Aragonés", map[string][]string{
			feature: {
				"Caracteristica",
			},
			rule: {
				"Rule",
			},
			background: {
				"Antecedents",
			},
			scenario: {
				"Eixemplo",
				"Caso",
			},
			scenarioOutline: {
				"Esquema del caso",
			},
			examples: {
				"Eixemplos",
			},
			given: {
				"* ",
				"Dau ",
				"Dada ",
				"Daus ",
				"Dadas ",
			},
			when: {
				"* ",
				"Cuan ",
			},
			then: {
				"* ",
				"Alavez ",
				"Allora ",
				"Antonces ",
			},
			and: {
				"* ",
				"Y ",
				"E ",
			},
			but: {
				"* ",
				"Pero ",
			},
		},
	},
	"ar": &GherkinDialect{
		"ar", "Arabic", "العربية", map[string][]string{
			feature: {
				"خاصية",
			},
			rule: {
				"Rule",
			},
			background: {
				"الخلفية",
			},
			scenario: {
				"مثال",
				"سيناريو",
			},
			scenarioOutline: {
				"سيناريو مخطط",
			},
			examples: {
				"امثلة",
			},
			given: {
				"* ",
				"بفرض ",
			},
			when: {
				"* ",
				"متى ",
				"عندما ",
			},
			then: {
				"* ",
				"اذاً ",
				"ثم ",
			},
			and: {
				"* ",
				"و ",
			},
			but: {
				"* ",
				"لكن ",
			},
		},
	},
	"ast": &GherkinDialect{
		"ast", "Asturian", "asturianu", map[string][]string{
			feature: {
				"Carauterística",
			},
			rule: {
				"Rule",
			},
			background: {
				"Antecedentes",
			},
			scenario: {
				"Exemplo",
				"Casu",
			},
			scenarioOutline: {
				"Esbozu del casu",
			},
			examples: {
				"Exemplos",
			},
			given: {
				"* ",
				"Dáu ",
				"Dada ",
				"Daos ",
				"Daes ",
			},
			when: {
				"* ",
				"Cuando ",
			},
			then: {
				"* ",
				"Entós ",
			},
			and: {
				"* ",
				"Y ",
				"Ya ",
			},
			but: {
				"* ",
				"Peru ",
			},
		},
	},
	"az": &GherkinDialect{
		"az", "Azerbaijani", "Azərbaycanca", map[string][]string{
			feature: {
				"Özəllik",
			},
			rule: {
				"Rule",
			},
			background: {
				"Keçmiş",
				"Kontekst",
			},
			scenario: {
				"Nümunələr",
				"Ssenari",
			},
			scenarioOutline: {
				"Ssenarinin strukturu",
			},
			examples: {
				"Nümunələr",
			},
			given: {
				"* ",
				"Tutaq ki ",
				"Verilir ",
			},
			when: {
				"* ",
				"Əgər ",
				"Nə vaxt ki ",
			},
			then: {
				"* ",
				"O halda ",
			},
			and: {
				"* ",
				"Və ",
				"Həm ",
			},
			but: {
				"* ",
				"Amma ",
				"Ancaq ",
			},
		},
	},
	"bg": &GherkinDialect{
		"bg", "Bulgarian", "български", map[string][]string{
			feature: {
				"Функционалност",
			},
			rule: {
				"Rule",
			},
			background: {
				"Предистория",
			},
			scenario: {
				"Пример",
				"Сценарий",
			},
			scenarioOutline: {
				"Рамка на сценарий",
			},
			examples: {
				"Примери",
			},
			given: {
				"* ",
				"Дадено ",
			},
			when: {
				"* ",
				"Когато ",
			},
			then: {
				"* ",
				"То ",
			},
			and: {
				"* ",
				"И ",
			},
			but: {
				"* ",
				"Но ",
			},
		},
	},
	"bm": &GherkinDialect{
		"bm", "Malay", "Bahasa Melayu", map[string][]string{
			feature: {
				"Fungsi",
			},
			rule: {
				"Rule",
			},
			background: {
				"Latar Belakang",
			},
			scenario: {
				"Senario",
				"Situasi",
				"Keadaan",
			},
			scenarioOutline: {
				"Kerangka Senario",
				"Kerangka Situasi",
				"Kerangka Keadaan",
				"Garis Panduan Senario",
			},
			examples: {
				"Contoh",
			},
			given: {
				"* ",
				"Diberi ",
				"Bagi ",
			},
			when: {
				"* ",
				"Apabila ",
			},
			then: {
				"* ",
				"Maka ",
				"Kemudian ",
			},
			and: {
				"* ",
				"Dan ",
			},
			but: {
				"* ",
				"Tetapi ",
				"Tapi ",
			},
		},
	},
	"bs": &GherkinDialect{
		"bs", "Bosnian", "Bosanski", map[string][]string{
			feature: {
				"Karakteristika",
			},
			rule: {
				"Rule",
			},
			background: {
				"Pozadina",
			},
			scenario: {
				"Primjer",
				"Scenariju",
				"Scenario",
			},
			scenarioOutline: {
				"Scenariju-obris",
				"Scenario-outline",
			},
			examples: {
				"Primjeri",
			},
			given: {
				"* ",
				"Dato ",
			},
			when: {
				"* ",
				"Kada ",
			},
			then: {
				"* ",
				"Zatim ",
			},
			and: {
				"* ",
				"I ",
				"A ",
			},
			but: {
				"* ",
				"Ali ",
			},
		},
	},
	"ca": &GherkinDialect{
		"ca", "Catalan", "català", map[string][]string{
			feature: {
				"Característica",
				"Funcionalitat",
			},
			rule: {
				"Rule",
			},
			background: {
				"Rerefons",
				"Antecedents",
			},
			scenario: {
				"Exemple",
				"Escenari",
			},
			scenarioOutline: {
				"Esquema de l'escenari",
			},
			examples: {
				"Exemples",
			},
			given: {
				"* ",
				"Donat ",
				"Donada ",
				"Atès ",
				"Atesa ",
			},
			when: {
				"* ",
				"Quan ",
			},
			then: {
				"* ",
				"Aleshores ",
				"Cal ",
			},
			and: {
				"* ",
				"I ",
			},
			but: {
				"* ",
				"Però ",
			},
		},
	},
	"cs": &GherkinDialect{
		"cs", "Czech", "Česky", map[string][]string{
			feature: {
				"Požadavek",
			},
			rule: {
				"Rule",
			},
			background: {
				"Pozadí",
				"Kontext",
			},
			scenario: {
				"Příklad",
				"Scénář",
			},
			scenarioOutline: {
				"Náčrt Scénáře",
				"Osnova scénáře",
			},
			examples: {
				"Příklady",
			},
			given: {
				"* ",
				"Pokud ",
				"Za předpokladu ",
			},
			when: {
				"* ",
				"Když ",
			},
			then: {
				"* ",
				"Pak ",
			},
			and: {
				"* ",
				"A také ",
				"A ",
			},
			but: {
				"* ",
				"Ale ",
			},
		},
	},
	"cy-GB": &GherkinDialect{
		"cy-GB", "Welsh", "Cymraeg", map[string][]string{
			feature: {
				"Arwedd",
			},
			rule: {
				"Rule",
			},
			background: {
				"Cefndir",
			},
			scenario: {
				"Enghraifft",
				"Scenario",
			},
			scenarioOutline: {
				"Scenario Amlinellol",
			},
			examples: {
				"Enghreifftiau",
			},
			given: {
				"* ",
				"Anrhegedig a ",
			},
			when: {
				"* ",
				"Pryd ",
			},
			then: {
				"* ",
				"Yna ",
			},
			and: {
				"* ",
				"A ",
			},
			but: {
				"* ",
				"Ond ",
			},
		},
	},
	"da": &GherkinDialect{
		"da", "Danish", "dansk", map[string][]string{
			feature: {
				"Egenskab",
			},
			rule: {
				"Rule",
			},
			background: {
				"Baggrund",
			},
			scenario: {
				"Eksempel",
				"Scenarie",
			},
			scenarioOutline: {
				"Abstrakt Scenario",
			},
			examples: {
				"Eksempler",
			},
			given: {
				"* ",
				"Givet ",
			},
			when: {
				"* ",
				"Når ",
			},
			then: {
				"* ",
				"Så ",
			},
			and: {
				"* ",
				"Og ",
			},
			but: {
				"* ",
				"Men ",
			},
		},
	},
	"de": &GherkinDialect{
		"de", "German", "Deutsch", map[string][]string{
			feature: {
				"Funktionalität",
			},
			rule: {
				"Rule",
			},
			background: {
				"Grundlage",
			},
			scenario: {
				"Beispiel",
				"Szenario",
			},
			scenarioOutline: {
				"Szenariogrundriss",
			},
			examples: {
				"Beispiele",
			},
			given: {
				"* ",
				"Angenommen ",
				"Gegeben sei ",
				"Gegeben seien ",
			},
			when: {
				"* ",
				"Wenn ",
			},
			then: {
				"* ",
				"Dann ",
			},
			and: {
				"* ",
				"Und ",
			},
			but: {
				"* ",
				"Aber ",
			},
		},
	},
	"el": &GherkinDialect{
		"el", "Greek", "Ελληνικά", map[string][]string{
			feature: {
				"Δυνατότητα",
				"Λειτουργία",
			},
			rule: {
				"Rule",
			},
			background: {
				"Υπόβαθρο",
			},
			scenario: {
				"Παράδειγμα",
				"Σενάριο",
			},
			scenarioOutline: {
				"Περιγραφή Σεναρίου",
				"Περίγραμμα Σεναρίου",
			},
			examples: {
				"Παραδείγματα",
				"Σενάρια",
			},
			given: {
				"* ",
				"Δεδομένου ",
			},
			when: {
				"* ",
				"Όταν ",
			},
			then: {
				"* ",
				"Τότε ",
			},
			and: {
				"* ",
				"Και ",
			},
			but: {
				"* ",
				"Αλλά ",
			},
		},
	},
	"em": &GherkinDialect{
		"em", "Emoji", "😀", map[string][]string{
			feature: {
				"📚",
			},
			rule: {
				"Rule",
			},
			background: {
				"💤",
			},
			scenario: {
				"🥒",
				"📕",
			},
			scenarioOutline: {
				"📖",
			},
			examples: {
				"📓",
			},
			given: {
				"* ",
				"😐",
			},
			when: {
				"* ",
				"🎬",
			},
			then: {
				"* ",
				"🙏",
			},
			and: {
				"* ",
				"😂",
			},
			but: {
				"* ",
				"😔",
			},
		},
	},
	"en": &GherkinDialect{
		"en", "English", "English", map[string][]string{
			feature: {
				"Feature",
				"Business Need",
				"Ability",
			},
			rule: {
				"Rule",
			},
			background: {
				"Background",
			},
			scenario: {
				"Example",
				"Scenario",
			},
			scenarioOutline: {
				"Scenario Outline",
				"Scenario Template",
			},
			examples: {
				"Examples",
				"Scenarios",
			},
			given: {
				"* ",
				"Given ",
			},
			when: {
				"* ",
				"When ",
			},
			then: {
				"* ",
				"Then ",
			},
			and: {
				"* ",
				"And ",
			},
			but: {
				"* ",
				"But ",
			},
		},
	},
	"en-Scouse": &GherkinDialect{
		"en-Scouse", "Scouse", "Scouse", map[string][]string{
			feature: {
				"Feature",
			},
			rule: {
				"Rule",
			},
			background: {
				"Dis is what went down",
			},
			scenario: {
				"The thing of it is",
			},
			scenarioOutline: {
				"Wharrimean is",
			},
			examples: {
				"Examples",
			},
			given: {
				"* ",
				"Givun ",
				"Youse know when youse got ",
			},
			when: {
				"* ",
				"Wun ",
				"Youse know like when ",
			},
			then: {
				"* ",
				"Dun ",
				"Den youse gotta ",
			},
			and: {
				"* ",
				"An ",
			},
			but: {
				"* ",
				"Buh ",
			},
		},
	},
	"en-au": &GherkinDialect{
		"en-au", "Australian", "Australian", map[string][]string{
			feature: {
				"Pretty much",
			},
			rule: {
				"Rule",
			},
			background: {
				"First off",
			},
			scenario: {
				"Awww, look mate",
			},
			scenarioOutline: {
				"Reckon it's like",
			},
			examples: {
				"You'll wanna",
			},
			given: {
				"* ",
				"Y'know ",
			},
			when: {
				"* ",
				"It's just unbelievable ",
			},
			then: {
				"* ",
				"But at the end of the day I reckon ",
			},
			and: {
				"* ",
				"Too right ",
			},
			but: {
				"* ",
				"Yeah nah ",
			},
		},
	},
	"en-lol": &GherkinDialect{
		"en-lol", "LOLCAT", "LOLCAT", map[string][]string{
			feature: {
				"OH HAI",
			},
			rule: {
				"Rule",
			},
			background: {
				"B4",
			},
			scenario: {
				"MISHUN",
			},
			scenarioOutline: {
				"MISHUN SRSLY",
			},
			examples: {
				"EXAMPLZ",
			},
			given: {
				"* ",
				"I CAN HAZ ",
			},
			when: {
				"* ",
				"WEN ",
			},
			then: {
				"* ",
				"DEN ",
			},
			and: {
				"* ",
				"AN ",
			},
			but: {
				"* ",
				"BUT ",
			},
		},
	},
	"en-old": &GherkinDialect{
		"en-old", "Old English", "Englisc", map[string][]string{
			feature: {
				"Hwaet",
				"Hwæt",
			},
			rule: {
				"Rule",
			},
			background: {
				"Aer",
				"Ær",
			},
			scenario: {
				"Swa",
			},
			scenarioOutline: {
				"Swa hwaer swa",
				"Swa hwær swa",
			},
			examples: {
				"Se the",
				"Se þe",
				"Se ðe",
			},
			given: {
				"* ",
				"Thurh ",
				"Þurh ",
				"Ðurh ",
			},
			when: {
				"* ",
				"Tha ",
				"Þa ",
				"Ða ",
			},
			then: {
				"* ",
				"Tha ",
				"Þa ",
				"Ða ",
				"Tha the ",
				"Þa þe ",
				"Ða ðe ",
			},
			and: {
				"* ",
				"Ond ",
				"7 ",
			},
			but: {
				"* ",
				"Ac ",
			},
		},
	},
	"en-pirate": &GherkinDialect{
		"en-pirate", "Pirate", "Pirate", map[string][]string{
			feature: {
				"Ahoy matey!",
			},
			rule: {
				"Rule",
			},
			background: {
				"Yo-ho-ho",
			},
			scenario: {
				"Heave to",
			},
			scenarioOutline: {
				"Shiver me timbers",
			},
			examples: {
				"Dead men tell no tales",
			},
			given: {
				"* ",
				"Gangway! ",
			},
			when: {
				"* ",
				"Blimey! ",
			},
			then: {
				"* ",
				"Let go and haul ",
			},
			and: {
				"* ",
				"Aye ",
			},
			but: {
				"* ",
				"Avast! ",
			},
		},
	},
	"eo": &GherkinDialect{
		"eo", "Esperanto", "Esperanto", map[string][]string{
			feature: {
				"Trajto",
			},
			rule: {
				"Rule",
			},
			background: {
				"Fono",
			},
			scenario: {
				"Ekzemplo",
				"Scenaro",
				"Kazo",
			},
			scenarioOutline: {
				"Konturo de la scenaro",
				"Skizo",
				"Kazo-skizo",
			},
			examples: {
				"Ekzemploj",
			},
			given: {
				"* ",
				"Donitaĵo ",
				"Komence ",
			},
			when: {
				"* ",
				"Se ",
			},
			then: {
				"* ",
				"Do ",
			},
			and: {
				"* ",
				"Kaj ",
			},
			but: {
				"* ",
				"Sed ",
			},
		},
	},
	"es": &GherkinDialect{
		"es", "Spanish", "español", map[string][]string{
			feature: {
				"Característica",
			},
			rule: {
				"Rule",
			},
			background: {
				"Antecedentes",
			},
			scenario: {
				"Ejemplo",
				"Escenario",
			},
			scenarioOutline: {
				"Esquema del escenario",
			},
			examples: {
				"Ejemplos",
			},
			given: {
				"* ",
				"Dado ",
				"Dada ",
				"Dados ",
				"Dadas ",
			},
			when: {
				"* ",
				"Cuando ",
			},
			then: {
				"* ",
				"Entonces ",
			},
			and: {
				"* ",
				"Y ",
				"E ",
			},
			but: {
				"* ",
				"Pero ",
			},
		},
	},
	"et": &GherkinDialect{
		"et", "Estonian", "eesti keel", map[string][]string{
			feature: {
				"Omadus",
			},
			rule: {
				"Rule",
			},
			background: {
				"Taust",
			},
			scenario: {
				"Juhtum",
				"Stsenaarium",
			},
			scenarioOutline: {
				"Raamstjuhtum",
				"Raamstsenaarium",
			},
			examples: {
				"Juhtumid",
			},
			given: {
				"* ",
				"Eeldades ",
			},
			when: {
				"* ",
				"Kui ",
			},
			then: {
				"* ",
				"Siis ",
			},
			and: {
				"* ",
				"Ja ",
			},
			but: {
				"* ",
				"Kuid ",
			},
		},
	},
	"fa": &GherkinDialect{
		"fa", "Persian", "فارسی", map[string][]string{
			feature: {
				"وِیژگی",
			},
			rule: {
				"Rule",
			},
			background: {
				"زمینه",
			},
			scenario: {
				"مثال",
				"سناریو",
			},
			scenarioOutline: {
				"الگوی سناریو",
			},
			examples: {
				"نمونه ها",
			},
			given: {
				"* ",
				"با فرض ",
			},
			when: {
				"* ",
				"هنگامی ",
			},
			then: {
				"* ",
				"آنگاه ",
			},
			and: {
				"* ",
				"و ",
			},
			but: {
				"* ",
				"اما ",
			},
		},
	},
	"fi": &GherkinDialect{
		"fi", "Finnish", "suomi", map[string][]string{
			feature: {
				"Ominaisuus",
			},
			rule: {
				"Rule",
			},
			background: {
				"Tausta",
			},
			scenario: {
				"Tapaus",
			},
			scenarioOutline: {
				"Tapausaihio",
			},
			examples: {
				"Tapaukset",
			},
			given: {
				"* ",
				"Oletetaan ",
			},
			when: {
				"* ",
				"Kun ",
			},
			then: {
				"* ",
				"Niin ",
			},
			and: {
				"* ",
				"Ja ",
			},
			but: {
				"* ",
				"Mutta ",
			},
		},
	},
	"fr": &GherkinDialect{
		"fr", "French", "français", map[string][]string{
			feature: {
				"Fonctionnalité",
			},
			rule: {
				"Règle",
			},
			background: {
				"Contexte",
			},
			scenario: {
				"Exemple",
				"Scénario",
			},
			scenarioOutline: {
				"Plan du scénario",
				"Plan du Scénario",
			},
			examples: {
				"Exemples",
			},
			given: {
				"* ",
				"Soit ",
				"Etant donné que ",
				"Etant donné qu'",
				"Etant donné ",
				"Etant donnée ",
				"Etant donnés ",
				"Etant données ",
				"Étant donné que ",
				"Étant donné qu'",
				"Étant donné ",
				"Étant donnée ",
				"Étant donnés ",
				"Étant données ",
			},
			when: {
				"* ",
				"Quand ",
				"Lorsque ",
				"Lorsqu'",
			},
			then: {
				"* ",
				"Alors ",
			},
			and: {
				"* ",
				"Et que ",
				"Et qu'",
				"Et ",
			},
			but: {
				"* ",
				"Mais que ",
				"Mais qu'",
				"Mais ",
			},
		},
	},
	"ga": &GherkinDialect{
		"ga", "Irish", "Gaeilge", map[string][]string{
			feature: {
				"Gné",
			},
			rule: {
				"Rule",
			},
			background: {
				"Cúlra",
			},
			scenario: {
				"Sampla",
				"Cás",
			},
			scenarioOutline: {
				"Cás Achomair",
			},
			examples: {
				"Samplaí",
			},
			given: {
				"* ",
				"Cuir i gcás go",
				"Cuir i gcás nach",
				"Cuir i gcás gur",
				"Cuir i gcás nár",
			},
			when: {
				"* ",
				"Nuair a",
				"Nuair nach",
				"Nuair ba",
				"Nuair nár",
			},
			then: {
				"* ",
				"Ansin",
			},
			and: {
				"* ",
				"Agus",
			},
			but: {
				"* ",
				"Ach",
			},
		},
	},
	"gj": &GherkinDialect{
		"gj", "Gujarati", "ગુજરાતી", map[string][]string{
			feature: {
				"લક્ષણ",
				"વ્યાપાર જરૂર",
				"ક્ષમતા",
			},
			rule: {
				"Rule",
			},
			background: {
				"બેકગ્રાઉન્ડ",
			},
			scenario: {
				"ઉદાહરણ",
				"સ્થિતિ",
			},
			scenarioOutline: {
				"પરિદ્દશ્ય રૂપરેખા",
				"પરિદ્દશ્ય ઢાંચો",
			},
			examples: {
				"ઉદાહરણો",
			},
			given: {
				"* ",
				"આપેલ છે ",
			},
			when: {
				"* ",
				"ક્યારે ",
			},
			then: {
				"* ",
				"પછી ",
			},
			and: {
				"* ",
				"અને ",
			},
			but: {
				"* ",
				"પણ ",
			},
		},
	},
	"gl": &GherkinDialect{
		"gl", "Galician", "galego", map[string][]string{
			feature: {
				"Característica",
			},
			rule: {
				"Rule",
			},
			background: {
				"Contexto",
			},
			scenario: {
				"Exemplo",
				"Escenario",
			},
			scenarioOutline: {
				"Esbozo do escenario",
			},
			examples: {
				"Exemplos",
			},
			given: {
				"* ",
				"Dado ",
				"Dada ",
				"Dados ",
				"Dadas ",
			},
			when: {
				"* ",
				"Cando ",
			},
			then: {
				"* ",
				"Entón ",
				"Logo ",
			},
			and: {
				"* ",
				"E ",
			},
			but: {
				"* ",
				"Mais ",
				"Pero ",
			},
		},
	},
	"he": &GherkinDialect{
		"he", "Hebrew", "עברית", map[string][]string{
			feature: {
				"תכונה",
			},
			rule: {
				"Rule",
			},
			background: {
				"רקע",
			},
			scenario: {
				"דוגמא",
				"תרחיש",
			},
			scenarioOutline: {
				"תבנית תרחיש",
			},
			examples: {
				"דוגמאות",
			},
			given: {
				"* ",
				"בהינתן ",
			},
			when: {
				"* ",
				"כאשר ",
			},
			then: {
				"* ",
				"אז ",
				"אזי ",
			},
			and: {
				"* ",
				"וגם ",
			},
			but: {
				"* ",
				"אבל ",
			},
		},
	},
	"hi": &GherkinDialect{
		"hi", "Hindi", "हिंदी", map[string][]string{
			feature: {
				"रूप लेख",
			},
			rule: {
				"Rule",
			},
			background: {
				"पृष्ठभूमि",
			},
			scenario: {
				"परिदृश्य",
			},
			scenarioOutline: {
				"परिदृश्य रूपरेखा",
			},
			examples: {
				"उदाहरण",
			},
			given: {
				"* ",
				"अगर ",
				"यदि ",
				"चूंकि ",
			},
			when: {
				"* ",
				"जब ",
				"कदा ",
			},
			then: {
				"* ",
				"तब ",
				"तदा ",
			},
			and: {
				"* ",
				"और ",
				"तथा ",
			},
			but: {
				"* ",
				"पर ",
				"परन्तु ",
				"किन्तु ",
			},
		},
	},
	"hr": &GherkinDialect{
		"hr", "Croatian", "hrvatski", map[string][]string{
			feature: {
				"Osobina",
				"Mogućnost",
				"Mogucnost",
			},
			rule: {
				"Rule",
			},
			background: {
				"Pozadina",
			},
			scenario: {
				"Primjer",
				"Scenarij",
			},
			scenarioOutline: {
				"Skica",
				"Koncept",
			},
			examples: {
				"Primjeri",
				"Scenariji",
			},
			given: {
				"* ",
				"Zadan ",
				"Zadani ",
				"Zadano ",
			},
			when: {
				"* ",
				"Kada ",
				"Kad ",
			},
			then: {
				"* ",
				"Onda ",
			},
			and: {
				"* ",
				"I ",
			},
			but: {
				"* ",
				"Ali ",
			},
		},
	},
	"ht": &GherkinDialect{
		"ht", "Creole", "kreyòl", map[string][]string{
			feature: {
				"Karakteristik",
				"Mak",
				"Fonksyonalite",
			},
			rule: {
				"Rule",
			},
			background: {
				"Kontèks",
				"Istorik",
			},
			scenario: {
				"Senaryo",
			},
			scenarioOutline: {
				"Plan senaryo",
				"Plan Senaryo",
				"Senaryo deskripsyon",
				"Senaryo Deskripsyon",
				"Dyagram senaryo",
				"Dyagram Senaryo",
			},
			examples: {
				"Egzanp",
			},
			given: {
				"* ",
				"Sipoze ",
				"Sipoze ke ",
				"Sipoze Ke ",
			},
			when: {
				"* ",
				"Lè ",
				"Le ",
			},
			then: {
				"* ",
				"Lè sa a ",
				"Le sa a ",
			},
			and: {
				"* ",
				"Ak ",
				"Epi ",
				"E ",
			},
			but: {
				"* ",
				"Men ",
			},
		},
	},
	"hu": &GherkinDialect{
		"hu", "Hungarian", "magyar", map[string][]string{
			feature: {
				"Jellemző",
			},
			rule: {
				"Rule",
			},
			background: {
				"Háttér",
			},
			scenario: {
				"Példa",
				"Forgatókönyv",
			},
			scenarioOutline: {
				"Forgatókönyv vázlat",
			},
			examples: {
				"Példák",
			},
			given: {
				"* ",
				"Amennyiben ",
				"Adott ",
			},
			when: {
				"* ",
				"Majd ",
				"Ha ",
				"Amikor ",
			},
			then: {
				"* ",
				"Akkor ",
			},
			and: {
				"* ",
				"És ",
			},
			but: {
				"* ",
				"De ",
			},
		},
	},
	"id": &GherkinDialect{
		"id", "Indonesian", "Bahasa Indonesia", map[string][]string{
			feature: {
				"Fitur",
			},
			rule: {
				"Rule",
			},
			background: {
				"Dasar",
			},
			scenario: {
				"Skenario",
			},
			scenarioOutline: {
				"Skenario konsep",
			},
			examples: {
				"Contoh",
			},
			given: {
				"* ",
				"Dengan ",
			},
			when: {
				"* ",
				"Ketika ",
			},
			then: {
				"* ",
				"Maka ",
			},
			and: {
				"* ",
				"Dan ",
			},
			but: {
				"* ",
				"Tapi ",
			},
		},
	},
	"is": &GherkinDialect{
		"is", "Icelandic", "Íslenska", map[string][]string{
			feature: {
				"Eiginleiki",
			},
			rule: {
				"Rule",
			},
			background: {
				"Bakgrunnur",
			},
			scenario: {
				"Atburðarás",
			},
			scenarioOutline: {
				"Lýsing Atburðarásar",
				"Lýsing Dæma",
			},
			examples: {
				"Dæmi",
				"Atburðarásir",
			},
			given: {
				"* ",
				"Ef ",
			},
			when: {
				"* ",
				"Þegar ",
			},
			then: {
				"* ",
				"Þá ",
			},
			and: {
				"* ",
				"Og ",
			},
			but: {
				"* ",
				"En ",
			},
		},
	},
	"it": &GherkinDialect{
		"it", "Italian", "italiano", map[string][]string{
			feature: {
				"Funzionalità",
			},
			rule: {
				"Rule",
			},
			background: {
				"Contesto",
			},
			scenario: {
				"Esempio",
				"Scenario",
			},
			scenarioOutline: {
				"Schema dello scenario",
			},
			examples: {
				"Esempi",
			},
			given: {
				"* ",
				"Dato ",
				"Data ",
				"Dati ",
				"Date ",
			},
			when: {
				"* ",
				"Quando ",
			},
			then: {
				"* ",
				"Allora ",
			},
			and: {
				"* ",
				"E ",
			},
			but: {
				"* ",
				"Ma ",
			},
		},
	},
	"ja": &GherkinDialect{
		"ja", "Japanese", "日本語", map[string][]string{
			feature: {
				"フィーチャ",
				"機能",
			},
			rule: {
				"Rule",
			},
			background: {
				"背景",
			},
			scenario: {
				"シナリオ",
			},
			scenarioOutline: {
				"シナリオアウトライン",
				"シナリオテンプレート",
				"テンプレ",
				"シナリオテンプレ",
			},
			examples: {
				"例",
				"サンプル",
			},
			given: {
				"* ",
				"前提",
			},
			when: {
				"* ",
				"もし",
			},
			then: {
				"* ",
				"ならば",
			},
			and: {
				"* ",
				"かつ",
			},
			but: {
				"* ",
				"しかし",
				"但し",
				"ただし",
			},
		},
	},
	"jv": &GherkinDialect{
		"jv", "Javanese", "Basa Jawa", map[string][]string{
			feature: {
				"Fitur",
			},
			rule: {
				"Rule",
			},
			background: {
				"Dasar",
			},
			scenario: {
				"Skenario",
			},
			scenarioOutline: {
				"Konsep skenario",
			},
			examples: {
				"Conto",
				"Contone",
			},
			given: {
				"* ",
				"Nalika ",
				"Nalikaning ",
			},
			when: {
				"* ",
				"Manawa ",
				"Menawa ",
			},
			then: {
				"* ",
				"Njuk ",
				"Banjur ",
			},
			and: {
				"* ",
				"Lan ",
			},
			but: {
				"* ",
				"Tapi ",
				"Nanging ",
				"Ananging ",
			},
		},
	},
	"ka": &GherkinDialect{
		"ka", "Georgian", "ქართველი", map[string][]string{
			feature: {
				"თვისება",
			},
			rule: {
				"Rule",
			},
			background: {
				"კონტექსტი",
			},
			scenario: {
				"მაგალითად",
				"სცენარის",
			},
			scenarioOutline: {
				"სცენარის ნიმუში",
			},
			examples: {
				"მაგალითები",
			},
			given: {
				"* ",
				"მოცემული",
			},
			when: {
				"* ",
				"როდესაც",
			},
			then: {
				"* ",
				"მაშინ",
			},
			and: {
				"* ",
				"და",
			},
			but: {
				"* ",
				"მაგ­რამ",
			},
		},
	},
	"kn": &GherkinDialect{
		"kn", "Kannada", "ಕನ್ನಡ", map[string][]string{
			feature: {
				"ಹೆಚ್ಚಳ",
			},
			rule: {
				"Rule",
			},
			background: {
				"ಹಿನ್ನೆಲೆ",
			},
			scenario: {
				"ಉದಾಹರಣೆ",
				"ಕಥಾಸಾರಾಂಶ",
			},
			scenarioOutline: {
				"ವಿವರಣೆ",
			},
			examples: {
				"ಉದಾಹರಣೆಗಳು",
			},
			given: {
				"* ",
				"ನೀಡಿದ ",
			},
			when: {
				"* ",
				"ಸ್ಥಿತಿಯನ್ನು ",
			},
			then: {
				"* ",
				"ನಂತರ ",
			},
			and: {
				"* ",
				"ಮತ್ತು ",
			},
			but: {
				"* ",
				"ಆದರೆ ",
			},
		},
	},
	"ko": &GherkinDialect{
		"ko", "Korean", "한국어", map[string][]string{
			feature: {
				"기능",
			},
			rule: {
				"Rule",
			},
			background: {
				"배경",
			},
			scenario: {
				"시나리오",
			},
			scenarioOutline: {
				"시나리오 개요",
			},
			examples: {
				"예",
			},
			given: {
				"* ",
				"조건",
				"먼저",
			},
			when: {
				"* ",
				"만일",
				"만약",
			},
			then: {
				"* ",
				"그러면",
			},
			and: {
				"* ",
				"그리고",
			},
			but: {
				"* ",
				"하지만",
				"단",
			},
		},
	},
	"lt": &GherkinDialect{
		"lt", "Lithuanian", "lietuvių kalba", map[string][]string{
			feature: {
				"Savybė",
			},
			rule: {
				"Rule",
			},
			background: {
				"Kontekstas",
			},
			scenario: {
				"Pavyzdys",
				"Scenarijus",
			},
			scenarioOutline: {
				"Scenarijaus šablonas",
			},
			examples: {
				"Pavyzdžiai",
				"Scenarijai",
				"Variantai",
			},
			given: {
				"* ",
				"Duota ",
			},
			when: {
				"* ",
				"Kai ",
			},
			then: {
				"* ",
				"Tada ",
			},
			and: {
				"* ",
				"Ir ",
			},
			but: {
				"* ",
				"Bet ",
			},
		},
	},
	"lu": &GherkinDialect{
		"lu", "Luxemburgish", "Lëtzebuergesch", map[string][]string{
			feature: {
				"Funktionalitéit",
			},
			rule: {
				"Rule",
			},
			background: {
				"Hannergrond",
			},
			scenario: {
				"Beispill",
				"Szenario",
			},
			scenarioOutline: {
				"Plang vum Szenario",
			},
			examples: {
				"Beispiller",
			},
			given: {
				"* ",
				"ugeholl ",
			},
			when: {
				"* ",
				"wann ",
			},
			then: {
				"* ",
				"dann ",
			},
			and: {
				"* ",
				"an ",
				"a ",
			},
			but: {
				"* ",
				"awer ",
				"mä ",
			},
		},
	},
	"lv": &GherkinDialect{
		"lv", "Latvian", "latviešu", map[string][]string{
			feature: {
				"Funkcionalitāte",
				"Fīča",
			},
			rule: {
				"Rule",
			},
			background: {
				"Konteksts",
				"Situācija",
			},
			scenario: {
				"Piemērs",
				"Scenārijs",
			},
			scenarioOutline: {
				"Scenārijs pēc parauga",
			},
			examples: {
				"Piemēri",
				"Paraugs",
			},
			given: {
				"* ",
				"Kad ",
			},
			when: {
				"* ",
				"Ja ",
			},
			then: {
				"* ",
				"Tad ",
			},
			and: {
				"* ",
				"Un ",
			},
			but: {
				"* ",
				"Bet ",
			},
		},
	},
	"mk-Cyrl": &GherkinDialect{
		"mk-Cyrl", "Macedonian", "Македонски", map[string][]string{
			feature: {
				"Функционалност",
				"Бизнис потреба",
				"Можност",
			},
			rule: {
				"Rule",
			},
			background: {
				"Контекст",
				"Содржина",
			},
			scenario: {
				"Пример",
				"Сценарио",
				"На пример",
			},
			scenarioOutline: {
				"Преглед на сценарија",
				"Скица",
				"Концепт",
			},
			examples: {
				"Примери",
				"Сценарија",
			},
			given: {
				"* ",
				"Дадено ",
				"Дадена ",
			},
			when: {
				"* ",
				"Кога ",
			},
			then: {
				"* ",
				"Тогаш ",
			},
			and: {
				"* ",
				"И ",
			},
			but: {
				"* ",
				"Но ",
			},
		},
	},
	"mk-Latn": &GherkinDialect{
		"mk-Latn", "Macedonian (Latin)", "Makedonski (Latinica)", map[string][]string{
			feature: {
				"Funkcionalnost",
				"Biznis potreba",
				"Mozhnost",
			},
			rule: {
				"Rule",
			},
			background: {
				"Kontekst",
				"Sodrzhina",
			},
			scenario: {
				"Scenario",
				"Na primer",
			},
			scenarioOutline: {
				"Pregled na scenarija",
				"Skica",
				"Koncept",
			},
			examples: {
				"Primeri",
				"Scenaria",
			},
			given: {
				"* ",
				"Dadeno ",
				"Dadena ",
			},
			when: {
				"* ",
				"Koga ",
			},
			then: {
				"* ",
				"Togash ",
			},
			and: {
				"* ",
				"I ",
			},
			but: {
				"* ",
				"No ",
			},
		},
	},
	"mn": &GherkinDialect{
		"mn", "Mongolian", "монгол", map[string][]string{
			feature: {
				"Функц",
				"Функционал",
			},
			rule: {
				"Rule",
			},
			background: {
				"Агуулга",
			},
			scenario: {
				"Сценар",
			},
			scenarioOutline: {
				"Сценарын төлөвлөгөө",
			},
			examples: {
				"Тухайлбал",
			},
			given: {
				"* ",
				"Өгөгдсөн нь ",
				"Анх ",
			},
			when: {
				"* ",
				"Хэрэв ",
			},
			then: {
				"* ",
				"Тэгэхэд ",
				"Үүний дараа ",
			},
			and: {
				"* ",
				"Мөн ",
				"Тэгээд ",
			},
			but: {
				"* ",
				"Гэхдээ ",
				"Харин ",
			},
		},
	},
	"nl": &GherkinDialect{
		"nl", "Dutch", "Nederlands", map[string][]string{
			feature: {
				"Functionaliteit",
			},
			rule: {
				"Rule",
			},
			background: {
				"Achtergrond",
			},
			scenario: {
				"Voorbeeld",
				"Scenario",
			},
			scenarioOutline: {
				"Abstract Scenario",
			},
			examples: {
				"Voorbeelden",
			},
			given: {
				"* ",
				"Gegeven ",
				"Stel ",
			},
			when: {
				"* ",
				"Als ",
				"Wanneer ",
			},
			then: {
				"* ",
				"Dan ",
			},
			and: {
				"* ",
				"En ",
			},
			but: {
				"* ",
				"Maar ",
			},
		},
	},
	"no": &GherkinDialect{
		"no", "Norwegian", "norsk", map[string][]string{
			feature: {
				"Egenskap",
			},
			rule: {
				"Regel",
			},
			background: {
				"Bakgrunn",
			},
			scenario: {
				"Eksempel",
				"Scenario",
			},
			scenarioOutline: {
				"Scenariomal",
				"Abstrakt Scenario",
			},
			examples: {
				"Eksempler",
			},
			given: {
				"* ",
				"Gitt ",
			},
			when: {
				"* ",
				"Når ",
			},
			then: {
				"* ",
				"Så ",
			},
			and: {
				"* ",
				"Og ",
			},
			but: {
				"* ",
				"Men ",
			},
		},
	},
	"pa": &GherkinDialect{
		"pa", "Panjabi", "ਪੰਜਾਬੀ", map[string][]string{
			feature: {
				"ਖਾਸੀਅਤ",
				"ਮੁਹਾਂਦਰਾ",
				"ਨਕਸ਼ ਨੁਹਾਰ",
			},
			rule: {
				"Rule",
			},
			background: {
				"ਪਿਛੋਕੜ",
			},
			scenario: {
				"ਉਦਾਹਰਨ",
				"ਪਟਕਥਾ",
			},
			scenarioOutline: {
				"ਪਟਕਥਾ ਢਾਂਚਾ",
				"ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ",
			},
			examples: {
				"ਉਦਾਹਰਨਾਂ",
			},
			given: {
				"* ",
				"ਜੇਕਰ ",
				"ਜਿਵੇਂ ਕਿ ",
			},
			when: {
				"* ",
				"ਜਦੋਂ ",
			},
			then: {
				"* ",
				"ਤਦ ",
			},
			and: {
				"* ",
				"ਅਤੇ ",
			},
			but: {
				"* ",
				"ਪਰ ",
			},
		},
	},
	"pl": &GherkinDialect{
		"pl", "Polish", "polski", map[string][]string{
			feature: {
				"Właściwość",
				"Funkcja",
				"Aspekt",
				"Potrzeba biznesowa",
			},
			rule: {
				"Rule",
			},
			background: {
				"Założenia",
			},
			scenario: {
				"Przykład",
				"Scenariusz",
			},
			scenarioOutline: {
				"Szablon scenariusza",
			},
			examples: {
				"Przykłady",
			},
			given: {
				"* ",
				"Zakładając ",
				"Mając ",
				"Zakładając, że ",
			},
			when: {
				"* ",
				"Jeżeli ",
				"Jeśli ",
				"Gdy ",
				"Kiedy ",
			},
			then: {
				"* ",
				"Wtedy ",
			},
			and: {
				"* ",
				"Oraz ",
				"I ",
			},
			but: {
				"* ",
				"Ale ",
			},
		},
	},
	"pt": &GherkinDialect{
		"pt", "Portuguese", "português", map[string][]string{
			feature: {
				"Funcionalidade",
				"Característica",
				"Caracteristica",
			},
			rule: {
				"Rule",
			},
			background: {
				"Contexto",
				"Cenário de Fundo",
				"Cenario de Fundo",
				"Fundo",
			},
			scenario: {
				"Exemplo",
				"Cenário",
				"Cenario",
			},
			scenarioOutline: {
				"Esquema do Cenário",
				"Esquema do Cenario",
				"Delineação do Cenário",
				"Delineacao do Cenario",
			},
			examples: {
				"Exemplos",
				"Cenários",
				"Cenarios",
			},
			given: {
				"* ",
				"Dado ",
				"Dada ",
				"Dados ",
				"Dadas ",
			},
			when: {
				"* ",
				"Quando ",
			},
			then: {
				"* ",
				"Então ",
				"Entao ",
			},
			and: {
				"* ",
				"E ",
			},
			but: {
				"* ",
				"Mas ",
			},
		},
	},
	"ro": &GherkinDialect{
		"ro", "Romanian", "română", map[string][]string{
			feature: {
				"Functionalitate",
				"Funcționalitate",
				"Funcţionalitate",
			},
			rule: {
				"Rule",
			},
			background: {
				"Context",
			},
			scenario: {
				"Exemplu",
				"Scenariu",
			},
			scenarioOutline: {
				"Structura scenariu",
				"Structură scenariu",
			},
			examples: {
				"Exemple",
			},
			given: {
				"* ",
				"Date fiind ",
				"Dat fiind ",
				"Dată fiind",
				"Dati fiind ",
				"Dați fiind ",
				"Daţi fiind ",
			},
			when: {
				"* ",
				"Cand ",
				"Când ",
			},
			then: {
				"* ",
				"Atunci ",
			},
			and: {
				"* ",
				"Si ",
				"Și ",
				"Şi ",
			},
			but: {
				"* ",
				"Dar ",
			},
		},
	},
	"ru": &GherkinDialect{
		"ru", "Russian", "русский", map[string][]string{
			feature: {
				"Функция",
				"Функциональность",
				"Функционал",
				"Свойство",
			},
			rule: {
				"Rule",
			},
			background: {
				"Предыстория",
				"Контекст",
			},
			scenario: {
				"Пример",
				"Сценарий",
			},
			scenarioOutline: {
				"Структура сценария",
			},
			examples: {
				"Примеры",
			},
			given: {
				"* ",
				"Допустим ",
				"Дано ",
				"Пусть ",
			},
			when: {
				"* ",
				"Когда ",
				"Если ",
			},
			then: {
				"* ",
				"То ",
				"Затем ",
				"Тогда ",
			},
			and: {
				"* ",
				"И ",
				"К тому же ",
				"Также ",
			},
			but: {
				"* ",
				"Но ",
				"А ",
				"Иначе ",
			},
		},
	},
	"sk": &GherkinDialect{
		"sk", "Slovak", "Slovensky", map[string][]string{
			feature: {
				"Požiadavka",
				"Funkcia",
				"Vlastnosť",
			},
			rule: {
				"Rule",
			},
			background: {
				"Pozadie",
			},
			scenario: {
				"Príklad",
				"Scenár",
			},
			scenarioOutline: {
				"Náčrt Scenáru",
				"Náčrt Scenára",
				"Osnova Scenára",
			},
			examples: {
				"Príklady",
			},
			given: {
				"* ",
				"Pokiaľ ",
				"Za predpokladu ",
			},
			when: {
				"* ",
				"Keď ",
				"Ak ",
			},
			then: {
				"* ",
				"Tak ",
				"Potom ",
			},
			and: {
				"* ",
				"A ",
				"A tiež ",
				"A taktiež ",
				"A zároveň ",
			},
			but: {
				"* ",
				"Ale ",
			},
		},
	},
	"sl": &GherkinDialect{
		"sl", "Slovenian", "Slovenski", map[string][]string{
			feature: {
				"Funkcionalnost",
				"Funkcija",
				"Možnosti",
				"Moznosti",
				"Lastnost",
				"Značilnost",
			},
			rule: {
				"Rule",
			},
			background: {
				"Kontekst",
				"Osnova",
				"Ozadje",
			},
			scenario: {
				"Primer",
				"Scenarij",
			},
			scenarioOutline: {
				"Struktura scenarija",
				"Skica",
				"Koncept",
				"Oris scenarija",
				"Osnutek",
			},
			examples: {
				"Primeri",
				"Scenariji",
			},
			given: {
				"Dano ",
				"Podano ",
				"Zaradi ",
				"Privzeto ",
			},
			when: {
				"Ko ",
				"Ce ",
				"Če ",
				"Kadar ",
			},
			then: {
				"Nato ",
				"Potem ",
				"Takrat ",
			},
			and: {
				"In ",
				"Ter ",
			},
			but: {
				"Toda ",
				"Ampak ",
				"Vendar ",
			},
		},
	},
	"sr-Cyrl": &GherkinDialect{
		"sr-Cyrl", "Serbian", "Српски", map[string][]string{
			feature: {
				"Функционалност",
				"Могућност",
				"Особина",
			},
			rule: {
				"Rule",
			},
			background: {
				"Контекст",
				"Основа",
				"Позадина",
			},
			scenario: {
				"Пример",
				"Сценарио",
				"Пример",
			},
			scenarioOutline: {
				"Структура сценарија",
				"Скица",
				"Концепт",
			},
			examples: {
				"Примери",
				"Сценарији",
			},
			given: {
				"* ",
				"За дато ",
				"За дате ",
				"За дати ",
			},
			when: {
				"* ",
				"Када ",
				"Кад ",
			},
			then: {
				"* ",
				"Онда ",
			},
			and: {
				"* ",
				"И ",
			},
			but: {
				"* ",
				"Али ",
			},
		},
	},
	"sr-Latn": &GherkinDialect{
		"sr-Latn", "Serbian (Latin)", "Srpski (Latinica)", map[string][]string{
			feature: {
				"Funkcionalnost",
				"Mogućnost",
				"Mogucnost",
				"Osobina",
			},
			rule: {
				"Rule",
			},
			background: {
				"Kontekst",
				"Osnova",
				"Pozadina",
			},
			scenario: {
				"Scenario",
				"Primer",
			},
			scenarioOutline: {
				"Struktura scenarija",
				"Skica",
				"Koncept",
			},
			examples: {
				"Primeri",
				"Scenariji",
			},
			given: {
				"* ",
				"Za dato ",
				"Za date ",
				"Za dati ",
			},
			when: {
				"* ",
				"Kada ",
				"Kad ",
			},
			then: {
				"* ",
				"Onda ",
			},
			and: {
				"* ",
				"I ",
			},
			but: {
				"* ",
				"Ali ",
			},
		},
	},
	"sv": &GherkinDialect{
		"sv", "Swedish", "Svenska", map[string][]string{
			feature: {
				"Egenskap",
			},
			rule: {
				"Rule",
			},
			background: {
				"Bakgrund",
			},
			scenario: {
				"Scenario",
			},
			scenarioOutline: {
				"Abstrakt Scenario",
				"Scenariomall",
			},
			examples: {
				"Exempel",
			},
			given: {
				"* ",
				"Givet ",
			},
			when: {
				"* ",
				"När ",
			},
			then: {
				"* ",
				"Så ",
			},
			and: {
				"* ",
				"Och ",
			},
			but: {
				"* ",
				"Men ",
			},
		},
	},
	"ta": &GherkinDialect{
		"ta", "Tamil", "தமிழ்", map[string][]string{
			feature: {
				"அம்சம்",
				"வணிக தேவை",
				"திறன்",
			},
			rule: {
				"Rule",
			},
			background: {
				"பின்னணி",
			},
			scenario: {
				"உதாரணமாக",
				"காட்சி",
			},
			scenarioOutline: {
				"காட்சி சுருக்கம்",
				"காட்சி வார்ப்புரு",
			},
			examples: {
				"எடுத்துக்காட்டுகள்",
				"காட்சிகள்",
				"நிலைமைகளில்",
			},
			given: {
				"* ",
				"கொடுக்கப்பட்ட ",
			},
			when: {
				"* ",
				"எப்போது ",
			},
			then: {
				"* ",
				"அப்பொழுது ",
			},
			and: {
				"* ",
				"மேலும்  ",
				"மற்றும் ",
			},
			but: {
				"* ",
				"ஆனால்  ",
			},
		},
	},
	"th": &GherkinDialect{
		"th", "Thai", "ไทย", map[string][]string{
			feature: {
				"โครงหลัก",
				"ความต้องการทางธุรกิจ",
				"ความสามารถ",
			},
			rule: {
				"Rule",
			},
			background: {
				"แนวคิด",
			},
			scenario: {
				"เหตุการณ์",
			},
			scenarioOutline: {
				"สรุปเหตุการณ์",
				"โครงสร้างของเหตุการณ์",
			},
			examples: {
				"ชุดของตัวอย่าง",
				"ชุดของเหตุการณ์",
			},
			given: {
				"* ",
				"กำหนดให้ ",
			},
			when: {
				"* ",
				"เมื่อ ",
			},
			then: {
				"* ",
				"ดังนั้น ",
			},
			and: {
				"* ",
				"และ ",
			},
			but: {
				"* ",
				"แต่ ",
			},
		},
	},
	"tl": &GherkinDialect{
		"tl", "Telugu", "తెలుగు", map[string][]string{
			feature: {
				"గుణము",
			},
			rule: {
				"Rule",
			},
			background: {
				"నేపథ్యం",
			},
			scenario: {
				"ఉదాహరణ",
				"సన్నివేశం",
			},
			scenarioOutline: {
				"కథనం",
			},
			examples: {
				"ఉదాహరణలు",
			},
			given: {
				"* ",
				"చెప్పబడినది ",
			},
			when: {
				"* ",
				"ఈ పరిస్థితిలో ",
			},
			then: {
				"* ",
				"అప్పుడు ",
			},
			and: {
				"* ",
				"మరియు ",
			},
			but: {
				"* ",
				"కాని ",
			},
		},
	},
	"tlh": &GherkinDialect{
		"tlh", "Klingon", "tlhIngan", map[string][]string{
			feature: {
				"Qap",
				"Qu'meH 'ut",
				"perbogh",
				"poQbogh malja'",
				"laH",
			},
			rule: {
				"Rule",
			},
			background: {
				"mo'",
			},
			scenario: {
				"lut",
			},
			scenarioOutline: {
				"lut chovnatlh",
			},
			examples: {
				"ghantoH",
				"lutmey",
			},
			given: {
				"* ",
				"ghu' noblu' ",
				"DaH ghu' bejlu' ",
			},
			when: {
				"* ",
				"qaSDI' ",
			},
			then: {
				"* ",
				"vaj ",
			},
			and: {
				"* ",
				"'ej ",
				"latlh ",
			},
			but: {
				"* ",
				"'ach ",
				"'a ",
			},
		},
	},
	"tr": &GherkinDialect{
		"tr", "Turkish", "Türkçe", map[string][]string{
			feature: {
				"Özellik",
			},
			rule: {
				"Rule",
			},
			background: {
				"Geçmiş",
			},
			scenario: {
				"Örnek",
				"Senaryo",
			},
			scenarioOutline: {
				"Senaryo taslağı",
			},
			examples: {
				"Örnekler",
			},
			given: {
				"* ",
				"Diyelim ki ",
			},
			when: {
				"* ",
				"Eğer ki ",
			},
			then: {
				"* ",
				"O zaman ",
			},
			and: {
				"* ",
				"Ve ",
			},
			but: {
				"* ",
				"Fakat ",
				"Ama ",
			},
		},
	},
	"tt": &GherkinDialect{
		"tt", "Tatar", "Татарча", map[string][]string{
			feature: {
				"Мөмкинлек",
				"Үзенчәлеклелек",
			},
			rule: {
				"Rule",
			},
			background: {
				"Кереш",
			},
			scenario: {
				"Сценарий",
			},
			scenarioOutline: {
				"Сценарийның төзелеше",
			},
			examples: {
				"Үрнәкләр",
				"Мисаллар",
			},
			given: {
				"* ",
				"Әйтик ",
			},
			when: {
				"* ",
				"Әгәр ",
			},
			then: {
				"* ",
				"Нәтиҗәдә ",
			},
			and: {
				"* ",
				"Һәм ",
				"Вә ",
			},
			but: {
				"* ",
				"Ләкин ",
				"Әмма ",
			},
		},
	},
	"uk": &GherkinDialect{
		"uk", "Ukrainian", "Українська", map[string][]string{
			feature: {
				"Функціонал",
			},
			rule: {
				"Rule",
			},
			background: {
				"Передумова",
			},
			scenario: {
				"Приклад",
				"Сценарій",
			},
			scenarioOutline: {
				"Структура сценарію",
			},
			examples: {
				"Приклади",
			},
			given: {
				"* ",
				"Припустимо ",
				"Припустимо, що ",
				"Нехай ",
				"Дано ",
			},
			when: {
				"* ",
				"Якщо ",
				"Коли ",
			},
			then: {
				"* ",
				"То ",
				"Тоді ",
			},
			and: {
				"* ",
				"І ",
				"А також ",
				"Та ",
			},
			but: {
				"* ",
				"Але ",
			},
		},
	},
	"ur": &GherkinDialect{
		"ur", "Urdu", "اردو", map[string][]string{
			feature: {
				"صلاحیت",
				"کاروبار کی ضرورت",
				"خصوصیت",
			},
			rule: {
				"Rule",
			},
			background: {
				"پس منظر",
			},
			scenario: {
				"منظرنامہ",
			},
			scenarioOutline: {
				"منظر نامے کا خاکہ",
			},
			examples: {
				"مثالیں",
			},
			given: {
				"* ",
				"اگر ",
				"بالفرض ",
				"فرض کیا ",
			},
			when: {
				"* ",
				"جب ",
			},
			then: {
				"* ",
				"پھر ",
				"تب ",
			},
			and: {
				"* ",
				"اور ",
			},
			but: {
				"* ",
				"لیکن ",
			},
		},
	},
	"uz": &GherkinDialect{
		"uz", "Uzbek", "Узбекча", map[string][]string{
			feature: {
				"Функционал",
			},
			rule: {
				"Rule",
			},
			background: {
				"Тарих",
			},
			scenario: {
				"Сценарий",
			},
			scenarioOutline: {
				"Сценарий структураси",
			},
			examples: {
				"Мисоллар",
			},
			given: {
				"* ",
				"Агар ",
			},
			when: {
				"* ",
				"Агар ",
			},
			then: {
				"* ",
				"Унда ",
			},
			and: {
				"* ",
				"Ва ",
			},
			but: {
				"* ",
				"Лекин ",
				"Бирок ",
				"Аммо ",
			},
		},
	},
	"vi": &GherkinDialect{
		"vi", "Vietnamese", "Tiếng Việt", map[string][]string{
			feature: {
				"Tính năng",
			},
			rule: {
				"Rule",
			},
			background: {
				"Bối cảnh",
			},
			scenario: {
				"Tình huống",
				"Kịch bản",
			},
			scenarioOutline: {
				"Khung tình huống",
				"Khung kịch bản",
			},
			examples: {
				"Dữ liệu",
			},
			given: {
				"* ",
				"Biết ",
				"Cho ",
			},
			when: {
				"* ",
				"Khi ",
			},
			then: {
				"* ",
				"Thì ",
			},
			and: {
				"* ",
				"Và ",
			},
			but: {
				"* ",
				"Nhưng ",
			},
		},
	},
	"zh-CN": &GherkinDialect{
		"zh-CN", "Chinese simplified", "简体中文", map[string][]string{
			feature: {
				"功能",
			},
			rule: {
				"Rule",
			},
			background: {
				"背景",
			},
			scenario: {
				"场景",
				"剧本",
			},
			scenarioOutline: {
				"场景大纲",
				"剧本大纲",
			},
			examples: {
				"例子",
			},
			given: {
				"* ",
				"假如",
				"假设",
				"假定",
			},
			when: {
				"* ",
				"当",
			},
			then: {
				"* ",
				"那么",
			},
			and: {
				"* ",
				"而且",
				"并且",
				"同时",
			},
			but: {
				"* ",
				"但是",
			},
		},
	},
	"zh-TW": &GherkinDialect{
		"zh-TW", "Chinese traditional", "繁體中文", map[string][]string{
			feature: {
				"功能",
			},
			rule: {
				"Rule",
			},
			background: {
				"背景",
			},
			scenario: {
				"場景",
				"劇本",
			},
			scenarioOutline: {
				"場景大綱",
				"劇本大綱",
			},
			examples: {
				"例子",
			},
			given: {
				"* ",
				"假如",
				"假設",
				"假定",
			},
			when: {
				"* ",
				"當",
			},
			then: {
				"* ",
				"那麼",
			},
			and: {
				"* ",
				"而且",
				"並且",
				"同時",
			},
			but: {
				"* ",
				"但是",
			},
		},
	},
}
