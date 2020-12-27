# Deque Google Books Test

Built with `create-react-app` and TailwindCSS. I chose React because I'm most comfortable with that
framework currently, and TailwindCSS to provide extremely rapid styling and prototyping with little
effort.

To run the project, install the dependencies, set your API key in the `.env` or `.env.development`
file, then run `npm start`. It should open a browser to http://localhost:3000 (default CRA settings).

## Notes

* Not perfectly accessible, but it's not awful :)
* The styling on the search box with Tailwind was not playing nice, so I just
left it as is
* Input is not sanitized
* Some of the `Additional Info` handling could be more performant
* I'm not very happy with the separation of concerns with `TableData` and
`TableRow` - I think what I was attempting in the component composition is
clear, but the end result is far from perfect