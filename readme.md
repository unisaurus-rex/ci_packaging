# ci_packaging

ci_packaging is intended for use with the ci-interim project. It runs the npm compile scripts from the ci-interim project directory, takes the compiled app contents and packages the final installer as a zip, with a distinct data set.

For completely command-line driven execution, run as follows:
```sh
$ node ci_packaging\app.js [csvdirectory] [projectdirectory] [targetdirectory]
```

For a config driven exectution, run as follows:
```sh
$ node ci_packaging\app.js -c[configjson]
```
_Do note there is **no space** between the flag '-c' and the [configjson] argument._

Where:
* [csvdirectory] is the path to the directory containing source .csv files
* [projectdirectory] is the path to the front-end application project directory (ci-interim)
* [targetdirectory] is the directory path to output zip files
* [configjson] is the path to the config.json file containing [csvdirectory], [projectdirectory], [targetdirectory]

Config.json example:
```json
{
  "csvDir": "path/to/csv/directory",
  "projectDir": "path/to/project/directory",
  "targetDir": "path/to/output/zip/directory"
}
```
> One nice to have would be to provide a config file instead of using
> command-line arguments as this can become tedious. **[update 1/16/2017] Now supports use of a config file.**
> **[update 2/09/2017]** Packages each of the csvs in the csv directory, the final zip has the name of the original csv sans extension. No longer executes the Electron packaging step.

Some presumptions:
* The name of the csv is the name of the FI for which the given data corresponds to.
* [projectdirectory]/build directory is already created, it will **NOT** be created by the ci_packaging script
* /app contains the modified index.html (development code is commented out, and build version code is uncommented)
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
* [Vantiv Cardholder Insights (ci-interim) Github private repo](https://github.com/unisaurus-rex/ci-interim)
* [Vantiv Cardholder Insights demo site](https://unisaurus-rex.github.io/ci-interim/demo/)

Created using [Dillinger.io](http://dillinger.io/)
