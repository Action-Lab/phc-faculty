var facultyURL = 'https://docs.google.com/spreadsheets/d/1p8r5qRrLbDJp1tmBXvZow9ygzn2EVv3f_m0lgONC1HE/pubhtml';

Tabletop.init({
  key: facultyURL,
  callback: processData,
  simpleSheet: true,
});

function processData(data, tabletop) {
  if (!data[0]) return;

  for (i in data) {
    if (data[i].Display !== 'y') continue;

    var title = data[i]['Title'];
    var titleKey = title.replace(' ', '');
    if (!title) continue;

    $('body').append('<div class="project-div" id="project-' + titleKey + '"></div>');
    var div = '#project-' + titleKey;

    var names = data[i]['Name'];
    var research = data[i]['Research'];

    $(div).append('<h1>Project</h1>');
    $(div).append('<div class="hr" style="background:#' + Math.random().toString(16).substr(-6) + '"></div>');
    $(div).append('<p><span>Faculty:</span><br>' + names + '</p>');
    $(div).append('<p><span>Research</span><br>' + research + '</p>');
    $(div).append('<p class="additional"></p>');
  }
}
