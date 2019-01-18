# Monster Hunter World Database

This is a UI to thumb through all items in the Monster Hunter World database. Currently, all persistent state saves will be stored in your browser's localStorage, so it will be lost if you clear your browser application storage. Right now this includes:

- Favorites
- Comparisons
- Selected Items

I plan on adding more features that will involve user settings, and I hope to setup my own backend and enable user accounts soon. Then I can move data out of localStorage and into a database somewhere.

If you are interested in development progress check out the Trello board [here](https://trello.com/c/Bitrn2rh). I get all of the data from [this API](https://docs.mhw-db.com/), I want to extend a huge thanks to [Tyler Lartonoix](https://github.com/LartTyler) for building that. And some of the images are pulled from the [MHW Wiki](https://monsterhunterworld.wiki.fextralife.com/Monster+Hunter+World+Wiki).

Right now all the game data is in a static JSON object loaded with the application code, so the file size is large right now. I plan on building a solution so I can fetch that data on page load.

If you find any bugs or get an idea for a feature, please submit a bug/feature request [here](https://github.com/tnormington/mhw/issues/new/choose).

Thanks for checking it out!
