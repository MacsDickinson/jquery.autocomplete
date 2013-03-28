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
    'listitemclass': 'your-li-class',
    'selectedclass': 'your-selected-class'});
});
```
The html rendered for this will be:

    <div class="your-container-class">
        <input class="your-input-class" for="selectid">
        <ul class="your-ul-class" for="selectid" >
            <li value="option value 1" class="your-li-class">Option text 1</li>
            <li value="option value 2" class="your-li-class">Option text 2</li>
            <li value="option value 3" class="your-li-class">Option text 3</li>
            <li value="option value 4" class="your-li-class">Option text 4</li>
            <li value="option value 5" class="your-li-class">Option text 5</li>
            <li value="option value 6" class="your-li-class">Option text 6</li>
            <li value="option value 7" class="your-li-class">Option text 7</li>
        </ul>
    </div>    

View a basic demo here:
http://jsbin.com/afamum/4/edit