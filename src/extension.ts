// Based on https://code.visualstudio.com/api/language-extensions/language-server-extension-guide
import * as vscode from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  let command = "xdr-ls";
  let serverOptions: ServerOptions = {
    run: { command, transport: TransportKind.stdio },
    debug: { command, transport: TransportKind.stdio }
  };

  if (vscode.workspace.workspaceFolders === undefined) {
    throw Error("Workspace folders not open");
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "file", language: "xdr" },
      { scheme: "file", language: "cpp", pattern: "**/xdr/*.h" }
    ],
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "xdr-ls",
    "XDR Language Server",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
