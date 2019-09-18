(function( $ ) {
  $.fn.drawGradient = function() {
    this.filter( ".gradient" ).each(function() {
      var element = $(this);
      var primaryGradient = themeOptions.primaryGradientColor;
      var secondaryGradient = themeOptions.secondaryGradientColor;
      var gradientStyle = "linear-gradient(140deg,"+primaryGradient+" 20%, "+secondaryGradient+" 70%)";
      element.css("background",gradientStyle);
    });
    return this;
  };
}( jQuery ));

$('.gradient').drawGradient();


var inPreview = (/\/admin\/design/.test(top.location.pathname));

function hexToRGB(h) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return "rgb("+ +r + "," + +g + "," + +b + ")";
}

var isGreaterThanZero = function(currentValue) {
  return currentValue > 0;
}

function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

function unique(item, index, array) {
  return array.indexOf(item) == index;
}

function cartesianProduct(a) {
  var i, j, l, m, a1, o = [];
  if (!a || a.length == 0) return a;
  a1 = a.splice(0, 1)[0];
  a = cartesianProduct(a);
  for (i = 0, l = a1.length; i < l; i++) {
    if (a && a.length) for (j = 0, m = a.length; j < m; j++)
      o.push([a1[i]].concat(a[j]));
    else
      o.push([a1[i]]);
  }
  return o;
}

Array.prototype.equals = function (array) {
  if (!array)
    return false;
  if (this.length != array.length)
    return false;
  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
}

// From https://github.com/kevlatus/polyfill-array-includes/blob/master/array-includes.js
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

Array.prototype.count = function(filterMethod) {
  return this.reduce((count, item) => filterMethod(item)? count + 1 : count, 0);
}
function enableAddButton(updated_price) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  addButton.attr("disabled",false);
  if (updated_price) {
    priceTitle = ' - ' + Format.money(updated_price, true, true);
  }
  else {
    priceTitle = '';
  }
  addButton.html(addButtonTitle + priceTitle);
}

function disableAddButton(type) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  if (type == "sold-out") {
    var addButtonTitle = addButton.attr('data-sold-title');
  }
  if (!addButton.is(":disabled")) {
    addButton.attr("disabled","disabled");
  }
  addButton.html(addButtonTitle);
}

function enableSelectOption(select_option) {
  select_option.removeAttr("disabled");
  select_option.text(select_option.attr("data-name"));
  select_option.removeAttr("disabled-type");
  if ((select_option.parent().is('span'))) {
    select_option.unwrap();
  }
}
function disableSelectOption(select_option, type) {
  if (type === "sold-out") {
    disabled_text = select_option.parent().attr("data-sold-text");
    disabled_type = "sold-out";
    if (show_sold_out_product_options === 'false') {
      hide_option = true;
    }
    else {
      hide_option = false;
    }
  }
  if (type === "unavailable") {
    disabled_text = select_option.parent().attr("data-unavailable-text");
    disabled_type = "unavailable";
    hide_option = true;
  }
  if (select_option.val() > 0) {
    var name = select_option.attr("data-name");
    select_option.attr("disabled",true);
    select_option.text(name + ' ' + disabled_text);
    select_option.attr("disabled-type",disabled_type);
    if (hide_option === true) {
      if (!(select_option.parent().is('span'))) {
        select_option.wrap('<span>');
      }
    }
  }
}

$('.contact-form input[type="text"], .contact-form textarea').focus(function(){
  $(this).parents('.contact-form-group').addClass('focused');
});

$('.contact-form input[type="text"], .contact-form textarea').blur(function(){
  var inputValue = $(this).val();
  if (inputValue.length == 0) {
    $(this).removeClass('filled');
    $(this).parents('.contact-form-group').removeClass('focused');
  } else {
    $(this).addClass('filled');
  }
})

$(document).ready(function() {
  $('.contact-form input[type="text"], .contact-form textarea').each(function(){
    var inputValue = $(this).val();
    if (inputValue.length > 0) {
      $(this).addClass('filled');
      $(this).parents('.contact-form-group').addClass('focused');
    }
  });
  autoExpand($('textarea')[0]);
});
document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
}, false);

function autoExpand(textarea) {
  if (textarea) {
    if (textarea.value) {
      textarea.style.height = 'inherit';
      var height = textarea.scrollHeight;
      textarea.style.height = height + 'px';
    }
  }
};

$('.category-nav-title').click(function() {
  $('.category-nav-items').slideToggle('fast');
})


$('.qty-button').click(function() {
  var $t = $(this)
  , input = $(this).parent().find('input')
  , val = parseInt(input.val())
  , valMin = 1
  , item_id = $(this).parent().data("cart-id");
  if (isNaN(val) || val < valMin) {
    var new_val = valMin;
  }
  if ($t.data('func') == 'plus') {
    var new_val = val + 1;
  }
  else {
    if (val > valMin) {
      var new_val = val - 1;
    }
  }
  if (new_val > 0) {
    Cart.updateItem(item_id, new_val, function(cart) {
      processUpdate(input, item_id, new_val, cart);
    });
  }
  else {
    Cart.removeItem(item_id, function(cart) {
      processUpdate(input, item_id, 0, cart);
    });
  }
});