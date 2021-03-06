$(document).ready(function() {
  $('#modalSend').click(function(e) {
    e.preventDefault();
    $("#feedbackForm").submit();
  });

  $("#feedbackForm").submit(function(e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "https://middleman.kissmetrics.com/helpscout.create_feedback",
      data: {
        url: document.location.href,
        message: $("#feedbackText").val(),
        email: $("#feedbackEmail").val(),
        identity: (function(){try{return KM.gc("ni")||"";}catch(e){return "";}})() // Has the visitor already been identified?
      },
      crossDomain: true,
      traditional: true,
      success: function() {
        // Hide irrelevant components
        $('#feedbackForm').hide();
        $('#modalSend').hide();
        $('#modalTitle').hide();
        $('#modalError').hide();

        // Show success components
        $('#modalSuccess').show();
        $('#modalSuccessTitle').show();

        // Automatically dismiss modal after 3 seconds
        setTimeout("$('#feedbackModal').modal('hide')", 3000);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Show error components
        $('#modalError').show();
      }
    });
  });
});