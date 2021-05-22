import * as vscode from 'vscode';
import Document from './document';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.gotoDocument', (e: vscode.Uri) => {
    let editor = vscode.window.activeTextEditor;
		if (!editor) {
				vscode.window.showWarningMessage('No active text editor found!');
				return;
		}
		
		let keyword: string = '';
		if (editor.selection.isEmpty) {
      let wordRange: any = editor.document.getWordRangeAtPosition(editor.selection.start);
			keyword = wordRange ? editor.document.getText(wordRange) : '';
		} else {
				keyword = editor.document.getText(editor.selection.with());
		}

		let extIndex: number = editor.document.fileName.lastIndexOf('.');
		let ext: string = extIndex >= 0 ? editor.document.fileName.substring(extIndex + 1) : '';
		let config = vscode.workspace.getConfiguration('goto-documentation');
		let customDocs = config.get<object>("customDocs");
		
		Document.open(ext, keyword, customDocs);
});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
