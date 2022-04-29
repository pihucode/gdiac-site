# gdiac-site

**Replace the content of the contact page and the urls of the footer**

# Site Data

### To change Featured Games:

Update the `_data/featured_games.yml` file, currently picked games that won awards in 2020 as featured

### To modify games in the Gallery:

Games are grouped by their year (ie, 2019, 2020).

- Create a file `[year].yml` containing game data in the directory `_data/gallery`
- Create a file `games-[year].yml` that acts a collection of game ids in the directory `_data/all_games`
- Add `[year]` to the `years` collection in the file `_data/categories.yml`
- Create a folder containing game files (index.md, banner.png, logo.png, etc) in the directory `gallery/`. This folder should be named after the game id

If any new genres are added, include them in the file `_data/categories.yml`.

To run locally use `bundle exec jekyll serve`
