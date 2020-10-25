$(document).ready(function () {
    ViewData();

    $('#dt_Table tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = Table.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    $(document).on('click', '#btnAdd', function () {
        if ($('#tblSubject tr').length < 5) {
            var html = '<tr><td>Subject</td><td><input  type="text" class="form-control Subject" name="Subject"/></td><td>Marks</td><td><input type="text" class="form-control Marks" name="Marks"/></td></tr>'
            $('#tblSubject').append(html);
        }
        else {
            alert('Max Five Subjects');
        }
    });

    $(document).on('click', '#btnCreate', function () {
        if (update) {
            Update();
        }
        else {
            Create();
        }

    });

    $(document).on('click', '.Delete', function () {
        var id = $(this).attr("id");
        Delete(id);
    });

    $(document).on('click', '.Update', function () {
        update = true;
        var id = $(this).attr("id");
        updateId = id;
        GetData(id);
    });

    $(document).on('click', '#btnCancel', function () {
        location.reload();
    });
});

var Table;
var update = false;
var updateId = 0;
function ViewData() {

    $('#dt_Table').dataTable({
        "bDestroy": true
    }).fnDestroy();
    Table = $('#dt_Table').DataTable({
        "stateSave": true,
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": "/Home/getStudentDetails",
        "iDisplayLength": 10,
        language: {
            searchPlaceholder: " ",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50, 100], [5, 10, 20, 25, 50, 100]],
        "fnServerParams": function (param) {

        },
        "columns": [
            {
                "data": "StudentId",
                "bSortable": false
            },
            {
                "data": "FirstName",
                "bSortable": false
            },
            {
                "data": "LastName",
                "bSortable": false
            },
            {
                "data": "Class",
                "bSortable": false
            },
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {
                "bSortable": false,
                "data": "StudentId",
                render: function (data, type) {
                    return '<a class="Delete" href="javascript:void(0)" id="' + data + '">Delete</a>&nbsp;&nbsp<a class="Update" href="javascript:void(0)" id="' + data + '">update</a>';
                }
            }
        ]
    });

}

function format(d) {
    var SubTable = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="table table-bordered">' +
        '<tr>' +
        '<td>Subject</td>' +
        '<td>Marks</td>' +
        '</tr>';
    for (var i = 0; i < d.lstsubjectDetails.length; i++) {
        SubTable += '<tr>' +
            '<td>' + d.lstsubjectDetails[i].SubjectName + '</td>' +
            '<td>' + d.lstsubjectDetails[i].Marks + '</td>' +
            '</tr>';
    }
    return SubTable + '</table>';
}

function Create() {
    if ($("#txtFirstName").val() == '' || $("#txtLastName").val() == '' || $("#txtClass").val() == '') {
        alert('All fields are required...!');
        return false;
    }
    var Subjectdata = [];

    $("#tblSubject").find("tr").each(function () {
        debugger
        var SubjectName = '';
        var Marks = '';
        $(this).find("td input:text").each(function () {
            if ($(this).attr("name") == 'Subject') {
                SubjectName = this.value;
            }
            else if ($(this).attr("name") == 'Marks') {
                Marks = this.value;
            }
        });

        Subjectdata.push({ SubjectName: SubjectName, Marks: Marks })
    });

    var objstudent = { FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val(), Class: $("#txtClass").val() }
    $.ajax({
        type: "GET",
        url: "/Home/Create",
        contentType: "application/json; charset=utf-8",
        async: true,
        data: { objStudent: JSON.stringify(objstudent), lstsubject: JSON.stringify(Subjectdata) },
        dataType: "json",
        success: function (result) {
            if (result) {
                location.reload();
            }
        },
        error: function (response) {
            alert('eror');
        }
    });
}

function Delete(id) {
    $.ajax({
        type: "GET",
        url: "/Home/Delete",
        contentType: "application/json; charset=utf-8",
        async: true,
        data: { id: id },
        dataType: "json",
        success: function (result) {
            if (result) {
                location.reload();
            }
        },
        error: function (response) {
            alert('eror');
        }
    });
}

function Update() {
    if ($("#txtFirstName").val() == '' || $("#txtLastName").val() == '' || $("#txtClass").val() == '') {
        alert('All fields are required...!');
        return false;
    }
    var Subjectdata = [];

    $("#tblSubject").find("tr").each(function () {
        debugger
        var SubjectName = '';
        var Marks = '';
        $(this).find("td input:text").each(function () {
            if ($(this).attr("name") == 'Subject') {
                SubjectName = this.value;
            }
            else if ($(this).attr("name") == 'Marks') {
                Marks = this.value;
            }
        });

        Subjectdata.push({ SubjectName: SubjectName, Marks: Marks })
    });

    var objstudent = { FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val(), Class: $("#txtClass").val(), StudentId: updateId }
    $.ajax({
        type: "GET",
        url: "/Home/Update",
        contentType: "application/json; charset=utf-8",
        async: true,
        data: { objStudent: JSON.stringify(objstudent), lstsubject: JSON.stringify(Subjectdata) },
        dataType: "json",
        success: function (result) {
            if (result) {
                location.reload();
            }
        },
        error: function (response) {
            alert('eror');
        }
    });
}

function GetData(id) {
    $.ajax({
        type: "GET",
        url: "/Home/GetData",
        contentType: "application/json; charset=utf-8",
        async: true,
        data: { id: id },
        dataType: "json",
        success: function (result) {
            debugger
            if (result !== "") {
                $("#txtFirstName").val(result.FirstName);
                $("#txtLastName").val(result.LastName);
                $("#txtClass").val(result.Class);
                if (result.lstsubjectDetails.length > 1) {
                    $('#tblSubject tr').remove();
                    for (var i = 0; i < result.lstsubjectDetails.length; i++) {                       
                        var html = '<tr><td>Subject</td><td><input  type="text" class="form-control Subject" name="Subject" value="' + result.lstsubjectDetails[i].SubjectName + '"/></td><td>Marks</td><td><input type="text" class="form-control Marks" name="Marks" value="' + result.lstsubjectDetails[i].Marks + '"/></td></tr>'
                        $('#tblSubject').append(html);
                    }
                }
                else {
                    $(".Subject").val(result.lstsubjectDetails[0].SubjectName);
                    $(".Marks").val(result.lstsubjectDetails[0].Marks);
                }

            }
        },
        error: function (response) {
            alert('eror');
        }
    });
}