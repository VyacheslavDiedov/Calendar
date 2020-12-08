using System.ComponentModel.DataAnnotations;

namespace Calendar.DataBase
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        [Required]
        public string UserFirstName { get; set; }
        [Required]
        public string UserLastName { get; set; }
        [Required]
        public string UserEMail { get; set; }
        [Required]
        public string UserPhone { get; set; }
        [Required]
        public string UserPassword { get; set; }
    }
}
