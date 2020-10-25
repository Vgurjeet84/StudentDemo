using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class HomeController : Controller
    {
        DemoTestContext objContext;
        public HomeController()
        {
            objContext = new DemoTestContext();
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";


            return View();
        }
        [HttpGet]
        public JsonResult getStudentDetails(int sEcho, int iDisplayStart, int iDisplayLength, string sSearch, int iSortCol_0, string sSortDir_0)
        {
            var lstStudentDetails = objContext.ObjStudents.ToList();
            var lstStudentSubjectDetails = objContext.ObjSubjectDetails.ToList();

            var _StudentDetails = from student in lstStudentDetails
                                  join subject in lstStudentSubjectDetails
                                  on student.StudentId equals subject.StudentId
                                  where student.FirstName.StartsWith(sSearch)
                                  select new { student.StudentId, student.FirstName, student.LastName, student.Class };


            return Json(new
            {
                data = lstStudentDetails,
                sEcho = sEcho,
                iTotalRecords = lstStudentDetails.Count(),
                iTotalDisplayRecords = lstStudentDetails.Count()
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Create(string objStudent, string lstsubject)
        {
            try
            {
                StudentDetails _objStudent = JsonConvert.DeserializeObject<StudentDetails>(objStudent);

                IEnumerable<StudentSubjectDetails> lstsubjects = new List<StudentSubjectDetails>();

                lstsubjects = JsonConvert.DeserializeObject<IEnumerable<StudentSubjectDetails>>(lstsubject);

                int StudentId = 0;

                objContext.ObjStudents.Add(_objStudent);
                objContext.SaveChanges();
                StudentId = _objStudent.StudentId;

                foreach (var item in lstsubjects)
                {
                    if (item.Marks != "" && item.SubjectName != "")
                    {
                        item.StudentId = StudentId;
                        objContext.ObjSubjectDetails.Add(item);
                        objContext.SaveChanges();
                    }
                }



                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            try
            {
                var StudentDetails = objContext.ObjStudents.Where(d => d.StudentId == id).First();

                var SubjectDetails = objContext.ObjSubjectDetails.Where(d => d.StudentId == id).ToList();

                objContext.ObjSubjectDetails.RemoveRange(SubjectDetails);
                objContext.SaveChanges();

                objContext.ObjStudents.Remove(StudentDetails);
                objContext.SaveChanges();

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetData(int id)
        {
            try
            {

                var StudentDetails = objContext.ObjStudents.Where(d => d.StudentId == id).First();
                StudentDetails.lstsubjectDetails = objContext.ObjSubjectDetails.Where(d => d.StudentId == id).ToList();

                return Json(StudentDetails, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Update(string objStudent, string lstsubject)
        {
            try
            {
                StudentDetails _objStudent = JsonConvert.DeserializeObject<StudentDetails>(objStudent);

                IEnumerable<StudentSubjectDetails> lstsubjects = new List<StudentSubjectDetails>();

                lstsubjects = JsonConvert.DeserializeObject<IEnumerable<StudentSubjectDetails>>(lstsubject);

                var StudentDetails = objContext.ObjStudents.Where(d => d.StudentId == _objStudent.StudentId).First();
                StudentDetails.FirstName = _objStudent.FirstName;
                StudentDetails.LastName = _objStudent.LastName;
                StudentDetails.Class = _objStudent.Class;
                objContext.SaveChanges();

                var SubjectDetails = objContext.ObjSubjectDetails.Where(d => d.StudentId == _objStudent.StudentId).ToList();

                objContext.ObjSubjectDetails.RemoveRange(SubjectDetails);
                objContext.SaveChanges();

                foreach (var item in lstsubjects)
                {
                    if (item.Marks != "" && item.SubjectName != "")
                    {
                        item.StudentId = _objStudent.StudentId;
                        objContext.ObjSubjectDetails.Add(item);
                        objContext.SaveChanges();
                    }
                }

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
