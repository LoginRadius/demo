(function (b, K, M) {
  var I = {
      required: "The %s field is required.",
      valid_phoneno: "The %s field is not valid.",
      custom_validation: "The %s field is required.",
      matches: "The %s field does not match the %s field.",
      "default": "The %s field is still set to default, please change.",
      valid_email: "The %s field must contain a valid email address.",
      valid_emails: "The %s field must contain all valid email addresses.",
      min_length: "The %s field must be at least %s characters in length.",
      max_length: "The %s field must not exceed %s characters in length.",
      exact_length: "The %s field must be exactly %s characters in length.",
      greater_than: "The %s field must contain a number greater than %s.",
      less_than: "The %s field must contain a number less than %s.",
      alpha: "The %s field must only contain alphabetical characters.",
      alpha_numeric: "The %s field must only contain alpha-numeric characters.",
      alpha_dash: "The %s field must only contain alpha-numeric characters, underscores, and dashes.",
      numeric: "The %s field must contain only numbers.",
      integer: "The %s field must contain an integer.",
      decimal: "The %s field must contain a decimal number.",
      is_natural: "The %s field must contain only positive numbers.",
      is_natural_no_zero: "The %s field must contain a number greater than zero.",
      valid_ip: "The %s field must contain a valid IP.",
      valid_base64: "The %s field must contain a base64 string.",
      valid_credit_card: "The %s field must contain a valid credit card number.",
      is_file_type: "The %s field must contain only %s files.",
      valid_url: "The %s field must contain a valid URL.",
      valid_ca_zip: "The %s field must contain a valid Postal Code."
    },
    U = function (b) {},
    t = /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
    V = /^(\\+)|(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
    Ga = /^(.+?)\[(.+)\]$/,
    W = /^[0-9]+$/,
    Ha = /^\-?[0-9]+$/,
    ja = /^\-?[0-9]*\.?[0-9]+$/,
    R = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    A = /^[a-z]+$/i,
    n = /^[a-z0-9]+$/i,
    ta = /^[a-z0-9_\-]+$/i,
    w = /^[0-9]+$/i,
    ua = /^[1-9][0-9]*$/i,
    J = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
    va = /[^a-zA-Z0-9\/\+=]/i,
    X = /^[\d\-\s]+$/,
    Y = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    C = function (b, B, z) {
      this.callback = z || U;
      this.errors = [];
      this.fields = {};
      this.form = this._formByNameOrNode(b) || {};
      this.messages = {};
      this.handlers = {};
      b = 0;
      for (z = B.length; b < z; b++) {
        var u = B[b];
        if ((u.name || u.names) && u.rules)
          if (u.names)
            for (var n = 0; n < u.names.length; n++) this._addField(u, u.names[n]);
          else this._addField(u, u.name)
      }
      var t = this.form.onsubmit;
      this.form.onsubmit = function (b) {
        return function (u) {
          try {
            return b._validateForm(u) && (t === M || t())
          } catch (Ja) {}
        }
      }(this)
    },
    ka = function (b, B) {
      var u;
      if (0 < b.length && ("radio" === b[0].type || "checkbox" === b[0].type))
        for (u = 0; u < b.length; u++) {
          if (b[u].checked) return b[u][B]
        } else return b[B]
    };
  C.prototype.setMessage = function (b, B) {
    this.messages[b] = B;
    return this
  };
  C.prototype.registerCallback = function (b, B) {
    b && "string" === typeof b && B && "function" === typeof B && (this.handlers[b] = B);
    return this
  };
  C.prototype._formByNameOrNode = function (b) {
    return "object" === typeof b ? b : K.forms[b]
  };
  C.prototype._addField = function (b, B) {
    this.fields[B] = {
      name: B,
      display: b.display || B,
      rules: b.rules,
      id: null,
      type: null,
      value: null,
      checked: null
    }
  };
  C.prototype._validateForm = function (b) {
    this.errors = [];
    for (var u in this.fields)
      if (this.fields.hasOwnProperty(u)) {
        var n = this.fields[u] || {},
          t = this.form[n.name];
        t && t !== M && (n.id = ka(t, "id"), n.type = 0 < t.length ? t[0].type : t.type, n.value = ka(t, "value"), n.checked = ka(t, "checked"), this._validateField(n))
      }
    "function" === typeof this.callback && this.callback(this.errors, b);
    0 < this.errors.length && (b && b.preventDefault ? b.preventDefault() : event && (event.returnValue = !1));
    return !0
  };
  C.prototype._validateField = function (b) {
    for (var u = b.rules.split("|"), n = b.rules.indexOf("required"), t = !b.value || "" === b.value || b.value === M, w = 0, A = u.length; w < A; w++) {
      var H = u[w],
        C = null,
        J = !1,
        K = Ga.exec(H);
      if (-1 !== n || -1 !== H.indexOf("!callback_") || !t)
        if (K && (H = K[1], C = K[2]), "!" === H.charAt(0) && (H = H.substring(1, H.length)), "function" === typeof this._hooks[H] ? this._hooks[H].apply(this, [b, C]) || (J = !0) : "callback_" === H.substring(0, 9) && (H = H.substring(9, H.length), "function" === typeof this.handlers[H] && !1 === this.handlers[H].apply(this, [b.value, C]) && (J = !0)), J) {
          u = this.messages[H + "#" + b.name] || this.messages[H] || I[H];
          n = "An error has occurred with the " + b.display + " field.";
          u && (n = u.replace("%s", b.display), C && ((cu = 0 <= C.indexOf("###") && C.split("###")) ? cu[1] && (n = cu[1]) : n = n.replace("%s", this.fields[C] ? this.fields[C].display : C)));
          this.errors.push({
            Id: b.id,
            Name: b.name,
            Message: n,
            Rule: H
          });
          break
        }
    }
  };
  C.prototype._hooks = {
    required: function (b) {
      var u = b.value.trim();
      return "checkbox" === b.type || "radio" === b.type ? !0 === b.checked : null !== u && "" !== u
    },
    "default": function (b, n) {
      return b.value !== n
    },
    matches: function (b, n) {
      var u = this.form[n];
      return u ? b.value === u.value : !1
    },
    valid_ca_zip: function (b) {
      return t.test(b.value)
    },
    custom_validation: function (b, n) {
      c = n.split("###")[0];
      c = c.split("or").join("|");
      return (new RegExp(c, "g")).test(b.value)
    },
    valid_email: function (b) {
      return R.test(b.value)
    },
    valid_emails: function (b) {
      b = b.value.split(",");
      for (var n = 0; n < b.length; n++)
        if (!R.test(b[n])) return !1;
      return !0
    },
    min_length: function (b, n) {
      return W.test(n) ? b.value.length >= parseInt(n, 10) : !1
    },
    max_length: function (b, n) {
      return W.test(n) ? b.value.length <= parseInt(n, 10) : !1
    },
    exact_length: function (b, n) {
      return W.test(n) ? b.value.length === parseInt(n, 10) : !1
    },
    greater_than: function (b, n) {
      return ja.test(b.value) ? parseFloat(b.value) > parseFloat(n) : !1
    },
    less_than: function (b, n) {
      return ja.test(b.value) ? parseFloat(b.value) < parseFloat(n) : !1
    },
    alpha: function (b) {
      return A.test(b.value)
    },
    alpha_numeric: function (b) {
      return n.test(b.value)
    },
    alpha_dash: function (b) {
      return ta.test(b.value)
    },
    numeric: function (b) {
      return W.test(b.value)
    },
    integer: function (b) {
      return Ha.test(b.value)
    },
    decimal: function (b) {
      return ja.test(b.value)
    },
    is_natural: function (b) {
      return w.test(b.value)
    },
    is_natural_no_zero: function (b) {
      return ua.test(b.value)
    },
    valid_ip: function (b) {
      return J.test(b.value)
    },
    valid_phoneno: function (b) {
      return V.test(b.value)
    },
    valid_base64: function (b) {
      return va.test(b.value)
    },
    valid_url: function (b) {
      return Y.test(b.value)
    },
    valid_credit_card: function (b) {
      if (!X.test(b.value)) return !1;
      var n = 0,
        t = !1;
      b = b.value.replace(/\D/g, "");
      for (var u = b.length - 1; 0 <= u; u--) {
        var w = b.charAt(u);
        w = parseInt(w, 10);
        t && 9 < (w *= 2) && (w -= 9);
        n += w;
        t = !t
      }
      return 0 === n % 10
    },
    is_file_type: function (b, n) {
      if ("file" !== b.type) return !0;
      for (var t = b.value.substr(b.value.lastIndexOf(".") + 1), u = n.split(","), w = !1, B = 0, C = u.length; B < C; B++) t == u[B] && (w = !0);
      return w
    }
  };
  b.FormValidator = C
})(window, document);
"function" !== typeof String.prototype.trim && (String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "")
});
Array.prototype.indexOf || (Array.prototype.indexOf = function (b, K) {
  var M = this.length >>> 0,
    I = Number(K) || 0;
  I = 0 > I ? Math.ceil(I) : Math.floor(I);
  for (0 > I && (I += M); I < M; I++)
    if (I in this && this[I] === b) return I;
  return -1
});
Array.prototype.filter || (Array.prototype.filter = function (b, K) {
  if (void 0 === this || null === this) throw new TypeError;
  var M = Object(this),
    I = M.length >>> 0;
  if ("function" !== typeof b) throw new TypeError;
  for (var U = [], t = 0; t < I; t++)
    if (t in M) {
      var V = M[t];
      b.call(K, V, t, M) && U.push(V)
    }
  return U
});
var LoginRadiusV2 = function (b) {
  function K() {
    if (!aa && (aa = !0, la)) {
      for (var a = 0; a < la.length; a++) la[a].call(window, []);
      la = []
    }
  }

  function M(a) {
    var d = window.onload;
    window.onload = "function" != typeof window.onload ? a : function () {
      d && d();
      a()
    }
  }

  function I() {
    if (!bb) {
      bb = !0;
      document.addEventListener && !ma.opera && document.addEventListener("DOMContentLoaded", K, !1);
      if (ma.msie && window == top) a: if (!aa) {
        try {
          document.documentElement.doScroll("left")
        } catch (d) {
          break a
        }
        K()
      }
      ma.opera && document.addEventListener("DOMContentLoaded", function () {
        if (!aa) {
          for (var a = 0; a < document.styleSheets.length; a++)
            if (document.styleSheets[a].disabled) return;
          K()
        }
      }, !1);
      if (ma.safari) {
        var a;
        (function () {
          if (!aa && ("loaded" == document.readyState || "complete" == document.readyState)) {
            if (void 0 === a) {
              for (var d = document.getElementsByTagName("link"), e = 0; e < d.length; e++) "stylesheet" == d[e].getAttribute("rel") && a++;
              d = document.getElementsByTagName("style");
              a += d.length
            }
            document.styleSheets.length == a && K()
          }
        })()
      }
      M(K)
    }
  }

  function U(a, d) {
    var e = {
        0: "worst",
        1: "bad",
        2: "weak",
        3: "good",
        4: "strong",
        5: "secure"
      },
      f = {
        0: "#dd514c",
        1: "orange",
        2: "yellow",
        3: "#5eb95e",
        4: "blue",
        5: "violet"
      },
      g = {
        0: "Worst",
        1: "Bad",
        2: "Weak",
        3: "Good",
        4: "Strong",
        5: "Secure"
      },
      b = [],
      k = h.passwordMeterConfiguration,
      p;
    for (p in e) k[p] && k[p]["case"] ? k[p]["case"].toLowerCase() == e[p] && b.push({
      color: k[p].color ? k[p].color : f[p],
      Message: k[p].message ? k[p].message : g[p]
    }) : b.push({
      color: f[p],
      Message: g[p]
    });
    return b
  }

  function t(a) {
    for (var d = 0; d < h.errorMessages.length; d++) h.errorMessages[d].code == a.ErrorCode && (a.Message = h.errorMessages[d].message || a.Message, a.Description = h.errorMessages[d].description || a.Description);
    return a
  }

  function V(a) {
    for (var d = 0; d < a.length; d++) a[d] && h.formCustomLabel[a[d].name] && (a[d].display = h.formCustomLabel[a[d].name])
  }

  function Ga(a) {
    for (var d = 0; d < a.length; d++) a[d] && h.formElementsTitle[a[d].name] && (a[d].title = h.formElementsTitle[a[d].name])
  }

  function W(a) {
    for (var d = 0; d < a.length; d++) a[d] && h.formPlaceholder[a[d].name] && (a[d].placeholder = h.formPlaceholder[a[d].name])
  }

  function Ha(a) {
    h.formValidations[a.name] && (a.rules = h.formValidations[a.name])
  }

  function ja(a, d) {
    if (h.formElementAttributes[a.name])
      for (var e = h.formElementAttributes[a.name].split("&"), f = 0; f < e.length; f++) {
        var g = e[f].split("=");
        d.setAttribute(g[0], g[1])
      }
  }

  function R(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
  }

  function A(a) {
    return Object.keys(a).map(function (d) {
      if (a[d]) return encodeURIComponent(d) + "=" + encodeURIComponent(a[d])
    }).join("&")
  }

  function n(a) {
    var d = [];
    d.push(t(a));
    return d
  }

  function ta(a, d, e, f, g, m) {
    for (var k = 0; k < a.length; k++)
      if (a[k]) {
        Ha(a[k]);
        f[k] = {};
        f[k].name = a[k].name;
        f[k].display = a[k].display;
        f[k].rules = a[k].rules;
        switch (a[k].type) {
          case "text":
            var p = document.createElement("textarea");
            break;
          case "html":
            p = document.createElement("div");
            break;
          case "captcha":
            p = document.createElement("div");
            break;
          case "password":
            p = document.createElement("input");
            p.type = "password";
            break;
          case "hidden":
            p = document.createElement("input");
            p.type = "hidden";
            p.value = a[k].value || "";
            break;
          case "option":
            p = document.createElement("select");
            var q = document.createElement("option");
            q.appendChild(document.createTextNode("-- select --"));
            q.setAttribute("value", "");
            p.appendChild(q);
            if ((!a[k].DataSource || null == a[k].DataSource) && null != a[k].options) {
              for (var r = 0; r < a[k].options.length; r++) q = document.createElement("option"), q.setAttribute("value", a[k].options[r].value), "country" === a[k].name && q.setAttribute("value", a[k].options[r].value + "|" + a[k].options[r].text), q.appendChild(document.createTextNode(a[k].options[r].text)), p.appendChild(q);
              h.defaultOptionField[a[k].name] && (p.value = h.defaultOptionField[a[k].name])
            }
            break;
          case "multi":
            p = document.createElement("input");
            p.type = "checkbox";
            break;
          case "email":
            p = document.createElement("input");
            p.type = "email";
            break;
          case "button":
            p = document.createElement("input");
            p.type = "button";
            p.value = a[k].display;
            break;
          case "image":
            p = document.createElement("img");
            p.src = a[k].value;
            p.type = "image";
            break;
          default:
            p = document.createElement("input"), p.type = "text"
        }
        a[k].title && (p.title = a[k].title);
        a[k].disabled && (p.disabled = a[k].disabled);
        ja(a[k], p);
        a[k].placeholder && (p.placeholder = a[k].placeholder);
        a[k].value && ("multi" === a[k].type ? p.checked = !0 : p.value = a[k].value);
        if ("html" === a[k].type) p = document.createElement("div"), p.setAttribute("class", g + "-form-element-content content-" + m + a[k].name), p.innerHTML = a[k].html, a[k].event && l.addEvent(a[k].event, p, a[k].eventCallback), d.appendChild(p);
        else if ("captcha" === a[k].type) p = document.createElement("div"), p.setAttribute("class", g + "-form-element-content content-" + m + a[k].name), p.innerHTML = a[k].html, b.formValidationMessage && (r = document.createElement("div"), r.setAttribute("id", "validation-" + m + e + "-" + a[k].name), r.setAttribute("class", g + "validation-message validation-" + m + a[k].name), p.appendChild(r)), d.appendChild(p);
        else {
          p.setAttribute("name", a[k].name);
          a[k].name && ("phoneid" === a[k].name.toLowerCase() || "phone" === a[k].name.toLowerCase()) && b.existPhoneNumber && "registration" == e && l.addEvent("blur", p, function (a) {
            "" != this.value.trim() && cb("phone=" + this.value, function (a) {
              if (a.IsExist)
                for (a = 0; a < d.childNodes.length; a++) - 1 !== d.childNodes[a].getAttribute("class").indexOf("phoneid") && (d.childNodes[a].childNodes[2].innerHTML = "phone already exists, enter unique phone number");
              else
                for (a = 0; a < d.childNodes.length; a++) - 1 !== d.childNodes[a].getAttribute("class").indexOf("phoneid") && (d.childNodes[a].childNodes[2].innerHTML = "")
            }, onError)
          });
          "emailid" === a[k].name && l.addEvent("keyup", p, function (a) {
            32 == a.keyCode && (this.value = this.value.trim())
          });
          p.setAttribute("id", m + e + "-" + a[k].name);
          a[k].event && l.addEvent(a[k].event, p, a[k].eventCallback);
          if (h.eventsName[p.id])
            if (q = h.eventsName[p.id], R(q))
              for (r = 0; r < q.length; r++) q[r].event && q[r].eventCallback && l.addEvent(q[r].event, p, q[r].eventCallback);
            else l.addEvent(q.event, p, q.eventCallback);
          if ("hidden" === a[k].type) d.appendChild(p);
          else if ("button" === a[k].type) q = document.createElement("div"), q.setAttribute("class", g + "-form-element-content content-" + m + a[k].name), q.appendChild(p), d.appendChild(q);
          else {
            r = document.createElement("label");
            r.setAttribute("for", m + e + "-" + a[k].name);
            r.innerHTML = a[k].display;
            p.setAttribute("class", g + a[k].type + " " + m + a[k].name);
            a[k].rules && -1 !== a[k].rules.indexOf("required") && (p.className += " lr-required");
            q = document.createElement("div");
            q.setAttribute("class", g + "-form-element-content content-" + m + a[k].name);
            "multi" === a[k].type ? (q.appendChild(p), q.appendChild(r)) : (q.appendChild(r), q.appendChild(p));
            if (a[k].style && 0 < a[k].style.length)
              for (r = 0; r < a[k].style.length; r++) q.style[a[k].style[r].key] = a[k].style[r].value;
            b.formValidationMessage && (r = document.createElement("div"), r.setAttribute("id", "validation-" + m + e + "-" + a[k].name), r.setAttribute("class", g + "validation-message validation-" + m + a[k].name), q.appendChild(r));
            if (b.displayPasswordStrength && ("password" === p.name || "newpassword" === p.name) && ("registration" == e || "resetpassword" === e || "setpassword" === e || "changepassword" == e || "socialRegistration" === e || "loginRequiredFieldsUpdate" == e)) {
              r = b.passwordLength && b.passwordLength.min || 6;
              var D = b.passwordLength && b.passwordLength.max || 32;
              if (a[k].rules)
                for (var v = a[k].rules.split("|"), n = 0; n < v.length; n++) - 1 < v[n].indexOf("min_length") ? r = v[n].substring(11, v[n].length - 1) : -1 < v[n].indexOf("max_length") && (D = v[n].substring(11, v[n].length - 1));
              v = document.createElement("meter");
              v.setAttribute("max", "4");
              v.setAttribute("id", e + "-password-strength-meter");
              n = document.createElement("div");
              n.setAttribute("id", e + "-password-strength-text");
              p.parentNode.appendChild(v);
              p.parentNode.appendChild(n);
              var wa = U(r, D),
                x = Math.random();
              l.addEvent("keyup", p, function (a) {
                a = this.value;
                var f = l.elementById(e + "-password-strength-meter"),
                  g = l.elementById(e + "-password-strength-text");
                g.innerHTML = "";
                var d = 0;
                0 < a.length && (d++, a.match(/[a-z]/) && a.match(/[A-Z]/) && d++, a.match(/\d+/) && d++, a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) && d++, 12 < a.length && d++);
                f.value = d;
                f = l.elementById(x) ? l.elementById(x) : document.createElement("style");
                f.type = "text/css";
                f.id = x;
                f.innerHTML = "#" + e + "-password-strength-meter::-webkit-meter-optimum-value { background: " + wa[d].color + " !important; }";
                document.body.appendChild(f);
                "" !== a && 0 < d ? (g.innerHTML = "Strength: " + wa[d].Message, g.style.color = "") : "" !== a && (g.innerHTML = wa[d].Message, g.style.color = wa[d].color)
              })
            }
            d.appendChild(q)
          }
        }
      }
  }

  function w(a, d, e, f, g, m) {
    var k = m || "loginradius-",
      p = m || "loginradius-";
    h.LRPrefix = m + "##loginradius-";
    if ("Captcha" == b.loginLockedType) {
      var q = m + "loginradius-recaptcha_widget_" + d.toLowerCase();
      l.elementById(q, !0);
      Ka();
      La(q, a, "hide")
    }
    h.$hooks.call("beforeFormRender", d, a);
    if (xa.test(b.apiKey)) {
      if (Ma = Na = !1, V(a), W(a), Ga(a), 0 < a.length) {
        q = [];
        var r = document.createElement("form");
        r.setAttribute("name", k + d);
        r.setAttribute("method", "POST");
        ta(a, r, d, q, p, k);
        a = document.createElement("input");
        var n = h.buttonsName[d.toLowerCase()] || O[d.toLowerCase()],
          v = O[d.toLowerCase()].toLowerCase().replace(/ /g, "-");
        a.type = "submit";
        a.value = n;
        a.id = k + "submit-" + v;
        a.setAttribute("class", p + "submit submit-" + k + v);
        r.appendChild(a);
        b.instantLinkLogin && "login" === d && va("instantlinkloginbuttonlabel", r, a, k, p);
        b.instantOTPLogin && "login" === d && va("instantOTPLoginButtonLabel", r, a, k, p);
        J(e, r, na);
        h.$hooks.call("afterFormRender", d, e, p, r);
        na = !1;
        e = new FormValidator(k + d, q, function (a, e) {
          h.$hooks.call("eventCalls", d, p);
          h.mergeFormErrors && 0 < h.mergeFormErrors.length && (a = l.mergeObjects(a, h.mergeFormErrors));
          for (var q = l.elementsByClass(p + "validation-message"), n = 0; n < q.length; n++) q[n].innerHTML = "";
          var D = m + k + "recaptcha_widget";
          D += "_" + d.toLowerCase();
          q = l.elementById(D + "_tencent");
          b.invisibleRecaptcha && (window.onCaptchaSubmit = function (a) {
            f(l.serialize(r));
            grecaptcha.reset(window[D + "lr_recaptcha_widgets_idprefix"])
          });
          q && "none" != q.style.display && (b.tencentCaptcha || b.tencentCaptchaAsFallback && !window.grecaptcha) && 0 == a.length && q.click();
          if (0 < a.length) {
            h.$hooks.call("afterValidation", d);
            for (n = 0; n < a.length; n++)
              if ("g-recaptcha-response" == a[n].Id || a[n].Id === k + "" + d + "-password" && "login" === d && (b.instantLinkLogin && window.lrinstantlinklogin || b.instantOTPLogin && window.lrinstantotplogin)) {
                if (1 == a.length || 0 == a.length) return ua(r, f, D, d), !0
              } else b.formValidationMessage && "resettoken" != a[n].Name && (l.elementById("validation-" + k + d + "-" + a[n].Name).innerHTML = a[n].Message);
            b.formValidationMessage || g(a)
          } else ua(r, f, D, d);
          e && e.preventDefault ? e.preventDefault() : event && (event.returnValue = !1)
        });
        if (h.validationMessages && 0 < h.validationMessages.length)
          for (q = 0; q < h.validationMessages.length; q++)
            if (e.setMessage(h.validationMessages[q].rule, h.validationMessages[q].message), "valid_date" === h.validationMessages[q].rule || "callback_valid_date" === h.validationMessages[q].rule) var P = h.validationMessages[q].message;
        e.registerCallback("valid_date", function (a) {
          var e = a.split("/"); - 1 != a.indexOf("-") && (e = a.split("-"));
          a = parseInt(e[1], 10);
          var f = parseInt(e[0], 10);
          e = parseInt(e[2], 10);
          if (1E3 > e || 3E3 < e || 0 == f || 12 < f) a = !1;
          else {
            var d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (0 == e % 400 || 0 != e % 100 && 0 == e % 4) d[1] = 29;
            a = 0 < a && a <= d[f - 1]
          }
          return a
        }).setMessage("valid_date", P || "The %s field must contain a valid date.");
        e.registerCallback("custom_validation", function (a, e) {
          var f = e.split("###")[0];
          f = (new RegExp(f, "g")).test(a) ? !0 : !1;
          return f
        }).setMessage("custom_validation", "The %s field is not valid.");
        h.Validator = e
      }
    } else h.log("apiKey is not in valid guid format.")
  }

  function ua(a, d, e, f) {
    f = l.elementById(e + "_tencent");
    var g = l.elementById(e);
    window.grecaptcha && b.invisibleRecaptcha && g && "" != l.elementById(e).innerHTML && "none" != g.style.display ? grecaptcha.execute(window[e + "lr_recaptcha_widgets_idprefix"]) : f && "none" != f.style.display && (b.tencentCaptcha || b.tencentCaptchaAsFallback && !window.grecaptcha) ? window.onTencentCaptchaSubmitCallback = function (e) {
      var f = l.serialize(a);
      f += "&qq_captcha_ticket=" + e.ticket;
      f += "&qq_captcha_randstr=" + e.randstr;
      d(f)
    } : d(l.serialize(a))
  }

  function J(a, d, e, f, g) {
    e = e || !1;
    var b = l.elementById(a);
    if (b || f) e || (b.innerHTML = ""), f ? (e = O[f.toLowerCase()], e = l.elementById((g || "loginradius-") + "submit-" + e.toLowerCase().replace(/ /g, "-")), e.parentNode.insertBefore(d, e)) : b.appendChild(d);
    else if ((b = l.elementsByClass(a)) && 0 < b.length)
      for (g = 0; g < b.length; g++) e || (b[g].innerHTML = ""), b[g].appendChild(d)
  }

  function va(a, d, e, f, g) {
    var b = "linksignin";
    "instantOTPLoginButtonLabel" === a && (b = "otpsignin");
    var k = document.createElement("input");
    k.type = "submit";
    var p = h.buttonsName[a.toLowerCase()] || O[a.toLowerCase()],
      q = O[a.toLowerCase()];
    k.value = p;
    k.id = f + b + "-" + q.toLowerCase().replace(/ /g, "-");
    k.setAttribute("class", g + b + " " + b + "-" + f + q.toLowerCase().replace(/ /g, "-"));
    d.appendChild(k);
    "instantOTPLoginButtonLabel" === a ? (l.addEvent("click", e, function (a) {
      window.lrinstantotplogin = !1
    }), l.addEvent("click", k, function (a) {
      window.lrinstantotplogin = !0
    })) : (l.addEvent("click", e, function (a) {
      window.lrinstantlinklogin = !1
    }), l.addEvent("click", k, function (a) {
      window.lrinstantlinklogin = !0
    }))
  }

  function X(a, d, e) {
    d = l.keysToLowerCase(d);
    var f = [];
    Object.keys(a).forEach(function (e) {
      f.push(a[e])
    });
    for (var g = 0; g < a.length; g++)
      if (null != a[g])
        if ("emailid" === a[g].name.toLowerCase() && d.email && d.email[0] && d.email[0].value && "" != d.email[0].value)
          if (d.emailverified || b.disabledEmailVerification || b.optionalEmailVerification) f[g].value = d.email[0].value, a[g] = null;
          else {
            if (!b.askEmailForUnverifiedProfileAlways || h.setHostedToken) f[g] = a[g] = null
          }
    else if ("country" === a[g].name.toLowerCase() && d.country && null != d.country.name && "" != d.country.name && "unknown" != d.country.name.toLowerCase()) f[g].value = d.country.name, d.country.code && (f[g].value = d.country.code + "|" + f[g].value), a[g] = null;
    else if ("emailsubscription" === a[g].name.toLowerCase() && d.isemailsubscribed && "" != d.isemailsubscribed) f[g].value = d.isemailsubscribed, a[g] = null;
    else if ("phoneid" === a[g].name.toLowerCase() && d.phoneid && "" != d.phoneid) f[g].value = d.phoneid.replace("+", ""), a[g] = null;
    else if ("birthdate" === a[g].name.toLowerCase() && d.birthdate && "" != d.birthdate) {
      var m = d.birthdate.replace("-", "/").replace("-", "/").split("/");
      m[2] && "" != m[2] && (f[g].value = d.birthdate, a[g] = null)
    } else if ("password" === a[g].name.toLowerCase()) null == d.password && (b.promptPasswordOnSocialLogin || d.firstlogin && b.promptPasswordOnFirstLoginForSocial) || (f[g] = a[g] = null);
    else if ("confirmpassword" === a[g].name.toLowerCase()) null == d.password && (b.promptPasswordOnSocialLogin || d.firstlogin && b.promptPasswordOnFirstLoginForSocial) || (f[g] = a[g] = null);
    else if ("" != a[g].Parent && void 0 !== a[g].Parent && null !== a[g].Parent) {
      if (a[g].Parent && d[a[g].Parent.toLowerCase()] && void 0 !== d[a[g].Parent.toLowerCase()]) {
        m = -1 != a[g].name.indexOf("_") ? a[g].name.split("_")[1] : a[g].name;
        var k = Object.keys(d[a[g].Parent.toLowerCase()]).length - 1;
        "object" == typeof d[a[g].Parent.toLowerCase()] && d[a[g].Parent.toLowerCase()][k] && d[a[g].Parent.toLowerCase()][k][m.toLowerCase()] ? null != d[a[g].Parent.toLowerCase()][k][m.toLowerCase()] && void 0 !== d[a[g].Parent.toLowerCase()][k][m.toLowerCase()] && "unknown" !== d[a[g].Parent.toLowerCase()][k][m.toLowerCase()] && (f[g].value = d[a[g].Parent.toLowerCase()][k][m.toLowerCase()], a[g] = null) : (f[g].value = d[a[g].Parent.toLowerCase()][a[g].name.toLowerCase()], a[g] = null)
      }
    } else 0 === a[g].name.indexOf("cf_") && d.customfields && d.customfields[a[g].name.replace("cf_", "").toLowerCase()] ? (f[g].value = d.customfields[a[g].name.replace("cf_", "").toLowerCase()], a[g] = null) : a[g].name && "object" != typeof d[a[g].name.toLowerCase()] && null != d[a[g].name.toLowerCase()] && "" != d[a[g].name.toLowerCase()] && void 0 !== d[a[g].name.toLowerCase()] && "unknown" !== d[a[g].name.toLowerCase()] && (f[g].value = d[a[g].name.toLowerCase()], a[g] = null);
    a = a.filter(function (a) {
      return a
    });
    if (e && "profileeditor" == e && !d.ErrorCode) return f = f.filter(function (a) {
      return a
    });
    for (g = 0; g < a.length; g++)
      if (null != a[g].rules && "" != a[g].rules && -1 < a[g].rules.indexOf("required") || b.askOptionalFieldsOnRegistration && !0 === d.firstlogin) return e && !d.ErrorCode ? f = f.filter(function (a) {
        return a
      }) : a;
    return []
  }

  function Y(a, d, e, f, g, m) {
    b.selector = a;
    var k = [];
    a = function (a) {
      LRProvidersList = a;
      if (b.providerCountry && !b.providersList) {
        a = b.providerCountry;
        for (var m = LRProvidersList, p = [{
            Name: "Facebook",
            country: "global",
            except: "china"
          }, {
            Name: "Google",
            country: "global",
            except: "china"
          }, {
            Name: "Yahoo",
            country: "global",
            except: "china"
          }, {
            Name: "Live",
            country: "global",
            except: "china"
          }, {
            Name: "Twitter",
            country: "global",
            except: "china"
          }, {
            Name: "Linkedin",
            country: "global",
            except: "china"
          }, {
            Name: "Myspace",
            country: "US"
          }, {
            Name: "Foursquare",
            country: "global",
            except: "china"
          }, {
            Name: "Vkontakte",
            country: "Russia"
          }, {
            Name: "Renren",
            country: "China"
          }, {
            Name: "QQ",
            country: "China"
          }, {
            Name: "Kaixin",
            country: "China"
          }, {
            Name: "Github",
            country: "global",
            except: "china"
          }, {
            Name: "Mailru",
            country: "Russia"
          }, {
            Name: "Amazon",
            country: "US"
          }, {
            Name: "Paypal",
            country: "global"
          }, {
            Name: "Salesforce",
            country: "global"
          }, {
            Name: "ODNOKLASSNIKI",
            country: "Russia"
          }, {
            Name: "WORDPRESS",
            country: "global"
          }, {
            Name: "GOOGLEPLUS",
            country: "global",
            except: "china"
          }, {
            Name: "Disqus",
            country: "global",
            except: "china"
          }, {
            Name: "INSTAGRAM",
            country: "global",
            except: "china"
          }, {
            Name: "SINAWEIBO",
            country: "China"
          }, {
            Name: "XING",
            country: "Germany"
          }, {
            Name: "PINTEREST",
            country: "global",
            except: "china"
          }, {
            Name: "LINE",
            country: "global"
          }, {
            Name: "AOL",
            country: "US"
          }], n = 0; n < p.length; n++)
          for (var v = 0; v < m.length; v++) !m[v] || m[v].Name.toLowerCase() !== p[n].Name.toLowerCase() || p[n].country.toLowerCase() === a.toLowerCase() || "global" === p[n].country.toLowerCase() && !p[n].except || p[n].except && p[n].except.toLowerCase() !== a.toLowerCase() || m.splice(v, 1);
        LRProvidersList = m
      }
      h.$hooks.call("socialInterfaceProviders", LRProvidersList);
      if (b.providersList) var P = b.providersList;
      a = b.hashTemplate ? l.hashTmpl : l.tmpl;
      m = e.split(",");
      p = l.getQueryParameterByName("scope");
      "" == b.scope && p && (b.scope = p);
      p = "&callback=" + b.callbackUrl + "&same_window=" + b.callbackInsideSameWindow + "&is_access_token=" + b.accessTokenResponse + "&callbacktype=" + b.callbackType + "&disablesignup=" + b.disableSignup; - 1 == p.indexOf() && (p += "&scope=" + b.scope);
      b.isMobile && (p = "&ismobile=true");
      g && (p += "&ac_linking=true");
      b.isCustomScope && (p += "&is_custom_scope=true");
      n = l.getThisObjectName();
      for (v = 0; v < m.length; v++) {
        var t = l.elementById(m[v]);
        t && (templateData = t.innerHTML, -1 != templateData.indexOf("ac_linking") && (p = p.replace("&ac_linking=true", "")));
        t = [];
        k[v] = "";
        for (var x = 0; x < LRProvidersList.length; x++) {
          LRProvidersList[x].ObjectName = n; - 1 == LRProvidersList[x].Endpoint.indexOf("callback=") && (LRProvidersList[x].Endpoint += p);
          var u;
          var w = u = !1;
          d && d[LRProvidersList[x].Name.toLowerCase()] && (u = !0, w = d[LRProvidersList[x].Name.toLowerCase()]);
          LRProvidersList[x].isLinked = u;
          LRProvidersList[x].providerId = w;
          (b.unLinkAccountCallbackUrl || window.location.href).indexOf("?");
          t.push(LRProvidersList[x])
        }
        u = [];
        for (x = 0; x < t.length; x++) t[x].isLinked && u.push(t[x]);
        if (0 < u.length) {
          for (x = 0; x < t.length; x++) t[x].isLinked || u.push(t[x]);
          t = u
        }
        for (x = 0; x < t.length; x++)
          if ("" != m[v])
            if (void 0 !== P) {
              if (-1 != P.indexOf(t[x].Name) || -1 != P.indexOf(t[x].Name.toLowerCase())) k[v] += a(m[v], t[x])
            } else k[v] += a(m[v], t[x])
      }
      P = b.selector.split(",");
      for (a = 0; a < P.length; a++)
        if (m = P[a], 0 == m.indexOf(".")) {
          if (m = m.replace(".", ""), (m = l.elementsByClass(m)) && 0 < m.length)
            for (p = 0; p < m.length; p++) m[p].innerHTML = f ? m[p].innerHTML + k[a] : k[a]
        } else "" != m && (m = l.elementById(m)) && (m.innerHTML = f ? m.innerHTML + k[a] : k[a])
    };
    m ? a(m) : void 0 != b.SocialSchema && a(b.SocialSchema.Providers)
  }

  function C(a, d) {
    b.passwordLength = b.passwordlength || b.passwordLength;
    a && b.passwordLength && b.passwordLength.min && b.passwordLength.max && (a.rules = a.rules || "", a.rules = a.rules.replace("min_length[6]", "min_length[" + b.passwordLength.min + "]").replace("max_length[32]", "max_length[" + b.passwordLength.max + "]"));
    d && (a.rules = "required")
  }

  function ka(a) {
    if (b.stayLogin) {
      for (var d = !0, e = 0; e < a.length; e++) "stayLogin" === a[e].name && (d = !1);
      d && a.push({
        type: "multi",
        name: "stayLogin",
        display: "Remember me",
        rules: null,
        permission: "w"
      })
    }
    return a
  }

  function u(a) {
    if (window[a]) {
      a = window[a];
      try {
        return a.setItem("test", "1"), a.removeItem("test"), !0
      } catch (d) {
        return !1
      }
    } else return !1
  }

  function B(a, d) {
    var e = !0;
    u("localStorage") && (localStorage.setItem(a, d), e = !1);
    u("sessionStorage") && (sessionStorage.setItem(a, d), e = !1);
    e && h.documentCookies.setItem(a, d, "", b.appPath)
  }

  function z(a) {
    if ("LRTokenKey" == a) {
      var d = z("lr-session-token");
      if (d) return d = d.replace(/"/g, ""), B("LRTokenKey", d), d
    }
    return u("localStorage") && null !== localStorage.getItem(a) && void 0 !== localStorage.getItem(a) && "" !== localStorage.getItem(a) ? localStorage.getItem(a) : u("sessionStorage") && null !== sessionStorage.getItem(a) && void 0 !== sessionStorage.getItem(a) && "" !== sessionStorage.getItem(a) ? sessionStorage.getItem(a) : h.documentCookies.getItem(a)
  }

  function Z(a) {
    var d = !0;
    u("localStorage") && (localStorage.removeItem(a), d = !1);
    u("sessionStorage") && (sessionStorage.removeItem(a), d = !1);
    d && h.documentCookies.removeItem(a, b.appPath)
  }

  function L(a, d, e, f, g) {
    S = 0;
    ba = "";
    if (a)
      if (a.ErrorCode) f(n(m));
      else if (h.setHostedToken) e(a);
    else {
      var m = a.Profile || a.Data;
      g = !(b.disabledEmailVerification || b.optionalEmailVerification);
      if (m && !m.EmailVerified && g) f([t(y.emailNotVerified)]);
      else {
        m && m.Uid && B("lr-user-uid", m.Uid);
        B("LRTokenKey", a.access_token);
        T && oa(a.access_token);
        m = !!(-1 == navigator.userAgent.toLowerCase().indexOf("crios") && -1 == navigator.userAgent.toLowerCase().indexOf("chrome") && 0 <= navigator.userAgent.toLowerCase().indexOf("safari"));
        g = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        var k = 0 <= navigator.userAgent.toLowerCase().indexOf("ucbrowser");
        m && T || g && k ? (b.askRequiredFieldForTraditionalLogin || B("LRTraditionalLogin", !0), m = b.customDomain || b.appName + ".hub.loginradius.com", b.stayLogin ? (g = z("lr-rememberme"), Z("lr-rememberme"), window.location = "http://" + m + "/ssologin/setCustomSafariToken?token=" + a.access_token + "&apiKey=" + b.apiKey + "&isrememberMe=" + g + "&callback=" + window.location.href) : window.location = "http://" + m + "/ssologin/setSafariToken?token=" + a.access_token + "&apiKey=" +
          b.apiKey + "&callback=" + window.location.href) : (g = "", k = "setToken", b.stayLogin && (g = "&isrememberMe=" + z("lr-rememberme"), Z("lr-rememberme"), k = "setCustomToken"), m = b.customDomain || b.appName + ".hub.loginradius.com", l.jsonpCall("https://" + m + "/ssologin/" + k + "?token=" + a.access_token + "&apiKey=" + b.apiKey + g, function () {
          h.LoginRadiusHostedPage && h.documentCookies.setItem("lr-session-token", a.access_token);
          S++;
          ba = a;
          b.tokenType && "jwt" == b.tokenType.toLowerCase() ? 2 == S && (a.jwttoken = lrCounterResponse.signature, null != d && "" != d ? e(a, l.parseQueryString(d)) : e(a)) : null != d && "" != d ? e(a, l.parseQueryString(d)) : e(a)
        }, "", "setToken"), b.tokenType && "jwt" == b.tokenType.toLowerCase() && Ia(a.access_token, e, f))
      }
    }
  }

  function Ia(a, d, e) {
    l.ajaxCall("get", "https://cloud-api.loginradius.com//sso/jwt/api/token?apikey=" + b.apiKey + "&jwtapp=" + b.integrationName + "&access_token=" + a, "", function (a) {
      S++;
      2 == S && (a.ErrorCode ? e(a) : (ba.jwttoken = a.signature, d(ba)))
    }, "JWTToken")
  }

  function H(a, d, e, f, g, m) {
    B("LRTokenKey", d.access_token);
    (function (k) {
      k = JSON.parse(JSON.stringify(k));
      k = k.RegistrationFormSchema;
      a.IsDeleted ? m(n(a)) : (b.autoFilledFieldForTraditional && h.$hooks.register("beforeFormRender", function (a, e) {
        if ("loginRequiredFieldsUpdate" == a) {
          var f = E(e, "name", "emailid");
          f && f.value && (f.disabled = !0);
          (f = E(e, "name", "phoneid")) && f.value && (f.disabled = !0)
        }
      }), h.registrationFormSchema = X(k, a, b.autoFilledFieldForTraditional), 0 < h.registrationFormSchema.length ? (C(E(k, "name", "password")), C(E(k, "name", "confirmpassword")), h.$hooks.call("registrationSchemaFilter", k, a), f(a, d, d.access_token, e, g, m)) : L(d, e, g, m))
    })(h.options)
  }

  function N(a) {
    var d = l.parseQueryString(a);
    if (d.emailid || d.email)
      if (b.duplicateEmailWithUniqueUsername && !d.username) a = a.replace("emailid", "username").replace("email", "username");
      else {
        d = d.emailid || d.email;
        var e = /^(\\+)|(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{8,14}$/;
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(d) ? a = a.replace("emailid", "email") : b.phoneLogin && e.test(d) && !window.lrinstantlinklogin ? a = a.replace("emailid", "phone").replace("email", "phone") : b.usernameLogin && (a = a.replace("emailid", "username").replace("email", "username"))
      }
    return a
  }

  function Ja(a, d, e, f) {
    a && l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/login/oneclickverify?apiKey=" + b.apiKey + "&verificationtoken=" + a + "&welcomeEmailTemplate=" + b.welcomeEmailTemplate, "", function (a) {
      a.ErrorCode ? e(n(a)) : L(a, "", d, e, f)
    }, "instantLinkLoginVerification")
  }

  function Kb(a, d, e) {
    var f = ca();
    "oneclicksignin" != ya() || h.instantLinkLoginFlag || (h.instantLinkLoginFlag = !0, Ja(f, a, d, e))
  }

  function Lb(a, d) {
    b.securityQuestionEnabled && (secqdata = A(JSON.parse(a)), a = "string" === typeof a || a instanceof String ? JSON.stringify(l.parseQueryString(a)) : JSON.stringify(a), db(secqdata, function (a) {
      if (0 < a.length)
        for (var e = 0; e < a.length; e++) - 1 != secqdata.indexOf(a[e].name) && a.splice(e, 1);
      if (0 < a.length) {
        e = document.createElement("div");
        var b = [],
          m = h.LRPrefix.split("##");
        ta(a, e, d, b, m[0], m[1]);
        new FormValidator(m[1] + d, b, function (a) {
          h.mergeFormErrors = a
        });
        h.$hooks.register("startProcess", function (e, f) {
          if (f) {
            for (var d = {}, b = 0; b < a.length; b++) f && f[a[b].name] && (d[a[b].name] = f[a[b].name], delete f[a[b].name]);
            f.securityanswer = d
          }
        });
        J("", e, !0, d, m[0])
      }
    }))
  }

  function Oa(a, d, e, f, g, m, k, p, h) {
    b.verificationEmailTemplate = b.emailTemplate || b.verificationEmailTemplate;
    var q = "emailTemplate=" + b.verificationEmailTemplate + "&verificationUrl=" + b.verificationUrl;
    b.phoneLogin && (q += "&smsTemplate=" + b.smsTemplatePhoneVerification);
    b.riskBasedAuthentication && (q += "&RbaOneclickEmailTemplate=" + b.rbaOneclickEmailTemplate + "&RbaOTPSmsTemplate=" + b.rbaOTPSmsTemplate + "&RbaCityEmailTemplate=" + b.rbaCityEmailTemplate + "&RbaCountryEmailTemplate=" + b.rbaCountryEmailTemplate + "&RbaBrowserEmailTemplate=" + b.rbaBrowserEmailTemplate + "&RbaIpEmailTemplate=" + b.rbaIpEmailTemplate + "&RbaCitySmsTemplate=" + b.rbaCitySmsTemplate + "&RbaCountrySmsTemplate=" + b.rbaCountrySmsTemplate, q += "&RbaBrowserSmsTemplate=" + b.rbaBrowserSmsTemplate + "&RbaIpSmsTemplate=" + b.rbaIpSmsTemplate);
    a = N(a);
    if ("string" === typeof a || a instanceof String) a = l.parseQueryString(a);
    b.duplicateEmailWithUniqueUsername && (delete a.email, delete a.phoneid);
    q = "https://api.loginradius.com/identity/v2/auth/login?apiKey=" + b.apiKey + "&loginUrl=" + b.loginUrl + "&" + q;
    a["g-recaptcha-response"] && (q += "&g-recaptcha-response=" + a["g-recaptcha-response"], delete a["g-recaptcha-response"]);
    a.qq_captcha_randstr && (q += "&qq_captcha_randstr=" + a.qq_captcha_randstr, delete a.qq_captcha_randstr);
    a.qq_captcha_ticket && (q += "&qq_captcha_ticket=" +
      a.qq_captcha_ticket, delete a.qq_captcha_ticket);
    l.ajaxCall("post", q, a, function (l) {
      b.stayLogin && B("lr-rememberme", a.stayLogin);
      l.ErrorCode ? ("970" == l.ErrorCode && b.otpEmailVerification && !b.verifyEmailByOTP ? eb(d, e, f, k, a) : "1167" == l.ErrorCode && l.PhoneId ? (delete a.email, a.phone = l.PhoneId, pa(a, d, e, f, k, "no")) : b.phoneLogin && "1066" == l.ErrorCode && (F = p || F, G = h || G, F(a, d, e, f, k, g, m), G(a, d, e, f, k, g, m)), f(n(l))) : da(l, a, m, g, e, f, k)
    }, "login")
  }

  function da(a, d, e, f, g, m, k) {
    var p = a.Profile;
    "string" !== typeof d && (d = A(d));
    f && b.periodicPasswordReset && p.PasswordExpirationDate && new Date(p.PasswordExpirationDate) <= new Date ? (C(h.changePasswordFormSchema[1]), C(h.changePasswordFormSchema[2]), f(p, a)) : e && (b.askRequiredFieldForTraditionalLogin || Pa) ? H(p, a, d, e, g, m) : L(a, d, g, m, k)
  }

  function fb(a, d, e, f) {
    l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/login/passwordlesslogin/otp/verify?apiKey=" + b.apiKey + "&smsTemplate=" + b.smsTemplateWelcome, "phone=" + d.phone + "&" + a, function (d) {
      d.ErrorCode ? f(n(d)) : L(d, a, e, f)
    }, "login##otp")
  }

  function pa(a, d, e, f, g, m) {
    var k = a = N(a);
    if ("string" === typeof a || a instanceof String) k = l.parseQueryString(a);
    if (k.email || k.username) gb(a, e, f);
    else {
      h.$hooks.register("beforeFormRender", function (b, m) {
        E(m, "name", "resendotp") || m.push({
          type: "button",
          name: "resendotp",
          display: "Resend OTP",
          rules: "",
          permission: "r",
          event: "click",
          eventCallback: function (b) {
            pa(a, d, e, f, g)
          }
        })
      });
      var p = function (a) {
        d ? w(h.otpSchema, "otp", d, function (a) {
          fb(a, k, e, f)
        }, function (a) {
          f(t(a))
        }, g) : e(a)
      };
      m ? p() : l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/login/passwordlesslogin/otp?apiKey=" +
        b.apiKey + "&phone=" + k.phone + "&smsTemplate=" + b.smsTemplateInstantOTPLogin, "",
        function (a) {
          a.ErrorCode ? f(n(a)) : p(a)
        }, "loginOTP")
    }
  }

  function hb(a, d, e, f, g, m, k, p, q, r) {
    h.LRCheck2FA = !0;
    a = N(a);
    handle2FAResponse = function (a, h, n) {
      h = h || "";
      n = n || "";
      var v = ea("sendotp", g);
      b.googleAuthentication && (!h && b.twoFactorAuthentication || n) && ib(a, d, e, f, g, m, k);
      if (!h && !n && b.twoFactorAuthentication) fa = p || fa, fa(d, e, f, g, "", m, k);
      else if (!n && b.twoFactorAuthentication || h || b.optionalTwoFactorAuthentication && !h && "" != a.SecondFactorAuthentication.OTPPhoneNo && null != a.SecondFactorAuthentication.OTPPhoneNo)
        if (n)
          if (g = g || "loginradius-", b.googleAuthentication) {
            var D = document.getElementsByName(g + "showQRcode")[0];
            D && D.appendChild(v)
          } else J(d, v);
      else F = q || F, G = r || G, F(a, d, e, f, g, m, k), G(a, d, e, f, g, m, k);
      if (h || n) h = ea("backupcodebutton", g), J(d, h, !0), l.addEvent("click", h, function (a) {
        Mb(d, e, f, g, m, k)
      });
      l.addEvent("click", v, function (b) {
        jb("phoneNo2FA=" + a.SecondFactorAuthentication.OTPPhoneNo, d, e, f, g, m, k);
        F = q || F;
        G = r || G;
        F(a, d, e, f, g, m, k);
        G(a, d, e, f, g, m, k)
      })
    };
    var D = "https://api.loginradius.com/identity/v2/auth/login/2FA/";
    b.verificationEmailTemplate = b.emailTemplate || b.verificationEmailTemplate;
    var v = "post";
    window.lrbackupcode ? (D = D + "backupcode?apiKey=" + b.apiKey + "&" + a, v = "get", postBody = "") : (D = D + "?apiKey=" + b.apiKey + "&loginUrl=" + b.loginUrl + "&emailTemplate=" + b.verificationEmailTemplate + "&verificationUrl=" + b.verificationUrl + "&smsTemplate=" + b.smsTemplateWelcome + "&smsTemplate2FA=" + b.smsTemplate2FA, postBody = l.parseQueryString(a));
    l.ajaxCall(v, D, postBody, function (h) {
      b.stayLogin && B("lr-rememberme", l.getQueryParameterByName("stayLogin", a));
      if (h.ErrorCode) {
        if (b.phoneLogin && "1066" == h.ErrorCode) {
          var p = "phone=" + l.getQueryParameterByName("phone", a);
          p += "&noPhoneVerified=false";
          b.optionalTwoFactorAuthentication = !1;
          b.twoFactorAuthentication = !1;
          F = q || F;
          G = r || G;
          F(p, d, e, f, g, m, k);
          G(p, d, e, f, g, m, k)
        }
        f(n(h))
      } else h.SecondFactorAuthentication ? (B("lr2fatok", h.SecondFactorAuthentication.SecondFactorAuthenticationToken), B("lrotpauthver", h.SecondFactorAuthentication.IsOTPAuthenticatorVerified), "00000000-0000-0000-0000-000000000000" == h.access_token && handle2FAResponse(h, h.SecondFactorAuthentication.IsOTPAuthenticatorVerified, h.SecondFactorAuthentication.IsGoogleAuthenticatorVerified)) : da(h, a, k, m, e, f, g)
    }, "login")
  }

  function Nb(a, d, e, f) {
    var g = ca();
    "oneclicksignin" != ya() || h.instantLinkLoginFlag || (h.instantLinkLoginFlag = !0, Ja(g, d, e, f));
    g = h.loginFormSchema;
    h.loginAction = !0;
    qa(g);
    g = JSON.parse(JSON.stringify(ka(g)));
    C(g[1], h.loginAction);
    w(g, "login", a, function (g) {
      h.LRCheckLogin = !0;
      window.lrinstantlinklogin ? gb(g, d, e) : window.lrinstantotplogin ? pa(g, a, d, e, f) : (_requiredField = function (e, d, b, g, m, l) {
        w(h.registrationFormSchema, "loginRequiredFieldsUpdate", a, function (d) {
          var g = {};
          g.Profile = e;
          g.access_token = b;
          ha(g, a, d, m, l, f, h.registrationFormSchema, "login", !0)
        }, function (a) {
          l(t(a))
        })
      }, _passwordExpiry = function (f, b) {
        w(h.changePasswordFormSchema, "changepassword", a, function (a) {
          Ob(a, d, e, f, b, g)
        }, function (a) {
          e(a)
        })
      }, b.twoFactorAuthentication || b.optionalTwoFactorAuthentication ? hb(g, a, d, e, f, _passwordExpiry, _requiredField) : Oa(g, a, d, e, _passwordExpiry, _requiredField, f))
    }, function (a) {
      e(t(a))
    }, f)
  }

  function Qa(a, d, e) {
    var f, g = l.elementById(a);
    if (b.v2Recaptcha || d || b.invisibleRecaptcha || b.tencentCaptcha || b.tencentCaptchaAsFallback) {
      window.grecaptcha && g && g.innerHTML && grecaptcha.reset(window[a + "lr_recaptcha_widgets_idprefix"]);
      var m = setInterval(function () {
        f || (f = setInterval(function () {
          if (window.grecaptcha) {
            if (g && "" == g.innerHTML) {
              var d = {
                sitekey: b.v2RecaptchaSiteKey || "6LeAiwITAAAAADlqb06JIGepBs8ZRo3OZ7C0W7U3",
                theme: "light",
                callback: function (a) {
                  g.style.display = "block";
                  e && e(a)
                }
              };
              b.invisibleRecaptcha && (d.size = "invisible", d.callback = "onCaptchaSubmit");
              window[a + "lr_recaptcha_widgets_idprefix"] = grecaptcha.render(a, d);
              clearInterval(f)
            }
          } else {
            -1 == a.indexOf("_tencent") && (a += "_tencent");
            if (d = document.getElementById(a)) d.style.display = "block";
            "undefined" != typeof TencentCaptcha && (new TencentCaptcha(document.getElementById(a)), clearInterval(f))
          }
        }, 1E3), clearInterval(m))
      }, 1E3)
    }
  }

  function Ka(a) {
    window.grecaptcha || !b.v2Recaptcha && !a ? b.invisibleRecaptcha && l.addJs("https://www.google.com/recaptcha/api.js") : b.v2RecaptchaLanguage ? l.addJs("https://www.google.com/recaptcha/api.js?render=explicit&hl=" + b.v2RecaptchaLanguage) : l.addJs("https://www.google.com/recaptcha/api.js?render=explicit");
    (b.tencentCaptcha || b.tencentCaptchaAsFallback) && l.addJs("https://ssl.captcha.qq.com/TCaptcha.js")
  }

  function kb(a, d, e) {
    d = l.parseQueryString(d);
    e = {};
    var f = {},
      g = {},
      m = [],
      k;
    for (k in d)
      if (-1 !== k.indexOf("cf_")) {
        var h = k.replace("cf_", "");
        e[h] = d[k];
        delete d[k]
      } else if ("emailsubscription" == k) d.IsEmailSubscribed = "on" == d[k] || "true" == d[k] ? !0 : !1, delete d[k];
    else if ("emailid" == k || "email" == k) f.value = d[k], f.type = "Primary";
    else if ("SecurityQuestionAnswer" !== k && -1 !== k.indexOf("securityQuestion")) {
      var q = {};
      for (h = 0; h < b.securityQuestionsCount; h++) d["securityAnswer" + h] && d["securityQuestion" + h] && (q[d["securityQuestion" + h]] = d["securityAnswer" + h]), delete d["securityQuestion" + h], delete d["securityAnswer" + h];
      0 != Object.keys(q).length && (d.SecurityQuestionAnswer = q)
    } else if ("country" == k) g = -1 !== d[k].indexOf("|") ? {
      code: d[k].split("|")[0],
      name: d[k].split("|")[1]
    } : {
      code: "",
      name: d[k]
    };
    else if ((q = E(a, "name", k)) && q.Parent) {
      h = -1 != k.indexOf("_") ? k.split("_")[1] : k;
      if ("undefined" == typeof d[q.Parent]) {
        d[q.Parent] = [];
        var r = {};
        r[h] = d[k];
        "Addresses" == q.Parent ? r.type = "personal" : "PhoneNumbers" != q.Parent || r.phonetype || (r.phonetype = "default");
        d[q.Parent].push(r)
      } else "Addresses" != q.Parent || d[q.Parent][0].type || (d[q.Parent][0].type = "personal"), d[q.Parent][0][h] = d[k];
      delete d[k]
    }
    0 !== Object.keys(e).length && (d.CustomFields = e);
    0 !== Object.keys(f).length && (m.push(f), d.email = m);
    0 !== Object.keys(g).length && (d.country = g);
    return d
  }

  function za(a, d, e) {
    var f = "https://api.loginradius.com/identity/v2/auth/phone/otp?apiKey=" + b.apiKey + "&smsTemplate=" + (a.updatePhone ? b.smsTemplateUpdatePhone : b.smsTemplatePhoneVerification),
      g = "post";
    a.noregistrationFlag && (g = "get", "string" !== typeof a && (a = A(a)), f = "https://api.loginradius.com/identity/v2/auth/noregistration/phone?apikey=" + b.apiKey + "&" + a + "&smstemplate=" + b.smsTemplateNoRegistration);
    l.ajaxCall(g, f, a, function (a) {
      a.ErrorCode ? e(n(a)) : (h.log(y.otpSent), d(a))
    }, "resendOTP")
  }

  function lb(a, d, e) {
    var f = z("lr2fatok"),
      g = z("LRTokenKey");
    g && !h.LRCheckLogin ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/account/2FA?apiKey=" + b.apiKey + "&access_token=" + g + "&smsTemplate=" + b.smsTemplate2FA, a, function (a) {
      a.ErrorCode ? e(n(a)) : (h.log(y.otpSent), d(a))
    }, "resendOTP") : f ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/login/2FA/resend?apiKey=" + b.apiKey + "&SecondFactorAuthenticationToken=" + f + "&smsTemplate2FA=" + b.smsTemplate2FA, "", function (a) {
      a.ErrorCode ? e(n(a)) : h.log(y.otpSent)
    }, "resendOTP") : e([t(y.twofaTokenValid)])
  }

  function G(a, d, e, f, b, m, k) {
    var g = !0;
    if ("string" === typeof a || a instanceof String) a = l.parseQueryString(a);
    a.noPhoneVerified && (g = !1);
    var q = !0;
    if (a.phoneid || a.phoneId) {
      q = !1;
      var r = {
        phone: a.phoneid || a.phoneId
      }
    } else a.phone ? (h.socialLoginFlag || (q = !1), r = a) : a.phoneNo2FA || a.phoneno2fa ? r = {
      phoneno2fa: a.phoneNo2FA || a.phoneno2fa
    } : a.SecondFactorAuthentication && a.SecondFactorAuthentication.OTPPhoneNo && (r = {
      phoneno2fa: a.SecondFactorAuthentication.OTPPhoneNo
    });
    var n = ea("resendotp", b);
    b = b || "loginradius-";
    var v = q ? "twofaotp" : "otp",
      t = document.getElementsByName(b + v)[0];
    t || (t = document.getElementsByName(b + ("twofaotp" == v ? "otp" : "twofaotp"))[0]);
    t && t.appendChild(n);
    !h.LRCheckLogin || !q || g && "false" != z("lrotpauthver") || mb(d, t, e, f, b, "", m, k);
    a.noregistrationFlag && (r.noregistrationFlag = !0);
    a.updatePhone && (r.updatePhone = !0);
    l.addEvent("click", n, function (a) {
      jb(r, d, e, f, b, m, k)
    })
  }

  function mb(a, b, e, f, g, m, k, p) {
    var d = ea("changenumber", g),
      r = ea("disableotpauthenticator", g),
      n = z("lrgaauthver"),
      v = z("LRTokenKey");
    b ? (b.appendChild(d), v && !h.LRCheckLogin && "false" != n && b.appendChild(r)) : (J(a, d, m), v && !h.LRCheckLogin && "false" != n && J(a, r, !0));
    l.addEvent("click", r, function (a) {
      Ra("otpauthenticator", e, f)
    });
    l.addEvent("click", d, function (b) {
      document.getElementsByName(g + "changePhone")[0] || fa(a, e, f, g, "changePhone", k, p)
    })
  }

  function ea(a, b) {
    var e = b || "loginradius-";
    if (h.buttonElements[a]) {
      var f = h.buttonElements[a];
      f = f.cloneNode(!0)
    } else f = document.createElement("input"), f.type = "button", f.value = h.buttonsName[a] || O[a];
    f.id = e + "button-" + a;
    return f
  }

  function jb(a, d, e, f, g, m, k) {
    h.LRCheck2FA && (b.twoFactorAuthentication || b.optionalTwoFactorAuthentication) && !h.LRCheckRegistration ? "false" == z("lrotpauthver") ? Sa(a, d, e, f, g, m, k) : lb(a, e, f) : za(a, e, f)
  }

  function nb(a, d, e, f, g, m) {
    var k = "https://api.loginradius.com/identity/v2/auth/phone/otp?apiKey=" + b.apiKey + "&otp=" + a.otp + "&smsTemplate=" + b.smsTemplateWelcome;
    a.noregistrationFlag && (k = "https://api.loginradius.com/identity/v2/auth/noregistration/phone/verify?apiKey=" + b.apiKey + "&otp=" +
      a.otp + "&smsTemplate=" + b.smsTemplateNoRegistrationWelcome);
    d = l.mergeOptions(a, d);
    l.ajaxCall("put", k, d, function (d) {
      d.ErrorCode ? f(n(d)) : a.noregistrationFlag && !b.askRequiredFieldsOnPasswordLessLogin ? L(d, "", e, f) : (Pa = !0, da(d, a, m, g, e, f))
    }, "verifyOTP")
  }

  function Ta(a, d, e, f, g) {
    var m = z("LRTokenKey"),
      k = z("lr2fatok"),
      p = "otp";
    a && -1 != a.indexOf("googleAuthenticatorCode") && (p = "GoogleAuthenticatorCode");
    m && !h.LRCheckLogin ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/account/2FA/Verification/" + p + "?apiKey=" +
      b.apiKey + "&access_token=" + m + "&smsTemplate=" + b.smsTemplate2FAWelcome, a,
      function (f) {
        f.ErrorCode ? e(n(f)) : d(f, a)
      }, "verifyOTP##twofaotp") : k ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/login/2FA/Verification/" + p + "?apiKey=" + b.apiKey + "&SecondFactorAuthenticationToken=" + k + "&smsTemplate2FA=" + b.smsTemplate2FAWelcome, a, function (b) {
      b.ErrorCode ? e(n(b)) : da(b, a, g, f, d, e)
    }, "verifyOTP##twofaotp") : e([t(y.twofaTokenValid)])
  }

  function F(a, d, e, f, g, m, k) {
    var p = !1,
      q = "otp";
    h.LRCheck2FA && (b.twoFactorAuthentication || b.optionalTwoFactorAuthentication) && !h.LRCheckRegistration && (p = !0, q = "twofaotp");
    w(h.otpSchema, q, d, function (b) {
      if (p) Ta(b, e, f, m, k);
      else {
        if ("string" === typeof a || a instanceof String) a = l.parseQueryString(a);
        b = l.parseQueryString(b);
        if (a.phone) var d = {
          phone: a.phone
        };
        else if (a.phoneid || a.phoneId) d = {
          phone: a.phoneid || a.phoneId
        };
        a.noregistrationFlag && (b.noregistrationFlag = !0);
        nb(b, d, e, f, m, k)
      }
    }, function (a) {
      f(a)
    }, g)
  }

  function Pb(a, d, e, f, g) {
    var m = z("lr2fatok");
    m ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/login/2FA/backupcode?apiKey=" +
      b.apiKey + "&SecondFactorAuthenticationToken=" + m + "&" + a + "&smsTemplate2FA=" + b.smsTemplate2FAWelcome, "",
      function (b) {
        b.ErrorCode ? e(n(b)) : da(b, a, g, f, d, e)
      }, "login") : e([t(y.twofaTokenValid)])
  }

  function Mb(a, b, e, f, g, m) {
    w(h.backupCodeFormSchema, "backupcode", a, function (a) {
      Pb(a, b, e, g, m)
    }, function (a) {
      e(a)
    }, f)
  }

  function cb(a, d, e) {
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/phone?apiKey=" + b.apiKey + "&" + a, "", function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "checkPhone")
  }

  function Sa(a, d, e, f, g, m, k, p, q) {
    var r = z("lr2fatok"),
      D = z("LRTokenKey");
    D && !h.LRCheckLogin ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/account/2FA?apiKey=" + b.apiKey + "&access_token=" + D + "&smsTemplate=" + b.smsTemplate2FA, a, function (b) {
      b.ErrorCode ? f(n(b)) : (F = p || F, G = q || G, F(a, d, e, f, g, m, k), G(a, d, e, f, g, m, k), e(b, a))
    }, "updatePhone") : r ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/login/2FA/?apiKey=" + b.apiKey + "&SecondFactorAuthenticationToken=" + r + "&smsTemplate2FA=" + b.smsTemplate2FA, a, function (b) {
      b.ErrorCode ? f(n(b)) : (e(b, a), F = p || F, G = q || G, F(a, d, e, f, g, m, k), G(a, d, e, f, g, m, k))
    }, "login") : f([t(y.twofaTokenValid)])
  }

  function ib(a, d, e, f, g, m, k) {
    var p = h.QRCodeSchema.slice();
    p[0].type = b.maskSensitiveInput ? "password" : "string";
    createQRSchema = function (a, e) {
      a && p.splice(0, 0, {
        type: "image",
        name: "qrcode",
        display: "QR Code",
        rules: "",
        permission: "r",
        value: a
      });
      if (e) {
        var b = b || "loginradius-";
        p.splice(1, 0, {
          type: "button",
          name: "ManualEntryCode",
          display: "Get Manual Entry Code",
          rules: "",
          permission: "r",
          title: "Use this code when you unable to scan QR code. Tap 'Enter a provided key' then enter the email address of your Account and enter this key in your authenticator app",
          event: "click",
          eventCallback: function (a) {
            document.getElementsByClassName("content-" + b + "ManualEntryCode")[0].innerHTML = e
          }
        })
      }
    };
    var q = !0;
    if (a.SecondFactorAuthentication) {
      var n = a.SecondFactorAuthentication.QRCode;
      var D = a.SecondFactorAuthentication.ManualEntryCode;
      a.SecondFactorAuthentication.IsGoogleAuthenticatorVerified || createQRSchema(n, D)
    } else if (q = !1, n = a.QRCode, D = a.ManualEntryCode, !a.IsGoogleAuthenticatorVerified) q = !0, createQRSchema(n, D);
    else if ("false" != z("lrotpauthver") && b.twoFactorAuthentication || b.optionalTwoFactorAuthentication) a = ea("disablegoogleauthenticator", g), J(d, a), l.addEvent("click", a, function (a) {
      Ra("googleauthenticator", e, f)
    });
    q && w(p, "showQRcode", d, function (a) {
      Ta(a, e, f, m, k)
    }, function (a) {
      f(a)
    }, g)
  }

  function ob(a, d, e, f, g, m, k, h, q) {
    var p = z("LRTokenKey");
    p ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/phone?apiKey=" + b.apiKey + "&access_token=" + p + "&smsTemplate=" + b.smsTemplateUpdatePhone, a, function (b) {
      b.ErrorCode ? f(n(b)) : (F = h || F, G = q || G, F(a, d, e, f, g, m, k), G(a + "&updatePhone=true", d, e, f, g, m, k), e(b, a))
    }, "updatePhone") : f([t(y.tokenValid)])
  }

  function fa(a, d, e, f, g, m, k) {
    h.LRCheck2FA && (b.twoFactorAuthentication || b.optionalTwoFactorAuthentication) && (h.checkPhoneNumberSchema[0].name = "phoneNo2FA");
    f = f || "loginradius-";
    document.getElementsByName(f + "showQRcode")[0] && (na = !0);
    w(h.checkPhoneNumberSchema, g || "updatePhone", a, function (g) {
      -1 == g.indexOf("phone=") && (b.twoFactorAuthentication || b.optionalTwoFactorAuthentication) ? Sa(g, a, d, e, f, m, k) : ob(g, a, d, e, f, m, k)
    }, function (a) {
      e(a)
    }, f)
  }

  function pb(a, d, e, f, g) {
    l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/password/otp?apiKey=" + b.apiKey + "&smsTemplate=" + b.smsTemplateWelcome, a, function (b) {
      b.ErrorCode ? e(n(b)) : d(b, a)
    }, "resetPassword")
  }

  function Ua(a, d, e, f, g, m) {
    l.ajaxCall("post", "https://api.loginradius.com/identity/v2/auth/password/otp?apiKey=" + b.apiKey + "&smsTemplate=" + b.smsTemplateForgot, a, function (b) {
      b.ErrorCode ? f(n(b)) : (e(b, a), ra = m || ra, ra(d, e, f, g))
    }, "forgotPassword")
  }

  function qb(a, d, e, f, g, m, k, p) {
    h.LRCheckRegistration = !0;
    m = kb(m, a);
    var q = "emailTemplate=" + b.verificationEmailTemplate + "&verificationUrl=" + b.verificationUrl;
    b.phoneLogin && (q += "&smsTemplate=" + b.smsTemplatePhoneVerification);
    var r = "";
    b.invisibleRecaptcha || b.v2Recaptcha || b.tencentCaptcha ? r = "https://api.loginradius.com/identity/v2/auth/register/captcha?apiKey=" + b.apiKey + "&" + q : b.sott ? (r = "https://api.loginradius.com/identity/v2/auth/register?apiKey=" + b.apiKey + "&" + q, b.enableHeaderSott ? (b.sott = decodeURIComponent(b.sott), m.sottcheck = !0) : r += "&sott=" + l.encodedString(b.sott)) : h.log("url is not set as sott option is not defined");
    "" !== r && l.ajaxCall("post", r, m, function (m) {
      if (m.ErrorCode || m.errorCode) 1049 == m.ErrorCode ? (f([t(y.invalidSott)]), h.log(m.Description)) : f(n(m));
      else if (b.phoneLogin && -1 !== a.indexOf("phoneid")) F = k || F, G = p || G, F(a, d, e, f, g), G(a, d, e, f, g);
      else if (b.disabledEmailVerification || b.optionalEmailVerification) b.askRequiredFieldForTraditionalLogin = !1, Oa(a, d, e, f, function () {}, function () {}, g);
      else {
        var q = l.parseQueryString(a);
        e(m, q);
        b.otpEmailVerification && !b.verifyEmailByOTP && eb(d, e, f, g, q)
      }
    }, "registration")
  }

  function eb(a, b, e, f, g) {
    w(h.otpSchema, "otp", a, function (d) {
      d = l.parseQueryString(d);
      d = l.mergeOptions(g, d);
      Aa(d, b, e, a, f, !0)
    }, function (a) {
      e(a)
    }, f)
  }

  function rb(a, d, e, f) {
    l.addEvent("change", document.getElementById(f + "registration-" + d.name), function (d) {
      l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/registrationdata/" + e.DataSource + "?apiKey=" + b.apiKey + "&parentId=" + this.value, "", function (e, b) {
        var d = document.getElementById(f + "registration-" + e.name);
        if (b.ErrorCode) {
          var g = d.options.length;
          for (i = 1; i < g; i++) d.options[i] = null
        } else
          for (var m = 0; m < b.length; m++) {
            if (0 == m && 1 < d.options.length) {
              g = d.options.length;
              for (i = 1; i < g; i++) d.options[i] = null;
              g = document.createElement("option")
            } else g = document.createElement("option");
            g.setAttribute("value", b[m].Id);
            g.appendChild(document.createTextNode(b[m].Key));
            d.appendChild(g)
          }
        for (d = 0; d < e.children.length; d++) rb(a, e, e.children[d], f)
      }, "registration", e)
    })
  }

  function Qb(a, d, e) {
    for (var f = [], g = 0; g < d.length; g++) d[g].ParentDataSource || l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/registrationdata/" + d[g].DataSource + "?apiKey=" + b.apiKey, "", function (b, d) {
      f[b.DataSource] = d;
      if (f[b.DataSource])
        for (var g = 0; g < f[b.DataSource].length; g++) {
          var m = document.createElement("option");
          m.setAttribute("value", f[b.DataSource][g].Id);
          m.appendChild(document.createTextNode(f[b.DataSource][g].Key));
          var k = document.getElementById(e + "registration-" + b.name);
          k && k.appendChild(m)
        }
      if (b && b.children && 0 < b.children.length)
        for (g = 0; g < b.children.length; g++) rb(a, b, b.children[g], e)
    }, "registration", d[g])
  }

  function Rb(a, d, e) {
    for (var f = 0; f < d.length; f++) d[f].DataSource && l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/registrationdata/" + d[f].DataSource + "?apiKey=" + b.apiKey, "", function (b, d) {
      for (var f = 0; f < d.length; f++) {
        var g = document.createElement("option");
        g.setAttribute("value", d[f].Id);
        g.appendChild(document.createTextNode(d[f].Key));
        document.getElementById(e + a + "-" + b.name).appendChild(g)
      }
    }, "registration", d[f])
  }

  function sb(a, d, e, f, g) {
    h.$hooks.call("registrationSchemaFilter", g);
    var m = f + "loginradius-recaptcha_widget_registration";
    La(m, g);
    g.push({
      type: "html",
      name: "termsandcondition",
      html: b.termsAndConditionHtml || ""
    });
    C(E(g, "name", "password"));
    C(E(g, "name", "confirmpassword"));
    h.registrationFormSchema = g;
    w(g, "registration", a, function (k) {
      qb(k, a, function (a, e) {
        b.v2Recaptcha && grecaptcha.reset(window[m + "lr_recaptcha_widgets_idprefix"]);
        d(a, e)
      }, function (a) {
        b.v2Recaptcha && grecaptcha.reset(window[m + "lr_recaptcha_widgets_idprefix"]);
        e(a)
      }, f, g)
    }, function (a) {
      b.v2Recaptcha && grecaptcha.reset(window[m +
        "lr_recaptcha_widgets_idprefix"]);
      e(a)
    }, f);
    Qa(m, !0)
  }

  function La(a, d, e, f) {
    if ((b.v2Recaptcha || 1 == e) && !l.elementById(a)) {
      var g = {
        type: "captcha",
        name: "g-recaptcha-response",
        html: '<div id="' + a + '" class="recaptcha_widget"></div>',
        display: "Captcha",
        rules: "required"
      };
      d.push(g)
    } else if (b.invisibleRecaptcha && !l.elementById(a)) {
      g = b.v2RecaptchaSiteKey || "6LeAiwITAAAAADlqb06JIGepBs8ZRo3OZ7C0W7U3";
      var m = "";
      "hide" == e && (m = "display:none");
      g = {
        type: "captcha",
        name: "g-recaptcha-response",
        html: '<div id="' + a + '" style="' +
          m + '" class="g-recaptcha" data-sitekey="' + g + '" data-size="invisible" data-callback="onCaptchaSubmit"></div>',
        display: "Captcha",
        rules: ""
      };
      d.push(g)
    }
    l.elementById(a) || !b.tencentCaptcha && !b.tencentCaptchaAsFallback || (window.onTencentCaptchaSubmit = function (a) {
      if (0 == a.ret)
        if (f) f(a);
        else window.onTencentCaptchaSubmitCallback(a)
    }, g = {
      type: "captcha",
      name: "TencentCaptcha",
      html: "<div " + (e ? "style=display:none; " : "") + ' id= "' + a + '_tencent"  class="TencentCaptcha"  data-appid="' + b.tencentCaptchaAppid + '" data-cbfn="onTencentCaptchaSubmit"></div>',
      display: "Captcha",
      rules: ""
    }, d.push(g))
  }

  function Sb(a, d, e, f) {
    onRegistrationLoaded = function (g) {
      var m = JSON.parse(JSON.stringify(g));
      g = [];
      for (var k = 0; k < m.length; k++)
        if (m[k] && b.showSplitForm && m[k].DataSource && null !== m[k].DataSource) {
          var h = JSON.parse(JSON.stringify(m[k])),
            q = JSON.parse(JSON.stringify(E(m, "name", "cf_" + m[k].DataSource + "Code")));
          h.name = "recordid";
          q.name = "code";
          g.push(h);
          g.push(q)
        }
      0 < g.length && b.showSplitForm ? w(g, "validatecode", a, function (g) {
        l.ajaxCall("post", "https://api.loginradius.com/identity/v2/auth/registrationdata/validatecode?apiKey=" +
          b.apiKey, g,
          function (b) {
            1 == b.IsValid ? sb(a, d, e, f, m) : e(b)
          }, "registration")
      }) : (b.securityQuestionEnabled && b.SecurityQuestions && tb(m, !0), sb(a, d, e, f, m))
    };
    Ka();
    h.registrationFormSchema = h.registrationFormSchema && 0 < h.registrationFormSchema.length ? h.registrationFormSchema : h.options.RegistrationFormSchema;
    onRegistrationLoaded(h.registrationFormSchema)
  }

  function E(a, b, e) {
    for (var d = 0; d < a.length; d++)
      if (a[d] && a[d][b] == e) return a[d];
    return null
  }

  function ub(a, d, e, f, g) {
    l.ajaxCall("post", "https://api.loginradius.com/identity/v2/auth/password?apiKey=" +
      b.apiKey + "&resetPasswordUrl=" + (b.forgotPasswordUrl || b.resetPasswordUrl) + "&emailTemplate=" + b.resetPasswordEmailTemplate, a,
      function (m) {
        if (m.ErrorCode) f(n(m));
        else {
          var k = l.parseQueryString(a);
          e(m, k);
          b.otpEmailVerification && ra(d, e, f, g, k)
        }
      }, "forgotPassword")
  }

  function Tb(a, b, e, f) {
    var d = h.forgotPasswordFormSchema;
    qa(d);
    w(d, "forgotpassword", a, function (d) {
      d = N(d); - 1 != d.indexOf("phone") ? (Va = d, Ua(d, a, b, e, f)) : ub(d, a, b, e, f)
    }, function (a) {
      e(a)
    }, f)
  }

  function Ob(a, d, e, f, g, m) {
    l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/password/change?apiKey=" +
      b.apiKey + "&access_token=" + g.access_token, a,
      function (a) {
        a.ErrorCode ? e(n(a)) : L(g, m, d, e)
      }, "periodicPassword")
  }

  function vb(a, d, e) {
    l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/password?apiKey=" + b.apiKey + "&access_token=" + z("LRTokenKey"), a, function (b) {
      b.ErrorCode ? e(n(b)) : d(b, l.parseQueryString(a))
    }, "changePassword")
  }

  function Ub(a, b, e, f) {
    var d = h.changePasswordFormSchema;
    C(E(d, "name", "newpassword"));
    C(E(d, "name", "confirmnewpassword"));
    w(d, "changepassword", a, function (a) {
      vb(a, b, e)
    }, function (a) {
      e(a)
    }, f)
  }

  function wb(a, d, e) {
    l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/register?apiKey=" + b.apiKey + "&verificationUrl=" + b.verificationUrl + "&emailTemplate=" + b.verificationEmailTemplate, a, function (b) {
      b.ErrorCode ? e(n(b)) : d(b, l.parseQueryString(a))
    }, "resendVerificationEmail")
  }

  function Vb(a, b, e, f) {
    w(h.emailSchema, "resendEmailVerification", a, function (a) {
      wb(a, b, e)
    }, function (a) {
      e(a)
    }, f)
  }

  function xb(a, d, e) {
    var f = z("LRTokenKey");
    f ? l.ajaxCall("post", "https://api.loginradius.com/identity/v2/auth/email?apiKey=" +
      b.apiKey + "&access_token=" + f + "&verificationUrl=" + b.verificationUrl + "&emailTemplate=" + b.addEmailTemplate, a,
      function (b) {
        b.ErrorCode ? e(n(b)) : d(b, l.parseQueryString(a))
      }, "addEmail") : e([t(y.tokenValid)])
  }

  function Wb(a, b, e, f) {
    w(h.addEmailSchema, "addemail", a, function (a) {
      xb(a, b, e)
    }, function (a) {
      e(a)
    }, f)
  }

  function yb(a, d, e) {
    var f = z("LRTokenKey");
    f ? l.ajaxCall("delete", "https://api.loginradius.com/identity/v2/auth/email?apiKey=" + b.apiKey + "&access_token=" + f, a, function (b) {
      b.ErrorCode ? e(n(b)) : d(b, l.parseQueryString(a))
    }, "removeEmail") : e([t(y.tokenValid)])
  }

  function Xb(a, b, e, f) {
    w(h.emailSchema, "removeemail", a, function (a) {
      yb(a, b, e)
    }, function (a) {
      e(a)
    }, f)
  }

  function zb(a, d, e) {
    var f = z("LRTokenKey");
    f ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/username?apiKey=" + b.apiKey + "&access_token=" + f, a, function (b) {
      b.ErrorCode ? e(n(b)) : d(b, l.parseQueryString(a))
    }, "changeUsername") : e([t(y.tokenValid)])
  }

  function Yb(a, b, e, f) {
    w(h.changeUsernameFormSchema, "changeUsername", a, function (a) {
      zb(a, b, e)
    }, function (a) {
      e(a)
    }, f)
  }

  function gb(a, d, e) {
    a = N(a);
    l.jsonpCall("https://api.loginradius.com/identity/v2/auth/login/oneclicksignin?apiKey=" + b.apiKey + "&verificationUrl=" + b.verificationUrl + "&oneclicksignintemplate=" + b.instantLinkLoginEmailTemplate + "&" + a, function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "instantLinkLogin")
  }

  function ca() {
    var a = window.location.hash.match(/vtoken=([^&]*)/);
    return window.location.hash && null != a ? a[1] : l.getQueryParameterByName("vtoken")
  }

  function ya() {
    var a = window.location.hash.match(/vtype=([^&]*)/);
    return window.location.hash && null != a ? a[1] : l.getQueryParameterByName("vtype")
  }

  function Ab(a, d, e, f, g) {
    a += "&welcomeEmailTemplate=" + b.welcomeEmailTemplate + "&ResetPasswordEmailTemplate=" + b.resetPasswordConfirmationEmailTemplate;
    l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/password/reset?apiKey=" + b.apiKey, a, function (b) {
      b.ErrorCode ? e(n(b)) : d(b, l.parseQueryString(a))
    }, "resetPassword")
  }

  function ra(a, d, e, f, g) {
    var m = h.resetPasswordFormSchema;
    if (null == ya())
      if (g) m = h.resetPasswordByPhoneSchema, m.push({
        type: "hidden",
        name: "email",
        value: g.email
      });
      else {
        if (b.phoneLogin) {
          var k = "&" + Va;
          m = h.resetPasswordByPhoneSchema;
          E(m, "name", "resendotp") || m.push({
            type: "button",
            name: "resendotp",
            display: "Resend OTP",
            rules: "",
            permission: "r",
            event: "click",
            eventCallback: function (b) {
              Ua(Va, a, d, e, f, function () {})
            }
          })
        }
      }
    else {
      var p = ca();
      if (p)
        if (b.verifyEmailByOTP) {
          var q = l.getQueryParameterByName("email"),
            n = "";
          n = "&otp=" + p;
          n += "&email=" + encodeURIComponent(q.replace(/ /g, "+"));
          h.resetPasswordFormSchema.splice(2, 1)
        } else h.resetPasswordFormSchema[2].value = p, C(h.resetPasswordFormSchema[0]), C(h.resetPasswordFormSchema[1]);
      else e([{
        Message: "Verification Token not found in query string."
      }])
    }
    w(m, "resetpassword", a, function (b) {
      -1 == b.indexOf("otp") || g ? (n && (b += n), Ab(b, d, e, a, f)) : pb(b + k, d, e, a, f)
    }, function (a) {
      e(a)
    }, f)
  }

  function Zb(a, d, e, f) {
    var g = function (g) {
      var m = ca();
      if (b.verifyEmailByOTP) {
        var h = {};
        g && (h = l.mergeOptions(h, l.parseQueryString(g)));
        h.otp = m;
        h.email = l.getQueryParameterByName("email").replace(/ /g, "+");
        Aa(h, a, d, e, f, !0)
      } else Aa(m, a, d, e, f)
    };
    e && "Captcha" == b.loginLockedType && (h.$hooks.register("afterFormRender", function (a, b, e, d) {
      d && "loginradius-verifyemail" == d.name && "loginradius-submit-verify" == d[0].id && (d[0].style.display = "none")
    }), w([], "verifyemail", e, function (a) {
      g(a)
    }, function (a) {
      d(a)
    }, f));
    g()
  }

  function Aa(a, d, e, f, g, m) {
    f = "get";
    if (a) {
      g = "https://api.loginradius.com/identity/v2/auth/email?apiKey=" + b.apiKey + "&welcomeEmailTemplate=" + b.welcomeEmailTemplate;
      var k = "";
      m ? (f = "put", k = a) : g += "&verificationtoken=" + a + "&url=" + b.verificationUrl;
      a = "##otp";
      b.verifyEmailByOTP && (a = "");
      l.ajaxCall(f, g, k, function (a) {
        a.ErrorCode ? e(n(a)) : b.loginOnEmailVerification ? null == a.Data ? d(a) : L(a.Data, "", d, e) : b.logoutOnVerifyEmail ? Bb(d(a)) : d(a)
      }, "verifyEmail" + a)
    } else m ? e([y.notFound]) : e([y.vTokenError])
  }

  function $b(a, d) {
    var e = h.sessionData.getToken();
    e ? l.ajaxCall("delete", "https://api.loginradius.com/identity/v2/auth/account?apiKey=" + b.apiKey + "&access_token=" + e + "&deleteUrl=" + b.deleteUrl + "&emailTemplate=" + b.deleteUserEmailTemplate, {}, function (b) {
      b.ErrorCode ? d(n(b)) : a(b)
    }, "deleteUser") : d([y.vTokenError])
  }

  function ac(a, d, e) {
    a ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account/delete?apiKey=" + b.apiKey + "&deletetoken=" + a, "", function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "deleteUserConfirm") : e([y.vTokenError])
  }

  function bc(a, b) {
    var e = ca();
    ac(e, a, b)
  }

  function cc() {
    var a = window.location.hash.match(/lr-token=([^&]*)/);
    return window.location.hash && null != a ? a[1] : l.getQueryParameterByName("lr-token")
  }

  function Cb(a, d, e, f) {
    window.html5passToken = function (b) {
      a = Ba || a;
      Ca(b, a, d, e, f)
    };
    var g = cc();
    g && window.html5passToken(g);
    h.loginRadiusHtml5PassToken = window.html5passToken;
    b.isMobile || b.noCallbackForSocialLogin ? h.$hooks.register("socialCalls", function (g, k) {
      b.noCallbackForSocialLogin && sa(k, function (b) {
        b.access_token ? Ca(b.access_token, a, d, e, f) : d(b)
      }, function () {})
    }) : l.addEvent("message", window, function (g) {
      if (-1 != g.origin.indexOf(b.customDomain) || -1 != g.origin.indexOf("hub.loginradius.com")) a = Ba || a, "string" == typeof g.data && xa.test(g.data) && Ca(g.data, a, d, e, f)
    })
  }

  function ha(a, d, e, f, g, m, k, p, q) {
    var r = a.Profile,
      D = kb(k, e, r),
      v = a.access_token;
    q = q || h.setHostedToken;
    p = p || "updateData";
    b.verificationEmailTemplate = b.emailTemplate || b.verificationEmailTemplate;
    0 < Object.keys(D).length ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/account?apiKey=" + b.apiKey + "&access_token=" + v + "&verificationUrl=" + b.verificationUrl + "&emailTemplate=" + b.verificationEmailTemplate, D, function (h) {
      if (h.ErrorCode) g(n(h));
      else {
        var p = function (a) {
          var p = D.emailid || D.email;
          var q = D.phone || D.phoneid;
          var n = E(k, "name", "phoneid");
          n = n && -1 != n.rules.indexOf("required");
          var u = E(k, "name", "emailid");
          u = u && -1 != u.rules.indexOf("required");
          B("lr-user-uid", r.Uid);
          var x = l.parseQueryString(window.location.search.replace("?", ""));
          (void 0 == q || q) && r.PhoneIdVerified && void 0 == p || (void 0 == p || p) && r.EmailVerified && void 0 == q || (q && !n || void 0 == q) && (b.disabledEmailVerification || b.optionalEmailVerification) ? p && !r.EmailVerified && x.return_url && -1 != x.return_url.toLowerCase().indexOf("/saml/") ? g([t(y.emailNotVerified)]) : (delete h.IsPosted, h.access_token = v, a(), T && oa(v)) : q && !r.PhoneIdVerified ? (a = {
            phone: l.getQueryParameterByName("phoneid", e)
          }, za(a, function () {
            F(e, d, f, g, m);
            G(e + "&noPhoneVerified=false", d, f, g, m)
          }, g)) : !p || !u || r.EmailVerified || b.disabledEmailVerification || b.optionalEmailVerification ? a() : g([t(y.emailNotVerified)])
        };
        q ? p(function () {
          a.Data = a.Profile;
          delete a.Profile;
          h.Data && (a.Data = h.Data);
          L(a, e, f, g)
        }) : p(function () {
          f(h, l.parseQueryString(e))
        })
      }
    }, p) : L(a, e, f, g)
  }

  function dc(a, d, e, f) {
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account/2FA?apikey=" + b.apiKey + "&access_token=" + z("LRTokenKey"), "", function (b) {
      if (b.IsOTPAuthenticatorVerified || b.IsGoogleAuthenticatorVerified) b = document.createElement("input"), b.setAttribute("type", "button"), b.setAttribute("value", h.buttonsName.backupcode || O.backupCode), J(a, b), l.addEvent("click", b, function (a) {
        h.api.getBackupCode(z("LRTokenKey"), d, e)
      })
    })
  }

  function ec(a, d, e, f) {
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account/2FA?apikey=" + b.apiKey + "&access_token=" + z("LRTokenKey"), "", function (b) {
      if (b.IsOTPAuthenticatorVerified || b.IsGoogleAuthenticatorVerified) b = document.createElement("input"), b.setAttribute("type", "button"), b.setAttribute("value", h.buttonsName.resetbackupcode || O.resetBackupCode), J(a, b), l.addEvent("click", b, function (a) {
        h.api.resetBackupCode(z("LRTokenKey"), d, e)
      })
    })
  }

  function Db(a, d, e, f) {
    var g = document.createElement("input");
    g.setAttribute("type", "button");
    g.setAttribute("value", h.buttonsName.createtwofactorauthentication || O.createtwofactorauthentication);
    f = f || "loginradius-";
    document.getElementsByName(f + "profileeditor")[0] ? b.showTwoFactorOnProfile && (formElement = document.getElementsByName(f +
      "profileeditor")[0], formElement.appendChild(g)) : (b.twoFactorAuthentication || b.optionalTwoFactorAuthentication) && J(a, g);
    l.addEvent("click", g, function (g) {
      b.optionalTwoFactorAuthentication || b.twoFactorAuthentication ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account/2FA?apikey=" + b.apiKey + "&access_token=" + z("LRTokenKey"), "", function (g) {
        h.LRCheck2FA = !0;
        h.LRCheckLogin = !1;
        g.ErrorCode ? e(n(g)) : (B("lrotpauthver", g.IsOTPAuthenticatorVerified), B("lrgaauthver", g.IsGoogleAuthenticatorVerified), IsOTPAuthenticatorVerified = g.IsOTPAuthenticatorVerified, IsGoogleAuthenticatorVerified = g.IsGoogleAuthenticatorVerified, b.googleAuthentication && (ib(g, a, d, e, f), na = !0), IsOTPAuthenticatorVerified ? mb(a, "", d, e, f, na) : fa(a, d, e, f))
      }, "createTwoFactorAuthentication") : h.log("Two Factor Authentication will not work, please set in commonOpitons either twoFactorAuthentication or optionalTwoFactorAuthentication")
    })
  }

  function fc(a, d, e, f) {
    var g = z("LRTokenKey");
    g ? (handleProfileEditor = function (m) {
      l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account?apiKey=" +
        b.apiKey + "&access_token=" + g, "",
        function (k) {
          var p = JSON.parse(JSON.stringify(m));
          p = X(p, k, "profileeditor");
          var l = [],
            n = [],
            t = {};
          t.Profile = k;
          t.access_token = g;
          for (var v = 0; v < p.length; v++) p[v].name && -1 == p[v].name.indexOf("emailid") && -1 == p[v].name.indexOf("phoneid") && l.push(p[v]), p[v].permission && "h" != p[v].permission && n.push(p[v]);
          w(l, "profileeditor", a, function (b) {
            ha(t, a, b, d, e, f, l, "profileEditor")
          }, function (a) {
            e(a)
          }, f);
          (b.optionalTwoFactorAuthentication || b.twoFactorAuthentication) && Db(a, d, e, f);
          h.$hooks.call("renderProfileEditorHook", k, n)
        }, "profileEditor")
    }, h.registrationFormSchema = h.registrationFormSchema && 0 < h.registrationFormSchema.length ? h.registrationFormSchema : h.options.RegistrationFormSchema, handleProfileEditor(h.registrationFormSchema)) : e([t(y.tokenValid)])
  }

  function Ca(a, d, e, f, g, m, k) {
    b.verificationEmailTemplate = b.emailTemplate || b.verificationEmailTemplate;
    B("LRTokenKey", a);
    k = k && 0 < k.length ? k : h.options.RegistrationFormSchema;
    (function (k) {
      var p = JSON.parse(JSON.stringify(k));
      l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account?apiKey=" +
        b.apiKey + "&access_token=" + a + "&verificationUrl=" + b.verificationUrl + "&emailTemplate=" + b.verificationEmailTemplate, "",
        function (l) {
          if (l.ErrorCode) f(n(l));
          else if (h.LRCheckLogin = !0, l.IsDeleted) f([t(y.blockedUser)]);
          else {
            var q = {};
            q.Profile = l;
            q.access_token = a;
            C(E(p, "name", "password"));
            C(E(p, "name", "confirmpassword"));
            var r = !1;
            b.autoFilledFieldForSocial && (r = !0, h.$hooks.register("beforeFormRender", function (a, b) {
              if ("socialRegistration" == a) {
                var e = E(b, "name", "emailid");
                e && e.value && (e.disabled = !0);
                (e = E(b, "name", "phoneid")) && e.value && (e.disabled = !0)
              }
            }));
            h.registrationFormSchema = X(p, l, r);
            h.$hooks.call("registrationSchemaFilter", p, l);
            r = z("LRTraditionalLogin");
            Z("LRTraditionalLogin");
            if (0 < h.registrationFormSchema.length && !r) d ? (h.$hooks.call("socialLoginFormRender"), w(h.registrationFormSchema, "socialRegistration", d, function (a) {
              ha(q, d, a, e, f, g, h.registrationFormSchema, "socialLogin")
            }, function (a) {
              f(a)
            }, g)) : m(a, h.registrationFormSchema, l);
            else {
              var u = (r = (r = E(k, "name", "phoneid")) && -1 != r.rules.indexOf("required")) ? l.PhoneIdVerified ? !0 : !1 : l.PhoneIdVerified,
                A = E(k, "name", "emailid"),
                x = (A = A && -1 != A.rules.indexOf("required")) ? l.EmailVerified ? !0 : !1 : l.EmailVerified;
              (u || !u && !r) && (x || !x && !A) || (u || !u && !r) && (b.disabledEmailVerification || b.optionalEmailVerification) ? (B("lr-user-uid", l.Uid), T && oa(a), L(q, "", e, f)) : null == l.Email || l.EmailVerified ? (r = {
                phone: l.PhoneId
              }, f([t(y.phoneNotVerified)], r), za(r, function () {
                h.socialLoginFlag = !0;
                F("phone=" + l.PhoneId, d, e, f, g);
                G("phone=" + l.PhoneId + "&noPhoneVerified=false", d, e, f, g)
              }, f)) : f([t(y.emailNotVerified)])
            }
          }
        }, "socialLogin")
    })(k)
  }

  function Wa(a, d, e) {
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/socialidentity?apiKey=" + b.apiKey + "&access_token=" + a, "", function (f) {
      f.ErrorCode ? e(n(f)) : f.Uid != z("lr-user-uid") ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/socialidentity?apiKey=" + b.apiKey + "&access_token=" + z("LRTokenKey"), "candidatetoken=" + a, function (a) {
        a.ErrorCode ? e(n(a)) : d(a)
      }, "linkAccount") : d({
        IsPosted: !0
      })
    }, "linkAccount")
  }

  function gc(a, d, e, f) {
    if (b.disableAccountLinking) h.log(y.disabledAccountLinking);
    else {
      var g = a.split(","),
        m = z("LRTokenKey");
      m ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account?apiKey=" + b.apiKey + "&access_token=" + m, "", function (m) {
        if (m.ErrorCode) e(n(m));
        else if (m.EmailVerified || m.PhoneIdVerified) {
          var k = {};
          if (m.Identities)
            for (var q = 0, r = m.Identities.length; q < r; q++) k[m.Identities[q].Provider] = m.Identities[q].ID;
          1 == g.length ? Y(a, k, f, "", !0) : Y(a, k, b.linkedAccountsTemplate + "," + b.notLinkedAccountsTemplate, !0, !0);
          window.html5passToken = function (a) {
            Wa(a, d, e)
          };
          b.isMobile || b.noCallbackForSocialLogin ? h.$hooks.register("socialCalls", function (a, f) {
            b.noCallbackForSocialLogin && sa(f, function (a) {
              a.access_token ? Wa(a.access_token, d, e) : d(a)
            }, function () {})
          }) : l.addEvent("message", window, function (a) {
            (-1 != a.origin.indexOf(b.customDomain) || -1 != a.origin.indexOf("hub.loginradius.com")) && "string" == typeof a.data && xa.test(a.data) && Wa(a.data, d, e)
          })
        } else e([t(y.unverifiedUser)])
      }, "linkAccount") : e([t(y.tokenValid)])
    }
  }

  function hc(a, d, e) {
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/email?apiKey=" +
      b.apiKey + "&" + a, "",
      function (a) {
        a.ErrorCode ? e(n(a)) : d(a)
      }, "checkEmail")
  }

  function ic(a, d, e) {
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/username?apiKey=" + b.apiKey + "&" + a, "", function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "checkUsername")
  }

  function Eb(a, d, e) {
    var f = l.parseQueryString(a),
      g = {},
      m;
    for (m in f) "email" !== m && "username" !== m && "phone" !== m && "password" !== m && (g[m] = f[m], delete f[m]);
    f.securityanswer = g;
    l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/password/securityanswer/?apikey=" +
      b.apiKey, f,
      function (b) {
        b.ErrorCode ? e(n(b)) : d(b, a)
      }, "resetPasswordBySecurityQuestion")
  }

  function tb(a, d) {
    var e = [];
    if (b.SecurityQuestions)
      for (var f = 0; f < b.securityQuestionsCount; f++) {
        for (var g = {
            type: "option"
          }, m = [], h = 0; h < b.SecurityQuestions.length; h++) {
          var p = {};
          p.text = b.SecurityQuestions[h].Question;
          p.value = b.SecurityQuestions[h].QuestionId;
          m.push(p)
        }
        g.options = m;
        g.name = "securityQuestion" + f;
        g.display = "Security Question";
        g.rules = d ? "optional" : "required";
        g.permission = "r";
        d ? a.push(g) : e.push(g);
        g = {};
        g.type = b.maskSensitiveInput ? "password" : "string";
        g.name = "securityAnswer" + f;
        g.display = "Answer";
        g.rules = d ? "optional" : "required";
        g.permission = "r";
        d ? a.push(g) : e.push(g)
      }
    return e
  }

  function db(a, d, e) {
    var f = "/auth/securityquestion/";
    f = -1 !== a.indexOf("username") ? f + "username?apiKey=" : -1 !== a.indexOf("phone") ? f + "phone?apiKey=" : f + "email?apiKey=";
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2" + f + b.apiKey + "&" + a, "", function (a) {
      if (a.ErrorCode) e(n(a));
      else {
        for (var f = [], g = 0; g < a.length; g++) {
          var h = {};
          h.type = b.maskSensitiveInput ? "password" : "string";
          h.name = a[g].QuestionId;
          h.display = a[g].Question;
          h.rules = "required";
          h.permission = "r";
          f.push(h)
        }
        d(f)
      }
    }, "securityQuestion")
  }

  function qa(a) {
    if (b.duplicateEmailWithUniqueUsername) {
      var d = E(a, "name", "emailid");
      d.display = "Username";
      d.rules = "required"
    } else if (b.usernameLogin && (d = E(a, "name", "emailid"), -1 == d.display.indexOf("/Username") && (d.display += "/Username", d.rules = "required")), b.phoneLogin || b.instantOTPLogin) d || (d = E(a, "name", "emailid"), d.rules = "required"), -1 == d.display.indexOf("/Phone") && (d.display += "/Phone")
  }

  function jc(a, d, e, f) {
    if (b.securityQuestionEnabled) {
      var g = !0;
      var m = h.getSecQSchema;
      qa(m);
      w(m, "securityquestions", a, function (b) {
        b = N(b);
        db(b, function (b) {
          0 < b.length && (g = !1);
          b = l.mergeObjects(h.loginFormSchema, b);
          h.loginAction || qa(b);
          g ? e([t(y.noSecurityQuestions)]) : w(b, "resetpwdbysecq", a, function (a) {
            a = N(a);
            Eb(a, d, e)
          }, function (a) {
            e(a)
          }, f)
        }, function (a) {
          e(a)
        })
      }, function (a) {
        e(a)
      }, f)
    }
  }

  function Fb(a, d, e) {
    var f = z("LRTokenKey");
    a = l.parseQueryString(a);
    for (var g = 0; g < b.securityQuestionsCount; g++) a[a["securityQuestion" +
      g]] = a["securityAnswer" + g], delete a["securityQuestion" + g], delete a["securityAnswer" + g];
    a = {
      SecurityQuestionAnswer: a
    };
    f ? l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/account?apikey=" + b.apiKey + "&access_token=" + f, a, function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "updateSecurityQuestion") : e([t(y.tokenValid)])
  }

  function kc(a, d, e, f) {
    securityQuestionSchemaLoaded = function (b) {
      var g = !0;
      b = tb(b);
      0 < b.length && (g = !1);
      g ? e([t(y.noSecurityQuestions)]) : w(b, "updatesecurityquestion", a, function (a) {
        Fb(a, d, e)
      }, function (a) {
        e(a)
      }, f)
    };
    b.securityQuestionEnabled && (h.registrationFormSchema = h.registrationFormSchema && 0 < h.registrationFormSchema.length ? h.registrationFormSchema : h.options.RegistrationFormSchema, securityQuestionSchemaLoaded(h.registrationFormSchema))
  }

  function Ra(a, d, e) {
    var f = z("LRTokenKey"),
      g = {};
    g[a] = !0;
    f ? l.ajaxCall("delete", "https://api.loginradius.com/identity/v2/auth/account/2FA/authenticator?apikey=" + b.apiKey + "&access_token=" + f, g, function (b) {
      b.ErrorCode ? e(n(b)) : d(b, a)
    }, "resetTwoFactorAuthentication") : e([t(y.tokenValid)])
  }

  function lc(a, d, e) {
    a ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/access_token/Validate?apikey=" + b.apiKey + "&access_token=" + a, "", function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "validateToken") : e([t(y.twofaTokenValid)])
  }

  function mc(a, d, e) {
    a ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/access_token/InValidate?apikey=" + b.apiKey + "&access_token=" + a, "", function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "invalidateToken") : e([t(y.twofaTokenValid)])
  }

  function nc(a, d, e) {
    a ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account/2FA/backupcode?apikey=" +
      b.apiKey + "&access_token=" + a, "",
      function (a) {
        a.ErrorCode ? e(n(a)) : d(a)
      }, "backupCode") : e([t(y.twofaTokenValid)])
  }

  function oc(a, d, e) {
    a ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/account/2FA/backupcode/reset?apikey=" + b.apiKey + "&access_token=" + a, "", function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "backupCode") : e([t(y.twofaTokenValid)])
  }

  function pc(a, b, e, f, g) {
    a ? (f += "?access_token=" + a, g && (f = f + "&" + g), l.ajaxCall("get", "https://api.loginradius.com/api/v2/" + f, "", function (a) {
      a.ErrorCode ? e(n(a)) : b(a)
    }, "socialAPI")) : e([t(y.twofaTokenValid)])
  }

  function qc(a, b, e, f, g, h) {
    a ? (f += "?access_token=" + a, g && (f = f + "&" + g), l.ajaxCall("post", "https://api.loginradius.com/api/v2/" + f, h, function (a) {
      a.ErrorCode ? e(n(a)) : b(a)
    }, "socialAPI")) : e([t(y.twofaTokenValid)])
  }

  function rc(a, d, e, f) {
    a ? l.ajaxCall("post", "https://api.loginradius.com/identity/v2/auth/customobject?apiKey=" + b.apiKey + "&access_token=" + a + "&objectname=" + b.customObjectName, d, function (a) {
      a.ErrorCode ? f(n(a)) : e(a)
    }, "createCustomObject") : f([t(y.twofaTokenValid)])
  }

  function Gb(a, d, e, f, g) {
    d ? l.ajaxCall(a, "https://api.loginradius.com/identity/v2/auth/customobject/" + e + "?apiKey=" + b.apiKey + "&access_token=" + d + "&objectname=" + b.customObjectName, "", function (a) {
      a.ErrorCode ? g(n(a)) : f(a)
    }, "CustomObject") : g([t(y.twofaTokenValid)])
  }

  function sc(a, d, e) {
    a ? l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/customobject?apiKey=" + b.apiKey + "&access_token=" + a + "&objectname=" + b.customObjectName, "", function (a) {
      a.ErrorCode ? e(n(a)) : d(a)
    }, "getCustomObject") : e([t(y.twofaTokenValid)])
  }

  function tc(a, d, e, f, g, h) {
    if (a) {
      var m = "";
      f && (m = "&updatetype=" + f);
      l.ajaxCall("put", "https://api.loginradius.com/identity/v2/auth/customobject/" + d + "?apiKey=" + b.apiKey + "&access_token=" + a + "&objectname=" + b.customObjectName + m, e, function (a) {
        a.ErrorCode ? h(n(a)) : g(a)
      }, "updateCustomObject")
    } else h([t(y.twofaTokenValid)])
  }

  function Xa(a) {
    var b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
    a || (a = Math.floor(Math.random() * b.length));
    for (var e = "", f = 0; f < a; f++) e += b[Math.floor(Math.random() * b.length)];
    return e
  }

  function uc(a, d, e, f) {
    var g = ca();
    "noregistration" == ya() && vc(g, d, e);
    g = h.passwordLessLoginSchema;
    if (b.phoneLogin) {
      var m = E(g, "name", "emailid");
      m.display += "/Phone"
    }
    w(g, "noRegistrationPasswordLessLogin", a, function (b) {
      wc(b, a, d, e, f)
    }, function (a) {
      e(a)
    }, f)
  }

  function vc(a, d, e) {
    a && l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/email/autologin?apiKey=" + b.apiKey + "&verificationtoken=" + a + "&welcomeEmailTemplate=" + b.welcomeEmailTemplate, "", function (a) {
      a.ErrorCode ? e(n(a)) : L(a, "", d, e)
    }, "autologin")
  }

  function wc(a, d, e, f, g) {
    a = N(a);
    var m = function (a, b, e, f, m, k) {
      w(h.registrationFormSchema, "loginRequiredFieldsUpdate", d, function (b) {
        var f = {};
        f.Profile = a;
        f.access_token = e;
        ha(f, d, b, m, k, g, h.registrationFormSchema, "login", !0)
      }, function (a) {
        k(t(a))
      })
    };
    if (l.parseQueryString(a).phone) l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/noregistration/phone?apikey=" + b.apiKey + "&" + a + "&smstemplate=" + b.smsTemplateNoRegistration, "", function (b) {
      b.ErrorCode ? f(n(b)) : (F(a + "&noregistrationFlag=true", d, e, f, g, "", m), G(a + "&noregistrationFlag=true", d, e, f, g, "", m))
    }, "noRegistrationPasswordLessLogin");
    else {
      var k = Xa(16);
      l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/noregistration/email?apikey=" + b.apiKey + "&" + a + "&clientGuid=" + k + "&noregistrationemailtemplate=" + b.noRegistrationEmailTemplate + "&welcomeemailtemplate=" + b.welcomeEmailTemplate + "&redirectUrl=" + b.autoLoginRedirectUrl, "", function (d) {
        d.ErrorCode ? f(n(d)) : d.IsPosted && (e(d), sa(k, function (d) {
          b.askRequiredFieldsOnPasswordLessLogin ? (Pa = !0, da(d, a, m, "", e, f)) : L(d, "", e, f)
        }, f))
      }, "noRegistrationPasswordLessLogin")
    }
  }

  function Hb(a, d, e) {
    l.parseQueryString(a);
    var f = Xa(16);
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/login/autologin?apikey=" + b.apiKey + "&" + a + "&clientGuid=" + f + "&autologinemailtemplate=" + b.autoLoginEmailTemplate + "&welcomeemailtemplate=" + b.welcomeEmailTemplate + "&redirectUrl=" + b.autoLoginRedirectUrl, "", function (a) {
      a.ErrorCode ? e(n(a)) : a.IsPosted && (d(a), sa(f, function (a) {
        L(a, "", d, e)
      }, e))
    }, "autoLogin")
  }

  function xc(a, b, e, f) {
    var d = h.autoLoginSchema;
    qa(d);
    w(d, "autologin", a, function (d) {
      d = N(d); - 1 !== d.indexOf("phone") ? pa(d, a, b, e, f) : Hb(d, b, e)
    }, function (a) {
      e(a)
    }, f)
  }

  function sa(a, d, e) {
    l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/login/autologin/ping?apiKey=" + b.apiKey + "&clientGuid=" + a, "", function (f) {
      1139 == f.ErrorCode || 1140 == f.ErrorCode ? setTimeout(function () {
        Da < b.autoLoginPingCount && (sa(a, d, e), Da++)
      }, 1E3 * b.autoLoginPingInterval) : f.ErrorCode && 1139 !== f.ErrorCode ? (e(f), Da = 0) : (Da = 0, d(f))
    }, "pingAutoLogin")
  }

  function yc(a) {
    var d, e;
    b.securityQuestionEnabled = a.IsSecurityQuestion;
    b.appName = b.appName || a.AppName;
    b.RegistrationFormSchema = a.RegistrationFormSchema;
    b.loginLockedType = a.LoginLockedConfiguration && a.LoginLockedConfiguration.LoginLockedType;
    b.securityQuestionEnabled && (b.SecurityQuestions = a.SecurityQuestions.Questions, b.securityQuestionsCount = void 0 == b.securityQuestionsCount ? a.SecurityQuestions.SecurityQuestionCount : b.securityQuestionsCount);
    if (void 0 == b.passwordLength && b.displayPasswordStrength && b.RegistrationFormSchema) {
      var f = E(b.RegistrationFormSchema, "name", "password").rules.split("|"),
        g = l.isSubstring("min_length[", Object.keys(f).map(function (a) {
          return f[a]
        }));
      g = f[g].substring(f[g].lastIndexOf("min_length[") + 11, f[g].lastIndexOf("]"));
      var h = l.isSubstring("max_length[", Object.keys(f).map(function (a) {
        return f[a]
      }));
      h = f[h].substring(f[h].lastIndexOf("max_length[") + 11, f[h].lastIndexOf("]"));
      g = {
        min: parseInt(g),
        max: parseInt(h)
      };
      b.passwordLength = g
    }
    b.SocialSchema = a.SocialSchema;
    b.maskSensitiveInput = b.encryptedAnswer || b.maskSensitiveInput;
    b.noCallbackForSocialLogin = void 0 != b.noCallback ? b.noCallback : b.noCallbackForSocialLogin;
    b.v2RecaptchaSiteKey = b.v2RecaptchaSiteKey || a.V2RecaptchaSiteKey;
    if (a.TwoFactorAuthentication.IsEnabled) {
      var k = !0;
      var p = !1;
      var n = a.TwoFactorAuthentication.IsGoogleAuthenticator;
      a.TwoFactorAuthentication.IsRequired && (k = !1, p = !0)
    }
    b.otpEmailVerification = void 0 == b.otpEmailVerification ? a.OTPEmailVerification : b.otpEmailVerification;
    b.optionalTwoFactorAuthentication = void 0 == b.optionalTwoFactorAuthentication ? k : b.optionalTwoFactorAuthentication;
    b.twoFactorAuthentication = void 0 == b.twoFactorAuthentication ? p : b.twoFactorAuthentication;
    b.googleAuthentication = void 0 == b.googleAuthentication ? n : b.googleAuthentication;
    b.phoneLogin = void 0 == b.phoneLogin ? a.IsPhoneLogin : b.phoneLogin;
    b.instantOTPLogin = void 0 == b.instantOTPLogin ? a.IsInstantSignin.SmsOtp : b.instantOTPLogin;
    "optional" == a.EmailVerificationFlow ? d = !0 : "disabled" == a.EmailVerificationFlow && (e = !0);
    b.optionalEmailVerification = void 0 == b.optionalEmailVerification ? d : b.optionalEmailVerification;
    b.disabledEmailVerification = void 0 == b.disabledEmailVerification ? e : b.disabledEmailVerification;
    b.loginOnEmailVerification = void 0 == b.loginOnEmailVerification ? a.IsLoginOnEmailVerification : b.loginOnEmailVerification;
    b.instantLinkLogin = void 0 == b.instantLinkLogin ? a.IsInstantSignin.EmailLink : b.instantLinkLogin;
    b.askRequiredFieldForTraditionalLogin = void 0 == b.askRequiredFieldForTraditionalLogin ? a.AskRequiredFieldsOnTraditionalLogin : b.askRequiredFieldForTraditionalLogin;
    b.stayLogin = void 0 == b.stayLogin ? a.IsRememberMe : b.stayLogin;
    b.disableSignup = void 0 == b.disableSignup ? a.IsDisabledRegistration : b.disableSignup;
    b.riskBasedAuthentication = void 0 == b.riskBasedAuthentication ? a.IsRiskBasedAuthentication : b.riskBasedAuthentication;
    b.noCallbackForSocialLogin = void 0 == b.noCallbackForSocialLogin ? a.IsNoCallbackForSocialLogin : b.noCallbackForSocialLogin;
    b.usernameLogin = void 0 == b.usernameLogin ? a.IsUserNameLogin : b.usernameLogin;
    b.promptPasswordOnSocialLogin = void 0 == b.promptPasswordOnSocialLogin ? a.AskPasswordOnSocialLogin : b.promptPasswordOnSocialLogin;
    b.v2Recaptcha = void 0 == b.v2Recaptcha ? a.IsV2Recaptcha : b.v2Recaptcha;
    b.invisibleRecaptcha = void 0 == b.invisibleRecaptcha ? a.IsInvisibleRecaptcha : b.invisibleRecaptcha;
    b.askOptionalFieldsOnRegistration = void 0 == b.askOptionalFieldsOnRegistration ? a.AskOptionalFieldsOnSocialSignup : b.askOptionalFieldsOnRegistration;
    b.askEmailForUnverifiedProfileAlways = void 0 == b.askEmailForUnverifiedProfileAlways ? a.AskEmailIdForUnverifiedUserLogin : b.askEmailForUnverifiedProfileAlways;
    b.logoutOnVerifyEmail = void 0 == b.logoutOnVerifyEmail ? a.IsLogoutOnEmailVerification : b.logoutOnVerifyEmail;
    b.disableAccountLinking = a.IsDisabledAccountLinking;
    b.duplicateEmailWithUniqueUsername = a.DuplicateEmailWithUniqueUsername;
    b.customDomain = b.customDomain || a.CustomDomain
  }

  function ia(a) {
    h.isApiCallingStarted || "" != h.options ? h.isApiCallingStarted && ("" != h.options ? a() : Ea.push(a)) : (h.isApiCallingStarted = !0, Ea.push(a), l.ajaxCall("get", Ya + "appInfo?apikey=" + b.apiKey, "", function (a) {
      yc(a);
      b = l.mergeOptions(Za, b);
      h.options = b;
      for (a = 0; a < Ea.length; a++) Ea[a]()
    }, "registrationSchema"))
  }

  function Ib(a, b) {
    b = b || {};
    var e = b.onSuccess || function () {},
      d = b.onError || function () {},
      g = b.container || "",
      m = b.classPrefix || "",
      k = b.templateName || "";
    ia(function () {
      "registration" != a && "updateSecurityQuestion" != a && h.$hooks.call("beforeInit", a);
      switch (a) {
        case "login":
          Nb(g, e, d, m);
          break;
        case "registration":
          var b = 1;
          var f = setInterval(function () {
            Na || (Na = !0, h.$hooks.call("beforeInit", a), Sb(g, e, d, m), 0 < b && clearInterval(f))
          }, 1E3);
          break;
        case "resetPassword":
          ra(g, e, d, m);
          break;
        case "forgotPassword":
          Tb(g, e, d, m);
          break;
        case "verifyEmail":
          Zb(e, d, g, m);
          break;
        case "changePassword":
          Ub(g, e, d, m);
          break;
        case "socialLogin":
          var n = l.elementById(g);
          n && l.addEvent("click", n, function () {
            Ba = this.id
          });
          Ba = g;
          Cb(g, e, d, m);
          break;
        case "linkAccount":
          gc(g, e, d, k);
          break;
        case "unLinkAccount":
          var t = l.unLinkAccount;
          l.unLinkAccount = function (a, b) {
            t(a, b, e, d)
          };
          break;
        case "profileEditor":
          fc(g, e, d, m);
          break;
        case "customInterface":
          Cb(g, e, d, void 0);
          break;
        case "deleteUser":
          $b(e, d);
          break;
        case "deleteUserConfirm":
          bc(e, d);
          break;
        case "updatePhone":
          h.LRCheck2FA = !1;
          fa(g, e, d, m);
          break;
        case "changeUsername":
          Yb(g, e, d, m);
          break;
        case "resendVerificationEmail":
          Vb(g, e, d, m);
          break;
        case "addEmail":
          Wb(g, e, d, m);
          break;
        case "removeEmail":
          Xb(g, e, d, m);
          break;
        case "createTwoFactorAuthentication":
          Db(g, e, d, m);
          break;
        case "backupCodeButton":
          dc(g, e, d, m);
          break;
        case "resetBackupCodeButton":
          ec(g, e, d, m);
          break;
        case "updateSecurityQuestion":
          b = 1;
          f = setInterval(function () {
            Ma || (Ma = !0, kc(g, e, d, m), 0 < b && clearInterval(f))
          }, 1E3);
          break;
        case "resetPasswordBySecurityQuestion":
          jc(g, e, d, m);
          break;
        case "autoLogin":
          xc(g, e, d, m);
          break;
        case "noRegistrationPasswordLessLogin":
          uc(g, e, d, m);
          break;
        case "ssoLogin":
          zc(e);
          break;
        case "logout":
          Bb(e);
          break;
        case "ssoNotLoginThenLogout":
          Ac(d, e);
          break;
        case "instantLinkLogin":
          Kb(e, d, m);
          break;
        default:
          h.log("This action is not valid.")
      }
    })
  }

  function $a(a) {
    T ? b.appName ? a() : h.log("LoginRadius site name (app name) required to do SSO") : h.log("Init method should be called first then login.")
  }

  function zc(a) {
    $a(function () {
      l.jsonpCall("https://" + (b.customDomain || b.appName + ".hub.loginradius.com") +
        "/ssologin/login",
        function (d) {
          d.isauthenticated && (h.loginRadiusHtml5PassToken ? h.loginRadiusHtml5PassToken(d.token) : (B("LRTokenKey", d.token), b.tokenType && "jwt" == b.tokenType.toLowerCase() ? (S++, ba = {}, Ia(d.token, function (b) {
            a(d.token, b)
          })) : a(d.token)))
        }, "ssoLogin")
    })
  }

  function Bb(a) {
    $a(function () {
      l.jsonpCall("https://" + (b.customDomain || b.appName + ".hub.loginradius.com") + "/ssologin/" + (b.tokenExpire ? "tokenExpire" : "logout") + (b.tokenExpire ? "?tokenExpire=1" : ""), function (d) {
        h.documentCookies.removeItem("lr-user--token", b.appPath);
        h.clearSession();
        a && a()
      }, "logout")
    })
  }

  function oa(a) {
    h.documentCookies.setItem("lr-user--token", a, "", b.appPath)
  }

  function Ac(a, d) {
    $a(function () {
      l.jsonpCall("https://" + (b.customDomain || b.appName + ".hub.loginradius.com") + "/ssologin/login", function (e) {
        if (e.isauthenticated) {
          var f = h.documentCookies.getItem("lr-user--token");
          if ("undefined" == typeof f || null == f) oa(e.token), f = h.documentCookies.getItem("lr-user--token");
          f && f != e.token ? (oa(e.token), a(e.token)) : (B("LRTokenKey", e.token), b.tokenType && "jwt" == b.tokenType.toLowerCase() ? (S++, ba = {}, Ia(e.token, function (a) {
            d(e.token, a)
          })) : d(e.token))
        } else h.documentCookies.removeItem("lr-user--token", b.appPath), a()
      }, "ssoNotLoginThenLogout")
    })
  }(function (a, b) {
    var e = function () {
      var b = function () {
          for (var b = a.location.hash ? a.location.hash.substr(1).split("&") : [], e = {}, d = 0; d < b.length; d++) {
            var f = b[d].split("=");
            e[f[0]] = decodeURIComponent(f[1])
          }
          return e
        },
        e = function (b) {
          var e = [],
            d;
          for (d in b) e.push(d + "=" + encodeURIComponent(b[d]));
          a.location.hash = e.join("&")
        };
      return {
        get: function (a) {
          var e = b();
          return a ? e[a] : e
        },
        add: function (a) {
          var d = b(),
            f;
          for (f in a) d[f] = a[f];
          e(d)
        },
        remove: function (a) {
          a = "string" == typeof a ? [a] : a;
          for (var d = b(), f = 0; f < a.length; f++) delete d[a[f]];
          e(d)
        },
        clear: function () {
          e({})
        }
      }
    }();
    a.hash = e
  })(window);
  var Jb = hash.get("lr-token");
  Jb && window.opener && window.opener.html5passToken && (window.opener.html5passToken(Jb), document.write("<style type='text/css'>body { display: none !important; } </style>"), hash.remove("lr-token"), window.close());
  this.global = window;
  var ab = this,
    Ya = "https://config.lrcontent.com/ciam/";
  Ya = "https://config.lrcontent.com/ciam/";
  var Na = !1,
    Ma = !1,
    na = !1,
    Pa = !1,
    Ba = "",
    h = this;
  h.version = "2.12.5";
  h.LRCheckRegistration = !1;
  h.instantLinkLoginFlag = !1;
  h.socialLoginFlag = !1;
  h.LRCheckLogin = !1;
  h.LRCheck2FA = !1;
  h.loginAction = !1;
  h.options = "";
  var S = 0,
    Va = "",
    ba = "",
    T = !1,
    Da = 1,
    Za = {
      instantLinkLoginEmailTemplate: "",
      callbackUrl: window.location,
      callbackInsideSameWindow: "",
      callbackType: "",
      scope: "",
      loginUrl: "",
      deleteUrl: "",
      emailTemplate: "",
      verificationUrl: "",
      verificationEmailTemplate: "",
      resetPasswordEmailTemplate: "",
      resetPasswordConfirmationEmailTemplate: "",
      autoLoginRedirectUrl: "",
      autoLoginEmailTemplate: "",
      smsTemplate2FA: "",
      smsTemplateForgot: "",
      smsTemplateWelcome: "",
      smsTemplateNoRegistrationWelcome: "",
      smsTemplateNoRegistration: "",
      smsTemplateInstantOTPLogin: "",
      smsTemplate2FAWelcome: "",
      smsTemplatePhoneVerification: "",
      smsTemplateUpdatePhone: "",
      welcomeEmailTemplate: "",
      noRegistrationEmailTemplate: "",
      resetPasswordUrl: "",
      templateName: "",
      debugMode: !1,
      tokenType: "lrtoken",
      integrationName: "",
      autoLoginPingCount: 100,
      autoLoginPingInterval: 5,
      maskSensitiveInput: !1,
      enableHeaderSott: !0,
      accessTokenResponse: !0,
      rbaOneclickEmailTemplate: "",
      rbaOTPSmsTemplate: "",
      rbaCityEmailTemplate: "",
      rbaCountryEmailTemplate: "",
      rbaBrowserEmailTemplate: "",
      rbaIpEmailTemplate: "",
      rbaCitySmsTemplate: "",
      rbaCountrySmsTemplate: "",
      rbaBrowserSmsTemplate: "",
      rbaIpSmsTemplate: ""
    },
    O = {
      login: "Login",
      socialregistration: "Login",
      loginrequiredfieldsupdate: "Login",
      registration: "Register",
      verifyemail: "Verify",
      resetpassword: "Reset Password",
      sociallogin: "Login",
      otp: "Verify",
      twofaotp: "Verify",
      showqrcode: "Verify",
      updatephone: "Update",
      changephone: "Update",
      forgotpassword: "Send",
      securityquestions: "Get",
      changepassword: "Submit",
      resendemailverification: "Send",
      addemail: "Send",
      removeemail: "Send",
      changeusername: "Submit",
      profileeditor: "Update Profile",
      otplogin: "OTP",
      instantlinkloginbuttonlabel: "Email me a link to Sign In",
      instantotploginbuttonlabel: "Send an OTP to Sign In",
      createtwofactorauthentication: "2-Step Verification",
      sendotp: "Send OTP",
      resendotp: "Resend OTP",
      changenumber: "Change Number",
      backupcode: "Login",
      backupcodebutton: "Try another way to Sign In",
      disablegoogleauthenticator: "Disable Google Authenticator",
      disableotpauthenticator: "Disable OTP Authenticator",
      updatesecurityquestion: "Update Security Question",
      resetpwdbysecq: "Reset Password By SecurityQ",
      autologin: "Auto Login",
      validatecode: "Validate",
      noregistrationpasswordlesslogin: "Login",
      progressiveprofiling: "Progressive Profiling"
    },
    y = {
      tokenValid: {
        Message: "Access token is not valid",
        Description: "LoginRadius Access Token is invalid, please verify the authentication response",
        ErrorCode: 905
      },
      twofaTokenValid: {
        Message: "Token is not valid",
        Description: "Your session is not valid."
      },
      disabledAccountLinking: "Account Linking disabled in your account",
      noSecurityQuestions: "There are no security questions for this application",
      autoLoginEmailSent: "An email has been sent to your provided email address, please verify in order to login.",
      invalidSott: "Something went wrong, please try again.",
      notValidMessage: "Error Message element not valid",
      passwordStrengthMessage: "Password strength meter configuration is not valid.",
      otpSent: "OTP Sent Successfully",
      vTokenError: {
        Message: "Verification token not found in query string."
      },
      notFound: "Data not found.",
      emailNotVerified: {
        Message: "The email is not verified, please verify the link in your email",
        Description: "The email is not verified, please verify the link in your email",
        ErrorCode: 970
      },
      phoneNotVerified: {
        Message: "Phone number is not verified",
        Description: "The provided phone number is not verified, please use a verified phone number for login.",
        ErrorCode: 1066
      },
      blockedUser: {
        Message: "User is blocked",
        Description: "This user is blocked by site admin",
        ErrorCode: 991
      },
      unverifiedUser: {
        Message: "This Uid have only traditional unverified account",
        Description: "This Uid have only traditional unverified account",
        ErrorCode: 1028
      }
    },
    xa = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  h.sessionData = {
    getUid: function () {
      return z("lr-user-uid")
    },
    getToken: function () {
      return z("LRTokenKey")
    }
  };
  h.errorMessages = [];
  h.validationMessages = [];
  h.formCustomLabel = {};
  h.formElementsTitle = {};
  h.defaultOptionField = {};
  h.formValidations = {};
  h.formPlaceholder = {};
  h.formElementAttributes = {};
  h.buttonElements = {};
  h.passwordMeterConfiguration = [];
  h.buttonsName = {};
  h.eventsName = {};
  h.$hooks = {
    hooks: [],
    register: function (a, b, e) {
      "undefined" == typeof h.$hooks.hooks[a] && (h.$hooks.hooks[a] = []);
      parseInt(e, 10) === e ? h.$hooks.hooks[a].length > e + 1 ? h.$hooks.hooks[a].splice(e, 0, b) : h.$hooks.hooks[a].push(b) : h.$hooks.hooks[a].push(b)
    },
    call: function (a) {
      var b = Array.prototype.splice.call(arguments, 1);
      if ("undefined" != typeof h.$hooks.hooks[a])
        for (var e = 0, f = h.$hooks.hooks[a].length; e < f; ++e) h.$hooks.hooks[a][e].apply(null, b)
    }
  };
  h.$hooks.register("addEventOnElement", function (a) {
    l.extend(h.eventsName, a)
  });
  h.$hooks.register("mapErrorMessages", function (a) {
    if (a.code && a.message) h.errorMessages.push(a);
    else if (R(a))
      for (var b = 0; b < a.length; b++) a[b].code && a[b].message ? h.errorMessages.push(a[b]) : h.log(notValidMessage);
    else h.log(notValidMessage)
  });
  h.$hooks.register("passwordMeterConfiguration", function (a) {
    R(a) ? l.extend(h.passwordMeterConfiguration, a) : h.log(passwordStrengthMessage)
  });
  h.$hooks.register("setButtonsName", function (a) {
    for (var b, e = Object.keys(a), f = e.length, g = {}; f--;) b = e[f], g[b.toLowerCase()] = a[b];
    l.extend(h.buttonsName, g)
  });
  h.$hooks.register("mapValidationMessages", function (a) {
    if (a.rule && a.message) h.validationMessages.push(a);
    else if (R(a))
      for (var b = 0; b < a.length; b++) a[b].rule && a[b].message ? h.validationMessages.push(a[b]) : h.log(notValidMessage);
    else h.log(notValidMessage)
  });
  h.$hooks.register("customizeFormLabel", function (a) {
    l.extend(h.formCustomLabel, a)
  });
  h.$hooks.register("customizeElementTitle", function (a) {
    l.extend(h.formElementsTitle, a)
  });
  h.$hooks.register("defaultChoiceOption", function (a) {
    l.extend(h.defaultOptionField, a)
  });
  h.$hooks.register("customizeFormPlaceholder", function (a) {
    l.extend(h.formPlaceholder, a)
  });
  h.$hooks.register("formValidationRules", function (a) {
    l.extend(h.formValidations, a)
  });
  h.$hooks.register("formAttributes", function (a) {
    l.extend(h.formElementAttributes, a)
  });
  h.$hooks.register("buttonAttributes", function (a) {
    l.extend(h.buttonElements, a)
  });
  h.$hooks.register("addFormCaptcha", function (a, d, e) {
    ia(function () {
      e && (h.options[e] = !0);
      var f = a + "recaptcha_widget";
      Ka();
      var g = [];
      La(f, g, !1, d);
      if (g && g[0]) {
        var m = document.createElement("div");
        m.setAttribute("name", g[0].name);
        if (b.invisibleRecaptcha) {
          var k = d.toString();
          k = /function ([^\(]*)/.exec(k)[1];
          g[0].html = g[0].html.replace("onCaptchaSubmit", k)
        }
        m.innerHTML = g[0].html;
        J(a, m, !0)
      }
      Qa(f, !1, d)
    })
  });
  h.$hooks.register("addFormCaptchaExecute", function (a) {
    var d = a + "recaptcha_widget";
    a = l.elementById(d + "_tencent");
    if (b.invisibleRecaptcha) var e = setInterval(function () {
      if ("undefined" != typeof grecaptcha) {
        try {
          grecaptcha.execute(window[d])
        } catch (f) {}
        clearInterval(e)
      }
    }, 1E3);
    else a && "none" != a.style.display && (b.tencentCaptcha || b.tencentCaptchaAsFallback && !window.grecaptcha) && a.click()
  });
  h.$hooks.register("successCallback", function (a, b, e) {
    var d = "";
    a && (d = "verifyotp" == a.toLowerCase() ? "otp" : a.toLowerCase());
    if ("1132" == b.ErrorCode) {
      "verifyemail" == d && (l.elementById("loginradius-submit-verify").style.display = "block");
      a = h.LRPrefix.replace("##", "") + "recaptcha_widget_" + d;
      if (b = l.elementById(a, !0)) b.style.display = "block";
      window.grecaptcha && b && "" != b.innerHTML ? grecaptcha.reset(window[a + "lr_recaptcha_widgets_idprefix"]) : Qa(a, !1)
    } else "1148" != b.ErrorCode && "1165" != b.ErrorCode || Lb(e, d)
  });
  h.$hooks.register("afterFormRender", function (a, b, e, f) {
    f = h.options.RegistrationFormSchema;
    var d = [];
    if ("registration" == a) {
      var m = {},
        k;
      for (k = 0; k < f.length; k++) f[k] && f[k].DataSource && null !== f[k].DataSource && (m[f[k].DataSource] = f[k], m[f[k].DataSource].children = []);
      for (var l in m) m.hasOwnProperty(l) && (k = m[l], k.ParentDataSource && null != k.ParentDataSource ? m[k.ParentDataSource].children.push(k) : d.push(k));
      0 < d.length && Qb(b, d, e)
    }
    "validatecode" == a && Rb(a, f, e)
  });
  h.$hooks.register("setLocaleBasedInfo", function (a) {
    for (var b in a)
      if (a.hasOwnProperty(b)) switch (b) {
        case "labels":
          l.extend(h.formCustomLabel, a[b]);
          break;
        case "placeholders":
          l.extend(h.formPlaceholder, a[b]);
          break;
        case "validationMessages":
          h.$hooks.call("mapValidationMessages", a[b]);
          break;
        case "errorMessages":
          h.$hooks.call("mapErrorMessages", a[b]);
          break;
        case "passwordMeterConfiguration":
          h.$hooks.call("passwordMeterConfiguration", a[b]);
          break;
        case "buttonsName":
          h.$hooks.call("setButtonsName", a[b])
      }
  });
  var l = h.util = {};
  l.elementById = function (a, b) {
    var e = document.getElementById(a);
    if (e) return e;
    b || h.log("Unable to find id: " + a)
  };
  l.keysToLowerCase = function (a) {
    for (var b, e = Object.keys(a), f = e.length, g = {}; f--;) b = e[f], g[b.toLowerCase()] = a[b], "object" == typeof g[b.toLowerCase()] && null != g[b.toLowerCase()] && (g[b.toLowerCase()] = l.keysToLowerCase(g[b.toLowerCase()]));
    return g
  };
  l.elementsByClass = function (a, b) {
    if ("" != a) {
      b = b || document.body;
      for (var e = [], d = new RegExp("(^| )" + a + "( |$)"), g = b.getElementsByTagName("*"), h = 0, k = g.length; h < k; h++) d.test(g[h].className) && e.push(g[h]);
      return e
    }
  };
  l.getThisObjectName = function () {
    for (var a in ab.global)
      if ("frameElement" != a && "webkitStorageInfo" != a && "webkitIndexedDB" != a && ab.global[a] == ab) return a
  };
  l.isValidUrl = function (a) {
    return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(a) ? !0 : !1
  };
  l.hasClass = function (a, b) {
    return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
  };
  l.addclass = function (a, b) {
    return l.hasClass(a, b) ? !1 : (a.className += " " + b, !0)
  };
  l.serialize = function (a) {
    if (a && "FORM" === a.nodeName) {
      var d, e = [];
      for (d = a.elements.length - 1; 0 <= d; --d)
        if ("" !== a.elements[d].name && "" !== a.elements[d].value.trim()) switch ("emailid" !== a.elements[d].name || b.usernameLogin || b.duplicateEmailWithUniqueUsername || (a.elements[d].value = a.elements[d].value.toLowerCase()), a.elements[d].nodeName) {
          case "INPUT":
            switch (a.elements[d].type) {
              case "text":
              case "hidden":
              case "button":
              case "reset":
              case "submit":
              case "email":
                var f = a.elements[d].name;
                "emailid" == f && (f = "email");
                a.elements[d].disabled || e.push(f + "=" + encodeURIComponent(a.elements[d].value.trim()));
                break;
              case "password":
                e.push(a.elements[d].name + "=" + encodeURIComponent(a.elements[d].value));
                break;
              case "checkbox":
                e.push(a.elements[d].name + "=" + encodeURIComponent(a.elements[d].checked));
                break;
              case "radio":
                a.elements[d].checked && e.push(a.elements[d].name + "=" + encodeURIComponent(a.elements[d].value))
            }
            break;
          case "TEXTAREA":
            e.push(a.elements[d].name + "=" + encodeURIComponent(a.elements[d].value.trim()));
            break;
          case "SELECT":
            switch (a.elements[d].type) {
              case "select-one":
                e.push(a.elements[d].name + "=" + encodeURIComponent(a.elements[d].value.trim()));
                break;
              case "select-multiple":
                for (f = a.elements[d].options.length - 1; 0 <= f; --f) a.elements[d].options[f].selected && e.push(a.elements[d].name + "=" + encodeURIComponent(a.elements[d].options[f].value.trim()))
            }
            break;
          case "BUTTON":
            switch (a.elements[d].type) {
              case "reset":
              case "submit":
              case "button":
                e.push(a.elements[d].name + "=" + encodeURIComponent(a.elements[d].value.trim()))
            }
        }
      return e.join("&")
    }
  };
  l.isSubstring = function (a, b) {
    for (var e in b)
      if (-1 != b[e].indexOf(a)) return e;
    return !1
  };
  l.addJs = function (a, b) {
    b = b || document;
    var e = b.getElementsByTagName("head")[0],
      d = b.createElement("script");
    d.src = a;
    d.type = "text/javascript";
    e.appendChild(d);
    return d
  };
  l.hashTmpl = function f(b, e) {
    var d = /\W/.test(b) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + b.replace(/[\r\t\n]/g, " ").split("<#").join("\t").replace(/((^|#>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)#>/g, "',$1,'").split("\t").join("');").split("#>").join("p.push('").split("\r").join("\\'") +
      "');}return p.join('');") : Fa[b] = Fa[b] || (l.elementById(b) ? f(l.elementById(b).innerHTML) : "");
    return "function" == typeof d ? e ? d(e) : d : ""
  };
  l.addEvent = function (b, e, f) {
    var d = [];
    e instanceof Array ? d = e : d.push(e);
    for (e = 0; e < d.length; e++) d[e]["on" + b] = f
  };
  var Fa = {};
  l.tmpl = function g(b, f) {
    var e = /\W/.test(b) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + b.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") +
      "');}return p.join('');") : Fa[b] = Fa[b] || (l.elementById(b) ? g(l.elementById(b).innerHTML) : "");
    return "function" == typeof e ? f ? e(f) : e : ""
  };
  l.getQueryParameterByName = function (b, f) {
    f = "&" + (f || location.search);
    b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var e = (new RegExp("[\\?&]" + b + "=([^&#]*)")).exec(f);
    return null == e ? null : decodeURIComponent(e[1].replace(/\+/g, " "))
  };
  l.getParameterByName = function (b) {
    b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    b = (new RegExp("[\\?&]" + b + "=([^&#]*)")).exec(location.search);
    return null === b ? "" : decodeURIComponent(b[1].replace(/\+/g, " "))
  };
  l.getQueryStringValue = function (b, f) {
    var e = (new RegExp("[?&]" + f + "=([^&#]*)", "i")).exec(b ? b : window.location.href);
    return e ? e[1] : null
  };
  l.extend = function (b, f) {
    for (var e in f) f.hasOwnProperty(e) && (b[e] = f[e])
  };
  var Q = navigator.userAgent.toLowerCase(),
    ma = {
      version: (Q.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
      safari: /webkit/.test(Q),
      opera: /opera/.test(Q),
      msie: (/msie/.test(Q) || /trident/.test(Q)) && !/opera/.test(Q),
      mozilla: /mozilla/.test(Q) && !/(compatible|webkit)/.test(Q)
    };
  l.browser = ma;
  var bb = !1,
    aa = !1,
    la = [];
  l.ready = function (b, f) {
    I();
    aa ? b.call(window, []) : la.push(function () {
      return b.call(window, [])
    })
  };
  l.isJsonString = function (b) {
    try {
      return JSON.parse(b)
    } catch (f) {
      return !1
    }
  };
  l.jsonpCall = function (b, f, g, m) {
    h.$hooks.call("startProcess", m);
    g = g || "Loginradius" + Math.floor(1E18 * Math.random() + 1);
    window[g] = function (b) {
      b.ErrorCode && t(b);
      f(b);
      h.$hooks.call("endProcess", m)
    };
    b = -1 != b.indexOf("?") ? b + "&callback=" + g : b + "?callback=" + g;
    l.addJs(b)
  };
  l.ajaxCall = function (e, f, g, m, k, p) {
    var n = k;
    k && -1 != k.indexOf("##") && (n = k.split("##")[1]);
    if (xa.test(b.apiKey)) {
      h.$hooks.call("startProcess", k, g);
      try {
        var r = new XMLHttpRequest;
        if (b.projectionFields) {
          var t = Object.keys(b.projectionFields),
            v = ["verifyOTP", "updateData"],
            u = !1,
            w = k;
          h.LRCheckRegistration ? (u = -1 !== v.indexOf(k), w = "registration") : h.LRCheckLogin && (u = -1 !== v.indexOf(k), w = "login");
          if (-1 !== t.indexOf(k) || u) {
            var x = b.projectionFields[w];
            if (x && 0 < x.length) {
              t = "ErrorCode Profile/Uid Profile/IsDeleted access_token Profile/EmailVerified Profile/PhoneIdVerified Profile/PhoneId PhoneId PhoneIdVerified EmailVerified Uid IsDeleted".split(" ");
              (b.twoFactorAuthentication || b.optionalTwoFactorAuthentication) && t.push("SecondFactorAuthentication/SecondFactorAuthenticationToken", "SecondFactorAuthentication/IsOTPAuthenticatorVerified", "SecondFactorAuthentication/IsGoogleAuthenticatorVerified", "SecondFactorAuthentication/OTPPhoneNo", "SecondFactorAuthentication/ManualEntryCode");
              x = l.mergeObjects(x, t, !0);
              t = "&fields=";
              for (v = 0; v < x.length; v++) t = v == x.length - 1 ? t + x[v] : t + x[v] + ",";
              f += t
            }
          }
        }
        r.open(e, f, !0); - 1 == f.indexOf("cdn") && -1 == f.indexOf(".json") && r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        g.sottcheck && (r.setRequestHeader("X-LoginRadius-Sott", b.sott), delete g.sottcheck);
        g ? (g = "string" === typeof g || g instanceof String ? JSON.stringify(l.parseQueryString(g)) : JSON.stringify(g), r.setRequestHeader("Content-Type", "application/json"), r.send(g)) : r.send(null);
        r.onreadystatechange = function () {
          if (4 === r.readyState) {
            var b = r.response;
            "500" == r.status && (b = JSON.parse(b), b.ErrorCode = "500", b = JSON.stringify(b));
            if (b = l.isJsonString(b)) h.$hooks.call("successCallback", n, b, g), p ? m(p, b) : m(b);
            h.$hooks.call("endProcess", k)
          }
        }
      } catch (Bc) {}
    } else h.log("apiKey is not in valid guid format.")
  };
  l.parseQueryString = function (b) {
    var e = {};
    if ((b || "" != b) && "string" === typeof b) {
      b = b.split("&");
      for (var g = 0; g < b.length; g++) {
        var h = b[g].split("=");
        e[decodeURIComponent(h[0])] = decodeURIComponent(h[1])
      }
    }
    return e
  };
  l.encodedString = function (b) {
    -1 == b.indexOf("%2B") && (b = b.replace(/\+/g, "%2B"));
    return b
  };
  l.mergeOptions = function (b, f) {
    var e = {},
      h;
    for (h in b) e[h] = b[h];
    for (h in f) e[h] = f[h];
    return e
  };
  l.mergeObjects = function (b, f, g) {
    var e = [],
      h;
    for (h in b) {
      for (var l in f) var n = g ? f[l] == b[h] : f[l].name == b[h].name;
      if (n) break;
      e.push(b[h])
    }
    return e = e.concat(f)
  };
  l.openWindow = function (e) {
    e = e || this.href;
    var f = l.getQueryParameterByName("provider", e);
    if (b.isMobile) {
      f = "no";
      b.debugMode && (f = "yes");
      var g = window.open(e, "_blank", "location=" + f);
      g.addEventListener("loadstop", function (b) {
        b = /[\?&]token=([^&#]*)/.exec(b.url);
        b = null === b ? "" : decodeURIComponent(b[1].replace(/\+/g, " "));
        null != b && "" != b && (g.close(), html5passToken(b))
      })
    } else {
      e = e || this.href;
      f = document.createElement("a");
      f.href = e;
      f = l.getQueryParameterByName("provider", f.search);
      var m = "";
      b.noCallbackForSocialLogin && (m = Xa(16), e += "&nocallback=true&callbackguid=" + m);
      window.open(e, "lrpopupchildwindow", b.customizeSocialPopup || "menubar=1,resizable=1,width=450,height=450,scrollbars=1");
      h.$hooks.call("socialCalls", f, m);
      return !1
    }
  };
  l.unLinkAccount = function (e, f, g, h) {
    g = g || function () {};
    h = h || function () {};
    if (e && null != e && f && null != f) {
      var k = {
        provider: e,
        providerid: f
      };
      (e = z("LRTokenKey")) ? l.ajaxCall("delete", "https://api.loginradius.com/identity/v2/auth/socialIdentity?apiKey=" + b.apiKey +
        "&access_token=" + e, k,
        function (b) {
          b.ErrorCode ? h(n(b)) : g(b, k)
        }, "unLinkAccount"): onError([t(y.tokenValid)])
    }
  };
  l.findInSchema = E;
  var Ea = [];
  h.init = function (e, f) {
    h.useraction = e;
    h.otpSchema = b.maskSensitiveInput ? [{
      type: "password",
      name: "otp",
      display: "OTP",
      rules: "required",
      permission: "r"
    }] : [{
      type: "string",
      name: "otp",
      display: "OTP",
      rules: "required",
      permission: "r"
    }];
    "required" == b.twoFactorAuthentication ? (b.twoFactorAuthentication = !0, b.optionalTwoFactorAuthentication = !1) : "optional" == b.twoFactorAuthentication && (b.twoFactorAuthentication = !1, b.optionalTwoFactorAuthentication = !0);
    "ssoLogin" !== e && "logout" !== e && "ssoNotLoginThenLogout" !== e || T || (T = !0);
    b.appName || h.log("SSO will not work, please set option.appName for SSO");
    b.formRenderDelay = b.formRenderDelay || 0;
    b.apiKey ? 0 < b.formRenderDelay ? setTimeout(function () {
      Ib(e, f)
    }, b.formRenderDelay) : Ib(e, f) : h.log("API key must be set.")
  };
  h.getAppConfiguration = ia;
  h.progressiveProfiling = {};
  h.progressiveProfiling.init = function () {
    ia(function () {
      l.ajaxCall("get", Ya + "progressiveProfilingSchema?apikey=" +
        b.apiKey + "&appName=" + b.appName, "",
        function (e) {
          h.progressiveProfilingSchema = e;
          h.$hooks.register("registrationSchemaFilter", function (e, g) {
            b.progressiveProfilingTraditional && (h.LoggedinSocialProvderProfile = g)
          })
        }, "progressiveProfilingSchema")
    })
  };
  h.progressiveProfiling.execStep = function (e, f) {
    if (h.progressiveProfilingSchema) {
      var g = f.onSuccess || function () {},
        m = f.onError || function () {},
        k = f.container || "",
        p = f.classPrefix || "",
        n = f.templateName || "",
        r = z("LRTokenKey");
      r && l.ajaxCall("get", "https://api.loginradius.com/identity/v2/auth/socialidentity?apiKey=" +
        b.apiKey + "&access_token=" + r, "",
        function (f) {
          var l = E(h.progressiveProfilingSchema.ProfilingSteps, "Step", e),
            q = f.Provider.toLowerCase();
          if ("email" == q || "raas" == q || b.progressiveProfilingTraditional) {
            b.progressiveProfilingTraditional && "email" != q && "raas" != q && (f = h.LoggedinSocialProvderProfile);
            var t = X(l.Schema, f),
              u = {};
            u.Profile = f;
            u.access_token = r;
            0 < t.length ? w(t, "progressiveProfiling", k, function (b) {
              ha(u, k, b, g, m, p, t, "progressiveProfiling")
            }, function (b) {
              m(b)
            }, p) : L(u, "", g, m)
          } else l = E(l.Scopes, "Provider", q), f = [], f.push({
            Name: q,
            Endpoint: "https://" + (b.customDomain || b.appName + ".hub.loginradius.com") + "/RequestHandlor.aspx?apikey=" + b.apiKey + "&provider=" + q + "&scope=" + l.Scopes
          }), Y(k, "", n, "", "", f)
        })
    }
  };
  h.customInterface = function (e, f) {
    b = l.mergeOptions(Za, b) || {};
    var g = f.templateName || "";
    ia(function () {
      Y(e, "", g)
    })
  };
  h.clearSession = function () {
    Z("LRTokenKey");
    Z("lr-user-uid");
    Z("lr2fatok")
  };
  h.documentCookies = {
    getItem: function (b) {
      return b ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(b).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null
    },
    setItem: function (b, f, g, h, k, l) {
      if (!b || /^(?:expires|max\-age|path|domain|secure)$/i.test(b)) return !1;
      var e = "",
        m = {
          getInStringFormat: function (b) {
            if (Infinity === b) return "Fri, 31 Dec 9999 23:59:59 GMT";
            var e = new Date;
            e.setTime(e.getTime() + 1E3 * b);
            return e.toGMTString()
          }
        };
      if (g) switch (g.constructor) {
        case Number:
          e = Infinity === "; expires=" + m.getInStringFormat(g) + g ? "" : "; max-age=" + g;
          break;
        case String:
          e = "; expires=" + g;
          break;
        case Date:
          e = "; expires=" + g.toUTCString()
      }
      document.cookie = encodeURIComponent(b) + "=" + encodeURIComponent(f) + e + (k ? "; domain=" + k : "") + (h ? "; path=" + h : "") + (l ? "; secure" : "");
      return !0
    },
    removeItem: function (b, f, g) {
      if (!this.hasItem(b)) return !1;
      document.cookie = encodeURIComponent(b) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (g ? "; domain=" + g : "") + (f ? "; path=" + f : "");
      return !0
    },
    hasItem: function (b) {
      return b ? (new RegExp("(?:^|;\\s*)" + encodeURIComponent(b).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie) : !1
    },
    keys: function () {
      for (var b = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:=[^;]*)?;\s*/), f = b.length, g = 0; g < f; g++) b[g] = decodeURIComponent(b[g]);
      return b
    }
  };
  h.loginFormSchema = [{
    type: "string",
    name: "emailid",
    display: "Email Id",
    rules: "required|valid_email",
    permission: "r"
  }, {
    type: "password",
    name: "password",
    display: "Password",
    rules: "required|min_length[6]|max_length[32]",
    permission: "w"
  }];
  h.backupCodeFormSchema = [{
    type: "string",
    name: "backupcode",
    display: "Backup Code",
    rules: "required",
    permission: "r"
  }];
  h.resetPasswordByPhoneSchema = [{
    type: "string",
    name: "otp",
    display: "OTP",
    rules: "required",
    permission: "r"
  }, {
    type: "password",
    name: "password",
    display: "Password",
    rules: "required|min_length[6]|max_length[32]",
    permission: "w"
  }];
  h.checkPhoneNumberSchema = [{
    type: "string",
    name: "phone",
    display: "Phone Number",
    rules: "required|valid_phoneno",
    permission: "r"
  }];
  h.QRCodeSchema = [{
    type: "string",
    name: "googleAuthenticatorCode",
    display: "Google Authenticator Code",
    rules: "required",
    permission: "r"
  }];
  h.getSecQSchema = [{
    type: "string",
    name: "emailid",
    display: "Email Id",
    rules: "required|valid_email",
    permission: "r"
  }];
  h.otpSchema = [{
    type: "string",
    name: "otp",
    display: "OTP",
    rules: "required",
    permission: "r"
  }];
  h.forgotPasswordFormSchema = [{
    type: "string",
    name: "emailid",
    display: "Email",
    rules: "required",
    permission: "r"
  }];
  h.autoLoginSchema = [{
    type: "string",
    name: "emailid",
    display: "Email Id",
    rules: "required",
    permission: "r"
  }];
  h.passwordLessLoginSchema = [{
    type: "string",
    name: "emailid",
    display: "Email",
    rules: "required",
    permission: "r"
  }, {
    type: "string",
    name: "name",
    display: "Name",
    rules: "",
    permission: "r"
  }];
  h.changePasswordFormSchema = [{
    type: "password",
    name: "oldpassword",
    display: "Old Password",
    rules: "required|min_length[6]|max_length[32]",
    permission: "w"
  }, {
    type: "password",
    name: "newpassword",
    display: "Password",
    rules: "required|min_length[6]|max_length[32]",
    permission: "w"
  }, {
    type: "password",
    name: "confirmnewpassword",
    display: "Confirm Password",
    rules: "required|min_length[6]|max_length[32]|matches[newpassword]",
    permission: "w"
  }];
  h.emailSchema = h.forgotPasswordFormSchema;
  h.addEmailSchema = [{
    type: "string",
    name: "emailid",
    display: "Email",
    rules: "required|valid_email",
    permission: "r"
  }, {
    type: "string",
    name: "type",
    display: "Type",
    rules: "required",
    permission: "r"
  }];
  h.changeUsernameFormSchema = [{
    type: "string",
    name: "username",
    display: "Username",
    rules: "required",
    permission: "r"
  }];
  h.resetPasswordFormSchema = [{
    type: "password",
    name: "password",
    display: "Password",
    rules: "required|min_length[6]|max_length[32]",
    permission: "w"
  }, {
    type: "password",
    name: "confirmpassword",
    display: "Confirm Password",
    rules: "required|matches[password]|min_length[6]|max_length[32]",
    permission: "w"
  }, {
    type: "hidden",
    name: "resettoken",
    display: "",
    rules: "required",
    permission: "w",
    value: ""
  }];
  h.api = {};
  h.api.init = function (e) {
    b = l.mergeOptions(Za, b) || {}
  };
  h.api.login = function (b, f, g, h, k, l, n) {
    h = h || function () {};
    k = k || function () {};
    l = l || function () {};
    n = n || function () {};
    Oa(A(b), null, f, g, h, k, null, l, n)
  };
  h.api.otpLogin = function (b, f, g) {
    pa(A(b), null, f, g)
  };
  h.api.otpLoginVerify = function (b, f, g, h) {
    fb("otp=" + b.otp, f, g, h)
  };
  h.api.twoFALogin = function (b, f, g, h, k, l, n, r) {
    h = h || function () {};
    n = n || function () {};
    r = r || function () {};
    k = k || function () {};
    l = l || function () {};
    hb(A(b), null, f, g, "", n, r, h, k, l)
  };
  h.api.registration = function (b, f, g, h, k, l) {
    k = k || function () {};
    l = l || function () {};
    qb(A(f), null, g, h, "", b, k, l)
  };
  h.api.forgotPassword = function (b, f, g) {
    ub(A(b), "", f, g)
  };
  h.api.resetPassword = function (b, f, g) {
    Ab(A(b), f, g)
  };
  h.api.emailVerification = function (b, f, g) {
    Aa(b.vtoken, f, g)
  };
  h.api.socialLogin = function (b, f, g, h, k, l) {
    ia(function () {
      h = h || function () {};
      k = k || function () {};
      Ca(b.token, l, f, g, null, h, k)
    })
  };
  h.api.resendEmailVerification = function (b, f, g) {
    wb(A(b), f, g)
  };
  h.api.twoFAResendOTP = function (b, f, g) {
    lb(A(b), f, g)
  };
  h.api.twoFAVerifyOTP = function (b, f, g) {
    Ta(A(b), f, g)
  };
  h.api.twoFAUpdatePhone = function (b, f, g, h, k, l, n) {
    Sa(b, null, f, g, null, h || function () {}, k || function () {}, l || function () {}, n || function () {})
  };
  h.api.updatePhone = function (b, f, g, h, k, l, n) {
    l = l || function () {};
    n = n || function () {};
    h = h || function () {};
    k = k || function () {};
    ob(A(b), null, f, g, null, l, n, h, k)
  };
  h.api.verifyOTP = function (b, f, g, h) {
    nb(b, f, g, h)
  };
  h.api.resendOTP = function (b, f, g) {
    za(A(b), f, g)
  };
  h.api.addEmail = function (b, f, g) {
    xb(A(b), f, g)
  };
  h.api.removeEmail = function (b, f, g) {
    yb(A(b), f, g)
  };
  h.api.changeUsername = function (b, f, g) {
    zb(A(b), f, g)
  };
  h.api.changePassword = function (b, f, g) {
    vb(A(b), f, g)
  };
  h.api.checkPhoneNumberAvailability = function (b, f, g) {
    cb(A(b), f, g)
  };
  h.api.resetPasswordByPhone = function (b, f, g) {
    pb(A(b), f, g)
  };
  h.api.forgotPasswordbyPhone = function (b, f, g, h) {
    Ua(A(b), f, g, h)
  };
  h.api.updateData = function (b, f, g, h, k, l) {
    var e = {};
    e.Profile = h;
    e.access_token = g;
    ha(e, null, A(f), k, l, "", b)
  };
  h.api.checkEmailAvailability = function (b, f, g) {
    hc(A(b), f, g)
  };
  h.api.checkUserNameAvailability = function (b, f, g) {
    ic(A(b), f, g)
  };
  h.api.resetPasswordBySecurityQuestion = function (b, f, g) {
    Eb(A(b), f, g)
  };
  h.api.updateSecurityQuestion = function (b, f, g) {
    Fb(A(b), f, g)
  };
  h.api.resetTwoFactor = function (b, f, g) {
    Ra(b, f, g)
  };
  h.api.invalidateToken = function (b, f, g) {
    mc(b, f, g)
  };
  h.api.validateToken = function (b, f, g) {
    lc(b, f, g)
  };
  h.api.getSocialData = function (b, f, g, h, k) {
    pc(b, f, g, h, k)
  };
  h.api.postSocialData = function (b, f, g, h, k, l) {
    qc(b, f, g, h, k, l)
  };
  h.api.getCustomObjects = function (b, f, g) {
    sc(b, f, g)
  };
  h.api.createCustomObject = function (b, f, g, h) {
    rc(b, f, g, h)
  };
  h.api.getCustomObjectById = function (b, f, g, h) {
    Gb("get", b, f, g, h)
  };
  h.api.deleteCustomObjectById = function (b, f, g, h) {
    Gb("delete", b, f, g, h)
  };
  h.api.updateCustomObjectById = function (b, f, g, h, k, l) {
    tc(b, f, g, l, h, k)
  };
  h.api.getBackupCode = function (b, f, g) {
    nc(b, f, g)
  };
  h.api.resetBackupCode = function (b, f, g) {
    oc(b, f, g)
  };
  h.api.autoLogin = function (b, f, g) {
    Hb(A(b), f, g)
  };
  h.log = function (e) {
    b.debugMode && "undefined" !== typeof console && console.log(e)
  };
  return h
};