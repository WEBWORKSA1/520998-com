---
---
window.N520_DIGITS={{ site.data.digits | jsonify }};
window.N520_CODES=[{% for c in site.data.codes %}{"n":{{ c.n | jsonify }},"zh":{{ c.zh | jsonify }},"m":{{ c.m | jsonify }},"cat":{{ c.cat | jsonify }},"slug":{{ c.n | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}];
window.N520_GIFTS={{ site.data.gifts | jsonify }};
