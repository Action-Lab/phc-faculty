var facultyURL = 'https://docs.google.com/spreadsheets/d/1p8r5qRrLbDJp1tmBXvZow9ygzn2EVv3f_m0lgONC1HE/pubhtml';

Tabletop.init({
  key: facultyURL,
  callback: processData,
  simpleSheet: true,
});

function mergeNameAndWebsite(name, website) {
  if (!website) { return name; }
  return '<a href="http://' + website + '">' + name + '</a>';
}

function emailToLink(email) {
  if (!email) { return ''; }
  return ' <a href="mailto:' + email + '"> <i class="fa fa-envelope"> </a>'
}


function processData(data, tabletop) {
  if (!data[0]) return;

  var processedData = [];

  for (i in data) {
    var r = data[i];
    if (r.Display !== 'y') continue;

    // Add a row to the final dataset
    processedData.push([
      mergeNameAndWebsite(r.Name, r.Website),
      emailToLink(r.Email),
      r.Research,
      r.Division + (r['Applying for Public Humanities Collaborative?'] == 'Yes' ? ', PHC' : '')
    ]);
  }

  // Adding custom filtering
  $.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {

      // This is a JavaScript object whose keys will
      // be the checked values (e.g. Arts, "Social Sciences")
      showOnly = {};

      $('input:checkbox:checked').each(function() {
        showOnly[this.value] = 1;
      });

      var divisions = data[3].split(',').map(function(x) {return x.trim()});

      for (i in divisions) {
        if (showOnly[divisions[i]] === 1) {
          return true;
        }
      }
      return false;
    }
  );


  $(document).ready(function() {
    var table = $('#results').DataTable({
      paging: false,
      info: false,
      ordering: false,
      data: processedData,
      columns: [
        {title: 'Faculty', width: '120px', className: 'td-center'},
        {title: 'Email', className: 'td-center'},
        {title: 'Research'},
        {title: 'Division', width: '50px'}
      ]
    });

    $('input[name="filter"]').change(function() {
      table.draw();
    });

  });


}
