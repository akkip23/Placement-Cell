// using ajax call update user student interviews data
function updateInterviewsData(id) {
  let studentID = $(id).prop("id");
  let resultData = $(`#${studentID}`).val();

  console.log(resultData);
  console.log(studentID);
  $.ajax({
    type: "post",
    url: `/collection/updateInterviews/${studentID}/${resultData}`,
    success: function (data) {
      if (data.data.resultUpdated == true) {
        location.reload();
      }
    },
  });
}
