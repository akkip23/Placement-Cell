    function updateInterviewsData(id) {
        let resultData = $("#isPlaced").val();
        let studentID = $(id).prop("id")

        console.log(resultData);
        console.log(studentID);
        $.ajax({
            type: "post",
            url: `/collection/updateInterviews/${studentID}/${resultData}`,
        })

    }