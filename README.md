jquery.autocomplete
===================

A simple, lightweight JQuery plugin to easily convert any unordered list or select element into an autocomplete textbox. Styling on the resulting autocomplete input is intentionally bare as it is designed to incorperate the styling of your site.

Usage
----------
###Basic Usage

```javascript
$(function() {
   $('select').autocomplete();
});
```

### Options

Options are available to enable you to specify your own classes on the different elements in the final output.

```javascript
$(function() {
  $('.macsen-autocomplete').autocomplete({
    'containerclass' : 'your-container-class',
    'searchclass' : 'your-input-class',
    'resultsclass' : 'your-ul-class',
    'selectedclass': 'your-selected-class'});
});
```