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

		await joplin.commands.register({
			name: "newNoteHtml",
			label: "New HTML note",
			execute: async () => {
				newHtmlNote();
				toggleMarkupLanguage();
			},
		})	
	},
});

async function toggleMarkupLanguage(){				
	
	//Get current note and its ID	
	const curNote = await joplin.workspace.selectedNote();
	const noteId = await curNote.id;
		
	//check the markup_language type (1=markdown, 2=html)
	let customMarkup: number;
	
	if (curNote.markup_language == 1) {
		customMarkup = 2;
	} else if (curNote.markup_language == 2) {
			customMarkup = 1;
		};
		
	//update markup_language
	await joplin.data.put(['notes', noteId], null, { markup_language: customMarkup });	
};

async function newHtmlNote(){
		
	//Get current selected folder id
	const curFolder = await joplin.workspace.selectedFolder();
	const folderId = await curFolder.id;
	
	//create new note and use its returned Id to focus it and move the cursor to the title line
	const newNote = await joplin.data.post(['notes'], null, { title: "", parent_id: folderId, markup_language: 2 });	

	await joplin.commands.execute('openNote', newNote.id);
	await joplin.commands.execute('focusElement', 'noteTitle');
};