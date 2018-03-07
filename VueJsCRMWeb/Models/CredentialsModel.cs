using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VueJsCRMWeb.Models
{
    public class CredentialsModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
