# Figma plugin - Translation updater

## Key takeaways

- All that is needed in the plugin (`code.ts` file) needs to be added into the html file as inline scripts.
  The relative files aren't able to be opened. **(to be looked into)**
- The plugin can be run locally in the browser, but won't be able to send the messages to the parent (figma UI).
- The `code.ts` can't handle imports. This causes duplicate types. **(to be looked into)**
- For easier translation matching, there is a script that splits the translations from our translation tool into
  separate language files.
  Run ```yarn mock``` to split our new translations set into `translations.json`