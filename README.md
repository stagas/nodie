# nodie

nodie restarts an application if it dies

## Installation

`npm install nodie -g`
    
## Usage

`nodie <program> [param] [...]`

## Examples

Simple usage with node:

`nodie node app.js`

Put in the background and keep it running:

`nohup nodie node app.js &`
