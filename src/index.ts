import joplin from 'api';

joplin.plugins.register({
	onStart: async function() {

		await joplin.commands.register({
			name: "toggleMarkupLanguageType",
			label: "Toggle the markup language type of the current note",
			execute: async () => {
				toggleMarkupLanguage();
				},
		})
		
		async function toggleMarkupLanguage(){				
		
		//Get current note and its ID	
		const curNote = await joplin.workspace.selectedNote();
		const noteId = await curNote.id;
		
		//console.info(noteId);

		//const note = await joplin.data.get(['notes', noteId], { fields: ['id', 'title', 'markup_language']});
		
		//console.info(await curNote.markup_language);
		
			
		//check the markup_language type (1=markdown, 2=html)
		let customMarkup: number;
		
		if (curNote.markup_language == 1) {
			customMarkup = 2;
		} else if (curNote.markup_language == 2) {
			customMarkup = 1;
		};
		
		//update markup_language
		await joplin.data.put(['notes', noteId], null, { markup_language: customMarkup});

		
	}},
});
