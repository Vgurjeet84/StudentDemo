using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class StudentDetails
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Class { get; set; }
        public List<StudentSubjectDetails> lstsubjectDetails { get; set; }
    }

    public class StudentSubjectDetails
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public string Marks { get; set; }
    }

}