# jqvscroll_widget ([API docs](doc/readme.md))

scrollable selectable widget for ATC simulations

  In the demo app the ATC label is represented by blue coloured DOM element with a label text - **CFL** - and initial value of **000** DOM element with <em>.cfl</em> class name, which will be updated as widget instatiation calls for new selected value.
  If there is no selected value, then original contents of the CFL value will be used.

<div style="text-align:center">
  <img src="doc/images/img01.png"/>
  <p>
    <b>Fig01</b>: Inititial form, no CFL value selected yet.
  </p>
</div>

<div style="text-align:center">
  <img src="doc/images/img02.png"/>
  <p>
    <b>Fig02</b>: After a "<em>long click</em>" or <b>.vscroll("open")</b> called,<br/>
    still no CFL value selected. Then user selects <b>070</b>, the widget closes then.
  </p>
</div>

<div style="text-align:center">
  <img src="doc/images/img03.png"/>
  <p>
    <b>Fig03</b>: Reopening the widget the selected value - <b>070</b> -,<br/> 
    going to be highlighted and focused into the viewport as possible. 
  </p>
</div>

<div style="text-align:center">
  <img src="doc/images/img04.png"/>
  <p>
    <b>Fig04</b>: Having the previously selected element - <b>375</b> -,<br/> the selected value is centered, and highlighted. <br/>
Then reopened list contains the selected value, <br/>
and focused into the center of the viewport as possible. <br/>
Operational range maximum value is set to <b>380</b>. <br/>
All items/values above and below the operational range <br/>
are disabled.
  </p>
</div>

See further info in the [API docs](doc/readme.md)
