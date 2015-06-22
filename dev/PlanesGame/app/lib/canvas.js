var canvasFactory = function() {
    var _canvas,
        _context,
        _mousePressed = false,
        _last_p,
        _callback,
        _enabled = false,
        _color = 'black',
        _lineWidth = 5;

    var init = function (canvasID, callback) {
        _canvas = document.getElementById(canvasID);
        if (_canvas == null)
            return;

        _context = _canvas.getContext('2d');

        _callback = callback;

        $(_canvas).mousedown(function (e) {
            if (_enabled) {
                _mousePressed = true;
                _draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
            }
        });

        $(_canvas).mousemove(function (e) {
            if (_enabled) {
                if (_mousePressed) {
                    _draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
                }
            }
        });

        $(_canvas).mouseup(function (e) {
            _mousePressed = false;
        });

        $(_canvas).mouseleave(function (e) {
            _mousePressed = false;
        });
    }

    var _draw = function (x, y, isDown) {
        var p = { x: x, y: y };
        if (isDown) {
            draw(_last_p, p, _color, _lineWidth);

            if (_callback) {
                _callback(_last_p, p, _color, _lineWidth);
            }
        }
        _last_p = p;
    }

    var draw = function (p1, p2, color, lineWidth) {
        _context.beginPath();
        _context.strokeStyle = color;
        _context.lineWidth = lineWidth;
        _context.lineJoin = "round";
        _context.moveTo(p1.x, p1.y);
        _context.lineTo(p2.x, p2.y);
        _context.closePath();
        _context.stroke();
    };

    var clear = function () {
        _context.setTransform(1, 0, 0, 1, 0, 0);
        _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
    };

    var enable = function (enable) {
        _enabled = enable;

        $(_canvas).attr('style', enable ? 'cursor: url(Content/images/cur654.cur), progress;' : 'cursor: not-allowed');
    };

    var setColor = function (color) {
        _color = color;
    };

    var setLineWidth = function (lineWidth) {
        _lineWidth = lineWidth;
    };

    return {
        init: init,
        clear: clear,
        draw: draw,
        enable: enable,
        setColor: setColor,
        setLineWidth: setLineWidth
    };
};

var canvas = new canvasFactory();
