
# TipConfirm - jQuery Confirmation through ToolTip plugin
TipConfirm is a JQuery plugin to provide a different way of confirmation inside a tooltip.

###  Features
  * Size (Tiny, Small and Large)
  * Customizable buttons and events
  * Customizable tooltip placements
  * Show/Hide duration and effects

###  Get a copy of the plugin
You can download the plugin from GitHub.

###  Load the required files
Inside the page's head tag include the library and plugin's CSS files.
```
<link rel="stylesheet" type="text/css" href="lib/font-awesome/css/font-awesome.css" />
<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css" />

<link rel="stylesheet" type="text/css" href="css/default.css" />
<link rel="stylesheet" type="text/css" href="css/tip.confirm.css" />
```

In the page's footer, just before, include the required JavaScript files.

```
<script src="vendor/jquery/jquery.min.js"></script>
<script src="js/tip.confirm.js"></script>
```

### Create the HTML markup
`<a href="#" class="btn btn-warning btn-sm tc-delete" data-message="Are you sure you want to delete?" data-theme="black" data-placement="left">
      <i class="fa fa-trash"></i>
</a>`

`<a href="#" class="btn btn-warning btn-sm tc-delete" data-message="Are you sure you want to send mail?" data-theme="red" data-placement="top">
      <i class="fa fa-envelope"></i>
</a>`

`<a href="#" class="btn btn-warning btn-sm tc-delete" data-message="Sure to save?" data-theme="aqua" data-placement="top">
      <i class="fa fa-save"></i>
</a>`

`<a href="#" class="btn btn-danger btn-sm tc-share" data-message="Share to your favorite social media sites!" data-theme="green" data-placement="bottom">
    <i class="fa fa-share-square-o"></i>
</a>`

### Instantiate the tipConfirm
```
<script type="text/javascript">
    jQuery( document ).ready(function( $ ) { 
        $( '.tc-delete' ).tipConfirm();
        
        $( '.tc-mail' ).tipConfirm({
          onSubmit: function(event, element) { }
        });
        
        $('.tc-save').tipConfirm({
            duration: 150,
            size: "small",
            buttons: [{
                    text: 'Yes',
                    event: 'confirm',
                    class: 'btn btn-success btn-xs margin-right'
                },
                {
                    text: 'No',
                    event: 'dismiss',
                    class: 'btn btn-info btn-xs'
                }
            ],
            onSubmit: function(event, element) {}
        });
        
        $('.tc-share').tipConfirm({
            duration: 150,
            easing: "easeInOutCirc",
            size: "small",
            buttons: [{
                    event: 'https://facebook.com',
                    class: 'btn btn-xs btn-default fa fa-facebook-square margin-right'
                },
                {
                    event: 'https://linkedin.com',
                    class: 'btn btn-xs btn-default fa fa-linkedin-square margin-right'
                },
                {
                    event: 'https://pinterest.com',
                    class: 'btn btn-xs btn-default fa fa-pinterest-square margin-right'
                },
                {
                    event: 'https://twitter.com',
                    class: 'btn btn-xs btn-default fa fa-twitter-square margin-right'
                }
            ],
            onSubmit: function(event, element) {}
        });
    }); 
</script>
```

### Demo
[Live Examples](https://gsrajpurohit.github.io/tipConfirm/).

### Support
If you found a bug or have a feature suggestion, please email me on rajpurohitganpat@gmail.com.
If you need help with implementing the "Multi Select" in your project feel free to contact me on rajpurohitganpat@gmail.com.

License The plugin is available under the [MIT license](https://opensource.org/licenses/MIT).
