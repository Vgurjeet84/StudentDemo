using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace WebApi.Models
{
    public class DemoTestContext : DbContext
    {

        public DemoTestContext() : base("name=DbConnectionString")
        {

        }
        public DbSet<StudentDetails> ObjStudents { get; set; }
        public DbSet<StudentSubjectDetails> ObjSubjectDetails { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentDetails>().HasKey(t => t.StudentId); 
            modelBuilder.Entity<StudentDetails>().Property(t => t.StudentId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);              

            modelBuilder.Entity<StudentSubjectDetails>().HasKey(s => s.SubjectId);
            modelBuilder.Entity<StudentSubjectDetails>().Property(s => s.SubjectId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

           //modelBuilder.Entity<StudentSubjectDetails>().HasRequired(s => s.StudentId).WithMany(s => s.).HasForeignKey(s => s.StudentId); //Foreign Key             
            base.OnModelCreating(modelBuilder);
        }
    }

}