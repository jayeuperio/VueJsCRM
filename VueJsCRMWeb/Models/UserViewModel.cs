using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VueJsCRMWeb.Models
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public List<string> RoleNameList { get; set; }
    }
}
