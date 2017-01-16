# ci_packaging

ci_packaging is intending for use with the ci-interim project. It runs the npm compile scripts from the ci-interim project directory, takes the compiled app contents, uses Electron to create an executable installer file (.exe currently, but does support Linux and Mac OS formats as well), and packages the final installer as a zip, with a distinct data set.

> Currently only packages a single data file with the project 
> directory as we do not have a way to distinguish between the output
> zip files and thus would be overwriting on any sequential calls. At 
> the point when we can pull a name from the data file, we can 
> repeat the build process for each unique data set and target user.

For completely command-line driven execution, run as follows:
```sh
$ node ci_packaging\app.js [csvdirectory] [projectdirectory] [targetdirectory] [targetname]
```

For a config driven exectution, run as follows:
```sh
$ node ci_packaging\app.js -c[configjson] 
```
_Do note there is **no** space between the flag '-c' and the [configjson] argument._

Where:
* [csvdirectory] is the path to the directory containing source .csv files
* [projectdirectory] is the path to the front-end application project directory (ci-interim)
* [targetdirectory] is the directory path to output zip files
* [targetname] is the name for the target zip, which will in the future be pulled from the incoming csv data
* [configjson] is the path to the config.json file containing [csvdirectory], [projectdirectory], [targetdirectory], [targetname]

> One nice to have would be to provide a config file instead of using 
> command-line arguments as this can become tedious. **[update 1/16/2017] Now supports use of a config file.**

Some presumptions:
* [projectdirectory]/build directory is already created, it will **NOT** be created by the ci_packaging script
* /app contains the modified index.html (development code is commented out, and build version code is uncommented)
* /app contains the main.js file expected by Electron for executable creation
* /app contains the rendering.js file expected by Electron for executable creation
* Parsed csv.js file is to be placed in [projectdirectory]/src/scripts as _"data.js"_

# Installation

Prerequisite technologies
* [Node.js](https://nodejs.org/en/download/current/)
* [7zip](http://www.7-zip.org/download.html)

From the ci_packaging root directory run
```sh
$ npm install
```

# Resources
* [Electron Github repo](https://github.com/electron/electron)
* [Electron website](http://electron.atom.io/)
* [Vantiv Cardholder Insights (ci-interim) Github private repo](https://github.com/unisaurus-rex/ci-interim)
* [Vantiv Cardholder Insights demo site](https://unisaurus-rex.github.io/ci-interim/demo/)

Created using [Dillinger.io](http://dillinger.io/)
