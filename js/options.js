$(function() {
    $('.tip-confirm').tipConfirm({
        duration: 150,
        easing: "easeInSine",
        size: "small",
        customButtons: false,
        onSubmit: function(event, element) {
            console.log(element)
            /*element.slideUp(200, function() {
                $(this).remove()
            })*/
        }
    });
    $('#custom_buttons').tipConfirm({
        duration: 150,
        easing: "easeInOutCirc",
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
            },
            {
                text: 'Facebook',
                event: 'https://facebook.com',
                class: 'btn btn-info btn-xs'
            }
        ],
        onSubmit: function(event, element) {}
    });
    $('.tc-delete').tipConfirm({
        duration: 150,
        easing: "easeInOutCirc",
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
    $('.tc-save').tipConfirm({
        duration: 150,
        easing: "easeInOutCirc",
        size: "small",
        buttons: [{
                text: 'Save',
                event: 'confirm',
                class: 'btn btn-success btn-xs margin-right'
            },
            {
                text: 'Reject',
                event: 'dismiss',
                class: 'btn btn-info btn-xs'
            }
        ],
        onSubmit: function(event, element) {}
    });
    $('.tc-mail').tipConfirm({
        duration: 150,
        easing: "easeInOutCirc",
        size: "small",
        buttons: [{
                text: 'Send Email',
                event: 'confirm',
                class: 'btn btn-success btn-xs margin-right'
            },
            {
                text: 'Close',
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
    $('.tc-bookmark').tipConfirm({
        duration: 150,
        easing: "easeInOutCirc",
        size: "small",
        buttons: [{
                event: 'https://windows.com',
                class: 'btn btn-xs btn-default fa fa-windows margin-right'
            },
            {
                event: 'https://youtube.com',
                class: 'btn btn-xs btn-default fa fa-youtube margin-right'
            },
            {
                event: 'https://xing.com',
                class: 'btn btn-xs btn-default fa fa-xing margin-right'
            },
            {
                event: 'https://weibo.com',
                class: 'btn btn-xs btn-default fa fa-weibo margin-right'
            }
        ],
        onSubmit: function(event, element) {}
    });
})
