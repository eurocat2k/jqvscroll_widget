# Plugin documentation

**.vscroller()** jQuery UI widget plugin

## 1 Prerequisites

The jQuery and jQuery UI library must be loaded before usage.

## 2 How to instantiate?

Select a simple div with or without text content inside.

*Prefer to initialize with **000** as used to be in operational environment.*

```javascript

    $vsobj = $(selector).vscroller();

    // or

    $vsobj = $(selector).vscroller({params});

```

Where base params shall be

```javascript
    {
        step: [1, 5, 10],  // step size - difference between two consecutive list element, default 5
        min: 280, // minimum value in the list not below 0
        max: 410, // maximum value of the list not above 660
        selected: [min..340..max], // selected - shall be between operational range
        autoOpen: [true, false], // default false
        onChange: function (value) {}, // user's callback function should expect one parameter when called - selected CFL value
    }
```

## 3 How to update the instance?

The instance should be modified as follows:

```javascript

    $vsobj.vscroller({
        // all the params used at instantiation, plus...
        opermin: [min..300..opermax], // operational minimum - bottom of selectable - shall be in range the min-max values and less than opermax
        opermax: [opermin..380..max], // operation maximum - top of selectable with same conditions as before except that this value shall be greater than opermin
        longClick: 250, // longpress delay - for open the list, and for select a value
        visible: [5, 7, 9, 11], // visible items in the list when opened, default 7
    });

```

## 4 How does it work?

### 4.1 Create and open

Long click on the DOM element which was used to instantiate the plugin. For example HTML contains an element with the class ```.cfl```:
```html
    <div class="cfl">000</div>
```
From Javascript script we can do this:
```javascript
    $('.cfl').vscroller("open");  // with default parameters
```
or adjustable parameters at instantiation:
```javascript
    $('.cfl').vscroller({
        step: [1, 5, 10], // 1 or 5 or 10
        min: 100,
        max: 200,
        selected: 160
    }).("open");
```

After widget creation success, *long click* on DOM element activates the list window, and put it above the static value.

If **onChange** callback function set, then after a selection, a callback function will be executed with a parameter which will be set by the widget. The parameter value is the latest selection result. Example user defines a function to handle the event when new selected CFL value will set, the callback function parameter will be filled with the value of the selected CFL from the list:
```javascript
    // the user's defined onChange callback function definition
    function handleCFLChange(cfl) {
        // user's method logic here...
        // cfl value will be the last selected value from the widget!
        console.log(`NEW CFL SET TO ${cfl}`);
    }
    // instantiate widget with user's defined callback function
    $('.cfl').vscroller({
        onChange: handleCFLChange
    })
    // when user selects a new CFL(360), the following message will appear in the log: 'NEW CFL SET TO 360'
```

Feel free to add comments and suggestions.

### 4.2 Forced close

```javascript
    $('.cfl').vscroller("close");
```

*-zg-*
