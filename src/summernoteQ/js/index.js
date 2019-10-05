$(document).ready(function() {
$('.defaultsummernote').summernote( {
height: 300,    
focus: true,
toolbar: [
['prestyled', ['style']], 
['font-name', ['fontname']], 
['font-group', ['color','bold','italic','underline','clear']], 
['list-alignment-group', ['ul','ol','paragraph']],
['insert', ['link','picture','hr','table']],
['extra', ['undo','redo','fullscreen','codeview','help']]
],
onChange: function(contents, $editable) {
    console.log('onChange:', contents, $editable);
	$('.save-btn').removeClass('btn-success').addClass('btn-danger');
  }
});

$('.note-prestyled .btn .fa-magic').removeClass('fa-magic').addClass('fa-pencil');  
$('.note-extra .btn .fa-question').removeClass('fa-question').addClass('fa-question-circle'); 
});