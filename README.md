# Hacker News Hide Domain

A Firefox extension for auto-hiding (using the *hide* link) entries from the
Hacker News front page for configured domains.

The extensions adds a new link next to the *hide* link for adding the domain to
the list of domains to hide.
Whenever a new story appears on the HN front page from that domain, the user is
asked whether or not they want to hide it.
If they say yes, the domain is added to the list of domains to hide stories
from.
If they say no, they are asked if they want to continue hiding stories for the
given domain.
If they say no, the domain is removed from the list of domains to hide stories
from.
If they say yes, nothing will happen until the page is reloaded or another story
from the same domain is encountered.
This edge case is not made nicer in terms of UX because it is not worth doing.

Users can un-hide individual stories from their Hacker News profile page.
There is no support for removing domains from the list of domains to hide
stories from without being prompted on a given story in the UI the domain
contributes.
It is possible to manually edit this list in the browser's local storage.

## Development

Make sure `web-ext` is installed: `npm run --global web-ext`.
Go to AMO and generate an API key and API secret or reuse existing ones.

To sign the extension to be able to load the new version to Firefox:

- Bump the version in `manifest.json`
- Run `web-ext`: `web-ext sign --api-key="…" --api-secret="…"`
- Go to `about:addons` and use the gear menu to load an extension from file

The extension is placed at `web-ext-artifacts/*.xpi`.

To reload the extension while in development without bumping and resigning:

- Go to `about:debugging#/runtime/this-firefox`
- Click Reload on the extension's entry

The extension will have immediate effect on the Hacker News tab without a need
for a reload.
