/*!
 * TipConfirm jQuery Plugin - v1.0.0-beta1
 *
 * Copyright 2017 Ganpat S Rajpurohit, Jaipur.
 *
 * Licensed MIT
 */
if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}


(function($, window, document, undefined) {

    var TIP_CONFIRM = {
        name: 'tipConfirm',
        eClick: 'click',
        eMEnter: 'mouseenter',
        eMLeave: 'mouseleave',
        defaultTheme: 'black',
        defaultMessage: 'Are you sure?',
        defaultPlacement: 'top',
        _init: function(el, options) {
            this.defaults = $.extend({}, $.fn.tipConfirm.defaults, options);
            this.$el = $(el);
            this.html = {};
            this._setTemplate();
            this._setTrigger();
        },
        _setTemplateHtml: function() {
            var self = this,
                setting = self.defaults,
                $element = this.$el,
                elmdata = $element.data(),
                theme = elmdata.hasOwnProperty('theme') ? elmdata.theme : self.defaultTheme,
                message = elmdata.hasOwnProperty('message') ? elmdata.message : self.defaultMessage,
                placement = elmdata.hasOwnProperty('placement') ? elmdata.placement : self.defaultPlacement;

            var $innerContainer = $('<div />', { class: 'tc ' + theme });
            var $messageContainer = $('<div />', { class: 'tc-message' }).text(message);
            var $arrow = $('<div />', { class: 'arrow ' + placement });
            $messageContainer.appendTo($innerContainer);
            var btns = this._buttons();
            if (btns) {
                $.each(btns, function(index, el) {
                    el.appendTo($innerContainer);
                })
            }

            this.html.inner = $innerContainer;
            this.html.arrow = $arrow;

            return this.html;
        },
        _buttons: function() {
            var self = this,
                setting = self.defaults,
                $el = self.$el,
                $container = self.$container;

            var btns = {}
            if (setting.buttons) {
                $.each(setting.buttons, function(index, el) {
                    var $btn = $('<a />', { class: el.class })
                        .html(el.text);
                    if (el.event && el.event === 'confirm') {
                        $btn.on('click', function(event) {
                            event.preventDefault();
                            if (setting.onSubmit !== undefined) {
                                setting.onSubmit(event, $el);
                                self._afterSubmit();
                            }
                        });
                    } else if (el.event && el.event === 'dismiss') {
                        $btn.on('click', function(event) {
                            event.preventDefault();
                            $el.removeData('tc');
                            $container.removeData('trigger');
                            $container.animate({ opacity: 0 }, setting.duration, setting.easing, function() {
                                $(this).remove();
                            })
                        });
                    } else if (el.event && el.event !== 'confirm' && el.event !== 'dismiss') {
                        $btn.attr('href', el.event);
                        $btn.attr('target', '_blank');
                    }
                    btns[index] = $btn;
                });
            }
            return btns;
        },
        _setTemplate: function() {
            this.template = '<div class="tc {{theme}}">' +
                '<span class="tc-message">{{message}}</span>' +
                '<span class="button button-green tc-cy ">Yes</span>' +
                '<span class="tc-cn">Dismiss</span>' +
                '</div>' +
                '<div class="arrow {{placement}}"></div>';
        },
        _setTrigger: function() {
            var self = this;
            var el = self.$el;

            el.on(self.eClick, function(event) {
                event.preventDefault();
                // self._backdrop();
                self._calculatePosition();
            })
        },
        _calculatePosition: function() {
            var self = this,
                el = this.$el,
                duration = self.defaults.duration,
                easing = self.defaults.easing;

            self._createTip();
            setTimeout($.proxy(function() {
                var tipCordinates = this._getCoordinates(el);
                this.$container.css(tipCordinates);
                if ($('.tc-container').length > 0) {
                    this.$container.animate({ opacity: 1 }, duration, easing);
                }
            }, this), 1);
        },
        _createTip: function() {
            var self = this,
                $el = self.$el,
                elementData = $el.data(),
                setting = self.defaults;


            var $container = $('<div />', {
                    'class': 'tc-container'
                })
                .data('trigger', $el);
            self.$container = $container;

            var templateHtml = self._setTemplateHtml(),
                template = self._processData();

            if (elementData.hasOwnProperty('size')) {
                $container.addClass(elementData.size);
            } else {
                $container.addClass(setting.size);
            }

            if (setting.customButtons) {
                $container.append(templateHtml.inner);
                $container.append(templateHtml.arrow);
            } else {
                $container.append(template);
            }
            $container.appendTo('body');

            $el.data('tc', $container);

            self._hideTip();
            self._actionSubmit();
            self._actionDismiss();

        },
        _processData: function(t) {
            var self = this,
                setting = self.defaults,
                $element = this.$el,
                elmdata = $element.data(),
                template = self.template,
                filter = template.match(/\{\{([a-z0-9_]+)\}\}/g),
                theme = elmdata.hasOwnProperty('theme') ? elmdata.theme : self.defaultTheme,
                message = elmdata.hasOwnProperty('message') ? elmdata.message : self.defaultMessage,
                placement = elmdata.hasOwnProperty('placement') ? elmdata.placement : self.defaultPlacement;

            $(filter).each(function(key, find) {
                if (find == '{{theme}}') {
                    template = template.replace('{{theme}}', theme);
                }

                if (find == '{{message}}') {
                    template = template.replace('{{message}}', message);
                }

                if (find == '{{placement}}') {
                    template = template.replace('{{placement}}', placement);
                }
            });

            return template;
        },
        _backdrop: function() {
            var backdrop = this.defaults.backdrop;
            if (backdrop && backdrop != '') {
                var $backdrop = $('<div />', {
                    'class': 'backdrop'
                });
                this.$backdrop = $backdrop;
                if (backdrop == "black") {
                    $backdrop.addClass('black');
                    $backdrop.appendTo('body');
                } else if (backdrop == "white") {
                    $backdrop.addClass('white');
                    $backdrop.appendTo('body');
                } else if (backdrop == "blur") {
                    $('body').addClass('blur');
                }
            }
        },
        _getCoordinates: function(el) {
            var self = this,
                $elem = el,
                $box_wrapper = this.$container,
                adjustment = 10,
                pos = this._getPosition(),
                tipWidth = $box_wrapper[0].offsetWidth,
                tipHeight = $box_wrapper[0].offsetHeight,
                elmdata = $elem.data();

            switch (elmdata.placement) {
                case 'top':
                    return {
                        top: pos.top - tipHeight - adjustment,
                        left: pos.left + pos.width / 2 - tipWidth / 2
                    };
                case 'left':
                    return {
                        top: pos.top + pos.height / 2 - tipHeight / 2,
                        left: pos.left - tipWidth - adjustment
                    };
                case 'right':
                    return {
                        top: pos.top + pos.height / 2 - tipHeight / 2,
                        left: pos.left + pos.width + adjustment
                    };
                case 'bottom':
                    return {
                        top: pos.top + pos.height + adjustment,
                        left: pos.left + pos.width / 2 - tipWidth / 2
                    };
                default:
                    return {
                        top: pos.top - tipHeight - adjustment,
                        left: pos.left + pos.width / 2 - tipWidth / 2
                    };
            }
        },
        _getPosition: function() {
            return {
                top: this.$el.offset().top,
                left: this.$el.offset().left,
                width: this.$el[0].offsetWidth,
                height: this.$el[0].offsetHeight
            }
        },
        _hideTip: function() {
            var self = this;
            var el = self.$el;
            var bx = self.$container;
            var $backdrop = self.$backdrop;
            var duration = self.defaults.duration;
            var backdrop = self.defaults.backdrop;
            var easing = self.defaults.easing;

            $(document).on('click', function(e) {
                el.each(function() {
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && bx.has(e.target).length === 0) {
                        $(this).removeData('tc');
                        bx.removeData('trigger');
                        bx.animate({ opacity: 0 }, duration, easing, function() {
                            $(this).remove();
                        })
                    }
                });
            });
        },
        _actionSubmit: function() {
            var self = this,
                setting = self.defaults,
                el = self.$el,
                $container = self.$container,
                $yesButton = $container.find('.tc-cy');

            $yesButton.on('click', function(event) {
                event.preventDefault();
                if (setting.onSubmit !== undefined) {
                    setting.onSubmit(event, el);
                    self._afterSubmit();
                }
            });
        },
        _actionDismiss: function() {
            var self = this,
                setting = self.defaults,
                el = self.$el,
                $container = self.$container,
                $noButton = $container.find('.tc-cn');

            $noButton.on('click', function(event) {
                event.preventDefault();
                el.removeData('tc');
                $container.removeData('trigger');
                $container.animate({ opacity: 0 }, setting.duration, setting.easing, function() {
                    $(this).remove();
                })
            });
        },
        _afterSubmit: function() {
            var self = this,
                setting = self.defaults,
                el = self.$el,
                $container = self.$container,
                $noButton = $container.find('.tc-cn');
            $container.animate({ opacity: 0 }, setting.duration, setting.easing, function() {
                $(this).remove();
            })
        },
        init: function() {
            this._init.call(this, this.$el, this.defaults);
        },
        set: function(key, value) {
            this.defaults[key] = value;
            this.init();
        }
    }

    $.fn.tipConfirm = function(options) {
        if ($.isPlainObject(options)) {
            return this.each(function() {
                var tipConfirm = Object.create(TIP_CONFIRM);
                tipConfirm._init(this, options);
                $(this).data('tipConfirm', tipConfirm);
            });
        } else if (typeof options === 'string' && options.indexOf('_') !== 0) {
            var tipConfirm = $(this).data('tipConfirm');
            var method = tipConfirm[options];
            return method.apply(tipConfirm, $.makeArray(arguments).slice(1));
        } else {
            return this.each(function() {
                var tipConfirm = Object.create(TIP_CONFIRM);
                tipConfirm._init(this, $.fn.tipConfirm.defaults);
                $(this).data('tipConfirm', tipConfirm);
            });
        }
    };


    $.fn.tipConfirm.defaults = {
        // tip show/hide duration
        duration: 1000,
        // All jquery ui easing
        easing: "easeInOutBounce",
        // tiny, small, large
        size: "large",
        // custom buttons will be shown if this property is true
        customButtons: true,
        // desired buttons on tip
        buttons: [{
                text: 'Yes',
                event: 'confirm',
                class: 'btn btn-success btn-xs'
            },
            {
                text: 'No',
                event: 'https://gmail.com',
                class: 'btn btn-danger btn-xs'
            }
        ],
        // after event
        onSubmit: function(e) {},
    };

})(jQuery, window, document);
