# StagScroll

StagScroll is a jQuery plugin that creates a container to support scrolling over large static data. It's designed to handle even massive datasets, and has been tested with up to 1 crore records.

## Features

- **Broad Compatibility**: StagScroll works with all modern browsers, ensuring your data can be accessed by a wide range of users.
- **Flexible Configuration**: The plugin offers many configuration options, allowing you to tailor its behavior to suit your needs.
- **Supports Various Elements**: StagScroll can be used with a variety of HTML elements, including tables (`<table>`), divisions (`<div>`), unordered lists (`<ul>`), spans (`<span>`), and more.

## Configuration Options

- `data`: This should have the static array for which we have to create scrolling.
- `rowTemplate`: This could be a string or a function that will set each rowTemplate.
- `ssidField`: This field should specify the field of the data array above which has unique id number for each row.
- `height`: This specifies the height of the container element in pixels. (default 400px)
- `domElementsCount`: This specifies the max number of elements(records) inside the container. Default 200. Decide this cautiously based on your needs, as it could affect the performance, or result in misbehavior of the plugin or stop it completely.
- `lineNumber`: This is the line number where the plugin will focus by default. default is 1.

## Installation

To install StagScroll, you can use the following command:

```bash
npm install stagscroll


## Usage
Here’s a basic example of how to use StagScroll:
$(document).ready(function() {
    var stagScrollData = $('#myElement').stagScroll({
      data: <json array here>,
      rowTemplate: <row template here>,
      ssidField: <unique number field name here>,
      height: <height in px here>,
      domElementsCount: <number of elements count for DOM here>,
      lineNumber : <line number to focus here>
    });
});

## API Reference
Please refer to our API documentation for more details on how to use StagScroll and its various configuration options.

## Methods
 - `goToLine(linenumber)`: This method takes linenumber as argument and brings the mentioned number in viewport.
  stagScrollData.goToLine(1436);

## Development Status
Please note that StagScroll is currently in the development phase. We welcome any error reports and will strive to resolve them as quickly as possible.

## Contributing
We appreciate your interest in contributing to StagScroll! Please submit any bugs or feature requests through the issue tracker.

## License
StagScroll is licensed under the MIT License. See LICENSE for more information.
